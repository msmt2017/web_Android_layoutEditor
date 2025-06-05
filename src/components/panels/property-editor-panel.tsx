
'use client';

import { PanelWrapper } from './panel-wrapper';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ListChecks } from 'lucide-react';
import type { SelectedComponentInfo } from '@/features/androviz/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


interface PropertyEditorPanelProps {
  selectedComponent: SelectedComponentInfo | null;
  onPropertyChange: (attribute: string, value: string) => void; 
}

// Mock function to extract attributes. In reality, this would involve XML parsing.
const getMockAttributes = (componentId: string | null, componentType: string | null): Record<string, string> => {
  if (componentId === 'welcome_text' || componentType === 'TextView') {
    return {
      'android:id': `@+id/${componentId || 'welcome_text'}`,
      'android:layout_width': 'wrap_content',
      'android:layout_height': 'wrap_content',
      'android:text': 'Welcome to AndroViz!',
      'android:textSize': '24sp',
      'android:textColor': '#FF6A5ACD', // Example color
      'android:padding': '16dp',
      'android:fontFamily': 'sans-serif-medium', // Example font
      'android:layout_centerHorizontal': 'true',
      'android:layout_marginTop': '50dp',
    };
  }
  if (componentId === 'action_button' || componentType === 'Button') {
    return {
      'android:id': `@+id/${componentId || 'action_button'}`,
      'android:layout_width': 'wrap_content',
      'android:layout_height': 'wrap_content',
      'android:text': 'Get Started',
      'android:background': '?attr/colorPrimary', // Example theme attribute
      'android:layout_below': '@id/welcome_text',
      // ... other attributes
    };
  }
   if (componentId === 'placeholder_image' || componentType === 'ImageView') {
    return {
      'android:id': `@+id/${componentId || 'placeholder_image'}`,
      'android:layout_width': '150dp',
      'android:layout_height': '150dp',
      'android:src': '@drawable/placeholder_icon',
      'android:contentDescription': 'Placeholder Image',
      'android:scaleType': 'centerCrop',
    };
  }
  // For other or generic selections, provide a minimal set
  if (componentId) {
    return {
      'android:id': `@+id/${componentId}`,
      'android:layout_width': 'wrap_content',
      'android:layout_height': 'wrap_content',
    }
  }
  return {};
};

// Illustrative placeholders/tooltips
const attributeHints: Record<string, string> = {
  'android:layout_width': 'Use "match_parent", "wrap_content", or a dimension (e.g., 100dp).',
  'android:layout_height': 'Use "match_parent", "wrap_content", or a dimension (e.g., 100dp).',
  'android:padding': 'Dimension value (e.g., 16dp). Uniform padding.',
  'android:textSize': 'Dimension value in sp (e.g., 16sp).',
  'android:textColor': 'Color value (e.g., #FF0000) or resource (e.g., @color/my_color).',
  'android:text': 'String value or resource (e.g., @string/my_string).',
  'android:src': 'Drawable resource (e.g., @drawable/my_icon).',
  'android:background': 'Color or drawable resource.',
  'android:visibility': 'Visible, invisible, or gone.',
  'android:orientation': 'For LinearLayout: "horizontal" or "vertical".',
};


export function PropertyEditorPanel({ selectedComponent, onPropertyChange }: PropertyEditorPanelProps) {
  
  const attributes = selectedComponent ? getMockAttributes(selectedComponent.id, selectedComponent.type) : {};

  const handleInputChange = (attribute: string, value: string) => {
    onPropertyChange(attribute, value);
  };

  return (
    <PanelWrapper title="Property Editor" icon={ListChecks} className="h-full">
      <TooltipProvider>
        <ScrollArea className="h-full pr-2">
          {selectedComponent ? (
            <div className="space-y-4">
              <p className="text-sm font-medium">Selected: <span className="font-mono text-primary">{selectedComponent.id || 'Unknown'}</span> ({selectedComponent.type})</p>
              {Object.entries(attributes).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <Label htmlFor={key} className="text-xs text-muted-foreground">{key}</Label>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Input
                        id={key}
                        value={value}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        className="h-8 text-sm font-code"
                        placeholder={attributeHints[key] ? 'e.g. ' + attributeHints[key].split(',')[0].split(' ')[1] : "Enter value"}
                      />
                    </TooltipTrigger>
                    {attributeHints[key] && (
                      <TooltipContent side="top" align="start">
                        <p className="text-xs max-w-xs">{attributeHints[key]}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </div>
              ))}
              {Object.keys(attributes).length === 0 && selectedComponent.id && !selectedComponent.id.startsWith("custom_") && (
                  <p className="text-sm text-muted-foreground">No specific mock attributes for this element ID. Generic attributes shown.</p>
              )}
               {Object.keys(attributes).length === 0 && selectedComponent.id && selectedComponent.id.startsWith("custom_") && (
                  <p className="text-sm text-muted-foreground">Custom components currently do not have pre-defined attributes in this editor.</p>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ListChecks className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
              <p className="text-sm text-muted-foreground">
                Select an element in the Visual Editor or XML to see its properties.
              </p>
              <p className="text-xs text-muted-foreground mt-1">(Visual/XML editor interaction is illustrative)</p>
            </div>
          )}
        </ScrollArea>
      </TooltipProvider>
    </PanelWrapper>
  );
}
