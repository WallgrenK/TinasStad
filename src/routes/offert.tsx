import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHeader } from "@/components/site/PageShell";

export const Route = createFileRoute("/offert")({
  head: () => ({
    meta: [
      { title: "Begär offert — Städning i Åtvidaberg | Tinas Städ" },
      { name: "description", content: "Begär kostnadsfri offert på hemstädning, flyttstädning eller fönsterputs i Åtvidaberg. Vi återkommer samma dag med fast pris efter RUT." },
      { property: "og:title", content: "Begär offert — Tinas Städ" },
      { property: "og:description", content: "Kostnadsfri offert med fast pris efter RUT." },
      { property: "og:url", content: "/offert" },
    ],
    links: [{ rel: "canonical", href: "/offert" }],
  }),
  component: Quote,
});

const TJANSTER = [
  ["hemstadning", "Hemstädning"],
  ["veckostadning", "Veckostädning"],
  ["manadsstadning", "Månadsstädning"],
  ["storstadning", "Storstädning"],
  ["flyttstadning", "Flyttstädning"],
  ["fonsterputs", "Fönsterputs"],
  ["kontorsstadning", "Kontorsstädning"],
  ["annat", "Något annat"],
] as const;

function Quote() {
  const [sent, setSent] = useState(false);
  const [tjanst, setTjanst] = useState<string>("hemstadning");

  return (
    <PageShell>
      <PageHeader
        eyebrow="Begär offert"
        title={<>Fast pris, <em className="italic font-light text-primary">samma dag</em>.</>}
        lead="Fyll i det du vet — vi återkommer med ett pris direkt eller bokar in ett kostnadsfritt hembesök om vi behöver se hemmet. Inga bindningstider, inga dolda kostnader."
      />

      <section className="container-page">
        <div className="grid md:grid-cols-12 gap-12">
          <aside className="md:col-span-4 space-y-8">
            <div>
              <div className="eyebrow mb-3">Det här ingår</div>
              <ul className="space-y-2 text-ink-soft text-sm">
                <li>— Kostnadsfri offert inom 24 timmar</li>
                <li>— Hembesök vid återkommande städ (gratis)</li>
                <li>— Fast pris efter RUT, inga överraskningar</li>
                <li>— Försäkrad upp till 10 Mkr</li>
                <li>— Inga bindningstider</li>
              </ul>
            </div>
            <div className="bg-paper border border-line rounded-2xl p-6">
              <div className="eyebrow mb-3">Snabbare?</div>
              <p className="text-sm text-ink-soft mb-4">Ring oss direkt under kontorstid — vi ger pris medan vi pratar.</p>
              <a href="tel:+46700000000" className="btn-ghost w-full justify-center">070 — 000 00 00</a>
            </div>
          </aside>

          <div className="md:col-span-8">
            <div className="bg-card border border-line rounded-2xl p-8 md:p-10 shadow-(--shadow-soft)">
              {sent ? (
                <div className="py-16 text-center">
                  <div className="eyebrow mb-4">Tack</div>
                  <h2 className="display-lg">Vi hör av oss inom dagen.</h2>
                  <p className="text-ink-soft mt-4 max-w-md mx-auto">
                    Du får ett mejl med en bekräftelse direkt. Sedan ringer vi inom 24 timmar — oftast snabbare.
                  </p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid gap-6">
                  <div>
                    <div className="text-sm text-ink-soft mb-2">Vilken tjänst gäller det?</div>
                    <div className="flex flex-wrap gap-2">
                      {TJANSTER.map(([id, label]) => (
                        <button
                          type="button"
                          key={id}
                          onClick={() => setTjanst(id)}
                          className={`px-4 py-2 rounded-full border text-sm transition ${
                            tjanst === id
                              ? "bg-ink text-background border-ink"
                              : "border-line text-ink-soft hover:border-ink hover:text-ink"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Namn" name="namn" required />
                    <Field label="Telefon" name="tel" type="tel" required />
                  </div>

                  <Field label="E-post" name="email" type="email" />
                  <Field label="Adress" name="adress" placeholder="Gata och ort" />

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Bostadens yta" name="yta" placeholder="t.ex. 95 m²" />
                    <Field label="Önskat startdatum" name="datum" type="date" />
                  </div>

                  <Field
                    label="Övrigt"
                    name="info"
                    textarea
                    placeholder="Antal rum, husdjur, vad som är viktigast för dig — allt som hjälper oss att ge ett bra pris."
                  />

                  <label className="flex items-start gap-3 text-sm text-ink-soft mt-2">
                    <input type="checkbox" required className="mt-1" />
                    <span>Jag godkänner att Tinas Städ behandlar mina uppgifter för att återkomma med en offert.</span>
                  </label>

                  <button className="btn-primary self-start mt-2">Skicka förfrågan →</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function Field({
  label, name, type = "text", required, textarea, placeholder,
}: { label: string; name: string; type?: string; required?: boolean; textarea?: boolean; placeholder?: string }) {
  const Cn = "w-full bg-background border border-line rounded-md px-4 py-3 text-base outline-none focus:border-ink transition";
  return (
    <label className="block">
      <span className="text-sm text-ink-soft block mb-1.5">{label}{required && <span className="text-primary"> *</span>}</span>
      {textarea ? (
        <textarea name={name} required={required} rows={5} className={Cn} placeholder={placeholder} />
      ) : (
        <input name={name} type={type} required={required} className={Cn} placeholder={placeholder} />
      )}
    </label>
  );
}
