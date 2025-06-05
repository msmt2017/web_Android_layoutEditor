import { LayoutGrid } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="flex h-16 items-center border-b bg-card px-6 shadow-sm shrink-0">
      <div className="flex items-center gap-2">
        <LayoutGrid className="h-7 w-7 text-primary" />
        <h1 className="text-2xl font-semibold text-foreground font-headline">AndroViz</h1>
      </div>
      {/* Future global actions (e.g., Save, Load, Theme Toggle) can go here */}
    </header>
  );
}
