import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

// Importe as imagens reais do seu projeto
import pcTrabalhoImg from "@/assets/cards/office.png";
import pcGamerImg from "@/assets/cards/gamer.png";
import perifericosImg from "@/assets/cards/perifericos.png";

const features = [
  {
    id: 1,
    title: "Foco total no trabalho",
    description:
      "Desempenho ágil para tarefas diárias. Planilhas, textos e e-mails sem travamentos irritantes.",
    image: pcTrabalhoImg,
    imageClasses: "w-32 sm:w-40 md:w-44 -mt-16 sm:-mt-20 md:-mt-24",
  },
  {
    id: 2,
    title: "Domine seus jogos",
    description:
      "Gráficos incríveis e FPS alto. Jogue cada batalha com uma máquina montada com as melhores peças.",
    image: pcGamerImg,
    imageClasses: "w-48 sm:w-56 md:w-60 -mt-20 sm:-mt-24 md:-mt-28",
  },
  {
    id: 3,
    title: "Periféricos & Acessórios",
    description:
      "Teclados, mouses, headsets e muito mais. Mais conforto, precisão e estilo para o seu dia a dia.",
    image: perifericosImg,
    imageClasses:
      "w-64 sm:w-72 md:w-80 -mt-16 sm:-mt-20 md:-mt-20 scale-110 md:scale-110",
  },
];

export function FeatureCards() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
    // Força o AOS a recalcular as posições após a hidratação do React
    AOS.refresh();
  }, []);

  return (
    <section className="w-full max-w-300 mx-auto px-6 sm:py-32 py-28  pb-0!">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-28 md:gap-y-0 gap-x-6 lg:gap-x-10">
        {features.map((item, index) => (
          <div
            key={item.id}
            // 2. Os atributos do AOS que adicionamos continuam aqui!
            data-aos="fade-up"
            data-aos-delay={index * 150}
            className="relative bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] px-6 pb-8 sm:pb-10 flex flex-col text-left h-full"
          >
            <div className="relative w-full h-32 sm:h-36 md:h-40 lg:h-44 flex justify-center z-10 pointer-events-none">
              <img
                src={item.image.src}
                alt={item.title}
                className={`object-contain drop-shadow-2xl transition-all ${item.imageClasses}`}
              />
            </div>

            <div className="mt-2 sm:mt-3 flex flex-col gap-3">
              <h3 className="text-xl lg:text-2xl font-bold text-blue-700 tracking-tight">
                {item.title}
              </h3>
              <p className="text-sm lg:text-base text-gray-500 font-medium leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
