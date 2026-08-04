import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import backgroundImage from "@/assets/logo-comptel.svg";
import React, { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { type CarouselApi } from "@/components/ui/carousel";

interface GamerCarouselMobileProps {
  slides: any[];
}

export function CarouselMobile({ slides }: GamerCarouselMobileProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
  return (
    <div className="relative w-full mx-auto px-6 overflow-x-clip">
      <Carousel
        className="w-full overflow-visible"
        plugins={[plugin.current]}
        opts={{ loop: true }}
        setApi={setApi}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="overflow-visible m-0! pt-11">
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="overflow-visible pl-0!">
              <div
                className="relative w-full min-h-115 h-auto flex flex-col items-center justify-between gap-4 sm:gap-8 p-5 sm:p-8 text-center"
                aria-label={slide.ariaLabel}
              >
                <div
                  className={`${slide.backgrondLayout} absolute inset-0 rounded-3xl overflow-hidden z-0 h-auto`}
                ></div>

                <div className="relative w-full flex items-center justify-center  z-20 -mt-16 sm:-mt-16 animate-[slideLeft_1.8s_ease-out_forwards]">
                  <img
                    src={slide.image.productsImage}
                    alt={slide.image.imageLabel}
                    style={slide.image.style.mobile}
                    className="w-full h-44 sm:h-67.5 object-contain drop-shadow-2xl scale-100 sm:scale-110"
                  />
                </div>

                <div className="flex flex-col items-center justify-center z-20 w-full pb-6 pt-8 sm:pb-8 gap-3 sm:gap-6">
                  <div className="animate-[slideRight_1.5s_ease-out_forwards] gap-4 ">
                    <h2
                      className={`text-[32px] font-bold tracking-[-0.64px] leading-11 ${slide.text.ClassColor} flex items-center justify-center gap-2 flex-wrap`}
                    >
                      {slide.text.titleTop && (
                        <span
                          className={` text- font-bold ${slide.text.ClassColor}`}
                        >
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
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-4 -left-10 flex pl-16 justify-left gap-2 z-20 animate-[fadeUp_1.2s_ease-out_0.4s_both]">
          {Array.from({ length: slides.length }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                current === index
                  ? "bg-white scale-110"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Ir para o slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}
