import React, { useState, useReducer } from 'react';
import { AngularVsReactCard } from '@/shared/components/AngularVsReactCard';

type CounterAction = { type: 'inc' } | { type: 'dec' } | { type: 'reset' };
function counterReducer(state: number, action: CounterAction): number {
  switch (action.type) {
    case 'inc': return state + 1;
    case 'dec': return Math.max(0, state - 1);
    case 'reset': return 0;
  }
}

interface TodoItem { id: number; text: string; done: boolean; }

export function StateVsComponentFields() {
  const [count, dispatch] = useReducer(counterReducer, 0);
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, text: 'Learn React hooks', done: true },
    { id: 2, text: 'Understand useState semantics', done: false },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos(p => [...p, { id: Date.now(), text: newTodo.trim(), done: false }]);
    setNewTodo('');
  };

  return (
    <div className="chapter-container">
      <h1 className="section-header">State vs Mutable Class Fields</h1>
      <p className="section-subheader">Angular components use mutable class fields + Zone.js. React uses immutable state — mutation never triggers UI updates.</p>

      <AngularVsReactCard
        concept="Mutable Fields vs Immutable useState"
        angularCode={`@Component({ template: \`
  <p>{{ count }}</p>
  <button (click)="increment()">+</button>
\` })
export class CounterComponent {
  count = 0;
  increment() { this.count++; } // Zone.js detects mutation

  // Angular 17+: signals
  count = signal(0);
  increment() { this.count.update(v => v + 1); }
}`}
        reactCode={`function Counter() {
  const [count, setCount] = useState(0);

  // ✅ CORRECT: new value via setter
  const increment = () => setCount(prev => prev + 1);

  // ❌ WRONG: count++ — React won't re-render
  return <button onClick={increment}>{count}</button>;
}

// useReducer for complex transitions
const [count, dispatch] = useReducer(reducer, 0);
dispatch({ type: 'increment' });`}
        rationale="Angular's Zone.js monkey-patches browser APIs to detect mutations. React requires explicit setter calls — state is immutable, so React can compare old vs new via Object.is cheaply. useReducer is React's equivalent of a BehaviorSubject + reducer pattern."
        defaultExpanded={true}
      />

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5 space-y-4">
          <h2 className="text-sm font-semibold text-white">Counter with useReducer</h2>
          <div className="flex items-center gap-4">
            <button onClick={() => dispatch({ type: 'dec' })} className="btn-secondary w-10 h-10 flex items-center justify-center text-xl">−</button>
            <span className="text-4xl font-bold text-white w-16 text-center">{count}</span>
            <button onClick={() => dispatch({ type: 'inc' })} className="btn-primary w-10 h-10 flex items-center justify-center text-xl">+</button>
          </div>
          <button onClick={() => dispatch({ type: 'reset' })} className="btn-secondary text-sm w-full">Reset</button>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5 space-y-3">
          <h2 className="text-sm font-semibold text-white">Immutable Todo List</h2>
          <div className="flex gap-2">
            <input value={newTodo} onChange={e => setNewTodo(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTodo()} placeholder="New todo..." className="input-field flex-1" />
            <button onClick={addTodo} className="btn-primary">Add</button>
          </div>
          <ul className="space-y-1">
            {todos.map(t => (
              <li key={t.id} className="flex items-center gap-2 bg-slate-900 rounded px-3 py-2">
                <input type="checkbox" checked={t.done} onChange={() => setTodos(p => p.map(x => x.id === t.id ? { ...x, done: !x.done } : x))} className="accent-indigo-500" />
                <span className={`flex-1 text-sm ${t.done ? 'line-through text-slate-500' : 'text-slate-200'}`}>{t.text}</span>
                <button onClick={() => setTodos(p => p.filter(x => x.id !== t.id))} className="text-red-400 text-xs">✕</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
