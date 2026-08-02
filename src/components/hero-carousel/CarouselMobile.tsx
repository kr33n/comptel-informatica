import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import backgroundImage from "@/assets/logo-comptel.svg";

interface GamerCarouselMobileProps {
  slides: any[];
}

export function CarouselMobile({ slides }: GamerCarouselMobileProps) {
  return (
    <div className="relative w-full mx-auto px-6 overflow-visible">
      <Carousel className="w-full overflow-visible">
        <CarouselContent className="overflow-visible m-0! pt-11">
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="overflow-visible pl-0!">
              <div
                className="relative w-full h-130 flex flex-col items-center sm:justify-start gap-16 p-6 sm:p-8 text-center"
                aria-label={slide.ariaLabel}
              >
                <div
                  className={`${slide.backgrondLayout} absolute inset-0 rounded-3xl overflow-hidden z-0`}
                ></div>

                <div className="relative w-full flex items-center justify-center z-20 -mt-16 sm:-mt-16 animate-[slideLeft_1.8s_ease-out_forwards]">
                  <img
                    src={slide.image.productsImage}
                    alt={slide.image.imageLabel}
                    style={slide.image.style.mobile}
                    className="w-full h-auto max-h-67.5 sm:max-h-75 object-contain drop-shadow-2xl scale-110"
                  />
                </div>

                <div className="flex flex-col items-center justify-center z-20 w-full -mt-4 pt-8.75">
                  <div className="animate-[slideRight_1.5s_ease-out_forwards]">
                    <h2
                      className={`text-[2rem] font-bold tracking-tight ${slide.text.ClassColor} flex items-center justify-center gap-2 flex-wrap`}
                    >
                      {slide.text.titleTop && (
                        <span className={`font-bold ${slide.text.ClassColor}`}>
                          {slide.text.titleTop}
                        </span>
                      )}

                      <span className="uppercase">{slide.text.titleMain}</span>
                    </h2>
                    <p
                      className={`text-base text-[1.5rem] font-bold ${slide.text.ClassColor}`}
                    >
                      {slide.text.titleBottom}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full max-w-110 rounded-full bg-white text-blue-700 hover:bg-white/90 border-white py-6 text-base font-semibold group flex items-center justify-center gap-2 transition-all relative z-20 mt-4 animate-[fadeUp_1.2s_ease-out_0.4s_both]"
                  >
                    <p className="text-[16px] sm:text-[18px] font-semibold leading-[23.2px]">
                      {slide.text.buttonText}
                    </p>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
