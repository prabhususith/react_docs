import React, { useState, use, createContext } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { AngularVsReactCard } from '@/shared/components/AngularVsReactCard';

interface AccCtx { openId: string | null; toggle: (id: string) => void; }
const AccordionContext = createContext<AccCtx | null>(null);

function Accordion({ children, defaultOpen }: { children: React.ReactNode; defaultOpen?: string }) {
  const [openId, setOpenId] = useState<string | null>(defaultOpen ?? null);
  const toggle = (id: string) => setOpenId(c => c === id ? null : id);
  return <AccordionContext value={{ openId, toggle }}><div className="space-y-1">{children}</div></AccordionContext>;
}

function AccordionItem({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  const { openId, toggle } = use(AccordionContext)!;
  const open = openId === id;
  return (
    <div className="border border-slate-700 rounded-lg overflow-hidden">
      <button onClick={() => toggle(id)} className="w-full flex items-center justify-between px-4 py-3 bg-slate-800 hover:bg-slate-700 text-sm font-medium text-white">
        {title}{open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && <div className="px-4 py-3 text-sm text-slate-300 bg-slate-900">{children}</div>}
    </div>
  );
}
Accordion.Item = AccordionItem;

export function CompoundComponents() {
  return (
    <div className="chapter-container">
      <h1 className="section-header">Compound Components</h1>
      <p className="section-subheader">Angular uses ng-content with select for content projection. React uses Compound Components — child components share state via Context.</p>

      <AngularVsReactCard
        concept="ng-content vs Compound Components"
        angularCode={`@Component({ selector: 'app-accordion', template: \`
  <div class="accordion">
    <ng-content select="[accordion-item]" />
  </div>
\` })
export class AccordionComponent {}

@Component({ selector: 'app-accordion-item', template: \`
  <div [class.open]="isOpen">
    <button (click)="toggle()">{{ title }}</button>
    <ng-content />
  </div>
\` })
export class AccordionItemComponent {
  @Input() title = '';
  isOpen = false;
  toggle() { this.isOpen = !this.isOpen; }
}`}
        reactCode={`const AccordionContext = createContext<AccCtx | null>(null);

function Accordion({ children, defaultOpen }) {
  const [openId, setOpenId] = useState(defaultOpen ?? null);
  const toggle = id => setOpenId(cur => cur === id ? null : id);
  return (
    // React 19: <Context value={...}>
    <AccordionContext value={{ openId, toggle }}>
      {children}
    </AccordionContext>
  );
}

function AccordionItem({ id, title, children }) {
  const { openId, toggle } = use(AccordionContext)!;
  return (
    <div>
      <button onClick={() => toggle(id)}>{title}</button>
      {openId === id && <div>{children}</div>}
    </div>
  );
}
Accordion.Item = AccordionItem; // namespaced API`}
        rationale="Angular's ng-content is compile-time slot projection using TemplateRef. React's Compound Component pattern uses Context for implicit state sharing — parent owns state; children read Context without explicit prop drilling. Enables natural DOM-like API where usage reads like HTML while complex behavior is encapsulated."
        defaultExpanded={true}
      />

      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5">
        <h2 className="text-sm font-semibold text-white mb-3">🎮 Accordion Compound Component</h2>
        <Accordion defaultOpen="a1">
          <Accordion.Item id="a1" title="What is React 19?">React 19 introduces Actions, useActionState, useOptimistic, the use() hook, and the React Compiler for automatic memoization.</Accordion.Item>
          <Accordion.Item id="a2" title="How does Compound Component pattern work?">The parent owns shared state via Context. Children consume it without explicit props — enabling clean declarative APIs.</Accordion.Item>
          <Accordion.Item id="a3" title="When to use Compound vs Render Props?">Use Compound Components when children need shared state. Use Render Props when the parent needs to control what the child renders.</Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}
