import logoComptel from "@/assets/logo-branding-horizontal.svg";

export function Header() {
  return (
    /* 
      1. pt-6 mantém o respiro do topo.
      2. pb-0 zera o padding inferior para colar o carrossel.
      3. overflow-visible permite que o gabinete suba sobre o Header sem cortar!
    */
    <header className="w-full bg-white pt-6 pb-0 overflow-visible flex items-center justify-center">
      <div className="flex items-center justify-center">
        <img
          src={logoComptel.src}
          alt="Comptel Informática"
          className="h-8 sm:h-10 w-auto object-contain"
        />
      </div>
    </header>
  );
}
