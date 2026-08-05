import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

import pcTrabalhoImg from "@/assets/cards/office.webp";
import pcGamerImg from "@/assets/cards/gamer.webp";
import perifericosImg from "@/assets/cards/perifericos.webp";

const features = [
  {
    id: 1,
    title: "Foco total no trabalho",
    description:
      "Desempenho ágil para tarefas diárias. Planilhas, textos e e-mails sem travamentos irritantes.",
    image: pcTrabalhoImg,
    imageClasses: "w-[120px] lg:w-[150px]",
  },
  {
    id: 2,
    title: "Domine seus jogos",
    description:
      "Gráficos incríveis e FPS alto. Jogue cada batalha com uma máquina montada com as melhores peças.",
    image: pcGamerImg,
    imageClasses: "w-[180px] lg:w-[220px]",
  },
  {
    id: 3,
    title: "Periféricos & Acessórios",
    description:
      "Teclados, mouses, headsets e muito mais. Mais conforto, precisão e estilo para o seu dia a dia.",
    image: perifericosImg,
    imageClasses: "w-[250px] lg:w-[300px]",
  },
];

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function FeatureCardItem({ item }: { item: (typeof features)[0] }) {
  const cardRef = useRef(null);

  const isInView = useInView(cardRef, {
    once: false,
    amount: 0.3,
  });

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="flex flex-col bg-white rounded-[2rem] border border-gray-100 text-left h-full shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
    >
      <div className="w-full h-40 lg:h-45 flex justify-center items-end pointer-events-none px-6">
        <img
          src={item.image.src}
          alt={item.title}
          className={`object-contain drop-shadow-2xl transition-all duration-300 ${item.imageClasses}`}
        />
      </div>

      <div className="flex flex-col gap-2 grow p-6 pt-4">
        <h3 className="text-2xl font-semibold text-brand-primary leading-[34.8px] tracking-[-0.48px] text-nowrap sm:text-balance">
          {item.title}
        </h3>
        <p className="text-base text-[#0000008C] font-medium leading-6 tracking-[-0.08px]">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export function FeatureCards() {
  return (
    <section className="w-full lg:max-w-360 mx-auto px-4 lg:px-28">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-18 lg:gap-y-0 gap-x-6 lg:gap-x-8 min-h-102.25 mt-25">
        {features.map((item) => (
          <FeatureCardItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
