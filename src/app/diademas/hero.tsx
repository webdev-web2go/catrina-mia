import HeroSection from "@/components/hero-section";
import Image from "next/image";

export default function DiademasHero() {
  return (
    <HeroSection>
      <Image
        priority
        fill
        src="/hero/diademas_hero.webp"
        alt="Violinista maquillada de catrina con diadema de catrina mía, posando"
        className="-z-10 h-screen w-auto object-cover object-center"
      />
    </HeroSection>
  );
}
