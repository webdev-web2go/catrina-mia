import Image from "next/image";
import { PropsWithChildren } from "react";

export default function HeroSection({ children }: PropsWithChildren) {
  return (
    <section className="relative min-h-screen w-full">
      <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-10 md:w-fit md:px-0">
        <Image
          priority
          src="/logo_letters.webp"
          alt="Logo de catrina mía"
          width={1296}
          height={340}
          className="z-50 h-auto w-full animate-fade-up motion-reduce:animate-none"
        />
      </div>
      {children}
      <div
        aria-hidden
        className="absolute bottom-0 top-0 z-10 h-full w-full
    bg-gradient-to-b from-transparent from-30% to-black"
      />
    </section>
  );
}
