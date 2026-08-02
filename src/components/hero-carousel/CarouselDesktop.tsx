import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import backgroundImage from "@/assets/logo-comptel.svg";

// Importe ou receba os slides via props do orquestrador
interface GamerCarouselTabletProps {
  slides: any[];
}

export function CarouselDesktop({ slides }: GamerCarouselTabletProps) {
  return (
    // <div className="relative w-full max-w-338.5 mx-auto px-6 md:px-0 mt-8">
    <div className="relative w-full mx-auto max-w-338.5 px-6 mt-8 overflow-visible">
      <Carousel className="w-full">
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div
                className={`${slide.backgrondLayout} relative w-full aspect-1354/560 min-h-105 rounded-2xl overflow-hidden text-white grid grid-cols-12 items-center p-7.5 gap-4 `}
                aria-label={slide.ariaLabel}
              >
                <img
                  src={backgroundImage.src}
                  alt=""
                  aria-hidden="true"
                  className={`${slide.backgroundImage.className} animate-[slideLeft_1.8s_ease-out_forwards]`}
                />
                <div className="pl-8.5 col-span-12 sm:col-span-6 lg:col-span-5 flex flex-col justify-center items-start z-10 space-y-1 md:space-y-2 h-full animate-[slideRight_1.5s_ease-out_forwards]">
                  <p
                    className={`text-base sm:text-lg md:text-xl font-bold ${slide.text.ClassColor}`}
                  >
                    {slide.text.titleTop}
                  </p>
                  <p
                    className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tighter leading-none ${slide.text.ClassColor}`}
                  >
                    {slide.text.titleMain}
                  </p>
                  <p
                    className={`text-sm sm:text-base md:text-lg font-medium pb-2 md:pb-4 ${slide.text.ClassColor}`}
                  >
                    {slide.text.titleBottom}
                  </p>

                  <Button
                    variant="outline"
                    className="rounded-full bg-white text-blue-700 hover:bg-white/90 border-white px-5 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 text-sm sm:text-base font-semibold group flex items-center gap-2 transition-all relative z-20 mt-auto md:mt-12 animate-[fadeUp_1.2s_ease-out_0.4s_both]"
                  >
                    {slide.text.buttonText}
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>

                <div className="col-span-12 sm:col-span-6 lg:col-span-7 relative h-full flex items-center justify-center sm:justify-end z-10 overflow-hidden">
                  <img
                    src={slide.image.productsImage}
                    alt={slide.image.imageLabel}
                    className="h-full w-auto max-h-[95%] object-contain object-center sm:object-right drop-shadow-xl animate-[slideLeft_1.8s_ease-out_forwards]"
                    style={slide.image.style.desktop}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
