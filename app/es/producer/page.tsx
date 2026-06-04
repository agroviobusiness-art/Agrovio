import { GreenHero } from "@/components/layout/green-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeatureRow } from "@/components/sections/feature-row";
import { StatCardRow } from "@/components/sections/stat-card";
import { Reveal } from "@/components/motion/reveal";
import { PillLink } from "@/components/ui/pill-button";
import bidCards from "@/public/assets/feature-bid-cards.png";
import whatsappCards from "@/public/assets/feature-whatsapp-cards.png";
import buyerBids from "@/public/assets/feature-buyer-bids.png";

export default function ProducerPageES() {
  return (
    <>
      <GreenHero
        eyebrow="PARA PEQUEÑOS, MEDIANOS Y GRANDES PRODUCTORES"
        headline="Empieza a vender al comprador correcto. Hoy."
        subheadline="Ya sea que cultives 1 hectárea o más de 100, Agrovio te conecta con procesadores y agroexportadores que buscan exactamente lo que produces."
        ctaLabel="Solicitar invitación"
        ctaHref="/inviterequest"
      />

      <Reveal>
        <section className="py-12 sm:py-20">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <SectionHeading tone="brand">
                El marketplace de agroexportación de Perú y América Latina
              </SectionHeading>
              <p className="mt-4 text-lg text-ink/60">
                Publica tu cosecha y obtén acceso directo a compradores agrícolas verificados, exportadores y procesadores que buscan activamente lo que produces.
              </p>
            </div>
            <div className="mt-12">
              <StatCardRow
                stats={[
                  { value: "#1", label: "Perú — En exportaciones mundiales de arándanos y espárragos" },
                  { value: "$12.8B", label: "Mercado de agroexportación peruano 2024" },
                  { value: "2.2M+", label: "Granjas pequeñas y medianas en Perú" },
                ]}
              />
            </div>
          </Container>
        </section>
      </Reveal>

      <Reveal>
        <FeatureRow
          image={bidCards}
          imageAlt="Tarjeta de oferta en Agrovio"
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

      <Reveal>
        <FeatureRow
          image={whatsappCards}
          imageAlt="Chat con compradores en Agrovio"
          imageSide="right"
          eyebrow="AGROVIO CHAT"
          heading="Comunícate directamente con compradores en cada trato"
          lead="Agrega contexto a tu publicación, negocia el precio en tiempo real y muéstrale al comprador por qué tu cosecha es la mejor opción — antes de que cualquiera se comprometa. Disponible en español e inglés."
        />
      </Reveal>

      <Reveal>
        <FeatureRow
          image={buyerBids}
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

      <Reveal>
        <section className="bg-surface py-16 sm:py-24">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-medium uppercase tracking-widest text-ink/50">RED VERIFICADA</p>
              <SectionHeading className="mt-3">
                El único marketplace agrícola construido y verificado para el mercado agro de Latinoamérica
              </SectionHeading>
              <p className="mt-4 text-ink/60">Para que no tengas que encontrar compradores desde cero.</p>
            </div>
            <ul className="mx-auto mt-10 max-w-2xl space-y-3 text-ink/80">
              {[
                "Perfiles de compradores verificados — exportadores y procesadores con historial comercial confirmado",
                "Verificación de facturas — presenta comprobante de transacción para construir tu perfil y historial de vendedor",
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

      <Reveal>
        <section className="py-16 sm:py-24">
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
