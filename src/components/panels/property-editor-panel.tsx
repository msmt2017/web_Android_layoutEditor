'use client';

import { PanelWrapper } from './panel-wrapper';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ListChecks } from 'lucide-react';
import type { SelectedComponentInfo } from '@/features/androviz/types';
import type { Dispatch, SetStateAction } from 'react';

interface PropertyEditorPanelProps {
  selectedComponent: SelectedComponentInfo | null;
  onPropertyChange: (attribute: string, value: string) => void; // Simplified: updates XML string directly
}

// Mock function to extract attributes. In reality, this would involve XML parsing.
const getMockAttributes = (componentId: string | null): Record<string, string> => {
  if (componentId === 'welcome_text') {
    return {
      'android:id': '@+id/welcome_text',
      'android:layout_width': 'wrap_content',
      'android:layout_height': 'wrap_content',
      'android:text': 'Welcome to AndroViz!',
      'android:textSize': '24sp',
      'android:layout_centerHorizontal': 'true',
      'android:layout_marginTop': '50dp',
    };
  }
  if (componentId === 'action_button') {
    return {
      'android:id': '@+id/action_button',
      'android:layout_width': 'wrap_content',
      'android:layout_height': 'wrap_content',
      'android:text': 'Get Started',
      // ... other attributes
    };
  }
  return {};
};


export function PropertyEditorPanel({ selectedComponent, onPropertyChange }: PropertyEditorPanelProps) {
  
  // Use mock attributes if a component is selected, otherwise an empty object
  const attributes = selectedComponent ? getMockAttributes(selectedComponent.id) : {};

  const handleInputChange = (attribute: string, value: string) => {
    onPropertyChange(attribute, value);
  };

  return (
    <PanelWrapper title="Property Editor" icon={ListChecks} className="h-full">
      <ScrollArea className="h-full pr-2">
        {selectedComponent ? (
          <div className="space-y-4">
            <p className="text-sm font-medium">Selected: <span className="font-mono text-primary">{selectedComponent.id || 'Unknown'}</span> ({selectedComponent.type})</p>
            {Object.entries(attributes).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <Label htmlFor={key} className="text-xs text-muted-foreground">{key}</Label>
                <Input
                  id={key}
                  value={value}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  className="h-8 text-sm font-code"
                  placeholder="Enter value"
                />
              </div>
            ))}
            {Object.keys(attributes).length === 0 && (
                <p className="text-sm text-muted-foreground">No editable attributes found for this mock element.</p>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ListChecks className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
            <p className="text-sm text-muted-foreground">
              Select an element in the Visual Editor to see its properties.
            </p>
            <p className="text-xs text-muted-foreground mt-1">(Visual Editor interaction is illustrative)</p>
          </div>
        )}
      </ScrollArea>
    </PanelWrapper>
  );
}
