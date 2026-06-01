import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/coming-soon";

export const metadata: Metadata = {
  title: "For Buyers",
  description:
    "Source verified produce with the grade, volume, and timing your business needs across Peru and LATAM.",
};

export default function BuyerPage() {
  return (
    <ComingSoon
      eyebrow="For processors, exporters & wholesalers"
      title="Source the produce you need. Faster."
      description="The buyer experience is on its way. Find verified growers across Peru and LATAM with the grade, volume, and timing your business needs."
    />
  );
}
