import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/coming-soon";

export const metadata: Metadata = {
  title: "Agrovio Chat",
  description:
    "Negotiate price, share harvest context, and close deals in real time — available in Spanish and English.",
};

export default function ChatPage() {
  return (
    <ComingSoon
      eyebrow="Agrovio Chat"
      title="Every deal, one conversation."
      description="Negotiate price, share harvest context, and close in real time — available in Spanish and English. The Agrovio Chat experience is on its way."
    />
  );
}
