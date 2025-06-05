
'use client';

import { useState, useCallback, useEffect } from 'react';
import { AppHeader } from '@/components/layout/app-header';
import { ComponentLibraryPanel } from '@/components/panels/component-library-panel';
import { VisualEditorPanel } from '@/components/editor/visual-editor-panel';
import { XmlEditorPanel } from '@/components/editor/xml-editor-panel';
import { PropertyEditorPanel } from '@/components/panels/property-editor-panel';
import { OptimizationToolPanel } from '@/components/panels/optimization-tool-panel';
import { SettingsPanel } from '@/components/panels/settings-panel';
import { BlueprintPanel } from '@/components/editor/blueprint-panel';
import { suggestLayoutOptimizations } from '@/ai/flows/suggest-layout-optimizations';
import { useToast } from "@/hooks/use-toast";
import type { SelectedComponentInfo, CustomComponentDefinition, ScreenDefinition } from '@/features/androviz/types';
import { INITIAL_XML_CODE, SCREEN_PREVIEWS } from '@/features/androviz/constants';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const parseAttributesFromXml = (xml: string, elementId: string): Record<string, string> => {
  const attributes: Record<string, string> = {};
  // Regex to find the start of the tag by its android:id
  // This looks for <elementName ... android:id="@+id/elementId" ... >
  // It captures the opening part of the tag.
  const elementRegex = new RegExp(`<([\\w.]+)[^>]*android:id="@+id/${elementId}"([^>]*)>`, 's');
  const match = xml.match(elementRegex);

  if (match && match[0]) {
    const fullTagOpening = match[0]; // The entire opening tag, e.g., <TextView ...> or <ImageView ... />
    
    // Regex to find attributes within the tag: attributeName="attributeValue"
    // It handles attributes with namespaces like android:text or app:layout_constraintTop_toTopOf
    const attrRegex = /([\w:.-]+)\s*=\s*"([^"]*)"/g;
    let attrMatch;
    while ((attrMatch = attrRegex.exec(fullTagOpening)) !== null) {
      attributes[attrMatch[1]] = attrMatch[2];
    }
  }
  return attributes;
};


const updateAttributeInXml = (xml: string, elementId: string, attribute: string, newValue: string): string => {
  // Regex to find the element and the specific attribute
  // It looks for <anyTag ... android:id="@+id/elementId" ... someAttribute="oldValue" ... >
  // And replaces someAttribute="oldValue" with someAttribute="newValue"
  const attributeRegex = new RegExp(`(<\\w+[^>]*android:id="@+id/${elementId}"[^>]*?${attribute}=)"([^"]*)"([^>]*>)`, 's');
  
  if (xml.match(attributeRegex)) {
    return xml.replace(attributeRegex, `$1"${newValue}"$3`);
  }
  
  // If attribute doesn't exist, try to add it.
  // This finds the opening tag by id: <anyTag ... android:id="@+id/elementId" ... >
  // And adds the new attribute="newValue" before the closing > or />
  const findElementRegex = new RegExp(`(<\\w+[^>]*android:id="@+id/${elementId}"[^>]*?)(\\s*/?>)`, 's');
  if (xml.match(findElementRegex)) {
    return xml.replace(findElementRegex, `$1 ${attribute}="${newValue}"$2`);
  }

  console.warn(`Could not update/add attribute '${attribute}' for element '${elementId}'. XML parsing needed for robust updates.`);
  return xml;
};

