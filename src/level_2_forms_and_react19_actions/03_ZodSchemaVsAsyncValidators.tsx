import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AngularVsReactCard } from '@/shared/components/AngularVsReactCard';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Min 8 chars').regex(/[A-Z]/, 'Needs uppercase').regex(/[0-9]/, 'Needs number').regex(/[^A-Za-z0-9]/, 'Needs special char'),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, { message: 'Passwords must match', path: ['confirmPassword'] });

type Values = z.infer<typeof schema>;

export function ZodSchemaVsAsyncValidators() {
  const [result, setResult] = useState<string | null>(null);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Values>({ resolver: zodResolver(schema), mode: 'onChange' });
  const pw = watch('password', '');
  const checks = [
    { label: '8+ chars', ok: pw.length >= 8 },
    { label: 'Uppercase', ok: /[A-Z]/.test(pw) },
    { label: 'Number', ok: /[0-9]/.test(pw) },
    { label: 'Special char', ok: /[^A-Za-z0-9]/.test(pw) },
  ];

  return (
    <div className="chapter-container">
      <h1 className="section-header">Zod Schema vs Angular Validators</h1>
      <p className="section-subheader">Angular uses ValidatorFn / AsyncValidatorFn. Zod provides a single schema for both runtime validation and TypeScript type inference.</p>

      <AngularVsReactCard
        concept="Custom Validators vs Zod Schema"
        angularCode={`// Angular custom validator
export function passwordStrengthValidator(): ValidatorFn {
  return (control) => {
    const v = control.value as string;
    if (!v) return null;
    return /[A-Z]/.test(v) && /[0-9]/.test(v)
      ? null : { passwordStrength: true };
  };
}

// Async validator (Observable-based)
export function emailExistsValidator(svc: UserService): AsyncValidatorFn {
  return (control) => svc.checkEmail(control.value).pipe(
    map(exists => exists ? { emailTaken: true } : null)
  );
}`}
        reactCode={`// Zod: schema-first — one source of truth
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
    .regex(/[A-Z]/, 'Needs uppercase')
    .regex(/[0-9]/, 'Needs number'),
  confirmPassword: z.string(),
}).refine(
  d => d.password === d.confirmPassword,
  { message: 'Must match', path: ['confirmPassword'] }
);

// TypeScript type is inferred automatically:
type Values = z.infer<typeof schema>;
// = { email: string; password: string; confirmPassword: string }`}
        rationale="Angular validators are functions returning ValidationErrors; async ones return Observables. Zod flips it: one schema gives both TypeScript types (z.infer) and runtime validation. .refine() handles cross-field rules. No more keeping validator logic and types in sync manually."
        defaultExpanded={true}
      />

      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-white">🎮 Live Zod Validation</h2>
        <form onSubmit={handleSubmit(d => setResult(JSON.stringify(d, null, 2)))} className="space-y-4">
          <div><label className="label-text">Email</label><input {...register('email')} type="email" placeholder="user@example.com" className="input-field" />{errors.email && <p className="error-text">{errors.email.message}</p>}</div>
          <div>
            <label className="label-text">Password</label>
            <input {...register('password')} type="password" placeholder="••••••••" className="input-field" />
            <div className="mt-2 grid grid-cols-2 gap-1">
              {checks.map(c => (
                <div key={c.label} className={`flex items-center gap-1 text-xs ${c.ok ? 'text-emerald-400' : 'text-slate-500'}`}>
                  <span>{c.ok ? '✓' : '○'}</span><span>{c.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div><label className="label-text">Confirm Password</label><input {...register('confirmPassword')} type="password" placeholder="••••••••" className="input-field" />{errors.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>}</div>
          <button type="submit" className="btn-primary w-full">Validate</button>
        </form>
        {result && <pre className="bg-slate-900 rounded p-3 text-xs text-emerald-400 font-mono">{result}</pre>}
      </div>
    </div>
  );
}
