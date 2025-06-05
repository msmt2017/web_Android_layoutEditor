'use client';

import { SCREEN_PREVIEWS } from '@/features/androviz/constants';
import { PanelWrapper } from './panel-wrapper';
import { Smartphone } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Dispatch, SetStateAction } from 'react';

interface ScreenPreviewPanelProps {
  selectedScreen: string;
  setSelectedScreen: Dispatch<SetStateAction<string>>;
}

export function ScreenPreviewPanel({ selectedScreen, setSelectedScreen }: ScreenPreviewPanelProps) {
  return (
    <PanelWrapper title="Screen Preview" icon={Smartphone}>
      <Select value={selectedScreen} onValueChange={setSelectedScreen}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select screen size" />
        </SelectTrigger>
        <SelectContent>
          {SCREEN_PREVIEWS.map((screen) => (
            <SelectItem key={screen.id} value={screen.id}>
              {screen.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-xs text-muted-foreground mt-2">
        Select a device to simulate its screen size in the visual preview. (Visual preview is illustrative).
      </p>
    </PanelWrapper>
  );
}
