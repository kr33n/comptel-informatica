import { CarouselDesktop } from "./CarouselDesktop";
import { CarouselMobile } from "./CarouselMobile";

// Coloque o array 'slides' aqui para compartilhar entre as duas views
const slides = [
  {
    id: 1,
    backgroundImage: {
      className:
        "origin-center absolute inset-0 w-full h-full object-contain object-right pointer-events-none z-0 scale-150 translate-x-[15%] sm:translate-x-[-23%] md:translate-x-[-23%]",
    },
    backgrondLayout: "bg-[linear-gradient(180deg,#1919FE_0%,#2727D9_100%)]",
    ariaLabel: "Promoção de Setup Gamer de alta resolução",
    text: {
      ClassColor: "text-white",
      titleTop: "Jogue na",
      titleMain: "RESOLUÇÃO",
      titleBottom: "que você sempre quis!",
      buttonText: "Quero meu orçamento gamer",
    },
    image: {
      productsImage: "/assets/images/carousel-1.png",
      style: {
        desktop: { transform: "translateX(0px)" },
        tablet: { transform: "translateY(0px)" },
        mobile: { transform: "translateY(30px)" },
      },
      imageLabel: "Pc Gamer",
    },
  },
  {
    id: 2,
    backgroundImage: {
      className:
        "absolute -top-36 right-0 w-175 max-w-none h-auto pointer-events-none z-0 rotate-95 opacity-90",
    },
    backgrondLayout: "bg-[linear-gradient(180deg,#75A3FE_0%,#8EB4FF_100%)]",
    ariaLabel: "Promoção de Setup Gamer de alta resolução",
    text: {
      ClassColor: "text-white",
      titleTop: "Computadores",
      titleMain: "SOB MEDIDA",
      titleBottom: "para sua rotina!",
      buttonText: "Monte o seu agora",
    },
    image: {
      productsImage: "/assets/images/carousel-2.png",
      imageLabel: "Pc Office",
      style: {
        desktop: { transform: "translateX(0px)" },
        tablet: { transform: "translateY(0px)" },
        mobile: { transform: "translateY(30px)" },
      },
    },
  },
  {
    id: 3,
    backgroundImage: {
      className:
        "absolute -top-45 -right-37 w-178 max-w-none h-auto pointer-events-none z-0 rotate-99 opacity-90",
    },
    backgrondLayout: "bg-[#E1E7F3]",
    ariaLabel: "Promoção de Setup Gamer de alta resolução",
    text: {
      ClassColor: "text-[#6B99F5]",
      titleTop: "",
      titleMain: "PRODUTIVIDADE",
      titleBottom: "em qualquer lugar!",
      buttonText: "Chamar no WhatsApp",
    },
    image: {
      productsImage: "/assets/images/carousel-3.png",
      style: {
        desktop: { transform: "translateX(-2.6875rem)" },
        tablet: { transform: "translateY(1.3125rem)" },
        mobile: { transform: "translateY(30px) translateX(-0.375rem)" },
      },
      imageLabel: "Pc Office",
    },
  },
];

export function GamerCarousel() {
  return (
    <>
      {/* EXIBIDO APENAS EM MOBILE (telas menores que 'md' / 768px) */}
      <div className="block lg:hidden">
        <CarouselMobile slides={slides} />
      </div>

      {/* EXIBIDO APENAS EM DESKTOP (telas a partir de 'lg' / 1024px) */}
      <div className="hidden lg:block">
        <CarouselDesktop slides={slides} />
      </div>
    </>
  );
}
