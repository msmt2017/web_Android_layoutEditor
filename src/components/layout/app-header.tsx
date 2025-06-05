
import { LayoutGrid } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

export function AppHeader() {
  return (
    <header className="flex h-16 items-center border-b bg-card px-4 md:px-6 shadow-sm shrink-0 justify-between">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <LayoutGrid className="h-7 w-7 text-primary" />
        <h1 className="text-2xl font-semibold text-foreground font-headline">AndroViz</h1>
      </div>

      <div className="flex items-center gap-4">
        <Menubar className="rounded-none border-none bg-transparent p-0 hidden md:flex">
          <MenubarMenu>
            <MenubarTrigger className="font-medium text-sm">File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New Layout</MenubarItem>
              <MenubarItem>Open Layout...</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Save</MenubarItem>
              <MenubarItem>Save As...</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="font-medium text-sm">Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Undo</MenubarItem>
              <MenubarItem>Redo</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Cut</MenubarItem>
              <MenubarItem>Copy</MenubarItem>
              <MenubarItem>Paste</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="font-medium text-sm">View</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Toggle Sidebar</MenubarItem>
              <MenubarItem>Toggle Fullscreen</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        {/* Future global actions (e.g., Theme Toggle) can go here */}
      </div>
    </header>
  );
}
