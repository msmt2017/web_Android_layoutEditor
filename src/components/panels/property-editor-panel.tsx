
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
  xmlCode: string; // Added to potentially re-fetch/verify attributes if needed, though primarily driven by selectedComponent
}

// This function now primarily defines which attributes to *display* and provides hints/defaults.
// The actual values should come from selectedComponent.attributes, which are parsed from XML.
const getDisplayableAttributesConfig = (componentId: string | null, componentType: string | null): Record<string, { hint: string, defaultValue?: string }> => {
  if (!componentId) return {};

  let baseAttributes: Record<string, { hint: string, defaultValue?: string }> = {
    'android:id': { hint: 'Unique identifier (e.g., @+id/my_view)', defaultValue: `@+id/${componentId}` },
    'android:layout_width': { hint: 'Layout dimension: "match_parent", "wrap_content", or exact (e.g., 100dp)', defaultValue: 'wrap_content' },
    'android:layout_height': { hint: 'Layout dimension: "match_parent", "wrap_content", or exact (e.g., 100dp)', defaultValue: 'wrap_content' },
    'android:layout_margin': { hint: 'Uniform margin (e.g., 16dp). For specific sides: layout_marginTop, etc.', defaultValue: '0dp' },
    'android:padding': { hint: 'Uniform padding (e.g., 8dp). For specific sides: paddingTop, etc.', defaultValue: '0dp' },
    'android:visibility': { hint: 'Control visibility: "visible", "invisible", or "gone".', defaultValue: 'visible' },
    'android:background': { hint: 'Color or drawable (e.g., #FFFFFF, @drawable/bg_gradient)', defaultValue: '#00000000' },
  };

  if (componentType === 'TextView' || componentId.includes('text')) {
    baseAttributes = {
      ...baseAttributes,
      'android:text': { hint: 'String value or resource (e.g., "Hello", @string/my_string)', defaultValue: 'Sample Text' },
      'android:textSize': { hint: 'Text size in scalable pixels (e.g., 16sp)', defaultValue: '16sp' },
      'android:textColor': { hint: 'Text color (e.g., #000000, @color/my_color)', defaultValue: '#000000' },
      'android:fontFamily': { hint: 'Font family (e.g., sans-serif, monospace)', defaultValue: 'sans-serif' },
      'android:gravity': { hint: 'Specifies how an object should position its content (e.g., "center")', defaultValue: 'left' },
    };
  } else if (componentType === 'Button' || componentId.includes('button')) {
    baseAttributes = {
      ...baseAttributes,
      'android:text': { hint: 'Button text (e.g., "Submit")', defaultValue: 'Button' },
      'android:background': { hint: 'Button background (e.g., ?attr/colorPrimary)', defaultValue: '?attr/colorPrimary' },
    };
  } else if (componentType === 'ImageView' || componentId.includes('image')) {
    baseAttributes = {
      ...baseAttributes,
      'android:layout_width': { hint: 'Image width (e.g., 100dp)', defaultValue: '100dp' },
      'android:layout_height': { hint: 'Image height (e.g., 100dp)', defaultValue: '100dp' },
      'android:src': { hint: 'Drawable resource for ImageView (e.g., @drawable/my_icon)', defaultValue: '@drawable/ic_placeholder' },
      'android:contentDescription': { hint: 'Accessibility description for the image', defaultValue: 'Image' },
      'android:scaleType': { hint: 'Controls how image is scaled/positioned (e.g., "centerCrop", "fitXY")', defaultValue: 'centerCrop' },
    };
  } else if (componentType === 'EditText') {
     baseAttributes = {
      ...baseAttributes,
      'android:layout_width': { hint: 'EditText width (e.g., match_parent)', defaultValue: 'match_parent' },
      'android:hint': { hint: 'Hint text for EditText (e.g., "Enter your name")', defaultValue: 'Enter text' },
      'android:inputType': { hint: 'Type of input for EditText (e.g., "text", "numberPassword")', defaultValue: 'text' },
    };
  }
  // If specific ID is welcome_text, merge/override with its known displayable attributes
  if (componentId === 'welcome_text') {
     baseAttributes = { // merge, ensuring specific values for welcome_text take precedence or are added
      ...baseAttributes,
      'android:id': { hint: 'Unique identifier', defaultValue: '@+id/welcome_text' },
      'android:layout_width': { hint: 'Layout width', defaultValue: 'wrap_content'},
      'android:layout_height': { hint: 'Layout height', defaultValue: 'wrap_content'},
      'android:text': { hint: 'Text content', defaultValue: 'Welcome to AndroViz!'},
      'android:textSize': { hint: 'Text size (e.g., 24sp)', defaultValue: '24sp'},
      'android:textColor': { hint: 'Text color (e.g., #FF6A5ACD)', defaultValue: '#FF6A5ACD'},
      'android:padding': { hint: 'Padding (e.g., 16dp)', defaultValue: '16dp'},
      'android:fontFamily': { hint: 'Font family', defaultValue: 'sans-serif-medium'},
      'android:layout_centerHorizontal': { hint: 'Center horizontally in RelativeLayout (true/false)', defaultValue: 'true'},
      'android:layout_marginTop': { hint: 'Margin on the top edge (e.g., 50dp)', defaultValue: '50dp'},
    };
  }
  return baseAttributes;
};


export function PropertyEditorPanel({ selectedComponent, onPropertyChange }: PropertyEditorPanelProps) {
  
  // Get the configuration for which attributes to display and their hints/defaults
  const displayableAttributesConfig = selectedComponent 
    ? getDisplayableAttributesConfig(selectedComponent.id, selectedComponent.type) 
    : {};

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
             
              {Object.entries(displayableAttributesConfig).map(([key, config]) => (
                <div key={key} className="space-y-1">
                  <Label htmlFor={key} className="text-xs font-medium text-muted-foreground">{key}</Label>
                  <Tooltip delayDuration={200}>
                    <TooltipTrigger asChild>
                      <Input
                        id={key}
                        // Use the parsed attribute value from selectedComponent if available,
                        // otherwise use the default value from config, or an empty string.
                        value={selectedComponent.attributes[key] ?? config.defaultValue ?? ''}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        className="h-9 text-sm font-code bg-card focus:border-primary"
                        placeholder={config.hint ? config.hint.split(':')[0] : "Enter value"}
                      />
                    </TooltipTrigger>
                    {config.hint && (
                      <TooltipContent side="top" align="start" className="max-w-xs bg-popover text-popover-foreground p-2 rounded-md shadow-lg border text-xs">
                        <p>{config.hint}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </div>
              ))}
              {Object.keys(displayableAttributesConfig).length === 0 && selectedComponent.id && (
                  <p className="text-sm text-muted-foreground p-4 border border-dashed rounded-md text-center">
                    No specific attributes pre-configured for display for <code className="font-mono text-xs bg-muted p-1 rounded">{selectedComponent.type}</code>.
                    You can still edit its XML directly.
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
               <div data-ai-hint="empty state list" className="mt-4 opacity-50">
                  <img src="https://placehold.co/150x100.png" alt="No selection placeholder" className="rounded-md" />
              </div>
            </div>
          )}
        </ScrollArea>
      </TooltipProvider>
    </PanelWrapper>
  );
}
