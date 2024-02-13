import Image from "next/image";

export default function Hero() {
  return (
    <section className="h-full w-full">
      <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-10 md:w-fit md:px-0">
        <Image
          src="/logo_letters.webp"
          alt="Logo de catrina mía"
          width={600}
          height={200}
          className="w-full brightness-150"
        />
      </div>
      <video
        autoPlay
        loop
        muted
        playsInline
        id="main-video"
        preload="metadata"
        className="aspect-video h-full w-full object-cover object-center"
      >
        <source src="/hero/hero-video.mp4" type="video/mp4" />
      </video>
      <div
        aria-hidden={true}
        className="absolute bottom-0 top-0 z-10 h-full w-full
    bg-gradient-to-b from-transparent from-30% to-black"
      />
    </section>
  );
}
