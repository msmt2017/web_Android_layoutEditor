'use client';

import { ANDROID_COMPONENTS } from '@/features/androviz/constants';
import { PanelWrapper } from './panel-wrapper';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { GripVertical, LibrarySquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ComponentLibraryPanelProps {
  onAddComponent: (xmlSnippet: string) => void;
}

export function ComponentLibraryPanel({ onAddComponent }: ComponentLibraryPanelProps) {
  const { toast } = useToast();

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, snippet: string) => {
    event.dataTransfer.setData('text/plain', snippet);
    // In a real scenario, you'd set some state or use a library for drag effects.
  };

  const handleAddComponentClick = (snippet: string, componentName: string) => {
    onAddComponent(snippet);
    toast({
      title: `${componentName} Added`,
      description: `Snippet for ${componentName} inserted into XML.`,
    });
  };

  return (
    <PanelWrapper title="Component Library" icon={LibrarySquare} className="h-full">
      <ScrollArea className="h-full pr-2">
        <div className="space-y-2">
          {ANDROID_COMPONENTS.map((component) => (
            <div
              key={component.id}
              // draggable // Draggability is illustrative, full implementation is complex.
              // onDragStart={(e) => handleDragStart(e, component.defaultXmlSnippet)}
              className="flex items-center justify-between p-2 border rounded-md hover:bg-accent hover:cursor-grab active:cursor-grabbing"
              onClick={() => handleAddComponentClick(component.defaultXmlSnippet, component.name)}
              title={`Click to add ${component.name}`}
            >
              <div className="flex items-center gap-2">
                <component.icon className="h-5 w-5 text-primary" />
                <span className="text-sm">{component.name}</span>
              </div>
              <GripVertical className="h-5 w-5 text-muted-foreground opacity-50 hover:opacity-100" />
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Click a component to add its basic XML snippet to the editor. Drag and drop is illustrative.
        </p>
      </ScrollArea>
    </PanelWrapper>
  );
}
