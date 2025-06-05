
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CustomComponentDefinition } from '@/features/androviz/types';
import { Settings2 } from 'lucide-react'; // Generic icon for custom components

interface AddCustomComponentDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onAddComponent: (component: CustomComponentDefinition) => void;
}

export function AddCustomComponentDialog({ isOpen, onOpenChange, onAddComponent }: AddCustomComponentDialogProps) {
  const [name, setName] = useState('');
  const [xmlSnippet, setXmlSnippet] = useState('');

  const handleSubmit = () => {
    if (!name.trim() || !xmlSnippet.trim()) {
      // Basic validation, can be improved with toasts or error messages
      alert('Please provide a name and XML snippet for the custom component.');
      return;
    }
    const newCustomComponent: CustomComponentDefinition = {
      id: `custom_${name.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`, // Simple unique ID
      name: name.trim(),
      icon: Settings2, // Use a generic icon for custom components
      defaultXmlSnippet: xmlSnippet.trim(),
      defaultProperties: {}, // Custom components might not have "default" parsable properties easily
      isCustom: true,
    };
    onAddComponent(newCustomComponent);
    setName('');
    setXmlSnippet('');
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Add Custom Component</DialogTitle>
          <DialogDescription>
            Define a new component to use in your layouts. Provide a name and its base XML snippet.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="custom-component-name" className="text-right">
              Name
            </Label>
            <Input
              id="custom-component-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              placeholder="e.g., MyCustomCard"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="custom-component-xml" className="text-right pt-2">
              XML Snippet
            </Label>
            <Textarea
              id="custom-component-xml"
              value={xmlSnippet}
              onChange={(e) => setXmlSnippet(e.target.value)}
              className="col-span-3 font-code h-32"
              placeholder="<com.example.MyCustomCard\n    android:layout_width=&quot;match_parent&quot;\n    android:layout_height=&quot;wrap_content&quot; />"
              spellCheck="false"
            />
          </div>
           <p className="text-xs text-muted-foreground col-span-4 px-1">
            Note: Ensure your XML snippet is valid. For custom components, include the full package name if it's not a standard Android widget.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleSubmit}>Add Component</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
