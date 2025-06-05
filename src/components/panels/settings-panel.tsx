
'use client';

import type { Dispatch, SetStateAction } from 'react';
import { PanelWrapper } from '@/components/panels/panel-wrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Settings, Smartphone, MonitorSmartphone, Save } from 'lucide-react';
import { SCREEN_PREVIEWS } from '@/features/androviz/constants';

interface SettingsPanelProps {
  selectedScreenId: string;
  onScreenSelect: (screenId: string) => void;
  customWidthInput: string;
  setCustomWidthInput: Dispatch<SetStateAction<string>>;
  customHeightInput: string;
  setCustomHeightInput: Dispatch<SetStateAction<string>>;
  onApplyCustomResolution: () => void;
  autoSaveEnabled: boolean;
  setAutoSaveEnabled: Dispatch<SetStateAction<boolean>>;
  autoSaveInterval: number;
  setAutoSaveInterval: Dispatch<SetStateAction<number>>;
}

export function SettingsPanel({
  selectedScreenId,
  onScreenSelect,
  customWidthInput,
  setCustomWidthInput,
  customHeightInput,
  setCustomHeightInput,
  onApplyCustomResolution,
  autoSaveEnabled,
  setAutoSaveEnabled,
  autoSaveInterval,
  setAutoSaveInterval,
}: SettingsPanelProps) {
  return (
    <PanelWrapper title="Application Settings" icon={Settings} className="h-full">
      <div className="space-y-8">
        
        <section>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-foreground">
            <MonitorSmartphone className="h-5 w-5 text-primary" />
            Screen Preview Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-lg bg-card shadow-sm">
            <div>
              <Label htmlFor="screen-select" className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-2">
                <Smartphone className="h-4 w-4" />
                Preview Device
              </Label>
              <Select value={selectedScreenId} onValueChange={onScreenSelect}>
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
                Select a device or set custom dimensions for the visual preview. Units like px, dp, % are accepted.
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
                            placeholder="e.g., 360px"
                            className="h-9"
                        />
                    </div>
                    <div className="flex-1">
                        <Label htmlFor="custom-height" className="text-xs">Height</Label>
                        <Input 
                            id="custom-height" 
                            value={customHeightInput} 
                            onChange={(e) => setCustomHeightInput(e.target.value)} 
                            placeholder="e.g., 640px"
                            className="h-9"
                        />
                    </div>
                    <Button onClick={onApplyCustomResolution} size="sm" className="h-9 self-end">Apply</Button>
                </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-foreground">
            <Save className="h-5 w-5 text-primary" />
            Saving Preferences
          </h2>
          <div className="space-y-4 p-4 border rounded-lg bg-card shadow-sm">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-save-toggle" className="text-sm font-medium">
                Enable Auto-save
                <p className="text-xs text-muted-foreground">Periodically save changes (feature conceptual).</p>
              </Label>
              <Switch
                id="auto-save-toggle"
                checked={autoSaveEnabled}
                onCheckedChange={setAutoSaveEnabled}
              />
            </div>
            {autoSaveEnabled && (
              <div>
                <Label htmlFor="auto-save-interval" className="text-sm font-medium">Auto-save Interval (ms)</Label>
                <Input
                  id="auto-save-interval"
                  type="number"
                  value={autoSaveInterval}
                  onChange={(e) => setAutoSaveInterval(Math.max(500, parseInt(e.target.value, 10) || 3000))}
                  placeholder="e.g., 3000"
                  className="mt-1"
                  min="500"
                />
                <p className="text-xs text-muted-foreground mt-1">Minimum 500ms. This setting is for future persistence features.</p>
              </div>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-foreground">
            <Settings className="h-5 w-5 text-primary" />
            Editor Preferences (Placeholder)
          </h2>
          <div className="p-4 border rounded-lg bg-card shadow-sm text-center">
            <p className="text-sm text-muted-foreground">More editor-specific settings will appear here in the future.</p>
            <p className="text-xs text-muted-foreground mt-1">(e.g., XML formatting, AI suggestion aggressiveness, etc.)</p>
          </div>
        </section>

      </div>
    </PanelWrapper>
  );
}