const addSnippetToXml = (currentXml: string, snippet: string): string => {
  const layoutEndTags = ['</RelativeLayout>', '</LinearLayout>', '</androidx.constraintlayout.widget.ConstraintLayout>', '</ScrollView>', '</FrameLayout>', '</androidx.cardview.widget.CardView>'];
  let insertIndex = -1;
  let bestTagIndent = "    ";

  for (const tag of layoutEndTags) {
    const lastIndex = currentXml.lastIndexOf(tag);
    if (lastIndex !== -1) {
      if (lastIndex > insertIndex) {
        insertIndex = lastIndex;
        const beforeTag = currentXml.substring(0, insertIndex);
        const lines = beforeTag.split('\n');
        const tagLine = lines[lines.length-1];
        const indentMatch = tagLine.match(/^(\s*)/);
        if (indentMatch && indentMatch[1]) {
          bestTagIndent = indentMatch[1];
        }
      }
    }
  }

  if (insertIndex === -1) {
    const rootCloseMatch = currentXml.match(/<\/(\w+)\s*>$/);
    if (rootCloseMatch) {
        insertIndex = currentXml.lastIndexOf(rootCloseMatch[0]);
         const beforeTag = currentXml.substring(0, insertIndex);
        const lines = beforeTag.split('\n');
        const tagLine = lines[lines.length-1];
        const indentMatch = tagLine.match(/^(\s*)/);
        if (indentMatch && indentMatch[1]) {
          bestTagIndent = indentMatch[1];
        }
    }
  }
  
  if (insertIndex !== -1) {
    const snippetLines = snippet.trim().split('\n');
    const indentedSnippet = snippetLines.map(line => `${bestTagIndent}    ${line}`).join('\n');
    return `${currentXml.substring(0, insertIndex)}${indentedSnippet}\n${bestTagIndent}${currentXml.substring(insertIndex)}`;
  }

  const snippetLines = snippet.trim().split('\n');
  const indentedSnippet = snippetLines.map(line => `    ${line}`).join('\n');
  return `${currentXml}\n${indentedSnippet}`;
};


