import Image from "next/image";
import Link from "next/link";
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
import southAmericaMap from "@/public/assets/south-america-map.jpg";

export default function HomePageES() {
  return (
    <>
      {/* Hero */}
      <GreenHero>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <div>
            <h1 className="text-[2.75rem] font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-[5rem]">
              <span className="block">Produce más.</span>
              <span className="block">Vende más.</span>
              <span className="block">Compra más rápido.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/90 sm:text-xl">
              Colabora a través de nuestro marketplace solo por invitación
            </p>
            <div className="mt-8">
              <PillLink href="/inviterequest" variant="white">
                <Image src={leafMark} alt="" className="h-5 w-auto" />
                Solicita tu acceso
              </PillLink>
            </div>
          </div>

          <div className="lg:justify-self-end">
            <Image
              src={heroMock}
              alt="El panel de Agrovio con publicaciones de cosecha en vivo y notificaciones de trato por WhatsApp"
              sizes="(max-width: 1024px) 100vw, 620px"
              className="h-auto w-full"
              quality={90}
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>

        <p className="mt-10 text-sm text-white/80 sm:mt-14">
          Con la confianza de +100 empresas agro
        </p>
      </GreenHero>

      {/* Tagline */}
      <Reveal>
        <section className="py-12 sm:py-28">
          <Container>
            <p className="mx-auto max-w-4xl text-center font-display text-3xl font-medium leading-tight tracking-tight text-ink/40 sm:text-[2.75rem] sm:leading-[1.15]">
              Convirtiendo cada <span className="text-ink">cosecha</span>, en cada{" "}
              <span className="text-ink">grado</span>, en un negocio que funciona
              para <span className="text-ink">todos</span>.
            </p>
          </Container>
        </section>
      </Reveal>

      {/* Stats */}
      <Reveal>
        <section className="py-12 sm:py-20">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <SectionHeading tone="brand">
                Accede a capacidad confiable en Perú y LATAM
              </SectionHeading>
              <p className="mt-4 text-lg text-ink/60">
                Trabaja con una red seleccionada de expertos en comercio agrícola.
              </p>
            </div>
            <div className="mt-12">
              <StatCardRow
                stats={[
                  { value: "22+", label: "Variedades de productos" },
                  { value: "20+", label: "Regiones" },
                  { value: "150+", label: "Productores y Procesadores" },
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
          lead="Mayor cobertura significa que puedes enfocarte en aumentar tu volumen, construir relaciones y resolver problemas."
          heading="Conecta y negocia más rápido. 24/7"
          bullets={[
            "Publica tu cosecha en minutos",
            "Conéctate con compradores agro verificados",
            "Disponible en toda Latinoamérica",
          ]}
        />
      </Reveal>

      <Reveal>
        <FeatureRow
          image={whatsappCards}
          imageAlt="Notificaciones de trato por WhatsApp de Agrovio"
          imageSide="right"
          lead="Diseñado para manejar las complejidades del acopio agrícola."
          heading="Diseñado para el mercado agro de Perú y Latinoamérica"
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
        <section className="bg-hero-gradient py-12 text-white sm:py-28">
          <Container>
            <p className="mx-auto max-w-4xl text-center font-display text-2xl font-medium leading-snug tracking-tight sm:text-[2rem] sm:leading-[1.3]">
              Mientras Perú lidera el crecimiento explosivo de las agroexportaciones
              en Latinoamérica, Agrovio está desarrollando software para simplificar
              todo el proceso de acopio agrícola — desde los productores hasta los
              procesadores y agroexportadores.
            </p>
          </Container>
        </section>
      </Reveal>

      {/* Leadership */}
      <Reveal>
        <section id="leadership" className="scroll-mt-28 py-12 sm:py-28">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <SectionHeading>Equipo directivo</SectionHeading>
            </div>
            <div className="mx-auto mt-12 grid max-w-3xl items-center gap-8 sm:grid-cols-[280px_1fr] sm:gap-12">
              <div className="overflow-hidden rounded-3xl">
                <Image
                  src={founderPhoto}
                  alt="Diego Torres, Fundador y CEO de Agrovio"
                  sizes="(max-width: 640px) 100vw, 280px"
                  className="h-auto w-full"
                  quality={90}
                />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-brand-dark">
                  Fundador y CEO
                </p>
                <p className="mt-2 font-display text-3xl font-medium tracking-tight text-ink">
                  Diego Torres
                </p>
              </div>
            </div>
          </Container>
        </section>
      </Reveal>

      {/* Investors */}
      <Reveal>
        <section id="investors" className="scroll-mt-28 py-12 sm:py-24">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <SectionHeading>Nuestros inversores</SectionHeading>
            </div>
            <div className="mt-12 flex flex-col items-center gap-4">
              <Link
                href="https://stasofia.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Santa Sofia del Sur"
                className="block overflow-hidden rounded-2xl ring-1 ring-black/[0.06] transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <Image
                  src={investorLogo}
                  alt="Santa Sofia del Sur"
                  sizes="340px"
                  className="h-auto w-[300px] sm:w-[340px]"
                />
              </Link>
              <span className="text-sm text-ink/55">Santa Sofia del Sur</span>
            </div>
          </Container>
        </section>
      </Reveal>

      {/* Invite form */}
      <Reveal>
        <section id="invite" className="scroll-mt-28 py-12 sm:py-28">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <SectionHeading>
                  Solicita tu invitación para unirte a Agrovio hoy.
                </SectionHeading>
                <p className="mt-4 text-lg text-ink/60">
                  Cuéntanos un poco sobre tu operación y nos pondremos en contacto contigo.
                </p>
                <Image
                  src={southAmericaMap}
                  alt="Agrovio opera en Perú y América Latina"
                  sizes="(max-width: 1024px) 60vw, 440px"
                  className="mt-10 w-full max-w-xs sm:max-w-sm lg:max-w-md"
                />
              </div>
              <div className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-sm sm:p-10">
                <InviteForm />
              </div>
            </div>
          </Container>
        </section>
      </Reveal>
    </>
  );
}
