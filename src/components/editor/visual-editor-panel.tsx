
'use client';

import { PanelWrapper } from '@/components/panels/panel-wrapper';
import { Eye } from 'lucide-react';
import { SCREEN_PREVIEWS } from '@/features/androviz/constants';

interface VisualEditorPanelProps {
  xmlCode: string;
  selectedScreenId: string;
  onSelectElement: (elementId: string | null) => void; // Placeholder for element selection
}

export function VisualEditorPanel({ xmlCode, selectedScreenId, onSelectElement }: VisualEditorPanelProps) {
  const selectedScreen = SCREEN_PREVIEWS.find(s => s.id === selectedScreenId) || SCREEN_PREVIEWS[0];

  // Mock selection handler
  const handleMockElementClick = (elementId: string) => {
    onSelectElement(elementId);
  };
  
  return (
    <PanelWrapper title="Visual Editor" icon={Eye} className="h-full" contentClassName="flex flex-col items-center justify-center bg-muted/30">
        <div 
          className="bg-background shadow-lg overflow-auto border-2 border-dashed border-primary/50 rounded-lg p-2 transition-all duration-300 ease-in-out w-full h-full"
          style={{ 
            // Use 100% if default, otherwise use specific screen dimensions
            width: selectedScreen.id === 'default' ? '100%' : selectedScreen.width, 
            height: selectedScreen.id === 'default' ? '100%' : selectedScreen.height, 
            maxWidth: '100%', 
            maxHeight: '100%' 
          }}
          onClick={() => handleMockElementClick('welcome_text')} // Mock selection
          title="Click to select 'welcome_text' (mock)"
        >
          <div className="w-full h-full flex flex-col items-center justify-center text-center p-8">
            <Eye className="w-16 h-16 text-primary/70 mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Visual Preview Area</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This area would typically render a visual representation of your Android layout.
              Interactive drag-and-drop and component selection would be available here.
            </p>
            <p className="text-xs text-muted-foreground">Current Screen: {selectedScreen.name}</p>
            <p className="text-xs text-muted-foreground mt-2">Selected element (mock): 'welcome_text' by clicking this area.</p>
             <div data-ai-hint="android device mockup" className="mt-4">
               <img src="https://placehold.co/300x200.png" alt="Visual preview placeholder" className="rounded-md opacity-50" />
            </div>
          </div>
        </div>
    </PanelWrapper>
  );
}
