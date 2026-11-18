import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AngularVsReactCard } from '@/shared/components/AngularVsReactCard';

const schema = z.object({
  name: z.string().min(2, 'Min 2 chars'),
  email: z.string().email('Invalid email'),
  role: z.enum(['Admin', 'Manager', 'Developer'], { errorMap: () => ({ message: 'Select a role' }) }),
  age: z.number({ invalid_type_error: 'Must be a number' }).int().min(18, 'Must be 18+').max(100),
});
type FormValues = z.infer<typeof schema>;

export function ReactHookFormVsFormGroup() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const onSubmit = async (_data: FormValues) => { await new Promise(r => setTimeout(r, 800)); };

  return (
    <div className="chapter-container">
      <h1 className="section-header">React Hook Form vs FormGroup</h1>
      <p className="section-subheader">Angular uses FormGroup/FormControl (Reactive Forms). React Hook Form uses uncontrolled inputs for performance with Zod for validation.</p>

      <AngularVsReactCard
        concept="Reactive Forms vs React Hook Form"
        angularCode={`@Component({ template: \`
  <form [formGroup]="form" (ngSubmit)="onSubmit()">
    <input formControlName="name" />
    <div *ngIf="f['name'].invalid && f['name'].touched">
      {{ f['name'].errors?.['minlength']?.message }}
    </div>
    <button [disabled]="form.invalid">Submit</button>
  </form>
\` })
export class UserForm implements OnInit {
  form!: FormGroup;
  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('', Validators.required),
    });
  }
  get f() { return this.form.controls; }
}`}
        reactCode={`const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.enum(['Admin','Manager','Developer']),
  age: z.number().int().min(18),
});

function UserForm() {
  const { register, handleSubmit, formState: { errors } }
    = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
      });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <p>{errors.name.message}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}`}
        rationale="Angular Reactive Forms use an explicit FormGroup tree with RxJS-based validators. React Hook Form registers inputs via {...register('field')} spread, using uncontrolled DOM inputs — 5x faster for large forms. Zod infers TypeScript types from the validation schema automatically."
        defaultExpanded={true}
      />

      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5">
        {isSubmitSuccessful ? (
          <div className="text-center space-y-3 py-4">
            <div className="text-4xl">✅</div>
            <p className="text-emerald-400">Submitted!</p>
            <button onClick={() => reset()} className="btn-secondary text-sm">Reset</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="text-sm font-semibold text-white">🎮 Live Form</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div><label className="label-text">Name</label><input {...register('name')} placeholder="Alice" className="input-field" />{errors.name && <p className="error-text">{errors.name.message}</p>}</div>
              <div><label className="label-text">Email</label><input {...register('email')} type="email" placeholder="alice@example.com" className="input-field" />{errors.email && <p className="error-text">{errors.email.message}</p>}</div>
              <div><label className="label-text">Role</label><select {...register('role')} className="input-field"><option value="">Select...</option><option>Admin</option><option>Manager</option><option>Developer</option></select>{errors.role && <p className="error-text">{errors.role.message}</p>}</div>
              <div><label className="label-text">Age</label><input {...register('age', { valueAsNumber: true })} type="number" placeholder="25" className="input-field" />{errors.age && <p className="error-text">{errors.age.message}</p>}</div>
            </div>
            <button type="submit" disabled={isSubmitting} className="btn-primary w-full">{isSubmitting ? '⏳ Submitting...' : 'Submit'}</button>
          </form>
        )}
      </div>
    </div>
  );
}
