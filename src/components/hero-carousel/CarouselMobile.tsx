import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { type CarouselApi } from "@/components/ui/carousel";
import { motion, AnimatePresence, type Variants } from "framer-motion";

interface GamerCarouselMobileProps {
  slides: any[];
  carouselMotionVariants: Record<string, Variants>;
}

export function CarouselMobile({
  slides,
  carouselMotionVariants,
}: GamerCarouselMobileProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 7000, stopOnInteraction: false, stopOnMouseEnter: true }),
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
          {slides.map((slide, index) => {
            const isActive = current === index;

            return (
              <CarouselItem key={slide.id} className="overflow-visible pl-0!">
                <div
                  className="relative w-full min-h-115 h-auto flex flex-col items-center justify-between gap-4 sm:gap-8 p-5 sm:p-8 text-center"
                  aria-label={slide.ariaLabel}
                >
                  {/* Fundo do Card */}
                  <div
                    className={`${slide.backgrondLayout} absolute inset-0 rounded-3xl overflow-hidden z-0 h-auto`}
                  ></div>

                  {/* IMAGEM DO PRODUTO COM MOTION */}
                  <div className="relative w-full flex items-center justify-center z-20 -mt-16 sm:-mt-16">
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.img
                          key={`img-${slide.id}`}
                          initial="hidden"
                          animate="visible"
                          variants={carouselMotionVariants.image}
                          src={slide.image.productsImage}
                          alt={slide.image.imageLabel}
                          style={slide.image.style.mobile}
                          className="w-full h-44 sm:h-67.5 object-contain drop-shadow-2xl scale-100 sm:scale-110"
                        />
                      )}
                    </AnimatePresence>
                  </div>

                  {/* CONTEÚDO DE TEXTO E BOTÃO COM MOTION */}
                  <div className="flex flex-col items-center justify-center z-20 w-full pb-6 pt-8 sm:pb-8 gap-3 sm:gap-6">
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <>
                          <motion.div
                            custom={1}
                            initial="hidden"
                            animate="visible"
                            variants={carouselMotionVariants.text}
                            className="gap-4"
                          >
                            <h2
                              className={`text-[32px] font-bold tracking-[-0.64px] leading-11 ${slide.text.ClassColor} flex items-center justify-center gap-2 flex-wrap`}
                            >
                              {slide.text.titleTop && (
                                <span
                                  className={`font-bold ${slide.text.ClassColor}`}
                                >
                                  {slide.text.titleTop}
                                </span>
                              )}

                              <span className="uppercase">
                                {slide.text.titleMain}
                              </span>
                            </h2>
                            <p
                              className={`text-base text-[1.5rem] font-bold ${slide.text.ClassColor}`}
                            >
                              {slide.text.titleBottom}
                            </p>
                          </motion.div>

                          <motion.div
                            custom={2}
                            initial="hidden"
                            animate="visible"
                            variants={carouselMotionVariants.text}
                            className="w-full max-w-110 relative z-20 mt-4"
                          >
                            <Button
                              variant="outline"
                              className="w-full rounded-full bg-white text-blue-700 hover:bg-white/90 border-white py-6 text-base font-semibold group flex items-center justify-center gap-2 transition-all"
                            >
                              <p className="text-[16px] sm:text-[18px] font-semibold leading-[23.2px]">
                                {slide.text.buttonText}
                              </p>
                              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* CONTROLES DE PAGINAÇÃO (DOTS) */}
        <div className="absolute bottom-4 -left-10 flex pl-16 justify-left gap-2 z-20">
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
