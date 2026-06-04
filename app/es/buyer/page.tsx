import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { GreenHero } from "@/components/layout/green-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { PillLink } from "@/components/ui/pill-button";
import { Reveal } from "@/components/motion/reveal";
import { StatCardRow } from "@/components/sections/stat-card";
import { FeatureRow } from "@/components/sections/feature-row";
import buyerBids from "@/public/assets/feature-buyer-bids.png";
import pricingChart from "@/public/assets/feature-pricing-chart.png";
import whatsappCards from "@/public/assets/feature-whatsapp-cards.png";
import bidCards from "@/public/assets/feature-bid-cards.png";
import leafMark from "@/public/assets/agrovio-leaf.png";

export const metadata: Metadata = {
  alternates: { canonical: "/es/buyer" },
  title: "Para Compradores | Agrovio",
  description:
    "Abastécete de la cosecha verificada de Perú. Agrovio da acceso directo a productores verificados para encontrar la cosecha correcta en Perú y LATAM.",
};

export default function BuyerPageES() {
  return (
    <>
      <GreenHero>
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/60">
            PARA AGROEXPORTADORES Y PROCESADORES
          </p>
          <h1 className="mt-4 text-[2.75rem] font-medium leading-[1.05] tracking-tight sm:text-6xl">
            Abastécete de la cosecha verificada de Perú. Directo del campo.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            Ya sea que compres a gran escala o busques un nuevo proveedor, Agrovio te da acceso directo
            a productores verificados para encontrar la cosecha correcta en Perú y LATAM.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PillLink href="/inviterequest" variant="white">
              <Image src={leafMark} alt="" className="h-5 w-auto" />
              Solicitar invitación
            </PillLink>
          </div>
        </div>
      </GreenHero>

      {/* Stats */}
      <Reveal>
        <section className="py-12 sm:py-20">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <SectionHeading tone="brand">Cobertura de productos a escala</SectionHeading>
              <p className="mt-4 text-lg text-ink/60">
                Abastécete de cualquier tipo de cultivo y grado, con acceso directo a productores
                verificados en Perú y el resto de América Latina.
              </p>
            </div>
            <div className="mt-12">
              <StatCardRow
                stats={[
                  { value: "150+", label: "Productores verificados listos para abastecer" },
                  { value: "22+", label: "Tipos de productos — Frutas y Hortalizas" },
                  { value: "20+", label: "Publicaciones actualizadas por temporada" },
                ]}
              />
            </div>
          </Container>
        </section>
      </Reveal>

      {/* Marketplace 1 — pricing */}
      <Reveal>
        <FeatureRow
          image={pricingChart}
          imageAlt="Datos de precios en tiempo real en Agrovio"
          imageSide="right"
          eyebrow="AGROVIO MARKETPLACE"
          heading="Accede a datos precisos de precios de productos agrícolas"
          lead="Precios en tiempo real de transacciones verificadas — para que negocies más rápido y protejas tu margen."
          bullets={[
            "Compra en el spot — encuentra productos disponibles al instante, desde donde estés",
            "Planificación por temporada — organiza tus compras antes de la cosecha con compromisos de productores",
            "Benchmark y negocia — consulta rangos de precios de mercado y negocia directo por Agrovio Chat",
          ]}
        />
      </Reveal>

      {/* Marketplace 2 */}
      <Reveal>
        <FeatureRow
          image={buyerBids}
          imageAlt="Múltiples ofertas de productores en Agrovio"
          imageSide="left"
          eyebrow="AGROVIO MARKETPLACE"
          heading="Publica una vez. Recibe múltiples ofertas. Abastécete al instante."
          lead="Publica tus requerimientos una vez y recibe respuestas de productores verificados al instante — sin llamadas, sin suposiciones."
          bullets={[
            "Elige entre múltiples respuestas de productores",
            "Revisa certificaciones, regiones e historial de transacciones de cada productor",
            "Los productores reciben alertas al instante y responden rápido",
          ]}
        />
      </Reveal>

      {/* Chat */}
      <Reveal>
        <FeatureRow
          image={whatsappCards}
          imageAlt="Chat con productores en Agrovio"
          imageSide="right"
          eyebrow="AGROVIO CHAT"
          heading="Comunícate y haz ofertas en tiempo real con productores en cada trato"
          lead="Agrega contexto a tu solicitud de abastecimiento, negocia el precio en tiempo real y confirma detalles de calidad antes de que cualquiera se comprometa. Disponible en español e inglés con traducción instantánea."
        />
      </Reveal>

      {/* Notifications */}
      <Reveal>
        <FeatureRow
          image={bidCards}
          imageAlt="Notificaciones de cosecha en Agrovio"
          imageSide="left"
          eyebrow="NUNCA PIERDAS UNA COSECHA"
          heading="Configúralo una vez y deja que los productos lleguen a ti"
          bullets={[
            "Notificaciones instantáneas por WhatsApp y correo",
            "Alertas personalizadas por tipo de producto, grado y región",
            "Sin publicaciones irrelevantes — solo productos que encajan en tu red",
          ]}
        />
      </Reveal>

      {/* Verified network */}
      <Reveal>
        <section className="bg-surface py-16 sm:py-24">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-medium uppercase tracking-widest text-ink/50">RED VERIFICADA</p>
              <SectionHeading className="mt-3">
                El único marketplace agrícola construido y verificado para el mercado agro de Perú y Latinoamérica
              </SectionHeading>
              <p className="mt-4 text-ink/60">Para que no tengas que construir tu red de proveedores desde cero.</p>
            </div>
            <ul className="mx-auto mt-10 max-w-2xl space-y-3 text-ink/80">
              {[
                "Perfiles de productores verificados — agricultores con historial de granja y negocio confirmado",
                "Verificación de facturas — los productores presentan comprobante de transacción para construir su historial",
                "Monitoreo continuo de confianza — detecta actividad sospechosa y protege a ambas partes",
                "Perfiles de Agrovio Chat — cuentas protegidas con MFA para que siempre sepas con quién hablas",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-0.5 text-brand">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      </Reveal>

      {/* Comparison table */}
      <Reveal>
        <section className="py-16 sm:py-24">
          <Container>
            <div className="mx-auto max-w-3xl">
              <SectionHeading className="text-center">Deja de abastecerte a ciegas</SectionHeading>
              <p className="mt-4 text-center text-ink/60">
                El abastecimiento tradicional te deja dependiente de contactos personales y visitas de campo.
                Agrovio está diseñado para simplificarlo.
              </p>
              <div className="mt-10 overflow-hidden rounded-2xl border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-surface">
                      <th className="p-4 text-left font-medium text-ink/60"></th>
                      <th className="p-4 text-left font-medium">Abastecimiento tradicional</th>
                      <th className="p-4 text-left font-medium text-brand">Agrovio</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {[
                      ["Costo", "Alto — visitas de campo e intermediarios", "Por suscripción, sin costos ocultos"],
                      ["Calidad del productor", "Sin verificar, historial desconocido", "Perfiles verificados y de confianza"],
                      ["Disponibilidad", "Solo lo que conoces", "Publicaciones en tiempo real en todo Perú"],
                      ["Alcance geográfico", "Solo contactos locales", "A nivel nacional, en expansión hacia LATAM"],
                    ].map(([label, trad, agrovio]) => (
                      <tr key={label}>
                        <td className="p-4 font-medium text-ink/60">{label}</td>
                        <td className="p-4 text-ink/60">{trad}</td>
                        <td className="p-4 font-medium text-brand">{agrovio}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Container>
        </section>
      </Reveal>

      {/* CTA */}
      <Reveal>
        <section className="bg-surface py-16 sm:py-24">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <SectionHeading>Únete a Agrovio hoy</SectionHeading>
              <p className="mt-4 text-ink/60">Una plataforma, con precios que crecen con tu negocio.</p>
              <div className="mt-8">
                <PillLink href="/inviterequest" variant="brand" size="lg">Empieza ahora</PillLink>
              </div>
            </div>
          </Container>
        </section>
      </Reveal>
    </>
  );
}
