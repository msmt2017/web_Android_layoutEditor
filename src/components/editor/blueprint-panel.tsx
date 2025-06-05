
'use client';

import { PanelWrapper } from '@/components/panels/panel-wrapper';
import { DraftingCompass } from 'lucide-react'; // Icon for blueprint

interface BlueprintPanelProps {
  xmlCode: string; // Will be used in the future to derive blueprint
  previewWidth: string;
  previewHeight: string;
  onSelectElement: (elementId: string | null) => void; // Added for consistency
}

export function BlueprintPanel({ xmlCode, previewWidth, previewHeight, onSelectElement }: BlueprintPanelProps) {
  // For now, this is a placeholder.
  // In a real implementation, this panel would parse xmlCode
  // and render a schematic (blueprint) view of the layout.

  const handleMockBlueprintClick = () => {
    // Example: Select the root layout or a primary element if logic existed
    // For now, it could select 'main_layout' if it exists in the XML.
    if (xmlCode.includes('android:id="@+id/main_layout"')) {
      onSelectElement('main_layout');
    } else {
      onSelectElement(null); // Or select nothing
    }
  };

  return (
    <PanelWrapper title="Blueprint View (Placeholder)" icon={DraftingCompass} className="h-full" contentClassName="flex flex-col items-center justify-center bg-muted/30 p-2">
      <div
        className="bg-background shadow-lg overflow-auto border-2 border-dashed border-blue-500/50 rounded-lg p-2 cursor-pointer"
        style={{
          width: previewWidth,
          height: previewHeight,
          maxWidth: '100%',
          maxHeight: 'calc(100vh - 180px)' // Adjust as needed
        }}
        onClick={handleMockBlueprintClick}
        title="Click to interact with blueprint (mock interaction)"
      >
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
          <DraftingCompass className="w-16 h-16 text-blue-500/70 mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Blueprint Canvas</h3>
          <p className="text-sm text-muted-foreground mb-1">
            This area will display a blueprint view of your layout.
          </p>
          <p className="text-xs text-muted-foreground">
            (Similar to Android Studio's blueprint, showing outlines and constraints. Currently a placeholder.)
          </p>
           <div data-ai-hint="blueprint sketch architectural" className="mt-4 opacity-50">
            <img src="https://placehold.co/200x150.png" alt="Blueprint placeholder" className="rounded-md" />
          </div>
        </div>
      </div>
    </PanelWrapper>
  );
}
