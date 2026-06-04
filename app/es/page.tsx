import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { GreenHero } from "@/components/layout/green-hero";
import { PillLink } from "@/components/ui/pill-button";
import { Reveal } from "@/components/motion/reveal";
import { StatCardRow } from "@/components/sections/stat-card";
import { FeatureRow } from "@/components/sections/feature-row";
import { InviteForm } from "@/components/forms/invite-form";
import bidCards from "@/public/assets/feature-bid-cards.png";
import whatsappCards from "@/public/assets/feature-whatsapp-cards.png";
import buyerBids from "@/public/assets/feature-buyer-bids.png";
import pricingChart from "@/public/assets/feature-pricing-chart.png";
import heroMock from "@/public/assets/hero-loadboard.png";
import leafMark from "@/public/assets/agrovio-leaf.png";
import founderPhoto from "@/public/assets/founder-diego-torres.jpg";
import investorLogo from "@/public/assets/investor-santa-sofia.jpeg";

export default function HomePageES() {
  return (
    <>
      {/* Hero */}
      <GreenHero>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <div>
            <h1 className="text-[2.75rem] font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-[5rem]">
              <span className="block">Crece Más.</span>
              <span className="block">Vende Más.</span>
              <span className="block">Compra Más Rápido.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/90 sm:text-xl">
              Colabora a través de nuestro marketplace solo por invitación
            </p>
            <div className="mt-8">
              <PillLink href="/inviterequest" variant="white">
                <Image src={leafMark} alt="" className="h-5 w-auto" />
                Solicitar invitación
              </PillLink>
            </div>
            <p className="mt-6 text-sm text-white/60">Usado por +100 empresas agrícolas</p>
          </div>
          <div className="hidden lg:block">
            <Image src={heroMock} alt="Panel de Agrovio" className="w-full rounded-2xl shadow-2xl" />
          </div>
        </div>
      </GreenHero>

      {/* Tagline */}
      <Reveal>
        <section className="py-12 sm:py-28">
          <Container>
            <p className="mx-auto max-w-4xl text-center font-display text-3xl font-medium leading-tight tracking-tight text-ink/40 sm:text-[2.75rem] sm:leading-[1.15]">
              Convirtiendo cada <span className="text-ink">cosecha</span>, en cada{" "}
              <span className="text-ink">grado</span>, en un negocio que funciona para{" "}
              <span className="text-ink">todos</span>.
            </p>
          </Container>
        </section>
      </Reveal>

      {/* Stats */}
      <Reveal>
        <section className="py-12 sm:py-20">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <SectionHeading tone="brand">Accede a capacidad confiable en Perú y LATAM</SectionHeading>
              <p className="mt-4 text-lg text-ink/60">
                Trabaja con una red seleccionada de expertos en comercio agrícola.
              </p>
            </div>
            <div className="mt-12">
              <StatCardRow
                stats={[
                  { value: "22+", label: "Variedades de productos" },
                  { value: "20+", label: "Regiones" },
                  { value: "150+", label: "Productores y procesadores" },
                ]}
              />
            </div>
            <div className="mt-10 flex justify-center">
              <Badge>Red exclusiva de productores y compradores</Badge>
            </div>
          </Container>
        </section>
      </Reveal>

      {/* Feature rows */}
      <Reveal>
        <FeatureRow
          image={bidCards}
          imageAlt="Tarjeta de oferta y contra-oferta en Agrovio"
          imageSide="left"
          lead="Mayor cobertura para que puedas enfocarte en aumentar el volumen, construir relaciones y resolver problemas."
          heading="Conecta y negocia más rápido. 24/7"
          bullets={[
            "Publica tu cosecha en minutos",
            "Conéctate con compradores agrícolas verificados",
            "Disponible en toda América Latina",
          ]}
        />
      </Reveal>

      <Reveal>
        <FeatureRow
          image={whatsappCards}
          imageAlt="Notificaciones de trato por WhatsApp de Agrovio"
          imageSide="right"
          lead="Diseñado para manejar las complejidades del acopio agrícola."
          heading="Construido para el mercado agro de Perú y Latinoamérica"
          bullets={[
            "Integraciones WhatsApp",
            "Disponible en inglés y español",
            "Publicación de productos con detalles de categoría, volumen y precio",
          ]}
        />
      </Reveal>

      <Reveal>
        <FeatureRow
          image={buyerBids}
          imageAlt="Tabla de ofertas verificadas de compradores"
          imageSide="left"
          heading="Desbloquea el potencial total de tu red"
          bullets={[
            "Centraliza tus ofertas y publicaciones en un solo lugar",
            "Encuentra nuevos compradores agro y descubre demanda en tu red que no sabías que existía",
          ]}
        />
      </Reveal>

      <Reveal>
        <FeatureRow
          image={pricingChart}
          imageAlt="Precios de productos en tiempo real"
          imageSide="right"
          heading="Accede a datos precisos de precios de productos agrícolas"
          body="Ponle precio a tu cosecha con datos de transacciones verificadas en el marketplace. Actualizado en tiempo real y disponible al instante para que puedas negociar más rápido, cerrar mejores tratos y proteger tu margen."
        />
      </Reveal>

      {/* Mission band */}
      <Reveal className="reveal-fade">
        <section className="bg-brand py-16 sm:py-24">
          <Container>
            <div className="mx-auto max-w-3xl text-center text-white">
              <p className="text-lg leading-relaxed sm:text-xl">
                Mientras Perú lidera el crecimiento explosivo de las agroexportaciones en América Latina,
                Agrovio está construyendo software para simplificar todo el proceso de abastecimiento de
                productos agrícolas desde productores hasta procesadores y agroexportadores — también conocido como acopio.
              </p>
            </div>
          </Container>
        </section>
      </Reveal>

      {/* Leadership */}
      <Reveal>
        <section id="leadership" className="py-16 sm:py-24">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <SectionHeading>Equipo de liderazgo</SectionHeading>
            </div>
            <div className="mt-12 flex justify-center">
              <div className="text-center">
                <Image src={founderPhoto} alt="Diego Torres" className="mx-auto h-32 w-32 rounded-full object-cover" />
                <p className="mt-4 text-xs font-medium uppercase tracking-widest text-ink/50">FUNDADOR Y CEO</p>
                <p className="mt-1 text-lg font-medium">Diego Torres</p>
              </div>
            </div>
          </Container>
        </section>
      </Reveal>

      {/* Investors */}
      <Reveal>
        <section id="investors" className="border-t py-16 sm:py-24">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <SectionHeading>Nuestros inversores</SectionHeading>
            </div>
            <div className="mt-10 flex justify-center">
              <Image src={investorLogo} alt="Santa Sofia del Sur" className="h-16 w-auto object-contain" />
            </div>
          </Container>
        </section>
      </Reveal>

      {/* Invite form */}
      <Reveal>
        <section className="bg-surface py-16 sm:py-24">
          <Container>
            <div className="mx-auto max-w-xl">
              <SectionHeading className="text-center">
                Solicita una invitación para unirte a Agrovio hoy.
              </SectionHeading>
              <p className="mt-3 text-center text-ink/60">
                Cuéntanos un poco sobre tu operación y nos pondremos en contacto.
              </p>
              <div className="mt-10">
                <InviteForm />
              </div>
            </div>
          </Container>
        </section>
      </Reveal>
    </>
  );
}
