
'use client';

import type { Dispatch, SetStateAction } from 'react';
import { PanelWrapper } from '@/components/panels/panel-wrapper';
import { Eye, Smartphone } from 'lucide-react';
import { SCREEN_PREVIEWS } from '@/features/androviz/constants';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';

interface VisualEditorPanelProps {
  xmlCode: string; // xmlCode might be used for actual rendering in the future
  selectedScreenId: string;
  setSelectedScreenId: Dispatch<SetStateAction<string>>;
  onSelectElement: (elementId: string | null) => void;
}

export function VisualEditorPanel({ xmlCode, selectedScreenId, setSelectedScreenId, onSelectElement }: VisualEditorPanelProps) {
  const selectedScreen = SCREEN_PREVIEWS.find(s => s.id === selectedScreenId) || SCREEN_PREVIEWS[0];

  const handleMockElementClick = (elementId: string) => {
    onSelectElement(elementId);
  };
  
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="bg-card p-3 rounded-lg shadow">
        <Label htmlFor="screen-select" className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-2">
          <Smartphone className="h-4 w-4" />
          Screen Preview Device
        </Label>
        <Select value={selectedScreenId} onValueChange={setSelectedScreenId}>
          <SelectTrigger id="screen-select" className="w-full md:w-72">
            <SelectValue placeholder="Select screen size" />
          </SelectTrigger>
          <SelectContent>
            {SCREEN_PREVIEWS.map((screen) => (
              <SelectItem key={screen.id} value={screen.id}>
                {screen.name} ({screen.id === 'default' ? 'Resizable' : `${screen.width_val}x${screen.height_val}`})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
         <p className="text-xs text-muted-foreground mt-2">
          Select a device to simulate its screen size. (Visual preview is illustrative).
        </p>
      </div>

      <PanelWrapper title="Visual Preview" icon={Eye} className="flex-1" contentClassName="flex flex-col items-center justify-center bg-muted/30">
          <div 
            className="bg-background shadow-lg overflow-auto border-2 border-dashed border-primary/50 rounded-lg p-2 transition-all duration-300 ease-in-out w-full h-full"
            style={{ 
              width: selectedScreen.id === 'default' ? '100%' : selectedScreen.width_val, 
              height: selectedScreen.id === 'default' ? '100%' : selectedScreen.height_val, 
              maxWidth: '100%', 
              maxHeight: 'calc(100vh - 250px)' // Adjust based on surrounding elements
            }}
            onClick={() => handleMockElementClick('welcome_text')} 
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
    </div>
  );
}
