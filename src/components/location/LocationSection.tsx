import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
const textContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 2, ease: [0.22, 1, 0.36, 1] },
  },
};

const mapVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function LocationSection() {
  const sectionRef = useRef(null);
  const mapRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const isMapInView = useInView(mapRef, { once: false, amount: 0.2 });
  return (
    // <section className="w-full mx-auto pt-24 lg:pt-34 px-16 lg:px-26.75 pb-12">
    <section
      ref={sectionRef}
      className="w-full mx-auto pt-24 lg:pt-34 px-16 lg:px-26.75 pb-12 overflow-hidden"
    >
      {/* GRID RESPONSIVO */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] items-center gap-16 lg:gap-34 tracking-[-1px]">
        {/* COLUNA 1: Textos */}
        {/* <div className="flex flex-col  gap-6"> */}
        {/* <p className="text-5xl font-bold text-brand-primary leading-[120%]">
            Venha nos <br className="block lg:hidden" /> visitar!
          </p> */}
        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          animate={isSectionInView ? "visible" : "hidden"}
          className="flex flex-col gap-6"
        >
          <motion.p
            variants={textItemVariants}
            className="text-5xl font-bold text-brand-primary leading-[120%]"
          >
            Venha nos <br className="block lg:hidden" /> visitar!
          </motion.p>

          <motion.div
            variants={textItemVariants}
            className="flex flex-col text-black/55 text-[20px] font-medium leading-[145%]"
          >
            <p>Shopping Laranjeiras, loja 138</p>
            <p>Serra, Espírito Santo</p>
          </motion.div>

          <motion.div
            variants={textItemVariants}
            className="flex flex-col leading-[145%] text-black/55 text-[20px]"
          >
            <div className="flex flex-col">
              <h3 className="font-bold">Horário de Funcionamento</h3>
              <p className="font-medium">Seg a Sex - 09h às 19h</p>
              <p className="font-medium">Sab - 9h às 18h</p>
              <p className="font-medium">Dom - Fechado</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          ref={mapRef}
          variants={mapVariants}
          initial="hidden"
          animate={isMapInView ? "visible" : "hidden"}
          className="relative w-full min-w-62 h-123 overflow-hidden bg-gray-100"
        >
          {/* 2. Adicione pointer-events-none lg:pointer-events-auto block */}
          <iframe
            src="https://maps.google.com/maps?hl=pt&q=Comptel%20Inform%C3%A1tica&t=k&z=17&ie=UTF8&iwloc=B&output=embed"
            className="absolute inset-0 w-full h-full border-0 pointer-events-none lg:pointer-events-auto block"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa da Comptel Informática no Google Maps"
          ></iframe>
        </motion.div>

        {/* <div className="flex flex-col text-black/55 text-[20px] font-medium leading-[145%]">
            <p>Shopping Laranjeiras, loja 138</p>
            <p>Serra, Espírito Santo</p>
          </div>
          <div className="flex flex-col leading-[145%] text-black/55 text-[20px]">
            <div className="flex flex-col">
              <h3 className="font-bold">Horário de Funcionamento</h3>
              <p className="font-medium">Seg a Sex - 09h às 19h</p>
              <p className="font-medium">Sab - 9h às 18h</p>
              <p className="font-medium">Dom - Fechado</p>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