export default function AndroVizPage() {
  const [xmlCode, setXmlCode] = useState<string>(INITIAL_XML_CODE);
  const [userCodingStyle, setUserCodingStyle] = useState<string>('');
  const [optimizationSuggestions, setOptimizationSuggestions] = useState<string | null>(null);
  const [isLoadingOptimizations, setIsLoadingOptimizations] = useState<boolean>(false);

  const [selectedScreenId, setSelectedScreenId] = useState<string>(SCREEN_PREVIEWS[0].id);
  const [currentPreviewWidth, setCurrentPreviewWidth] = useState<string>(SCREEN_PREVIEWS[0].width_val);
  const [currentPreviewHeight, setCurrentPreviewHeight] = useState<string>(SCREEN_PREVIEWS[0].height_val);
  const [customWidthInput, setCustomWidthInput] = useState<string>('360px');
  const [customHeightInput, setCustomHeightInput] = useState<string>('640px');

  const [selectedComponent, setSelectedComponent] = useState<SelectedComponentInfo | null>(null);
  const [activeMainTab, setActiveMainTab] = useState<string>("visual");
  const [customComponents, setCustomComponents] = useState<CustomComponentDefinition[]>([]);

  const [autoSaveEnabled, setAutoSaveEnabled] = useState<boolean>(false);
  const [autoSaveInterval, setAutoSaveInterval] = useState<number>(3000);

  const { toast } = useToast();

  const handleAddCustomComponent = useCallback((component: CustomComponentDefinition) => {
    setCustomComponents(prev => [...prev, component]);
    toast({
      title: "Custom Component Added",
      description: `${component.name} is now available in the library.`,
    });
  }, [toast]);

  const handleOptimizeLayout = useCallback(async () => {
    if (!xmlCode.trim()) {
      toast({
        title: "XML Code Empty",
        description: "Please provide XML code to optimize.",
        variant: "destructive",
      });
      return;
    }
    setIsLoadingOptimizations(true);
    setOptimizationSuggestions(null);
    try {
      const result = await suggestLayoutOptimizations({
        xmlLayoutCode: xmlCode,
        userCodingStyle: userCodingStyle || undefined,
      });
      setOptimizationSuggestions(result.suggestions);
      toast({
        title: "Optimization Suggested",
        description: "AI suggestions have been generated.",
      });
    } catch (error) {
      console.error('Error fetching optimization suggestions:', error);
      toast({
        title: "Optimization Failed",
        description: "Could not fetch suggestions. Please try again.",
        variant: "destructive",
      });
      setOptimizationSuggestions('Error fetching suggestions.');
    } finally {
      setIsLoadingOptimizations(false);
    }
  }, [xmlCode, userCodingStyle, toast]);

  const handleSelectElement = useCallback((elementId: string | null) => {
    if (elementId) {
      let type = 'View'; // Default type
      const parsedAttributes = parseAttributesFromXml(xmlCode, elementId);
      
      // Try to determine type from the tag name in parsed attributes (if any attribute was parsed)
      // This requires the parsing to capture the tag name itself or a more complex regex.
      // For now, let's use a simpler type detection based on id, similar to before,
      // but ensure parsedAttributes are prioritized.
      const match = xmlCode.match(new RegExp(`<([\\w.]+).*?android:id="@+id/${elementId}"`));
      if (match && match[1]) {
        type = match[1];
      } else if (elementId.includes('text')) type = 'TextView';
      else if (elementId.includes('button')) type = 'Button';
      else if (elementId.includes('image')) type = 'ImageView';
      // Add more sophisticated type detection if needed

      setSelectedComponent({
        id: elementId,
        type: type,
        attributes: parsedAttributes, // Use attributes parsed from current xmlCode
      });
       if (activeMainTab !== "properties" && activeMainTab !== "visual" && activeMainTab !== "blueprint") {
         setActiveMainTab("properties");
       }
    } else {
      setSelectedComponent(null);
    }
  }, [xmlCode, activeMainTab]);

  const handlePropertyChange = useCallback((attribute: string, value: string) => {
    if (selectedComponent) {
      const newXml = updateAttributeInXml(xmlCode, selectedComponent.id, attribute, value);
      setXmlCode(newXml); // This will trigger re-render and pass new xmlCode to panels
      
      // Also update the selectedComponent's attributes directly for immediate UI feedback in PropertyEditorPanel
      // before a potential re-selection might re-parse.
      setSelectedComponent(prev => {
        if (!prev) return null;
        const updatedAttributes = { ...prev.attributes, [attribute]: value };
        return { ...prev, attributes: updatedAttributes };
      });

      toast({ title: "Property Changed", description: `Attribute ${attribute} for ${selectedComponent.id} set to ${value}.` });
    }
  }, [selectedComponent, toast, xmlCode]);

  const handleAddComponent = useCallback((xmlSnippet: string) => {
    setXmlCode(prevXml => addSnippetToXml(prevXml, xmlSnippet));
    setActiveMainTab("xml");
    toast({
      title: "Component Added",
      description: "Snippet inserted into XML. Switch to XML Editor tab to see changes.",
    });
  }, [toast]);

  const handleScreenSelection = useCallback((screenId: string) => {
    setSelectedScreenId(screenId);
    const screen = SCREEN_PREVIEWS.find(s => s.id === screenId);
    if (screen && !screen.isCustom) {
      setCurrentPreviewWidth(screen.width_val);
      setCurrentPreviewHeight(screen.height_val);
    } else if (screenId === 'custom' && screen) {
      setCurrentPreviewWidth(customWidthInput);
      setCurrentPreviewHeight(customHeightInput);
    }
  }, [customWidthInput, customHeightInput]);

  const handleApplyCustomResolution = useCallback(() => {
    if (!customWidthInput.trim() || !customHeightInput.trim()) {
      toast({
        title: 'Invalid Dimensions',
        description: 'Please enter valid width and height for custom resolution.',
        variant: 'destructive',
      });
      return;
    }
    setSelectedScreenId('custom'); 
    setCurrentPreviewWidth(customWidthInput);
    setCurrentPreviewHeight(customHeightInput);
    toast({
      title: 'Custom Resolution Applied',
      description: `Preview set to ${customWidthInput} x ${customHeightInput}.`,
    });
  }, [customWidthInput, customHeightInput, toast]);
  
  const handleSaveXml = useCallback(() => {
    const blob = new Blob([xmlCode], { type: 'application/xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'layout.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    toast({ title: "XML Saved", description: "layout.xml has been downloaded." });
  }, [xmlCode, toast]);

  // Effect to re-parse attributes if selected component ID is stable but XML code changes
  useEffect(() => {
    if (selectedComponent?.id) {
        const parsedAttributes = parseAttributesFromXml(xmlCode, selectedComponent.id);
        // Only update if parsed attributes are different to avoid infinite loops if parsing is unstable
        if (JSON.stringify(parsedAttributes) !== JSON.stringify(selectedComponent.attributes)) {
             setSelectedComponent(prev => prev ? ({...prev, attributes: parsedAttributes}) : null);
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xmlCode, selectedComponent?.id]);


  return (
    <div className="flex flex-col h-screen bg-background">
      <AppHeader onSave={handleSaveXml} />
      <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="flex flex-col flex-1 overflow-hidden">
        <TabsList className="mx-auto mt-2 mb-2 px-4 border-b-0 rounded-md">
          <TabsTrigger value="visual">Visual Editor</TabsTrigger>
          <TabsTrigger value="blueprint">Blueprint</TabsTrigger>
          <TabsTrigger value="xml">XML Editor</TabsTrigger>
          <TabsTrigger value="components">Component Library</TabsTrigger>
          <TabsTrigger value="properties">Property Editor</TabsTrigger>
          <TabsTrigger value="optimize">Layout Optimization</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="visual" className="flex-1 overflow-y-auto p-4 m-0">
          <VisualEditorPanel
            xmlCode={xmlCode}
            previewWidth={currentPreviewWidth}
            previewHeight={currentPreviewHeight}
            selectedScreenId={selectedScreenId}
            onSelectElement={handleSelectElement}
          />
        </TabsContent>
        <TabsContent value="blueprint" className="flex-1 overflow-y-auto p-4 m-0">
           <BlueprintPanel xmlCode={xmlCode} previewWidth={currentPreviewWidth} previewHeight={currentPreviewHeight} onSelectElement={handleSelectElement}/>
        </TabsContent>
        <TabsContent value="xml" className="flex-1 overflow-y-auto p-0 m-0">
          <XmlEditorPanel xmlCode={xmlCode} setXmlCode={setXmlCode} />
        </TabsContent>
        <TabsContent value="components" className="flex-1 overflow-y-auto p-4 m-0">
          <ComponentLibraryPanel
            onAddComponent={handleAddComponent}
            customComponents={customComponents}
            onAddCustomComponent={handleAddCustomComponent}
          />
        </TabsContent>
        <TabsContent value="properties" className="flex-1 overflow-y-auto p-4 m-0">
           <PropertyEditorPanel selectedComponent={selectedComponent} onPropertyChange={handlePropertyChange} xmlCode={xmlCode}/>
        </TabsContent>
        <TabsContent value="optimize" className="flex-1 overflow-y-auto p-4 m-0">
          <OptimizationToolPanel
            xmlCode={xmlCode}
            userCodingStyle={userCodingStyle}
            setUserCodingStyle={setUserCodingStyle}
            optimizationSuggestions={optimizationSuggestions}
            isLoading={isLoadingOptimizations}
            onOptimize={handleOptimizeLayout}
          />
        </TabsContent>
         <TabsContent value="settings" className="flex-1 overflow-y-auto p-4 m-0">
          <SettingsPanel
            selectedScreenId={selectedScreenId}
            onScreenSelect={handleScreenSelection}
            customWidthInput={customWidthInput}
            setCustomWidthInput={setCustomWidthInput}
            customHeightInput={customHeightInput}
            setCustomHeightInput={setCustomHeightInput}
            onApplyCustomResolution={handleApplyCustomResolution}
            autoSaveEnabled={autoSaveEnabled}
            setAutoSaveEnabled={setAutoSaveEnabled}
            autoSaveInterval={autoSaveInterval}
            setAutoSaveInterval={setAutoSaveInterval}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
