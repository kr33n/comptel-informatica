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
      key={`track2-${brand.id}-${i}`}
      // Define uma caixa fixa padrão para todas as marcas
      className="w-24 sm:w-32 h-10 flex items-center justify-center shrink-0"
    >
      <img
        src={brand.src}
        alt={brand.name}
        // max-w-full e max-h-full garantem que a logo preencha a caixa sem sair dela
        className="max-w-full max-h-full w-auto h-auto object-contain shrink-0 transition-all duration-300"
      />
    </div>
  ));
}

export function BrandsCarousel() {
  return (
    <section className="w-full bg-white flex flex-col items-center overflow-hidden">
      <div className="relative w-full">
        <p className="text-[#0000008C] text-[16px] lg:text-[20px] leading-5.75 sm:text-[20px] font-medium text-center p-10 lg:pt-26 sm:pt-18">
          Trabalhamos com as melhores marcas do mercado
        </p>

        <div className="relative flex w-full overflow-hidden max-w-300 mx-auto group border-x-18 border-white lg:pb-26">
          <div className="flex shrink-0 animate-marquee gap-8 sm:gap-12 px-4 sm:px-6 items-center will-change-transform">
            <Card />
          </div>

          <div
            className="flex shrink-0 animate-marquee gap-8 sm:gap-12 px-4 sm:px-6 items-center will-change-transform"
            aria-hidden="true"
          >
            <Card />
          </div>
        </div>
      </div>
    </section>
  );
}
