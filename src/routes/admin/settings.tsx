import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  Building2,
  Search,
  Plug,
  Bell,
  Users as UsersIcon,
  ShieldCheck,
  Clock,
  Mail,
  Phone,
  MapPin,
  Globe,
  Check,
  Copy,
  KeyRound,
  Trash2,
  Plus,
} from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [
      { title: "Inställningar · Admin · Tinas Städ" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SettingsPage,
});

const WEEKDAYS = [
  { key: "mon", label: "Måndag" },
  { key: "tue", label: "Tisdag" },
  { key: "wed", label: "Onsdag" },
  { key: "thu", label: "Torsdag" },
  { key: "fri", label: "Fredag" },
  { key: "sat", label: "Lördag" },
  { key: "sun", label: "Söndag" },
];

const INITIAL_HOURS: Record<string, { open: string; close: string; closed: boolean }> = {
  mon: { open: "08:00", close: "17:00", closed: false },
  tue: { open: "08:00", close: "17:00", closed: false },
  wed: { open: "08:00", close: "17:00", closed: false },
  thu: { open: "08:00", close: "17:00", closed: false },
  fri: { open: "08:00", close: "16:00", closed: false },
  sat: { open: "10:00", close: "14:00", closed: false },
  sun: { open: "10:00", close: "14:00", closed: true },
};

const TEAM = [
  { name: "Tina Karlsson", email: "tina@tinasstad.se", role: "Ägare", initials: "TK" },
  { name: "Marcus Lindahl", email: "marcus@tinasstad.se", role: "Administratör", initials: "ML" },
  { name: "Sara Bergman", email: "sara@tinasstad.se", role: "Personal", initials: "SB" },
];

const INTEGRATIONS = [
  {
    name: "Lovable Cloud",
    description: "Databas, autentisering och lagring för admin-panelen.",
    status: "not_connected" as const,
    icon: ShieldCheck,
  },
  {
    name: "Google Analytics 4",
    description: "Mät besök och konvertering på den publika webbplatsen.",
    status: "connected" as const,
    detail: "G-XXXX-TINAS",
    icon: Globe,
  },
  {
    name: "Google Search Console",
    description: "Övervaka indexering och söktrafik.",
    status: "connected" as const,
    detail: "tinasstad.se",
    icon: Search,
  },
  {
    name: "E-postutskick (Resend)",
    description: "Skicka offerter och bekräftelser till kunder.",
    status: "not_connected" as const,
    icon: Mail,
  },
];

