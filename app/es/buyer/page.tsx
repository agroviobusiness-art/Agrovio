import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { GreenHero } from "@/components/layout/green-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { PillLink } from "@/components/ui/pill-button";
import { Reveal } from "@/components/motion/reveal";
import { FeatureRow } from "@/components/sections/feature-row";
import leafMark from "@/public/assets/agrovio-leaf.png";
import heroLoadboard from "@/public/assets/buyer-hero-loadboard.png";
import pricingData from "@/public/assets/buyer-pricing-data.png";
import offers from "@/public/assets/buyer-offers.png";
import dealAccepted from "@/public/assets/buyer-deal-accepted.png";
import notifications from "@/public/assets/buyer-notifications.png";
import verifiedNetwork from "@/public/assets/buyer-verified-network.png";

export const metadata: Metadata = {
  alternates: { canonical: "/es/buyer" },
  title: "Para Compradores | Agrovio",
  description:
    "Abastécete de cosechas verificadas de Perú con el grado, volumen y tiempo que tu negocio necesita en Perú y LATAM.",
};

function CoverageCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-black/[0.06] bg-white p-7 shadow-sm sm:p-8">
      <span className="flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
        {icon}
      </span>
      <h3 className="mt-5 text-xl font-medium tracking-tight text-ink">{title}</h3>
      <p className="mt-3 leading-relaxed text-ink/65">{children}</p>
    </div>
  );
}

const COMPARISON: ReadonlyArray<{
  dimension: string;
  traditional: string;
  agrovio: string;
}> = [
  {
    dimension: "Costo",
    traditional: "Alto — visitas de campo e intermediarios",
    agrovio: "Por suscripción, sin costos ocultos",
  },
  {
    dimension: "Calidad del productor",
    traditional: "Sin verificar, historial desconocido",
    agrovio: "Perfiles verificados y de confianza",
  },
  {
    dimension: "Disponibilidad",
    traditional: "Solo lo que conoces",
    agrovio: "Publicaciones en tiempo real en todo Perú",
  },
  {
    dimension: "Alcance geográfico",
    traditional: "Solo contactos locales",
    agrovio: "A nivel nacional, en expansión hacia LATAM",
  },
];

