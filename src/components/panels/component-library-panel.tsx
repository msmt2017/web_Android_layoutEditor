
'use client';

import { useState } from 'react';
import { ANDROID_COMPONENTS } from '@/features/androviz/constants';
import type { AndroidComponentDefinition, CustomComponentDefinition } from '@/features/androviz/types';
import { PanelWrapper } from './panel-wrapper';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { GripVertical, LibrarySquare, PlusCircle, Settings2 } from 'lucide-react'; // Added PlusCircle
import { useToast } from '@/hooks/use-toast';
import { AddCustomComponentDialog } from '@/components/dialogs/add-custom-component-dialog';


interface ComponentLibraryPanelProps {
  onAddComponent: (xmlSnippet: string) => void;
  customComponents: CustomComponentDefinition[];
  onAddCustomComponent: (component: CustomComponentDefinition) => void;
}

export function ComponentLibraryPanel({ onAddComponent, customComponents, onAddCustomComponent }: ComponentLibraryPanelProps) {
  const { toast } = useToast();
  const [isAddCustomDialogOpen, setIsAddCustomDialogOpen] = useState(false);

  const allComponents: AndroidComponentDefinition[] = [...ANDROID_COMPONENTS, ...customComponents];

  const handleAddComponentClick = (snippet: string, componentName: string) => {
    onAddComponent(snippet);
    toast({
      title: `${componentName} Added`,
      description: `Snippet for ${componentName} inserted into XML.`,
    });
  };

  return (
    <PanelWrapper 
      title="Component Library" 
      icon={LibrarySquare} 
      className="h-full flex flex-col"
      action={
        <Button variant="ghost" size="sm" onClick={() => setIsAddCustomDialogOpen(true)} title="Add Custom Component">
          <PlusCircle className="h-4 w-4" />
        </Button>
      }
    >
      <ScrollArea className="flex-1 pr-2">
        <div className="space-y-2">
          {allComponents.map((component) => (
            <div
              key={component.id}
              className="flex items-center justify-between p-2 border rounded-md hover:bg-accent hover:cursor-pointer active:cursor-grabbing"
              onClick={() => handleAddComponentClick(component.defaultXmlSnippet, component.name)}
              title={`Click to add ${component.name}`}
            >
              <div className="flex items-center gap-2">
                {component.isCustom ? <Settings2 className="h-5 w-5 text-blue-500" /> : <component.icon className="h-5 w-5 text-primary" />}
                <span className="text-sm">{component.name}</span>
              </div>
              <GripVertical className="h-5 w-5 text-muted-foreground opacity-50 hover:opacity-100" />
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Click a component to add its XML snippet. Custom components are marked with a settings icon.
        </p>
      </ScrollArea>
       <AddCustomComponentDialog
        isOpen={isAddCustomDialogOpen}
        onOpenChange={setIsAddCustomDialogOpen}
        onAddComponent={onAddCustomComponent}
      />
    </PanelWrapper>
  );
}
