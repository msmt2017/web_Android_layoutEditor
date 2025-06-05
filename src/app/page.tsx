
'use client';

import { useState, useCallback } from 'react';
import { AppHeader } from '@/components/layout/app-header';
import { ComponentLibraryPanel } from '@/components/panels/component-library-panel';
import { ScreenPreviewPanel } from '@/components/panels/screen-preview-panel';
import { VisualEditorPanel } from '@/components/editor/visual-editor-panel';
import { XmlEditorPanel } from '@/components/editor/xml-editor-panel';
import { PropertyEditorPanel } from '@/components/panels/property-editor-panel';
import { OptimizationToolPanel } from '@/components/panels/optimization-tool-panel';
import { suggestLayoutOptimizations } from '@/ai/flows/suggest-layout-optimizations';
import { useToast } from "@/hooks/use-toast";
import type { SelectedComponentInfo } from '@/features/androviz/types';
import { INITIAL_XML_CODE, SCREEN_PREVIEWS } from '@/features/androviz/constants';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Basic XML manipulation (very simplified, not robust for complex XML)
const updateAttributeInXml = (xml: string, elementId: string, attribute: string, newValue: string): string => {
  const regex = new RegExp(`(<\\w+.*?android:id="@+id/${elementId}".*?${attribute}=")(.*?)(".*?>)`, 's');
  if (xml.match(regex)) {
    return xml.replace(regex, `$1${newValue}$3`);
  }
  const findElementRegex = new RegExp(`(<\\w+.*?android:id="@+id/${elementId}".*?)>`, 's');
  if (xml.match(findElementRegex)) {
    return xml.replace(findElementRegex, `$1 ${attribute}="${newValue}">`);
  }
  console.warn(`Could not update attribute '${attribute}' for element '${elementId}'. XML parsing needed for robust updates.`);
  return xml;
};

const addSnippetToXml = (currentXml: string, snippet: string): string => {
  const layoutEndTags = ['</RelativeLayout>', '</LinearLayout>', '</androidx.constraintlayout.widget.ConstraintLayout>'];
  let insertIndex = -1;

  for (const tag of layoutEndTags) {
    insertIndex = currentXml.lastIndexOf(tag);
    if (insertIndex !== -1) break;
  }

  if (insertIndex !== -1) {
    const indentMatch = currentXml.substring(0, insertIndex).match(/\n(\s*)/g);
    const baseIndent = indentMatch ? indentMatch[indentMatch.length-1].substring(1) : "    ";
    const indentedSnippet = snippet.split('\n').map(line => `${baseIndent}    ${line}`).join('\n');
    return `${currentXml.substring(0, insertIndex)}${indentedSnippet}\n${baseIndent}${currentXml.substring(insertIndex)}`;
  }

  return `${currentXml}\n${snippet}`;
};


export default function AndroVizPage() {
  const [xmlCode, setXmlCode] = useState<string>(INITIAL_XML_CODE);
  const [userCodingStyle, setUserCodingStyle] = useState<string>('');
  const [optimizationSuggestions, setOptimizationSuggestions] = useState<string | null>(null);
  const [isLoadingOptimizations, setIsLoadingOptimizations] = useState<boolean>(false);
  const [selectedScreenId, setSelectedScreenId] = useState<string>(SCREEN_PREVIEWS[0].id);
  const [selectedComponent, setSelectedComponent] = useState<SelectedComponentInfo | null>(null);
  const [activeEditorTab, setActiveEditorTab] = useState<string>("visual");

  const { toast } = useToast();

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
      const type = elementId.includes('text') ? 'TextView' : elementId.includes('button') ? 'Button' : 'View';
      setSelectedComponent({
        id: elementId,
        type: type,
        attributes: {},
      });
      toast({ title: "Element Selected (Mock)", description: `Mock element '${elementId}' selected.` });
    } else {
      setSelectedComponent(null);
    }
  }, [toast]);

  const handlePropertyChange = useCallback((attribute: string, value: string) => {
    if (selectedComponent) {
      setXmlCode(prevXml => updateAttributeInXml(prevXml, selectedComponent.id, attribute, value));
      setSelectedComponent(prev => prev ? ({...prev, attributes: {...prev.attributes, [attribute]: value}}) : null);
       toast({ title: "Property Changed (Mock)", description: `Attribute ${attribute} for ${selectedComponent.id} set to ${value}. (XML update is illustrative)` });
    }
  }, [selectedComponent, toast]);

  const handleAddComponent = useCallback((xmlSnippet: string) => {
    setXmlCode(prevXml => addSnippetToXml(prevXml, xmlSnippet));
  }, []);

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar side="left" collapsible="icon" variant="sidebar" className="border-r bg-card">
        <SidebarContent className="p-0">
          <div className="p-4 space-y-4 flex flex-col h-full">
            <ComponentLibraryPanel onAddComponent={handleAddComponent} />
            <ScreenPreviewPanel selectedScreen={selectedScreenId} setSelectedScreen={setSelectedScreenId} />
          </div>
        </SidebarContent>
      </Sidebar>

      <SidebarInset className="flex flex-col flex-1 bg-background">
        <AppHeader />
        <main className="flex flex-1 overflow-hidden p-4 gap-4">
          {/* Center Column */}
          <div className="flex flex-col flex-1 min-w-0">
            <Tabs value={activeEditorTab} onValueChange={setActiveEditorTab} className="flex flex-col flex-1 h-full">
              <TabsList className="mb-2 self-start">
                <TabsTrigger value="visual">Visual Editor</TabsTrigger>
                <TabsTrigger value="xml">XML Editor</TabsTrigger>
              </TabsList>
              <TabsContent value="visual" className="flex-1 overflow-hidden m-0">
                <VisualEditorPanel xmlCode={xmlCode} selectedScreenId={selectedScreenId} onSelectElement={handleSelectElement} />
              </TabsContent>
              <TabsContent value="xml" className="flex-1 overflow-hidden m-0">
                <XmlEditorPanel xmlCode={xmlCode} setXmlCode={setXmlCode} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column */}
          <div className="flex flex-col w-64 md:w-80 space-y-4 shrink-0">
            <PropertyEditorPanel selectedComponent={selectedComponent} onPropertyChange={handlePropertyChange}/>
            <OptimizationToolPanel
              xmlCode={xmlCode}
              userCodingStyle={userCodingStyle}
              setUserCodingStyle={setUserCodingStyle}
              optimizationSuggestions={optimizationSuggestions}
              isLoading={isLoadingOptimizations}
              onOptimize={handleOptimizeLayout}
            />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
