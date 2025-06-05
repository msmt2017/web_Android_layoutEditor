'use client';

import { PanelWrapper } from './panel-wrapper';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Wand2, Loader2 } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

interface OptimizationToolPanelProps {
  xmlCode: string;
  userCodingStyle: string;
  setUserCodingStyle: Dispatch<SetStateAction<string>>;
  optimizationSuggestions: string | null;
  isLoading: boolean;
  onOptimize: () => Promise<void>;
}

export function OptimizationToolPanel({
  xmlCode,
  userCodingStyle,
  setUserCodingStyle,
  optimizationSuggestions,
  isLoading,
  onOptimize,
}: OptimizationToolPanelProps) {
  return (
    <PanelWrapper title="Layout Optimization" icon={Wand2} className="h-full">
      <div className="flex flex-col h-full space-y-4">
        <div>
          <Label htmlFor="user-coding-style" className="text-xs">User Coding Style (Optional)</Label>
          <Textarea
            id="user-coding-style"
            value={userCodingStyle}
            onChange={(e) => setUserCodingStyle(e.target.value)}
            placeholder="e.g., Prefers ConstraintLayout, avoids deep nesting..."
            className="mt-1 h-20 text-sm font-code"
            disabled={isLoading}
          />
        </div>
        <Button onClick={onOptimize} disabled={isLoading || !xmlCode} className="w-full">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          Suggest Optimizations
        </Button>
        {optimizationSuggestions && (
          <div className="flex-1 overflow-hidden border rounded-md">
            <ScrollArea className="h-full p-3">
              <h4 className="text-sm font-medium mb-2">Suggestions:</h4>
              <div
                className="prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: optimizationSuggestions.replace(/\n/g, '<br />') }} 
              />
            </ScrollArea>
          </div>
        )}
         {!optimizationSuggestions && !isLoading && (
          <div className="flex-1 flex flex-col items-center justify-center text-center text-sm text-muted-foreground p-4 border rounded-md">
            <Wand2 className="h-8 w-8 mb-2 opacity-50" />
            <p>Click "Suggest Optimizations" to get AI-powered feedback on your XML layout.</p>
          </div>
        )}
        {isLoading && (
           <div className="flex-1 flex flex-col items-center justify-center text-center text-sm text-muted-foreground p-4 border rounded-md">
            <Loader2 className="h-8 w-8 mb-2 animate-spin text-primary" />
            <p>Analyzing layout...</p>
          </div>
        )}
      </div>
    </PanelWrapper>
  );
}