function SettingsPage() {
  const [company, setCompany] = useState({
    name: "Tinas Städ AB",
    orgNr: "559123-4567",
    email: "kontakt@tinasstad.se",
    phone: "+46 70 123 45 67",
    address: "Storgatan 12",
    zip: "597 30",
    city: "Åtvidaberg",
    website: "https://tinasstad.se",
  });
  const [hours, setHours] = useState(INITIAL_HOURS);
  const [seo, setSeo] = useState({
    title: "Tinas Städ — Hem- och flyttstädning i Åtvidaberg",
    description:
      "Pålitlig städfirma i Åtvidaberg och Linköping. Hemstädning, flyttstädning och fönsterputs med RUT-avdrag.",
    ogImage: "/og-tinas.jpg",
  });
  const [notifications, setNotifications] = useState({
    newLead: true,
    newBooking: true,
    cancellation: true,
    weekly: false,
    review: true,
  });
  const [dirty, setDirty] = useState(false);

  const markDirty = () => setDirty(true);
  const save = () => {
    setDirty(false);
    toast.success("Ändringar sparade", { description: "Mock-data — backend kopplas i nästa iteration." });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inställningar"
        description="Företagsuppgifter, SEO, integrationer och team."
        actions={
          <>
            {dirty && (
              <span className="text-xs text-amber-700 hidden sm:inline">Ändringar har inte sparats</span>
            )}
            <Button onClick={save} disabled={!dirty} className="h-9">
              Spara ändringar
            </Button>
          </>
        }
      />

      <Tabs defaultValue="company" className="w-full">
        <TabsList className="bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border)] h-auto p-1 flex flex-wrap">
          <TabsTrigger value="company" className="gap-2"><Building2 className="h-4 w-4" />Företag</TabsTrigger>
          <TabsTrigger value="hours" className="gap-2"><Clock className="h-4 w-4" />Öppettider</TabsTrigger>
          <TabsTrigger value="seo" className="gap-2"><Search className="h-4 w-4" />SEO</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2"><Bell className="h-4 w-4" />Notiser</TabsTrigger>
          <TabsTrigger value="integrations" className="gap-2"><Plug className="h-4 w-4" />Integrationer</TabsTrigger>
          <TabsTrigger value="team" className="gap-2"><UsersIcon className="h-4 w-4" />Team</TabsTrigger>
        </TabsList>

        {/* COMPANY */}
        <TabsContent value="company" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <SectionCard
              className="lg:col-span-2"
              title="Företagsuppgifter"
              description="Visas på fakturor, offerter och den publika webbplatsen."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Företagsnamn">
                  <Input value={company.name} onChange={(e) => { setCompany({ ...company, name: e.target.value }); markDirty(); }} />
                </Field>
                <Field label="Organisationsnummer">
                  <Input value={company.orgNr} onChange={(e) => { setCompany({ ...company, orgNr: e.target.value }); markDirty(); }} />
                </Field>
                <Field label="E-post" icon={Mail}>
                  <Input value={company.email} onChange={(e) => { setCompany({ ...company, email: e.target.value }); markDirty(); }} />
                </Field>
                <Field label="Telefon" icon={Phone}>
                  <Input value={company.phone} onChange={(e) => { setCompany({ ...company, phone: e.target.value }); markDirty(); }} />
                </Field>
                <Field label="Gatuadress" icon={MapPin} className="sm:col-span-2">
                  <Input value={company.address} onChange={(e) => { setCompany({ ...company, address: e.target.value }); markDirty(); }} />
                </Field>
                <Field label="Postnummer">
                  <Input value={company.zip} onChange={(e) => { setCompany({ ...company, zip: e.target.value }); markDirty(); }} />
                </Field>
                <Field label="Ort">
                  <Input value={company.city} onChange={(e) => { setCompany({ ...company, city: e.target.value }); markDirty(); }} />
                </Field>
                <Field label="Webbplats" icon={Globe} className="sm:col-span-2">
                  <Input value={company.website} onChange={(e) => { setCompany({ ...company, website: e.target.value }); markDirty(); }} />
                </Field>
              </div>
            </SectionCard>

            <SectionCard title="Förhandsvisning" description="Så här visas företaget i sidfoten.">
              <div className="rounded-lg border border-[var(--color-admin-border)] bg-[var(--color-admin-surface)] p-4 text-sm">
                <div className="font-semibold text-[var(--color-admin-text)]">{company.name}</div>
                <div className="mt-2 space-y-1 text-[var(--color-admin-muted)]">
                  <div className="flex items-start gap-2"><MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" /><span>{company.address}<br />{company.zip} {company.city}</span></div>
                  <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" />{company.phone}</div>
                  <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" />{company.email}</div>
                </div>
                <Separator className="my-3" />
                <div className="text-xs text-[var(--color-admin-muted)]">Org.nr {company.orgNr}</div>
              </div>
            </SectionCard>
          </div>
        </TabsContent>

        {/* HOURS */}
        <TabsContent value="hours" className="mt-6">
          <SectionCard title="Öppettider" description="När kunder kan nå er via telefon och e-post.">
            <div className="divide-y divide-[var(--color-admin-border)]">
              {WEEKDAYS.map((day) => {
                const h = hours[day.key];
                return (
                  <div key={day.key} className="grid grid-cols-1 sm:grid-cols-[140px_1fr_auto] items-center gap-3 py-3">
                    <div className="font-medium text-[var(--color-admin-text)] text-sm">{day.label}</div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="time"
                        value={h.open}
                        disabled={h.closed}
                        onChange={(e) => { setHours({ ...hours, [day.key]: { ...h, open: e.target.value } }); markDirty(); }}
                        className="w-28"
                      />
                      <span className="text-[var(--color-admin-muted)] text-sm">–</span>
                      <Input
                        type="time"
                        value={h.close}
                        disabled={h.closed}
                        onChange={(e) => { setHours({ ...hours, [day.key]: { ...h, close: e.target.value } }); markDirty(); }}
                        className="w-28"
                      />
                      {h.closed && <Badge variant="secondary" className="ml-2">Stängt</Badge>}
                    </div>
                    <label className="flex items-center gap-2 text-sm text-[var(--color-admin-muted)] justify-self-end">
                      <Switch
                        checked={!h.closed}
                        onCheckedChange={(checked) => { setHours({ ...hours, [day.key]: { ...h, closed: !checked } }); markDirty(); }}
                      />
                      <span>Öppet</span>
                    </label>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        </TabsContent>

        {/* SEO */}
        <TabsContent value="seo" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <SectionCard className="lg:col-span-2" title="Standardmetadata" description="Används som fallback för sidor utan egen metadata.">
              <div className="space-y-4">
                <Field label="Meta-titel" hint={`${seo.title.length}/60 tecken`}>
                  <Input value={seo.title} onChange={(e) => { setSeo({ ...seo, title: e.target.value }); markDirty(); }} maxLength={70} />
                </Field>
                <Field label="Meta-beskrivning" hint={`${seo.description.length}/160 tecken`}>
                  <Textarea
                    value={seo.description}
                    onChange={(e) => { setSeo({ ...seo, description: e.target.value }); markDirty(); }}
                    rows={3}
                    maxLength={180}
                  />
                </Field>
                <Field label="Open Graph-bild (URL)">
                  <Input value={seo.ogImage} onChange={(e) => { setSeo({ ...seo, ogImage: e.target.value }); markDirty(); }} />
                </Field>
              </div>
            </SectionCard>

            <SectionCard title="Google-förhandsvisning" description="Ungefärlig visning i sökresultat.">
              <div className="rounded-lg border border-[var(--color-admin-border)] bg-white p-4">
                <div className="text-xs text-[#202124]">tinasstad.se</div>
                <div className="text-[18px] leading-tight text-[#1a0dab] mt-1 line-clamp-2">{seo.title || "Sidans titel"}</div>
                <div className="text-sm text-[#4d5156] mt-1 line-clamp-3">{seo.description || "Sidans beskrivning visas här."}</div>
              </div>
            </SectionCard>
          </div>
        </TabsContent>

        {/* NOTIFICATIONS */}
        <TabsContent value="notifications" className="mt-6">
          <SectionCard title="E-postnotiser" description="Vad ska skickas till kontakt@tinasstad.se.">
            <div className="divide-y divide-[var(--color-admin-border)]">
              <ToggleRow
                title="Ny lead inkommen"
                description="När en kund skickar in en offertförfrågan eller kontaktformulär."
                checked={notifications.newLead}
                onChange={(v) => { setNotifications({ ...notifications, newLead: v }); markDirty(); }}
              />
              <ToggleRow
                title="Ny bokning"
                description="När en bokning skapas eller bekräftas."
                checked={notifications.newBooking}
                onChange={(v) => { setNotifications({ ...notifications, newBooking: v }); markDirty(); }}
              />
              <ToggleRow
                title="Avbokning"
                description="När en kund avbokar via webbplatsen."
                checked={notifications.cancellation}
                onChange={(v) => { setNotifications({ ...notifications, cancellation: v }); markDirty(); }}
              />
              <ToggleRow
                title="Nytt omdöme"
                description="När ett omdöme väntar på granskning."
                checked={notifications.review}
                onChange={(v) => { setNotifications({ ...notifications, review: v }); markDirty(); }}
              />
              <ToggleRow
                title="Veckosammanfattning"
                description="Sammanställning av leads, bokningar och omsättning varje måndag."
                checked={notifications.weekly}
                onChange={(v) => { setNotifications({ ...notifications, weekly: v }); markDirty(); }}
              />
            </div>
          </SectionCard>
        </TabsContent>

        {/* INTEGRATIONS */}
        <TabsContent value="integrations" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {INTEGRATIONS.map((it) => {
              const Icon = it.icon;
              const connected = it.status === "connected";
              return (
                <div
                  key={it.name}
                  className="rounded-xl border border-[var(--color-admin-border)] bg-white p-5 flex items-start gap-4"
                >
                  <div className="h-10 w-10 rounded-lg bg-[var(--color-admin-accent-soft)] flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-[var(--color-admin-accent)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="font-medium text-[var(--color-admin-text)]">{it.name}</div>
                      {connected ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5 text-xs font-medium">
                          <Check className="h-3 w-3" /> Ansluten
                        </span>
                      ) : (
                        <span className="rounded-full bg-zinc-100 text-zinc-600 px-2 py-0.5 text-xs font-medium">
                          Inte ansluten
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--color-admin-muted)] mt-1">{it.description}</p>
                    {connected && "detail" in it && it.detail && (
                      <div className="mt-2 flex items-center gap-2 text-xs text-[var(--color-admin-muted)]">
                        <KeyRound className="h-3 w-3" />
                        <code className="font-mono">{it.detail}</code>
                        <button
                          type="button"
                          onClick={() => toast.success("Kopierat")}
                          className="hover:text-[var(--color-admin-text)]"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                    <div className="mt-3">
                      <Button
                        variant={connected ? "outline" : "default"}
                        size="sm"
                        onClick={() => toast.info(connected ? "Hantera koppling" : "Kommer i nästa iteration")}
                      >
                        {connected ? "Hantera" : "Anslut"}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        {/* TEAM */}
        <TabsContent value="team" className="mt-6">
          <SectionCard
            title="Team"
            description="Personer med åtkomst till admin-panelen."
            action={
              <Button size="sm" onClick={() => toast.info("Kommer i nästa iteration")}>
                <Plus className="h-4 w-4 mr-1" /> Bjud in
              </Button>
            }
          >
            <div className="divide-y divide-[var(--color-admin-border)]">
              {TEAM.map((m) => (
                <div key={m.email} className="flex items-center gap-3 py-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-[var(--color-admin-accent-soft)] text-[var(--color-admin-accent)] text-xs font-medium">
                      {m.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[var(--color-admin-text)] truncate">{m.name}</div>
                    <div className="text-xs text-[var(--color-admin-muted)] truncate">{m.email}</div>
                  </div>
                  <Badge variant="secondary" className="hidden sm:inline-flex">{m.role}</Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-[var(--color-admin-muted)] hover:text-red-600"
                    onClick={() => toast.info("Kommer i nästa iteration")}
                    disabled={m.role === "Ägare"}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SectionCard({
  title,
  description,
  children,
  className = "",
  action,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <section className={`rounded-xl border border-[var(--color-admin-border)] bg-white p-5 sm:p-6 ${className}`}>
      <header className="flex items-start justify-between gap-3 mb-5">
        <div>
          <h2 className="text-base font-semibold text-[var(--color-admin-text)]">{title}</h2>
          {description && <p className="text-sm text-[var(--color-admin-muted)] mt-0.5">{description}</p>}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}

function Field({
  label,
  hint,
  icon: Icon,
  children,
  className = "",
}: {
  label: string;
  hint?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label className="text-xs font-medium text-[var(--color-admin-muted)] mb-1.5 flex items-center gap-1.5">
        {Icon && <Icon className="h-3 w-3" />} {label}
      </Label>
      {children}
      {hint && <div className="mt-1 text-xs text-[var(--color-admin-muted)]">{hint}</div>}
    </div>
  );
}

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-4">
      <div className="min-w-0">
        <div className="text-sm font-medium text-[var(--color-admin-text)]">{title}</div>
        <div className="text-sm text-[var(--color-admin-muted)] mt-0.5">{description}</div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
