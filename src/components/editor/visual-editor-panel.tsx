
'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useState, useEffect } from 'react';
import { PanelWrapper } from '@/components/panels/panel-wrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, Smartphone, Settings } from 'lucide-react';
import { SCREEN_PREVIEWS } from '@/features/androviz/constants';
import type { ScreenDefinition } from '@/features/androviz/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface VisualEditorPanelProps {
  xmlCode: string; 
  selectedScreenId: string;
  setSelectedScreenId: Dispatch<SetStateAction<string>>;
  onSelectElement: (elementId: string | null) => void;
}

export function VisualEditorPanel({ xmlCode, selectedScreenId, setSelectedScreenId, onSelectElement }: VisualEditorPanelProps) {
  const [currentWidth, setCurrentWidth] = useState<string>('100%');
  const [currentHeight, setCurrentHeight] = useState<string>('100%');
  const [customWidthInput, setCustomWidthInput] = useState<string>('360px');
  const [customHeightInput, setCustomHeightInput] = useState<string>('640px');
  const [activeScreenName, setActiveScreenName] = useState<string>('Default (Resizable)');

  const { toast } = useToast();

  useEffect(() => {
    const screen = SCREEN_PREVIEWS.find(s => s.id === selectedScreenId);
    if (screen && !screen.isCustom) {
      setCurrentWidth(screen.width_val);
      setCurrentHeight(screen.height_val);
      setActiveScreenName(screen.name);
    } else if (selectedScreenId === 'custom' && screen) {
      // For initial load if "custom" is selected by default or from previous state
      setCurrentWidth(customWidthInput);
      setCurrentHeight(customHeightInput);
      setActiveScreenName(`Custom (${customWidthInput} x ${customHeightInput})`);
    } else {
      const defaultScreen = SCREEN_PREVIEWS.find(s => s.id === 'default') || SCREEN_PREVIEWS[0];
      setCurrentWidth(defaultScreen.width_val);
      setCurrentHeight(defaultScreen.height_val);
      setActiveScreenName(defaultScreen.name);
    }
  }, [selectedScreenId, customWidthInput, customHeightInput]);

  const handleSelectScreen = (screenId: string) => {
    setSelectedScreenId(screenId);
    const screen = SCREEN_PREVIEWS.find(s => s.id === screenId);
    if (screen && !screen.isCustom) {
      setCurrentWidth(screen.width_val);
      setCurrentHeight(screen.height_val);
      setActiveScreenName(screen.name);
    } else if (screenId === 'custom' && screen) {
      // When "Custom" is selected from dropdown, apply current custom inputs
      setCurrentWidth(customWidthInput);
      setCurrentHeight(customHeightInput);
      setActiveScreenName(`Custom (${customWidthInput} x ${customHeightInput})`);
    }
  };

  const handleApplyCustomResolution = () => {
    if (!customWidthInput.trim() || !customHeightInput.trim()) {
      toast({
        title: 'Invalid Dimensions',
        description: 'Please enter valid width and height for custom resolution.',
        variant: 'destructive',
      });
      return;
    }
    // It's good practice to validate if inputs are valid CSS dimensions (e.g. '300px', '100dp', '50%')
    // For this mock, we'll assume valid input.
    setSelectedScreenId('custom'); // Ensure the selected ID reflects a custom state
    setCurrentWidth(customWidthInput);
    setCurrentHeight(customHeightInput);
    setActiveScreenName(`Custom (${customWidthInput} x ${customHeightInput})`);
    toast({
      title: 'Custom Resolution Applied',
      description: `Preview set to ${customWidthInput} x ${customHeightInput}.`,
    });
  };
  
  const handleMockElementClick = (elementId: string) => {
    onSelectElement(elementId);
  };
  
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="bg-card p-4 rounded-lg shadow grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="screen-select" className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-2">
            <Smartphone className="h-4 w-4" />
            Screen Preview Device
          </Label>
          <Select value={selectedScreenId} onValueChange={handleSelectScreen}>
            <SelectTrigger id="screen-select" className="w-full">
              <SelectValue placeholder="Select screen size" />
            </SelectTrigger>
            <SelectContent>
              {SCREEN_PREVIEWS.map((screen) => (
                <SelectItem key={screen.id} value={screen.id} disabled={screen.isCustom && screen.id !== 'custom'}>
                  {screen.name} ({screen.id === 'default' ? 'Resizable' : screen.isCustom && screen.id === 'custom' ? 'Set Below' : `${screen.width_val}x${screen.height_val}`})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-2">
            Select a device or set custom dimensions. (Visual preview is illustrative). Units like px, dp, % are accepted.
          </p>
        </div>
        <div>
            <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-2">
                <Settings className="h-4 w-4" />
                Custom Dimensions
            </Label>
            <div className="flex gap-2 items-end">
                <div className="flex-1">
                    <Label htmlFor="custom-width" className="text-xs">Width</Label>
                    <Input 
                        id="custom-width" 
                        value={customWidthInput} 
                        onChange={(e) => setCustomWidthInput(e.target.value)} 
                        placeholder="e.g., 360px or 100%"
                        className="h-9"
                    />
                </div>
                <div className="flex-1">
                    <Label htmlFor="custom-height" className="text-xs">Height</Label>
                    <Input 
                        id="custom-height" 
                        value={customHeightInput} 
                        onChange={(e) => setCustomHeightInput(e.target.value)} 
                        placeholder="e.g., 640px or 100%"
                        className="h-9"
                    />
                </div>
                <Button onClick={handleApplyCustomResolution} size="sm" className="h-9 self-end">Apply</Button>
            </div>
        </div>
      </div>

      <PanelWrapper title="Visual Preview" icon={Eye} className="flex-1" contentClassName="flex flex-col items-center justify-center bg-muted/30 p-2">
          <div 
            className="bg-background shadow-xl overflow-auto border-2 border-dashed border-primary/50 rounded-lg p-2 transition-all duration-300 ease-in-out"
            style={{ 
              width: currentWidth, 
              height: currentHeight, 
              maxWidth: '100%', 
              maxHeight: 'calc(100vh - 300px)' // Adjust based on surrounding elements
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
