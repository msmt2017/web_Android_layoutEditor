
'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useState, useEffect } from 'react';
import { PanelWrapper } from '@/components/panels/panel-wrapper';
import { Eye } from 'lucide-react'; // Smartphone, Settings icons removed as they are moved to SettingsPanel
import { SCREEN_PREVIEWS } from '@/features/androviz/constants';


interface VisualEditorPanelProps {
  xmlCode: string; 
  previewWidth: string;
  previewHeight: string;
  selectedScreenId: string; // To display the active screen name
  onSelectElement: (elementId: string | null) => void;
}

export function VisualEditorPanel({ xmlCode, previewWidth, previewHeight, selectedScreenId, onSelectElement }: VisualEditorPanelProps) {
  const [activeScreenName, setActiveScreenName] = useState<string>('Default (Resizable)');

  useEffect(() => {
    const screen = SCREEN_PREVIEWS.find(s => s.id === selectedScreenId);
    if (screen && !screen.isCustom) {
      setActiveScreenName(screen.name);
    } else if (selectedScreenId === 'custom' && screen) {
      setActiveScreenName(`Custom (${previewWidth} x ${previewHeight})`);
    } else {
      const defaultScreen = SCREEN_PREVIEWS.find(s => s.id === 'default') || SCREEN_PREVIEWS[0];
      setActiveScreenName(defaultScreen.name);
    }
  }, [selectedScreenId, previewWidth, previewHeight]);

  const handleMockElementClick = (elementId: string) => {
    onSelectElement(elementId);
  };
  
  return (
    <div className="h-full flex flex-col gap-4">
      {/* Screen selection and custom dimensions UI has been moved to SettingsPanel */}
      <PanelWrapper title="Visual Preview" icon={Eye} className="flex-1" contentClassName="flex flex-col items-center justify-center bg-muted/30 p-2">
          <div 
            className="bg-background shadow-xl overflow-auto border-2 border-dashed border-primary/50 rounded-lg p-2 transition-all duration-300 ease-in-out"
            style={{ 
              width: previewWidth, 
              height: previewHeight, 
              maxWidth: '100%', 
              maxHeight: 'calc(100vh - 180px)' // Adjusted max height based on typical tab layout
            }}
            onClick={() => handleMockElementClick('welcome_text')} 
            title="Click to select 'welcome_text' (mock)"
          >
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
              <Eye className="w-12 h-12 text-primary/70 mb-3" />
              <h3 className="text-md font-semibold text-foreground mb-1">Visual Preview Area</h3>
              <p className="text-xs text-muted-foreground mb-2">
                Illustrative preview. Actual rendering happens on an Android device.
              </p>
              <p className="text-xs text-muted-foreground bg-accent px-2 py-1 rounded-md">
                Current Screen: {activeScreenName}
              </p>
              <p className="text-xs text-muted-foreground mt-2">Selected element (mock): 'welcome_text' by clicking this area.</p>
               <div data-ai-hint="android device mobile" className="mt-3 opacity-60">
                 <img src="https://placehold.co/200x120.png" alt="Visual preview placeholder" className="rounded-md " />
              </div>
            </div>
          </div>
      </PanelWrapper>
    </div>
  );
}
