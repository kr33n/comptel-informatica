import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export function LocationSection() {
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
    <section className="w-full mx-auto pt-24 lg:pt-34 px-16 lg:px-26.75 pb-12">
      {/* GRID RESPONSIVO */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1.4fr] items-center gap-34 tracking-[-1px]">
        {/* COLUNA 1: Textos */}
        <div
          data-aos="fade-up-right"
          data-aos-delay="500"
          className="flex flex-col space-y-8 gap-6"
        >
          <p className="text-5xl font-bold text-brand-primary leading-[120%]">
            Venha nos <br className="block lg:hidden" /> visitar!
          </p>

          <div className="flex flex-col text-black/55 text-[20px] font-medium leading-[145%]">
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
        </div>

        <div
          data-aos="fade-up-left"
          data-aos-delay="1000"
          className="relative w-full min-w-62 h-123 overflow-hidden bg-gray-100"
        >
          <iframe
            src="https://maps.google.com/maps?hl=pt&q=Comptel%20Inform%C3%A1tica&t=k&z=17&ie=UTF8&iwloc=B&output=embed"
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa da Comptel Informática no Google Maps"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