function CrossMark() {
  return (
    <span
      className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-ink/30"
      aria-hidden
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path
          d="M6 6l12 12M18 6L6 18"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function CheckMark() {
  return (
    <span
      className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand"
      aria-hidden
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 13l4 4L19 7"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function BuyerPageES() {
  return (
    <>
      {/* Hero */}
      <GreenHero>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/80">
            Para agroexportadores y procesadores
          </p>
          <h1 className="mt-5 text-[2.75rem] font-medium leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.25rem]">
            Abastécete de cosechas verificadas de Perú. Directo desde el campo.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 sm:text-xl">
            Ya sea que compres a gran escala o busques un nuevo proveedor,
            Agrovio te da acceso directo a productores verificados para que
            encuentres la cosecha indicada en todo Perú y LATAM.
          </p>
          <div className="mt-8 flex justify-center">
            <PillLink href="/inviterequest" variant="white">
              <Image src={leafMark} alt="" className="h-5 w-auto" />
              Solicita tu acceso
            </PillLink>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-5xl sm:mt-16">
          <Image
            src={heroLoadboard}
            alt="El panel de comprador de Agrovio mostrando publicaciones verificadas de cosecha con grados, volúmenes y acciones de oferta en vivo"
            sizes="(max-width: 1024px) 100vw, 1000px"
            className="h-auto w-full rounded-2xl [filter:drop-shadow(0_28px_56px_rgba(7,40,21,0.35))]"
            quality={90}
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </GreenHero>

      {/* Coverage */}
      <Reveal>
        <section className="py-12 sm:py-20">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <SectionHeading tone="brand">
                Cobertura de productos a escala
              </SectionHeading>
              <p className="mt-4 text-lg text-ink/60">
                Abastécete de cualquier tipo de cultivo y grado, con acceso
                directo a productores verificados en Perú y el resto de
                Latinoamérica.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              <CoverageCard
                title="Productores"
                icon={
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 19v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1M14.5 14h1.5a4 4 0 0 1 4 4v1"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              >
                Agricultores verificados listos para abastecer
              </CoverageCard>
              <CoverageCard
                title="Tipos de productos"
                icon={
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M12 21c0-6 0-9 0-12M12 9C12 5 9 3 4 3c0 5 2 8 6 8h2ZM12 13c0-3.5 2.5-6 7-6 0 4.5-2.5 6-6 6h-1Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              >
                Frutas y hortalizas de variedades
              </CoverageCard>
              <CoverageCard
                title="Disponibilidad"
                icon={
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
                    <path
                      d="M12 7v5l3.5 2"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              >
                Publicaciones actualizadas en cada temporada de cosecha
              </CoverageCard>
            </div>
          </Container>
        </section>
      </Reveal>

      {/* Pricing */}
      <Reveal>
        <FeatureRow
          image={pricingData}
          imageAlt="Panel de precios de Agrovio mostrando rangos de tarifas verificadas y tendencia de precios de 8 semanas"
          imageSide="right"
          eyebrow="Agrovio Marketplace"
          heading="Accede a datos precisos de precios de productos agrícolas"
          body="Precios en tiempo real de transacciones verificadas — para que negocies más rápido y protejas tu margen."
          bullets={[
            "Compra en el spot — encuentra productos disponibles al instante, desde donde estés",
            "Planificación por temporada — organiza tus compras antes de la cosecha con compromisos de productores",
            "Benchmark y negocia — consulta rangos de precios de mercado y negocia directo por Agrovio Chat",
          ]}
        />
      </Reveal>

      {/* Offers */}
      <Reveal>
        <FeatureRow
          image={offers}
          imageAlt="Una solicitud de abastecimiento de comprador en Agrovio con múltiples productores verificados respondiendo con precios"
          imageSide="left"
          eyebrow="Agrovio Marketplace"
          heading="Publica una vez. Recibe múltiples ofertas. Abastécete al instante."
          body="Publica tus requerimientos una vez y recibe respuestas de productores verificados al instante — sin llamadas, sin suposiciones."
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
          image={dealAccepted}
          imageAlt="Un trato confirmado en Agrovio con confirmación de oferta aceptada"
          imageSide="right"
          eyebrow="Agrovio Chat"
          heading="Comunícate y negocia en tiempo real con productores en cada trato"
          body="Agrega contexto a tu solicitud de abastecimiento, negocia el precio en tiempo real y confirma los detalles de calidad antes de que cualquiera se comprometa. Disponible en español e inglés con traducción instantánea."
        />
      </Reveal>

      {/* Notifications */}
      <Reveal>
        <FeatureRow
          image={notifications}
          imageAlt="Notificaciones por WhatsApp y en la app alertando a un comprador sobre cosechas recién publicadas"
          imageSide="left"
          eyebrow="Nunca pierdas una cosecha"
          heading="Configúralo una vez y deja que los productos lleguen a ti"
          body="Guarda tus preferencias por tipo de producto, grado, región y volumen — y recibe notificaciones al instante por WhatsApp o correo cuando un productor publica exactamente lo que necesitas."
          bullets={[
            "Notificaciones instantáneas por WhatsApp y correo",
            "Alertas personalizadas por tipo de producto, categoría y región",
            "Sin publicaciones irrelevantes — solo productos que se ajustan a tu red",
          ]}
        />
      </Reveal>

      {/* Verified network */}
      <Reveal>
        <FeatureRow
          image={verifiedNetwork}
          imageAlt="Un perfil de comprador verificado en Agrovio mostrando registro de empresa, estado MFA e historial de transacciones"
          imageSide="right"
          eyebrow="Red verificada"
          heading="El único marketplace agrícola construido y verificado para el mercado agro de Perú y Latinoamérica"
          body="Para que no tengas que construir tu red de proveedores desde cero."
          bullets={[
            "Perfiles de productores verificados — agricultores con historial de fundo y negocio confirmado",
            "Verificación de facturas — los productores presentan comprobantes para construir su historial como vendedores",
            "Monitoreo continuo de confianza — detecta actividad sospechosa y protege a ambas partes",
            "Perfiles en Agrovio Chat — cuentas protegidas con MFA para que siempre sepas con quién hablas",
          ]}
        />
      </Reveal>

      {/* Comparison */}
      <Reveal>
        <section className="py-12 sm:py-20">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <SectionHeading>Deja de abastecerte a ciegas</SectionHeading>
              <p className="mt-4 text-lg text-ink/60">
                El abastecimiento tradicional te deja dependiente de contactos
                personales y visitas de campo. Agrovio está diseñado para
                simplificarlo — y funciona.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-sm">
              <table className="hidden w-full border-collapse text-left text-sm sm:table">
                <caption className="sr-only">
                  Comparación entre Agrovio y el abastecimiento tradicional.
                </caption>
                <thead>
                  <tr className="border-b border-black/[0.06] bg-mist/40 font-medium">
                    <td className="p-5" />
                    <th scope="col" className="p-5 font-medium text-ink/55">
                      Abastecimiento tradicional
                    </th>
                    <th scope="col" className="bg-brand/[0.06] p-5 font-medium text-brand-dark">
                      Agrovio
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr
                      key={row.dimension}
                      className={i < COMPARISON.length - 1 ? "border-b border-black/[0.06]" : undefined}
                    >
                      <th scope="row" className="p-5 align-top font-medium text-ink">
                        {row.dimension}
                      </th>
                      <td className="p-5 align-top text-ink/55">
                        <span className="flex items-start gap-2.5">
                          <CrossMark />
                          <span>{row.traditional}</span>
                        </span>
                      </td>
                      <td className="bg-brand/[0.06] p-5 align-top text-ink">
                        <span className="flex items-start gap-2.5">
                          <CheckMark />
                          <span>{row.agrovio}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="divide-y divide-black/[0.06] sm:hidden">
                {COMPARISON.map((row) => (
                  <div key={row.dimension} className="p-6">
                    <h3 className="text-base font-medium text-ink">{row.dimension}</h3>
                    <dl className="mt-4 space-y-3 text-sm">
                      <div className="flex items-start gap-2.5">
                        <CrossMark />
                        <div>
                          <dt className="text-xs font-medium uppercase tracking-wide text-ink/40">
                            Abastecimiento tradicional
                          </dt>
                          <dd className="mt-0.5 text-ink/60">{row.traditional}</dd>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5 rounded-2xl bg-brand/[0.06] p-3">
                        <CheckMark />
                        <div>
                          <dt className="text-xs font-medium uppercase tracking-wide text-brand-dark">
                            Agrovio
                          </dt>
                          <dd className="mt-0.5 text-ink">{row.agrovio}</dd>
                        </div>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </Reveal>

      {/* CTA */}
      <Reveal>
        <section className="pb-12 sm:pb-28">
          <Container>
            <div className="overflow-hidden rounded-3xl bg-hero-gradient px-6 py-14 text-center text-white sm:px-12 sm:py-16">
              <SectionHeading tone="white">Únete a Agrovio hoy</SectionHeading>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
                Una plataforma, con precios que crecen con tu negocio.
              </p>
              <div className="mt-8 flex justify-center">
                <PillLink href="/inviterequest" variant="white">
                  Empieza ahora
                </PillLink>
              </div>
            </div>
          </Container>
        </section>
      </Reveal>
    </>
  );
}
