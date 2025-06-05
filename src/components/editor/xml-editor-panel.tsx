'use client';

import { PanelWrapper } from '@/components/panels/panel-wrapper';
import { Textarea } from '@/components/ui/textarea';
import { Code2 } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

interface XmlEditorPanelProps {
  xmlCode: string;
  setXmlCode: Dispatch<SetStateAction<string>>;
}

export function XmlEditorPanel({ xmlCode, setXmlCode }: XmlEditorPanelProps) {
  return (
    <PanelWrapper title="XML Code Editor" icon={Code2} className="flex-1" contentClassName="p-0 flex flex-col">
      <Textarea
        value={xmlCode}
        onChange={(e) => setXmlCode(e.target.value)}
        className="font-code flex-1 w-full h-full p-4 text-sm rounded-none border-0 focus-visible:ring-0 resize-none"
        placeholder="Enter Android XML layout code here..."
        spellCheck="false"
      />
      <div className="p-2 border-t bg-background text-xs text-muted-foreground">
        <strong>Note:</strong> In a native Android application, this area would integrate{' '}
        <a href="https://github.com/Rosemoe/sora-editor" target="_blank" rel="noopener noreferrer" className="underline text-primary hover:text-primary/80">
          io.github.Rosemoe.sora-editor
        </a>{' '}
        for advanced syntax highlighting and code editing features.
      </div>
    </PanelWrapper>
  );
}
