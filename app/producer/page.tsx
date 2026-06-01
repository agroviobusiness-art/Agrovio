import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/coming-soon";

export const metadata: Metadata = {
  title: "For Producers",
  description:
    "Agrovio connects producers of every size with processors and agro-exporters across Peru and LATAM.",
};

export default function ProducerPage() {
  return (
    <ComingSoon
      eyebrow="For small, medium & large producers"
      title="Start selling to the right buyer."
      description="The producer experience is on its way. Whether you farm 1 hectare or 100, Agrovio will connect you with processors and agro-exporters looking for exactly what you grow."
    />
  );
}
