import React from 'react';

function renderInline(text) {
  if (!text) return null;
  // Regex to match **bold**, *italic*, `code`
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', val: text.substring(lastIndex, match.index) });
    }
    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push({ type: 'bold', val: token.slice(2, -2) });
    } else if (token.startsWith('*') && token.endsWith('*')) {
      parts.push({ type: 'italic', val: token.slice(1, -1) });
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push({ type: 'code', val: token.slice(1, -1) });
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push({ type: 'text', val: text.substring(lastIndex) });
  }

  return parts.map((p, idx) => {
    if (p.type === 'bold') {
      return (
        <strong key={idx} className="font-bold text-[#07205b]">
          {p.val}
        </strong>
      );
    }
    if (p.type === 'italic') {
      return (
        <em key={idx} className="italic text-[#374151]">
          {p.val}
        </em>
      );
    }
    if (p.type === 'code') {
      return (
        <code key={idx} className="bg-[#f0f4ff] text-[#07205b] px-1 py-0.5 text-[11px] font-mono border border-[#d0deff]">
          {p.val}
        </code>
      );
    }
    // Clean any orphaned markdown characters in normal text if needed
    return <span key={idx}>{p.val}</span>;
  });
}

export default function MarkdownMessage({ content }) {
  if (!content) return null;

  const lines = content.split('\n');
  const elements = [];
  let isPrevSpacer = false;

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      if (!isPrevSpacer && elements.length > 0) {
        elements.push(<div key={`spacer-${index}`} className="h-1.5" />);
        isPrevSpacer = true;
      }
      return;
    }
    isPrevSpacer = false;

    // Header: ###, ##, #
    const hMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (hMatch) {
      const headerText = hMatch[2];
      elements.push(
        <div
          key={`h-${index}`}
          className="font-serif font-bold text-xs text-[#07205b] pt-2 pb-0.5 border-b border-[#ededed] my-1.5 tracking-tight flex items-center gap-1.5"
        >
          {headerText}
        </div>
      );
      return;
    }

    // Bullet point: * item, - item, • item
    const bulletMatch = trimmed.match(/^[\*\-•]\s+(.+)$/);
    if (bulletMatch) {
      elements.push(
        <div key={`b-${index}`} className="flex items-start gap-2 my-1 text-xs text-[#282828] leading-relaxed pl-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#07205b] mt-1.5 shrink-0 opacity-80" />
          <div className="flex-1">{renderInline(bulletMatch[1])}</div>
        </div>
      );
      return;
    }

    // Numbered list: 1. item, 2. item
    const numMatch = trimmed.match(/^(\d+)[\.\)]\s+(.+)$/);
    if (numMatch) {
      elements.push(
        <div key={`n-${index}`} className="flex items-start gap-1.5 my-1 text-xs text-[#282828] leading-relaxed pl-1">
          <span className="font-bold text-[#07205b] text-[11px] shrink-0 min-w-[14px]">{numMatch[1]}.</span>
          <div className="flex-1">{renderInline(numMatch[2])}</div>
        </div>
      );
      return;
    }

    // Regular paragraph
    elements.push(
      <p key={`p-${index}`} className="text-xs text-[#282828] leading-relaxed my-0.5">
        {renderInline(trimmed)}
      </p>
    );
  });

  return <div className="space-y-0.5">{elements}</div>;
}
