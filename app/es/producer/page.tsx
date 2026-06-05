import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { GreenHero } from "@/components/layout/green-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { PillLink } from "@/components/ui/pill-button";
import { Reveal } from "@/components/motion/reveal";
import { StatCardRow } from "@/components/sections/stat-card";
import { FeatureRow } from "@/components/sections/feature-row";
import leafMark from "@/public/assets/agrovio-leaf.png";
import heroListings from "@/public/assets/producer-hero-listings.png";
import buyerOffers from "@/public/assets/producer-buyer-offers.png";
import chatThread from "@/public/assets/producer-chat.png";
import notifications from "@/public/assets/producer-notifications.png";
import verifiedProfile from "@/public/assets/producer-verified-profile.png";

export const metadata: Metadata = {
  alternates: { canonical: "/es/producer" },
  title: "Para Productores | Agrovio",
  description:
    "Vende tu cosecha al comprador correcto. Agrovio conecta productores de todos los tamaños con procesadores y agroexportadores verificados en Perú y América Latina.",
};

function GrowCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-black/[0.06] bg-white p-7 shadow-sm sm:p-8">
      <h3 className="text-xl font-medium tracking-tight text-ink">{title}</h3>
      <p className="mt-3 leading-relaxed text-ink/65">{children}</p>
    </div>
  );
}

export default function ProducerPageES() {
  return (
    <>
      {/* Hero */}
      <GreenHero>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/80">
            Para productores pequeños, medianos y grandes
          </p>
          <h1 className="mt-5 text-[2.75rem] font-medium leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.25rem]">
            Empieza a vender al comprador correcto. Hoy.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 sm:text-xl">
            Ya sea que cultives 1 hectárea o más de 100, Agrovio te conecta con
            procesadores y agroexportadores que buscan exactamente lo que produces.
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
            src={heroListings}
            alt="El panel de productor de Agrovio mostrando publicaciones de cosecha con ofertas en vivo de compradores"
            sizes="(max-width: 1024px) 100vw, 1000px"
            className="h-auto w-full rounded-2xl [filter:drop-shadow(0_28px_56px_rgba(7,40,21,0.35))]"
            quality={90}
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </GreenHero>

      {/* Stats */}
      <Reveal>
        <section className="py-12 sm:py-20">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <SectionHeading tone="brand">
                El marketplace de agroexportación de Perú y América Latina
              </SectionHeading>
              <p className="mt-4 text-lg text-ink/60">
                Publica tu cosecha y obtén acceso directo a compradores agrícolas
                verificados, exportadores y procesadores que buscan activamente lo
                que produces.
              </p>
            </div>
            <div className="mt-12">
              <StatCardRow
                stats={[
                  {
                    value: "#1",
                    label: "Perú",
                    description: "En exportaciones globales de arándanos y espárragos",
                  },
                  {
                    value: "$12.8B",
                    label: "Mercado",
                    description: "Mercado agroexportador peruano en 2024",
                  },
                  {
                    value: "2.2M+",
                    label: "Campos",
                    description: "Pequeños y medianos agricultores en Perú",
                  },
                ]}
              />
            </div>
          </Container>
        </section>
      </Reveal>

      {/* Marketplace */}
      <Reveal>
        <FeatureRow
          image={buyerOffers}
          imageAlt="Una publicación de cosecha en Agrovio con ofertas verificadas de compradores compitiendo"
          imageSide="right"
          eyebrow="Agrovio Marketplace"
          heading="Publica una vez. Recibe múltiples ofertas. Cierra más rápido."
          body="Publica tu cosecha con grado, volumen, precio y región — y conéctate de inmediato con compradores verificados que quieren lo que produces. Sin más esperas a que alguien llegue a tu campo."
          bullets={[
            "Elige entre múltiples ofertas de compradores",
            "Revisa el perfil, certificaciones e historial de compras del comprador",
            "Los compradores reciben alertas al instante y responden rápido",
          ]}
        />
      </Reveal>

      {/* Chat */}
      <Reveal>
        <FeatureRow
          image={chatThread}
          imageAlt="Un comprador y productor negociando un trato dentro de Agrovio Chat"
          imageSide="left"
          eyebrow="Agrovio Chat"
          heading="Comunícate directamente con compradores en cada trato"
          body="Agrega contexto a tu publicación, negocia el precio en tiempo real y muéstrale al comprador por qué tu cosecha es la mejor opción — antes de que cualquiera se comprometa. Disponible en español e inglés."
        />
      </Reveal>

      {/* Notifications */}
      <Reveal>
        <FeatureRow
          image={notifications}
          imageAlt="Notificaciones por WhatsApp y en la app alertando a un productor sobre nueva demanda de compradores"
          imageSide="right"
          eyebrow="Nunca pierdas un comprador"
          heading="Configúralo una vez y deja que los compradores lleguen a ti"
          body="Guarda tus preferencias de producto, temporadas de cosecha y regiones — y recibe notificaciones al instante por WhatsApp o correo cuando un comprador busca exactamente lo que produces."
          bullets={[
            "Notificaciones instantáneas por WhatsApp y correo",
            "Alertas personalizadas por tipo de producto, categoría y región",
            "Sin spam — solo solicitudes relevantes de compradores",
          ]}
        />
      </Reveal>

      {/* Verified network */}
      <Reveal>
        <FeatureRow
          image={verifiedProfile}
          imageAlt="Un perfil de productor verificado en Agrovio con registro SENASA y puntuación de confianza"
          imageSide="left"
          eyebrow="Red verificada"
          heading="El único marketplace agrícola construido y verificado para el mercado agro de Latinoamérica"
          body="Para que no tengas que encontrar compradores desde cero."
          bullets={[
            "Perfiles de compradores verificados — exportadores y procesadores con historial comercial confirmado",
            "Verificación de facturas — presenta comprobantes para construir tu perfil e historial como vendedor",
            "Monitoreo continuo de confianza — detecta actividad sospechosa y protege a ambas partes",
            "Perfiles en Agrovio Chat — cuentas protegidas con MFA para que siempre sepas con quién hablas",
          ]}
        />
      </Reveal>

      {/* Grow cards */}
      <Reveal>
        <section className="py-12 sm:py-24">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <SectionHeading>Haz crecer tu negocio agro</SectionHeading>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              <GrowCard title="Amplía tu base de compradores">
                Accede a exportadores y procesadores en tu región — compradores
                que realmente compiten por tu cosecha.
              </GrowCard>
              <GrowCard title="Construye una ventaja competitiva">
                Empieza ahora. Construye las relaciones comerciales, el
                conocimiento de mercado y el poder de negociación que tu
                competencia no tiene.
              </GrowCard>
              <GrowCard title="Conviértete en el productor que necesitan">
                Calidad constante, publicaciones transparentes e historial
                verificado te convierten en el proveedor al que los compradores
                siempre vuelven.
              </GrowCard>
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
