import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2 } from 'lucide-react';
import { AngularVsReactCard } from '@/shared/components/AngularVsReactCard';

const schema = z.object({
  teamName: z.string().min(1, 'Required'),
  members: z.array(z.object({
    name: z.string().min(1, 'Required'),
    email: z.string().email('Invalid email'),
    role: z.enum(['Lead', 'Developer', 'Designer', 'QA']),
  })).min(1),
});
type Values = z.infer<typeof schema>;

export function DynamicFormArrays() {
  const { register, control, handleSubmit, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { teamName: 'Frontend Crew', members: [{ name: '', email: '', role: 'Developer' }] },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'members' });

  return (
    <div className="chapter-container">
      <h1 className="section-header">Dynamic Form Arrays</h1>
      <p className="section-subheader">Angular uses FormArray for dynamic list fields. React Hook Form provides useFieldArray with the same operations.</p>

      <AngularVsReactCard
        concept="FormArray vs useFieldArray"
        angularCode={`// Angular: FormArray
get members() { return this.form.get('members') as FormArray; }
addMember() { this.members.push(this.fb.group({ name: [''], email: [''] })); }
removeMember(i: number) { this.members.removeAt(i); }

// Template
<div formArrayName="members">
  <div *ngFor="let m of members.controls; let i=index" [formGroupName]="i">
    <input formControlName="name" />
    <button (click)="removeMember(i)">Remove</button>
  </div>
</div>`}
        reactCode={`const { fields, append, remove } = useFieldArray({
  control,
  name: 'members',
});

// JSX — field.id is stable (not index!)
{fields.map((field, index) => (
  <div key={field.id}>
    <input {...register(\`members.\${index}.name\`)} />
    <button onClick={() => remove(index)}>Remove</button>
  </div>
))}
<button onClick={() => append({ name: '', email: '', role: 'Developer' })}>
  Add Member
</button>`}
        rationale="Angular's FormArray manages AbstractControl instances. useFieldArray provides append, remove, swap, insert — same operations, but with stable field.id keys for React reconciliation instead of array indices."
        defaultExpanded={true}
      />

      <form onSubmit={handleSubmit(d => alert(JSON.stringify(d, null, 2)))} className="space-y-4">
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5 space-y-4">
          <h2 className="text-sm font-semibold text-white">🎮 Live useFieldArray</h2>
          <div><label className="label-text">Team Name</label><input {...register('teamName')} className="input-field max-w-xs" />{errors.teamName && <p className="error-text">{errors.teamName.message}</p>}</div>
          <div className="space-y-3">
            {fields.map((field, i) => (
              <div key={field.id} className="bg-slate-900 rounded-lg p-3 grid md:grid-cols-3 gap-3 items-end">
                <div><label className="label-text text-xs">Name</label><input {...register(`members.${i}.name`)} placeholder="Name" className="input-field" />{errors.members?.[i]?.name && <p className="error-text">{errors.members[i]?.name?.message}</p>}</div>
                <div><label className="label-text text-xs">Email</label><input {...register(`members.${i}.email`)} type="email" placeholder="email@co.com" className="input-field" />{errors.members?.[i]?.email && <p className="error-text">{errors.members[i]?.email?.message}</p>}</div>
                <div className="flex gap-2">
                  <div className="flex-1"><label className="label-text text-xs">Role</label><select {...register(`members.${i}.role`)} className="input-field"><option>Lead</option><option>Developer</option><option>Designer</option><option>QA</option></select></div>
                  {fields.length > 1 && <button type="button" onClick={() => remove(i)} className="btn-danger p-2 mt-5"><Trash2 size={14} /></button>}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => append({ name: '', email: '', role: 'Developer' })} className="btn-secondary text-sm flex items-center gap-1"><Plus size={14} /> Add Member</button>
            <button type="submit" className="btn-primary text-sm">Submit Team</button>
          </div>
        </div>
      </form>
    </div>
  );
}
