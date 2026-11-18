import React, { useState, useActionState, useOptimistic, useTransition } from 'react';
import { AngularVsReactCard } from '@/shared/components/AngularVsReactCard';

interface Comment { id: number; text: string; author: string; optimistic?: boolean; }

const initial: Comment[] = [
  { id: 1, text: 'Great tutorial!', author: 'Alice' },
  { id: 2, text: 'Loving the Angular vs React comparisons.', author: 'Bob' },
];

export function React19ActionsUseActionState() {
  const [comments, setComments] = useState<Comment[]>(initial);
  const [, startTransition] = useTransition();
  const [optimisticComments, addOptimistic] = useOptimistic(
    comments,
    (state: Comment[], text: string) => [...state, { id: Date.now(), text, author: 'You', optimistic: true }]
  );

  const [state, formAction, isPending] = useActionState(
    async (_prev: { error: string | null }, formData: FormData) => {
      const text = formData.get('comment') as string;
      if (!text?.trim()) return { error: 'Comment cannot be empty.' };
      startTransition(() => addOptimistic(text));
      await new Promise(r => setTimeout(r, 800));
      if (Math.random() < 0.15) return { error: 'Server error — try again.' };
      setComments(c => [...c, { id: Date.now(), text, author: 'You' }]);
      return { error: null };
    },
    { error: null }
  );

  return (
    <div className="chapter-container">
      <h1 className="section-header">React 19 Actions: useActionState & useOptimistic</h1>
      <p className="section-subheader">React 19 native form Actions replace manual isLoading/error state. useOptimistic provides immediate UI feedback with automatic rollback.</p>

      <AngularVsReactCard
        concept="Async Form Submit vs React 19 Actions"
        angularCode={`@Component({ template: \`
  <form (ngSubmit)="onSubmit()">
    <textarea [(ngModel)]="text"></textarea>
    <button [disabled]="isLoading">
      {{ isLoading ? 'Posting...' : 'Post' }}
    </button>
    <p *ngIf="error">{{ error }}</p>
  </form>
\` })
export class CommentsComponent {
  isLoading = false;
  error: string | null = null;
  text = '';

  async onSubmit() {
    this.isLoading = true;
    this.error = null;
    try {
      await this.commentService.post(this.text);
    } catch (e) {
      this.error = 'Failed to post.';
    } finally {
      this.isLoading = false;
    }
  }
}`}
        reactCode={`// React 19: no manual isLoading/error state!
const [state, formAction, isPending] =
  useActionState(async (prev, formData) => {
    const text = formData.get('comment');
    try {
      await api.post(text);
      return { error: null };
    } catch {
      return { error: 'Failed to post.' };
    }
  }, { error: null });

// useOptimistic: instant UI before server responds
const [optimistic, addOptimistic] = useOptimistic(
  comments,
  (state, text) => [...state, { text, optimistic: true }]
);

return (
  <form action={formAction}>  // native form action!
    <textarea name="comment" />
    {state.error && <p>{state.error}</p>}
    <button disabled={isPending}>Post</button>
  </form>
);`}
        rationale="React 19 Actions are async functions passed to form's action prop — the browser's native form API now works with async JS. useActionState manages pending/error automatically. useOptimistic shows immediate feedback with rollback on failure. Eliminates isLoading/error useState boilerplate."
        defaultExpanded={true}
      />

      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-white">🎮 Live: useActionState + useOptimistic</h2>
        <div className="space-y-2">
          {optimisticComments.map(c => (
            <div key={c.id} className={`bg-slate-900 rounded-lg p-3 flex gap-3 transition-opacity ${c.optimistic ? 'opacity-50' : 'opacity-100'}`}>
              <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">{c.author[0]}</div>
              <div><p className="text-xs text-slate-400">{c.author}{c.optimistic && <span className="text-amber-400 ml-1">(sending...)</span>}</p><p className="text-sm text-slate-200">{c.text}</p></div>
            </div>
          ))}
        </div>
        <form action={formAction} className="space-y-2">
          <textarea name="comment" rows={2} placeholder="Write a comment..." className="input-field resize-none" />
          {state.error && <p className="error-text">⚠️ {state.error}</p>}
          <button type="submit" disabled={isPending} className="btn-primary w-full">{isPending ? '⏳ Posting...' : '💬 Post Comment'}</button>
        </form>
      </div>
    </div>
  );
}
