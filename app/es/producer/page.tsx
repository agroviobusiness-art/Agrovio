import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { GreenHero } from "@/components/layout/green-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { PillLink } from "@/components/ui/pill-button";
import { Reveal } from "@/components/motion/reveal";
import { StatCardRow } from "@/components/sections/stat-card";
import { FeatureRow } from "@/components/sections/feature-row";
import heroListings from "@/public/assets/producer-hero-listings.png";
import buyerOffers from "@/public/assets/producer-buyer-offers.png";
import chatThread from "@/public/assets/producer-chat.png";
import notifications from "@/public/assets/producer-notifications.png";
import verifiedProfile from "@/public/assets/producer-verified-profile.png";
import leafMark from "@/public/assets/agrovio-leaf.png";

export const metadata: Metadata = {
  alternates: { canonical: "/es/producer" },
  title: "Para Productores | Agrovio",
  description:
    "Vende tu cosecha al comprador correcto. Agrovio conecta productores de todos los tamaños con procesadores y agroexportadores verificados.",
};

export default function ProducerPageES() {
  return (
    <>
      <GreenHero>
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/60">
            PARA PEQUEÑOS, MEDIANOS Y GRANDES PRODUCTORES
          </p>
          <h1 className="mt-4 text-[2.75rem] font-medium leading-[1.05] tracking-tight sm:text-6xl">
            Empieza a vender al comprador correcto. Hoy.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            Ya sea que cultives 1 hectárea o más de 100, Agrovio te conecta con procesadores y
            agroexportadores que buscan exactamente lo que produces.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PillLink href="/inviterequest" variant="white">
              <Image src={leafMark} alt="" className="h-5 w-auto" />
              Solicitar invitación
            </PillLink>
          </div>
        </div>
      </GreenHero>

      {/* Stats band */}
      <Reveal>
        <section className="py-12 sm:py-20">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <SectionHeading tone="brand">
                El marketplace de agroexportación de Perú y América Latina
              </SectionHeading>
              <p className="mt-4 text-lg text-ink/60">
                Publica tu cosecha y obtén acceso directo a compradores agrícolas verificados,
                exportadores y procesadores que buscan activamente lo que produces.
              </p>
            </div>
            <div className="mt-12">
              <StatCardRow
                stats={[
                  { value: "#1", label: "Perú en exportaciones mundiales de arándanos y espárragos" },
                  { value: "$12.8B", label: "Mercado de agroexportación peruano 2024" },
                  { value: "2.2M+", label: "Granjas pequeñas y medianas en Perú" },
                ]}
              />
            </div>
          </Container>
        </section>
      </Reveal>

      {/* Marketplace feature */}
      <Reveal>
        <FeatureRow
          image={heroListings}
          imageAlt="Listados de cosecha en Agrovio"
          imageSide="left"
          eyebrow="AGROVIO MARKETPLACE"
          heading="Publica una vez. Recibe múltiples ofertas. Cierra más rápido."
          lead="Publica tu cosecha con grado, volumen, precio y región — y conéctate de inmediato con compradores verificados que quieren lo que produces. Sin más esperas a que alguien llegue a tu campo."
          bullets={[
            "Elige entre múltiples ofertas de compradores",
            "Revisa el perfil, certificaciones e historial de compras del comprador",
            "Los compradores reciben alertas al instante y responden rápido",
          ]}
        />
      </Reveal>

      {/* Chat feature */}
      <Reveal>
        <FeatureRow
          image={chatThread}
          imageAlt="Chat con compradores en Agrovio"
          imageSide="right"
          eyebrow="AGROVIO CHAT"
          heading="Comunícate directamente con compradores en cada trato"
          lead="Agrega contexto a tu publicación, negocia el precio en tiempo real y muéstrale al comprador por qué tu cosecha es la mejor opción — antes de que cualquiera se comprometa. Disponible en español e inglés."
        />
      </Reveal>

      {/* Notifications */}
      <Reveal>
        <FeatureRow
          image={notifications}
          imageAlt="Notificaciones de compradores en Agrovio"
          imageSide="left"
          eyebrow="NUNCA PIERDAS UN COMPRADOR"
          heading="Configúralo una vez y deja que los compradores lleguen a ti"
          bullets={[
            "Notificaciones instantáneas por WhatsApp y correo",
            "Alertas personalizadas por tipo de producto, grado y región",
            "Sin spam — solo solicitudes de compradores relevantes",
          ]}
        />
      </Reveal>

      {/* Verified network */}
      <Reveal>
        <FeatureRow
          image={verifiedProfile}
          imageAlt="Perfil verificado en Agrovio"
          imageSide="right"
          eyebrow="RED VERIFICADA"
          heading="El único marketplace agrícola construido y verificado para el mercado agro de Latinoamérica"
          lead="Para que no tengas que encontrar compradores desde cero."
          bullets={[
            "Perfiles de compradores verificados — exportadores y procesadores con historial comercial confirmado",
            "Verificación de facturas — presenta comprobante de transacción para construir tu perfil y historial",
            "Monitoreo continuo de confianza — detecta actividad sospechosa y protege a ambas partes",
            "Perfiles de Agrovio Chat — cuentas protegidas con MFA para que siempre sepas con quién hablas",
          ]}
        />
      </Reveal>

      {/* CTA */}
      <Reveal>
        <section className="bg-surface py-16 sm:py-24">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <SectionHeading>Únete a Agrovio hoy</SectionHeading>
              <p className="mt-4 text-ink/60">Una plataforma, con precios que crecen con tu negocio.</p>
              <div className="mt-8">
                <PillLink href="/inviterequest" variant="brand" size="lg">
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
