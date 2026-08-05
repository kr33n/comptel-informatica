import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

const imageModules = import.meta.glob<{ default: any }>(
  "@/assets/brands/*.{png,jpg,jpeg,svg,webp}",
  { eager: true },
);

const brands = Object.entries(imageModules).map(([path, module], index) => {
  const fileName = path.split("/").pop()?.split(".")[0] || `marca-${index}`;

  return {
    id: index,
    name: fileName,
    src:
      typeof module.default === "string" ? module.default : module.default?.src,
  };
});

function Card() {
  const displayBrands = brands.length < 6 ? [...brands, ...brands] : brands;

  return displayBrands.map((brand, i) => (
    <div
      key={`brand-${brand.id}-${i}`}
      className="w-24 sm:w-32 h-12 flex items-center justify-center shrink-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110"
    >
      <img
        src={brand.src}
        alt={brand.name}
        width={96}
        height={48}
        className="max-w-full sm:w-32 h-12 max-h-full w-auto object-contain shrink-0"
      />
    </div>
  ));
}

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function BrandsCarousel() {
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.3,
  });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white flex flex-col items-center overflow-hidden"
    >
      <div className="relative w-full max-w-6xl mx-auto py-10 lg:py-16">
        <motion.p
          variants={revealVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-[#0000008C] text-[16px] lg:text-[20px] font-medium text-center mb-8 px-10"
        >
          Trabalhamos com as melhores marcas do mercado
        </motion.p>

        <motion.div
          className="relative flex w-full overflow-hidden mask-[linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)] border-x-18 border-white lg:pb-26"
          variants={revealVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            className="flex shrink-0 gap-8 sm:gap-16 items-center pr-8 sm:pr-16"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 25,
              repeat: Infinity,
            }}
            whileHover={{ transition: { duration: 0 } }}
          >
            <Card />
            <Card />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
