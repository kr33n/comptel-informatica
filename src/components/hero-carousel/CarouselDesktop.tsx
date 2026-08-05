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
import { siteConfig } from "@/siteConfig";
import { motion, AnimatePresence, type Variants } from "framer-motion";

interface GamerCarouselTabletProps {
  slides: any[];
  carouselMotionVariants: Record<string, Variants>;
}

export function CarouselDesktop({
  slides,
  carouselMotionVariants,
}: GamerCarouselTabletProps) {
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

  const textVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.5,
        duration: 2,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const bgImageVariants: Variants = {
    hidden: {
      opacity: -5,
      x: 500,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 2.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative w-full mx-auto max-w-338.5 px-6 mt-8 overflow-visible">
      <Carousel
        className="w-full"
        plugins={[plugin.current]}
        opts={{ loop: true }}
        setApi={setApi}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {slides.map((slide, index) => {
            const isActive = current === index;

            return (
              <CarouselItem key={slide.id}>
                <div
                  className={`${slide.backgrondLayout} relative w-full aspect-1354/560 min-h-105 rounded-2xl overflow-hidden text-white grid grid-cols-12 items-center p-7.5 gap-4`}
                >
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.img
                        key={`bg-${slide.id}`}
                        initial="hidden"
                        animate="visible"
                        variants={carouselMotionVariants.image}
                        aria-label={slide.ariaLabel}
                        src={backgroundImage.src}
                        alt={slide.ariaLabel}
                        aria-hidden="true"
                        className={slide.backgroundImage.className}
                      />
                    )}
                  </AnimatePresence>

                  {/* BLOCO DE TEXTOS COM ANIMAÇÃO */}
                  <div className="pl-8.5 gap-1 col-span-12 lg:col-span-5 flex flex-col justify-center items-start z-10 space-y-1 h-full">
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <>
                          <motion.p
                            custom={1}
                            initial="hidden"
                            animate="visible"
                            variants={carouselMotionVariants.text}
                            className={`text-4xl font-bold leading-12 tracking-[-0.72px] ${slide.text.ClassColor}`}
                          >
                            {slide.text.titleTop}
                          </motion.p>

                          <motion.p
                            custom={2}
                            initial="hidden"
                            animate="visible"
                            variants={carouselMotionVariants.text}
                            className={`uppercase text-[56px] font-extrabold leading-14 tracking-[0.035rem] ${slide.text.ClassColor}`}
                          >
                            {slide.text.titleMain}
                          </motion.p>

                          <motion.p
                            custom={3}
                            initial="hidden"
                            animate="visible"
                            variants={carouselMotionVariants.text}
                            className={`text-4xl font-bold leading-12 tracking-[-0.72px] ${slide.text.ClassColor}`}
                          >
                            {slide.text.titleBottom}
                          </motion.p>

                          <motion.div
                            custom={4}
                            initial="hidden"
                            animate="visible"
                            variants={carouselMotionVariants.text}
                            className="mt-auto md:mt-12 relative z-20"
                          >
                            <Button
                              onClick={() => {
                                window.open(
                                  siteConfig.links.whatsappUrl +
                                    siteConfig.phone +
                                    `?text=${siteConfig.whatsappText}` +
                                    slide.ariaLabel,
                                  "_blank",
                                  "noopener,noreferrer",
                                );
                              }}
                              variant="outline"
                              className={`group flex items-center rounded-full bg-white ${slide.text.buttonTextColor} hover:${slide.text.buttonTextColor} hover:bg-white/90 px-4 gap-2 transition-all hover:scale-[1.09] cursor-pointer text-[18px] py-6 font-semibold leading-[145%] tracking-[-0.09px] text-lg md:text-xl`}
                            >
                              {slide.text.buttonText}
                              <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 transition-transform" />
                            </Button>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* BLOCO DA IMAGEM DO PRODUTO COM ANIMAÇÃO */}
                  <div className="col-span-12 sm:col-span-6 lg:col-span-7 relative h-full flex items-center justify-center sm:justify-end z-10 overflow-hidden">
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.img
                          key={slide.id}
                          initial="hidden"
                          animate="visible"
                          variants={carouselMotionVariants.image}
                          src={slide.image.productsImage}
                          alt={slide.image.imageLabel}
                          className="h-full w-auto max-h-[95%] object-contain object-center sm:object-right drop-shadow-xl"
                          style={slide.image.style.desktop}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* PAGINAÇÃO DE DOTS */}
        <div className="absolute bottom-6 left-0 right-0 flex pl-16 justify-left gap-2 z-20">
          {Array.from({ length: slides.length }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`p-2 w-3 h-3 rounded-full transition-all duration-300 ${
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
