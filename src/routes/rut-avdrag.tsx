import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { Accordion } from "@/components/site/Accordion";
import { CtaBanner } from "@/components/site/CtaBanner";

export const Route = createFileRoute("/rut-avdrag")({
  head: () => ({
    meta: [
      { title: "RUT-avdrag för städning i Åtvidaberg — så fungerar det | Tinas Städ" },
      { name: "description", content: "Du betalar halva priset för städning tack vare RUT-avdraget. Vi drar av det direkt på fakturan — du behöver inte göra något själv." },
      { property: "og:title", content: "RUT-avdrag för städning | Tinas Städ" },
      { property: "og:description", content: "Hur RUT fungerar, vad du sparar och vad som krävs av dig." },
      { property: "og:url", content: "/rut-avdrag" },
    ],
    links: [{ rel: "canonical", href: "/rut-avdrag" }],
  }),
  component: Rut,
});

function Rut() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="RUT-avdrag"
        title={<>Du betalar <em className="italic font-light text-primary">halva priset</em>.</>}
        lead="RUT är ett skatteavdrag för hushållsnära tjänster. Vi sköter ansökan åt Skatteverket — du ser bara den färdiga summan på fakturan."
      />

      <section className="container-page mt-4">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7 space-y-12">
            <div>
              <div className="eyebrow mb-3">Vad det är</div>
              <p className="text-lg leading-relaxed">
                RUT står för rengöring, underhåll och tvätt. Du som privatperson får dra av 50 % av
                arbetskostnaden för städning, fönsterputs, flyttstäd och liknande tjänster — upp till
                75 000 kr per år och person.
              </p>
            </div>

            <div>
              <div className="eyebrow mb-3">Hur det funkar hos oss</div>
              <ol className="space-y-5">
                {[
                  ["Vi städar.", "Vanligt jobb, ingen extra administration för dig."],
                  ["Vi skickar faktura med avdraget redan gjort.", "På fakturan ser du både fullpriset och vad du faktiskt betalar."],
                  ["Vi söker pengarna från Skatteverket.", "Det enda du behöver göra är att finnas i folkbokföringen och ha tillräckligt RUT-utrymme kvar för året."],
                  ["Om något fattas hör vi av oss i god tid.", "Du blir aldrig fakturerad mer än det du sett innan."],
                ].map(([h, b], i) => (
                  <li key={i} className="flex gap-5">
                    <span className="text-xs tracking-widest text-primary pt-1.5 w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <div className="font-medium">{h}</div>
                      <p className="text-ink-soft text-sm mt-1">{b}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <div className="eyebrow mb-3">Vad du behöver</div>
              <ul className="space-y-2 text-ink-soft">
                <li>— Vara folkbokförd i Sverige</li>
                <li>— Ha fyllt 18 år senast 31 december det år arbetet utförs</li>
                <li>— Ha kvar utrymme av dina 75 000 kr för året</li>
                <li>— Betala tillräckligt mycket skatt under året för att kunna utnyttja avdraget</li>
              </ul>
            </div>
          </div>

          {/* Calc card */}
          <aside className="md:col-span-5">
            <div className="sticky top-28 bg-paper rounded-2xl p-8 border border-line">
              <div className="eyebrow mb-5">Räkneexempel</div>

              {[
                ["Veckostäd, 2,5 tim / vecka", 1075, 537],
                ["Hemstäd varannan vecka, 3 tim", 1290, 645],
                ["Storstäd villa, 8 tim, 2 personer", 6880, 3440],
                ["Flyttstäd lägenhet 75 m²", 4490, 2245],
                ["Fönsterputs villa, 22 bågar", 1980, 990],
              ].map(([t, full, after]) => (
                <div key={t as string} className="py-4 border-t border-line first:border-t-0">
                  <div className="text-sm font-medium">{t}</div>
                  <div className="flex justify-between text-sm mt-2 text-ink-soft">
                    <span>Fullpris</span>
                    <span>{full.toLocaleString("sv-SE")} kr</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>Du betalar efter RUT</span>
                    <span className="text-primary font-medium">{(after as number).toLocaleString("sv-SE")} kr</span>
                  </div>
                </div>
              ))}

              <p className="text-xs text-ink-soft mt-5 leading-relaxed">
                Priser är ungefärliga och beror på hemmet. Vi ger fast pris vid hembesök.
              </p>

              <Link to="/offert" className="btn-primary w-full mt-6 justify-center">Begär eget pris →</Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="container-page mt-32">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <div className="eyebrow mb-3">Vanliga frågor</div>
            <h2 className="display-lg">RUT, i klartext.</h2>
          </div>
          <div className="md:col-span-8">
            <Accordion items={[
              { q: "Måste jag ansöka själv hos Skatteverket?", a: "Nej. Det enda du behöver göra är att finnas i folkbokföringen och ha kvar RUT-utrymme. Vi sköter resten." },
              { q: "Vad händer om mitt utrymme tar slut mitt under året?", a: "Vi hör av oss innan vi skickar en faktura som riskerar att inte godkännas. Då fakturerar vi fullpris för det som ligger över taket." },
              { q: "Kan flera personer i ett hushåll dela på avdraget?", a: "Ja. Ni har 75 000 kr var. Vi kan dela fakturan om ni vill nyttja det." },
              { q: "Gäller RUT för kontorsstädning?", a: "Nej. RUT är bara för privatpersoner. För företag fakturerar vi vanligt och ni drar av momsen som vanligt." },
              { q: "Vad händer om Skatteverket inte godkänner avdraget?", a: "Då skickar vi en kompletterande faktura på mellanskillnaden. Det är mycket ovanligt — vi har haft det två gånger på tolv år." },
            ]} />
          </div>
        </div>
      </section>

      <CtaBanner
        title="Vi räknar fram din summa innan vi börjar."
        body="Ring så går vi igenom hemmet och RUT-utrymmet — du vet exakt vad du kommer betala."
      />
    </PageShell>
  );
}
