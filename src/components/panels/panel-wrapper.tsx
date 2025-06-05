import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PanelWrapperProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  action?: React.ReactNode;
}

export function PanelWrapper({ title, icon: Icon, children, className, contentClassName, action }: PanelWrapperProps) {
  return (
    <Card className={cn("flex flex-col overflow-hidden shadow-md", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3 px-4 border-b">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
          <CardTitle className="text-base font-medium font-headline">{title}</CardTitle>
        </div>
        {action}
      </CardHeader>
      <CardContent className={cn("p-4 flex-1 overflow-y-auto", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
}
