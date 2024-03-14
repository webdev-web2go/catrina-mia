import Container from "@/components/container";
import SectionHeader from "@/components/section-header";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function CustomOrder() {
  return (
    <section className="mb-40">
      <Container className="grid items-center justify-items-center gap-y-6 antialiased md:grid-cols-2">
        <div className="relative order-2 w-5/6 shadow-sm md:order-none md:w-11/12 xl:w-2/3">
          <div
            aria-hidden
            className="absolute -bottom-3 -right-3 -z-10 h-full w-full bg-[#86405e] shadow-lg"
          />
          <Image
            src="/catrina/catrina2.webp"
            placeholder="blur"
            blurDataURL="/small_logo.webp"
            alt="Modelo caracterizada de catrina usando una diadema de Catrina Mía"
            width={1066}
            height={1600}
          />
        </div>
        <div className="space-y-4 sm:space-y-0 sm:p-6">
          <SectionHeader
            subtitle="Diademas personalizadas"
            title="¿Necesitas una diadema hecha a la medida?"
            className="items-start"
          />
          <div className="space-y-4 px-2 sm:p-6">
            <p>
              En Catrina Mía nos encanta crear modelos exclusivos para nuestras
              clientas. Por ello, contamos con el servicio de tocados
              personalizados. En él ofrecemos la asesoría personalizada por
              parte de nuestro equipo para encontrar el diseño, colores y
              complementos que representen el carácter y estilo de la invitada
              perfecta.
            </p>
            <p>
              Explícanos tu idea, enséñanos modelos que te gusten y trabajemos
              juntas en tu próxima diadema!
            </p>
            <footer>
              <Button className="w-full text-base font-semibold" size="lg">
                Cotizar diseño
              </Button>
            </footer>
          </div>
        </div>
      </Container>
    </section>
  );
}
