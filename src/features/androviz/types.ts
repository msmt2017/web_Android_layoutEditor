
import type { LucideIcon } from 'lucide-react';

export interface AndroidComponentDefinition {
  id: string;
  name: string;
  icon: LucideIcon;
  defaultXmlSnippet: string; 
  defaultProperties: Record<string, string>;
  isCustom?: boolean; // Flag to differentiate custom components
}

// For user-defined components, we might start simpler
export interface CustomComponentDefinition extends AndroidComponentDefinition {
  isCustom: true;
}


// This would represent a component instance on the canvas in a more complex visual editor
export interface PlacedComponent {
  instanceId: string; 
  componentId: string; // ID from AndroidComponentDefinition
  properties: Record<string, string>;
  // x, y, width, height relative to parent for visual editor
  // For simplicity, we are not implementing this level of detail now
}

export interface SelectedComponentInfo {
  id: string; // e.g., an android:id value from the XML
  type: string; // e.g., "Button", "TextView"
  attributes: Record<string, string>; // Current attributes from XML (or defaults)
}

export interface ScreenDefinition {
  id: string;
  name: string;
  width_val: string;
  height_val: string;
  isCustom?: boolean;
}
```