import React from "react";

export default function ModeloPaisagem({ data }) {
  const showOldPrice = data.precoAntigo && data.precoAntigo.trim() !== "";

  // Lógica para reduzir o tamanho da fonte dinamicamente se o valor for muito grande
  const precoStr = data.preco || "0,00";
  const precoLength = precoStr.length;

  // Tamanhos padrões (até 9.999,99 - 8 caracteres)
  let precoClass = "text-[6rem]";
  let cifraoClass = "text-4xl mr-3";

  // Ajuste para 10 mil a 999 mil (9 a 10 caracteres, ex: 99.999,99)
  if (precoLength >= 9 && precoLength <= 10) {
    precoClass = "text-[5rem]";
    cifraoClass = "text-3xl mr-3";
  }
  // Ajuste para valores milionários (11+ caracteres, ex: 1.000.000,00)
  else if (precoLength > 10) {
    precoClass = "text-[4rem]";
    cifraoClass = "text-2xl mr-3";
  }

  return (
    <div
      className="relative w-full h-full bg-white flex items-center justify-center overflow-hidden border border-gray-300"
      style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
    >
      {/* Imagens das Bordas */}
      <img
        src="/assets/etiquetas/logo-cima.svg"
        alt="Grafismo Superior"
        className="absolute top-0 left-0 object-contain pointer-events-none select-none z-0"
        style={{ width: "320px", height: "320px" }}
      />

      <img
        src="/assets/etiquetas/logo-baixo.svg"
        alt="Grafismo Inferior"
        className="absolute bottom-0 right-0 object-contain pointer-events-none select-none z-0"
        style={{ width: "320px", height: "320px" }}
      />

      {/* Conteúdo Central - Limitado a 90% da largura da folha */}
      <div className="relative z-10 flex w-full max-w-[90%] items-center justify-between px-8">
        {/* Coluna 1: Títulos (Esquerda - 45% da área) */}
        <div className="flex flex-col items-start w-[45%]">
          <h1 className="font-bold text-left text-[#0022e6] leading-tight text-5xl mb-4">
            {data.titulo1 || "Nome do Produto"}
          </h1>
          <h2 className="font-medium text-left text-[#0022e6] text-3xl">
            {data.titulo2 || "Subtítulo / Descrição"}
          </h2>
        </div>

        {/* Coluna 2: Preços (Direita - 55% da área) */}
        <div className="flex flex-col items-start w-[55%] pl-12">
          <div className="flex flex-col items-start mb-8">
            <span className="font-bold text-[#0022e6] uppercase tracking-wider text-2xl mb-2">
              {data.pagamento || "À VISTA"}
            </span>
            <div className="flex items-baseline">
              <span className={`font-medium text-[#0022e6] ${cifraoClass}`}>
                R$
              </span>
              <span
                className={`font-black text-[#0022e6] leading-none tracking-tighter ${precoClass}`}
              >
                {precoStr}
              </span>
            </div>
          </div>

          {showOldPrice && (
            <div className="flex flex-col items-start">
              <span className="font-bold text-[#0022e6] text-xl mb-1">DE:</span>
              <div className="relative flex items-center opacity-80">
                <span className="font-medium text-[#0022e6] text-2xl mr-2">
                  R$
                </span>
                <span className="font-bold text-[#0022e6] tracking-tighter text-[4rem]">
                  {data.precoAntigo}
                </span>
                {/* Risco vermelho */}
                <div className="absolute bg-red-600 top-1/2 left-0 right-0 h-1 -translate-y-1/2"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
