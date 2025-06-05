
'use client';

import { PanelWrapper } from './panel-wrapper';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ListChecks } from 'lucide-react';
import type { SelectedComponentInfo } from '@/features/androviz/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from '@/components/ui/button'; // Added Button for potential future actions

interface PropertyEditorPanelProps {
  selectedComponent: SelectedComponentInfo | null;
  onPropertyChange: (attribute: string, value: string) => void; 
}

const getMockAttributes = (componentId: string | null, componentType: string | null): Record<string, string> => {
  if (!componentId) return {};

  let baseAttributes: Record<string, string> = {
    'android:id': `@+id/${componentId}`,
    'android:layout_width': 'wrap_content',
    'android:layout_height': 'wrap_content',
    'android:layout_margin': '0dp',
    'android:padding': '0dp',
    'android:visibility': 'visible',
  };

  if (componentType === 'TextView' || componentId.includes('text')) {
    baseAttributes = {
      ...baseAttributes,
      'android:text': 'Sample Text',
      'android:textSize': '16sp',
      'android:textColor': '#000000',
      'android:fontFamily': 'sans-serif',
      'android:gravity': 'left', // Common for TextView
      'android:background': '#00000000' // Transparent background
    };
  } else if (componentType === 'Button' || componentId.includes('button')) {
    baseAttributes = {
      ...baseAttributes,
      'android:text': 'Button',
      'android:background': '?attr/colorPrimary', // Example theme attribute
    };
  } else if (componentType === 'ImageView' || componentId.includes('image')) {
    baseAttributes = {
      ...baseAttributes,
      'android:layout_width': '100dp',
      'android:layout_height': '100dp',
      'android:src': '@drawable/ic_placeholder',
      'android:contentDescription': 'Image',
      'android:scaleType': 'centerCrop',
    };
  } else if (componentType === 'EditText') {
     baseAttributes = {
      ...baseAttributes,
      'android:layout_width': 'match_parent',
      'android:hint': 'Enter text',
      'android:inputType': 'text',
    };
  }
   // If specific ID is welcome_text, override with its known mock values
  if (componentId === 'welcome_text') {
     return {
      'android:id': `@+id/welcome_text`,
      'android:layout_width': 'wrap_content',
      'android:layout_height': 'wrap_content',
      'android:text': 'Welcome to AndroViz!',
      'android:textSize': '24sp',
      'android:textColor': '#FF6A5ACD',
      'android:padding': '16dp',
      'android:fontFamily': 'sans-serif-medium',
      'android:layout_centerHorizontal': 'true',
      'android:layout_marginTop': '50dp',
    };
  }


  return baseAttributes;
};

const attributeHints: Record<string, string> = {
  'android:id': 'Unique identifier for the view (e.g., @+id/my_view).',
  'android:layout_width': 'Layout dimension: "match_parent", "wrap_content", or exact (e.g., 100dp).',
  'android:layout_height': 'Layout dimension: "match_parent", "wrap_content", or exact (e.g., 100dp).',
  'android:layout_margin': 'Uniform margin (e.g., 16dp). For specific sides: layout_marginTop, etc.',
  'android:padding': 'Uniform padding (e.g., 8dp). For specific sides: paddingTop, etc.',
  'android:visibility': 'Control visibility: "visible", "invisible", or "gone".',
  'android:textSize': 'Text size in scalable pixels (e.g., 16sp).',
  'android:textColor': 'Text color (e.g., #FF0000, @color/my_color).',
  'android:text': 'String value or resource (e.g., "Hello", @string/my_string).',
  'android:hint': 'Hint text for EditText (e.g., "Enter your name").',
  'android:inputType': 'Type of input for EditText (e.g., "text", "numberPassword").',
  'android:src': 'Drawable resource for ImageView (e.g., @drawable/my_icon).',
  'android:background': 'Color or drawable resource for background (e.g., #FFFFFF, @drawable/bg_gradient).',
  'android:scaleType': 'Controls how image is scaled/positioned in ImageView (e.g., "centerCrop", "fitXY").',
  'android:orientation': 'For LinearLayout: "horizontal" or "vertical".',
  'android:gravity': 'Specifies how an object should position its content (e.g., "center", "left|top").',
  'android:layout_centerHorizontal': 'RelativeLayout/ConstraintLayout: true to center horizontally.',
  'android:layout_marginTop': 'Margin on the top edge (e.g., 20dp).'
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
              <div className="p-3 bg-accent rounded-md border border-border">
                 <h3 className="text-sm font-semibold">Selected: <span className="font-mono text-primary">{selectedComponent.id || 'Unknown'}</span></h3>
                 <p className="text-xs text-muted-foreground">Type: {selectedComponent.type || 'View'}</p>
              </div>
             
              {Object.entries(attributes).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <Label htmlFor={key} className="text-xs font-medium text-muted-foreground">{key}</Label>
                  <Tooltip delayDuration={200}>
                    <TooltipTrigger asChild>
                      <Input
                        id={key}
                        value={selectedComponent.attributes[key] || value} // Prefer live attribute if available, else mock
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        className="h-9 text-sm font-code bg-card focus:border-primary"
                        placeholder={attributeHints[key] ? attributeHints[key].split(':')[0] : "Enter value"}
                      />
                    </TooltipTrigger>
                    {attributeHints[key] && (
                      <TooltipContent side="top" align="start" className="max-w-xs bg-popover text-popover-foreground p-2 rounded-md shadow-lg border text-xs">
                        <p>{attributeHints[key]}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </div>
              ))}
              {Object.keys(attributes).length === 0 && selectedComponent.id && !selectedComponent.id.startsWith("custom_") && (
                  <p className="text-sm text-muted-foreground p-4 border border-dashed rounded-md text-center">
                    No specific attributes defined for <span className="font-mono">{selectedComponent.id}</span>. 
                    Standard attributes like <code className="font-mono text-xs bg-muted p-1 rounded">android:layout_width</code> can still be edited.
                  </p>
              )}
               {Object.keys(attributes).length === 0 && selectedComponent.id && selectedComponent.id.startsWith("custom_") && (
                  <p className="text-sm text-muted-foreground p-4 border border-dashed rounded-md text-center">
                    Custom components currently do not have pre-defined attributes in this mock editor. 
                    You can edit their raw XML.
                  </p>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6 border border-dashed rounded-md">
              <ListChecks className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
              <p className="text-base font-medium text-foreground">
                No Component Selected
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Select an element in the Visual Editor (mock interaction) or type its ID in the XML to see and edit its properties here.
              </p>
            </div>
          )}
        </ScrollArea>
      </TooltipProvider>
    </PanelWrapper>
  );
}
