import logoComptel from "@/assets/logo-branding-horizontal.svg";

export function Header() {
  return (
    <header className="w-full bg-white pt-6 pb-0 overflow-visible flex items-center justify-center">
      <div className="flex items-center justify-center">
        <img
          src={logoComptel.src}
          width={200}
          height={50}
          alt="Logo Comptel Informática"
          className="h-8 sm:h-10 w-auto object-contain"
        />
      </div>
    </header>
  );
}
