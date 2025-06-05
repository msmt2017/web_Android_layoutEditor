
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
    <PanelWrapper title="Layout Optimization AI" icon={Wand2} className="h-full">
      <div className="flex flex-col h-full space-y-4">
        <div>
          <Label htmlFor="user-coding-style" className="text-sm font-medium">User Coding Style (Optional)</Label>
          <p className="text-xs text-muted-foreground mb-1">Describe your preferences (e.g., "Prefer ConstraintLayout", "Avoid deep nesting", "Use data binding").</p>
          <Textarea
            id="user-coding-style"
            value={userCodingStyle}
            onChange={(e) => setUserCodingStyle(e.target.value)}
            placeholder="e.g., Prefers ConstraintLayout, avoids deep nesting..."
            className="mt-1 h-24 text-sm font-code bg-card focus:border-primary"
            disabled={isLoading}
          />
        </div>
        <Button onClick={onOptimize} disabled={isLoading || !xmlCode.trim()} className="w-full py-3 text-base">
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-5 w-5" />
          )}
          Suggest Optimizations
        </Button>
        
        <div className="flex-1 min-h-0 border rounded-md bg-card overflow-hidden">
          {isLoading && (
             <div className="flex flex-col items-center justify-center h-full text-center text-sm text-muted-foreground p-4">
              <Loader2 className="h-10 w-10 mb-3 animate-spin text-primary" />
              <p className="font-medium">Analyzing your layout...</p>
              <p className="text-xs">This might take a few moments.</p>
            </div>
          )}
          {!isLoading && optimizationSuggestions && (
            <ScrollArea className="h-full p-4">
              <h4 className="text-base font-semibold mb-2 text-foreground">AI Suggestions:</h4>
              <div
                className="prose prose-sm dark:prose-invert max-w-none marker:text-primary [&_code]:bg-muted [&_code]:p-0.5 [&_code]:rounded-sm [&_strong]:text-foreground"
                dangerouslySetInnerHTML={{ __html: optimizationSuggestions.replace(/\n/g, '<br />') }} 
              />
            </ScrollArea>
          )}
           {!isLoading && !optimizationSuggestions && (
            <div className="flex flex-col items-center justify-center h-full text-center text-sm text-muted-foreground p-6">
              <Wand2 className="h-12 w-12 mb-3 opacity-40" />
              <p className="font-medium">Ready for Optimization</p>
              <p className="text-xs">
                Edit your XML code, optionally describe your coding style, then click "Suggest Optimizations" to get AI-powered feedback.
              </p>
            </div>
          )}
        </div>
      </div>
    </PanelWrapper>
  );
}
