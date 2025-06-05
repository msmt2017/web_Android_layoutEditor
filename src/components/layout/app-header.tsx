
import { LayoutGrid, Save, FileEdit, Undo, Redo, Copy, Scissors, ClipboardPaste, ZoomIn } from 'lucide-react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
  MenubarShortcut,
} from "@/components/ui/menubar";
import { Button } from '@/components/ui/button'; // For a potential explicit save button outside menu

interface AppHeaderProps {
  onSave: () => void; // Callback for save action
  // Add other callbacks for undo, redo, etc. if implemented
}

export function AppHeader({ onSave }: AppHeaderProps) {
  const handleSaveAs = () => {
    // For now, "Save As..." will behave like "Save"
    onSave();
    // In a real app, this would open a file dialog or similar
    alert("Save As... (behaves like Save for now)");
  };

  const handlePlaceholderAction = (actionName: string) => {
    alert(`${actionName} clicked (placeholder action).`);
  };


  return (
    <header className="flex h-16 items-center border-b bg-card px-4 md:px-6 shadow-sm shrink-0 justify-between">
      <div className="flex items-center gap-2">
        <LayoutGrid className="h-7 w-7 text-primary" />
        <h1 className="text-2xl font-semibold text-foreground font-headline">AndroViz</h1>
      </div>

      <div className="flex items-center gap-4">
        <Menubar className="rounded-none border-none bg-transparent p-0 hidden md:flex">
          <MenubarMenu>
            <MenubarTrigger className="font-medium text-sm">File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => handlePlaceholderAction('New Layout')}>New Layout</MenubarItem>
              <MenubarItem onClick={() => handlePlaceholderAction('Open Layout')}>Open Layout...</MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={onSave}>
                Save <MenubarShortcut><Save className="h-4 w-4" /></MenubarShortcut>
              </MenubarItem>
              <MenubarItem onClick={handleSaveAs}>Save As...</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="font-medium text-sm">Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => handlePlaceholderAction('Undo')}>
                Undo <MenubarShortcut><Undo className="h-4 w-4" /></MenubarShortcut>
              </MenubarItem>
              <MenubarItem onClick={() => handlePlaceholderAction('Redo')}>
                Redo <MenubarShortcut><Redo className="h-4 w-4" /></MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={() => handlePlaceholderAction('Cut')}>
                Cut <MenubarShortcut><Scissors className="h-4 w-4" /></MenubarShortcut>
              </MenubarItem>
              <MenubarItem onClick={() => handlePlaceholderAction('Copy')}>
                Copy <MenubarShortcut><Copy className="h-4 w-4" /></MenubarShortcut>
              </MenubarItem>
              <MenubarItem onClick={() => handlePlaceholderAction('Paste')}>
                Paste <MenubarShortcut><ClipboardPaste className="h-4 w-4" /></MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="font-medium text-sm">View</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => handlePlaceholderAction('Toggle Fullscreen')}>Toggle Fullscreen</MenubarItem>
              <MenubarItem onClick={() => handlePlaceholderAction('Zoom In')}>
                Zoom In <MenubarShortcut><ZoomIn className="h-4 w-4" /></MenubarShortcut>
              </MenubarItem>
               <MenubarItem onClick={() => handlePlaceholderAction('Zoom Out')}>Zoom Out</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="font-medium text-sm">Tools</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => handlePlaceholderAction('Toggle Comment (Line)')}>Toggle Comment</MenubarItem>
              <MenubarItem onClick={() => handlePlaceholderAction('Format XML')}>Format XML</MenubarItem>
               <MenubarItem onClick={() => handlePlaceholderAction('Jump to Line')}>Jump to Line...</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        {/* Example of an explicit save button if desired outside the menu */}
        {/* <Button variant="outline" size="sm" onClick={onSave} className="gap-1">
          <Save className="h-4 w-4" /> Save XML
        </Button> */}
      </div>
    </header>
  );
}
