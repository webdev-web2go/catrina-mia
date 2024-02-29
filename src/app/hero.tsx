import HeroSection from "@/components/hero-section";

export default function MainHero() {
  return (
    <HeroSection>
      <video
        autoPlay
        loop
        muted
        playsInline
        id="main-video"
        preload="metadata"
        className="aspect-video min-h-screen w-full object-cover object-center"
      >
        <source src="/hero/hero-video.mp4" type="video/mp4" />
      </video>
    </HeroSection>
  );
}
