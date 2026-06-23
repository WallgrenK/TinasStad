import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Sparkles, Lock, Mail, ArrowRight, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "#/lib/utils";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Logga in · Admin · Tinas Städ" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false);

    if (error) {
      setError("Fel e-post eller lösenord");
      return
    }
    // TODO: Navigate immediately after Supabase confirms the session and show role/permission errors from the admin guard.
    setTimeout(() => {
      setLoading(false);
      navigate({ to: "/admin"});
    }, 700);
  }

  return (
    <div className="admin-scope min-h-screen bg-[var(--color-admin-surface)]">
      <div className="flex min-h-screen">
        {/* Left brand panel */}
        <aside className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-[var(--color-admin-text)] p-12 text-white lg:flex">
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15), transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.08), transparent 50%)",
            }}
          />
          <div className="relative">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white">
              <Sparkles className="h-4 w-4" />
              Tinas Städ
            </Link>
          </div>
          <div className="relative space-y-6">
            <p className="text-white/70 text-4xl font-semibold leading-tight tracking-tight">
              Välkommen tillbaka.
            </p>
            <p className="max-w-md text-base text-white/70">
              Logga in för att hantera bokningar, kunder, scheman och allt annat som håller verksamheten i rörelse.
            </p>
            <div className="grid max-w-md grid-cols-3 gap-4 pt-4">
              <Stat label="Bokningar idag" value="14" />
              <Stat label="Aktiv personal" value="5" />
              <Stat label="Öppna leads" value="9" />
            </div>
          </div>
          <p className="relative text-xs text-white/50">© {new Date().getFullYear()} Tinas Städ AB</p>
        </aside>

        {/* Right form */}
        <main className="flex flex-1 items-center justify-center px-6 py-12">
          <div className="w-full max-w-sm">
            <div className="mb-8 lg:hidden">
              <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-admin-text)]">
                <Sparkles className="h-4 w-4" />
                Tinas Städ
              </Link>
            </div>

            <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-admin-text)]">Logga in på admin</h2>
            <p className="mt-1.5 text-sm text-[var(--color-admin-muted)]">
              Använd ditt arbetskonto för att fortsätta.
            </p>

            <form onSubmit={handleLogin} className="mt-8 space-y-5">
              <Field label="E-post" htmlFor="email" icon={<Mail className="h-4 w-4" />}>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                  placeholder="namn@tinasstad.se"
                />
              </Field>

              <Field label="Lösenord" htmlFor="password" icon={<Lock className="h-4 w-4" />}>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9"
                  placeholder="••••••••"
                />
              </Field>

              <div className="flex items-center justify-between text-sm">
                <label className="flex cursor-pointer items-center gap-2 text-[var(--color-admin-muted)]">
                  {/* TODO: Decide whether "Kom ihåg mig" should affect Supabase session persistence or remove this control. */}
                  <Checkbox checked={remember} onCheckedChange={(v) => setRemember(Boolean(v))} />
                  Kom ihåg mig
                </label>
                {/* TODO: Implement Supabase password reset flow with redirect URL back to admin login. */}
                <button type="button" className="text-[var(--color-admin-text)] hover:underline">
                  Glömt lösenord?
                </button>
              </div>

              {error && (
                <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>
              )}

              <Button type="submit" disabled={loading} className="h-10 w-full">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Logga in <ArrowRight className="ml-1 h-4 w-4" /></>}
              </Button>
            </form>

            <p className="mt-8 text-center text-xs text-[var(--color-admin-muted)]">
              Är du städare?{" "}
              <Link to="/staff/login" className="font-medium text-[var(--color-admin-text)] hover:underline">
                Logga in här
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 backdrop-blur">
      <div className="text-xl font-semibold">{value}</div>
      <div className="mt-0.5 text-[11px] uppercase tracking-wide text-white/60">{label}</div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  icon,
  children,
}: {
  label: string;
  htmlFor: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-[var(--color-admin-text)]">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-[var(--color-admin-muted)]">
          {icon}
        </span>
        {children}
      </div>
    </div>
  );
}
