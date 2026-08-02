import React from "react";

// 1. O Vite/Astro importa todos os arquivos da pasta 'brands' automaticamente
const imageModules = import.meta.glob<{ default: any }>(
  "@/assets/brands/*.{png,jpg,jpeg,svg,webp}",
  { eager: true },
);

// 2. Transformamos o objeto retornado em um array fácil de mapear no HTML
const brands = Object.entries(imageModules).map(([path, module], index) => {
  // Pega o nome do arquivo (ex: "nvidia.png" vira "nvidia") para usar no alt
  const fileName = path.split("/").pop()?.split(".")[0] || `marca-${index}`;

  return {
    id: index,
    name: fileName,
    // No Astro, imagens importadas podem vir como string ou um objeto { src, width, height }
    src:
      typeof module.default === "string" ? module.default : module.default?.src,
  };
});

function Card() {
  const displayBrands = brands.length < 6 ? [...brands, ...brands] : brands;
  return displayBrands.map((brand, i) => (
    <img
      key={`track2-${brand.id}-${i}`}
      src={brand.src}
      alt={brand.name}
      className="max-h-8 sm:h-10 w-auto object-contain transition-all duration-300"
    />
  ));
}

export function BrandsCarousel() {
  return (
    <section className="w-full bg-white flex flex-col items-center overflow-hidden">
      <div
        className="relative w-full"
        data-aos="fade-in"
        data-aos-duration="1800"
        data-aos-delay="300"
        data-aos-easing="ease-out-cubic"
      >
        <p
          className="text-[#0000008C] lg:text-[20px] leading-5.75 sm:text-[16px] font-medium text-center
        p-10 lg:pt-26 sm:pt-18"
        >
          Trabalhamos com as melhores marcas do mercado
        </p>
        <div className="relative flex w-full overflow-hidden max-w-300 mx-auto group border-x-18 border-white lg:pb-26 sm:pb-18">
          <div className="flex shrink-0 animate-marquee gap-12 px-6 items-center">
            <Card />
          </div>
          <div
            className="flex shrink-0 animate-marquee gap-12 px-6 items-center"
            aria-hidden="true"
          >
            <Card />
          </div>
        </div>
      </div>
    </section>
  );
}
