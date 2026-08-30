import React from "react";

export default function ModeloPadrao({ data, isSingle }) {
  const showOldPrice = data.precoAntigo && data.precoAntigo.trim() !== "";

  // Lógica para reduzir o tamanho da fonte dinamicamente se o valor for muito grande
  const precoStr = data.preco || "0,00";
  const precoLength = precoStr.length;

  // Tamanhos padrões (até 9.999,99 - 8 caracteres)
  let precoClass = isSingle ? "text-[10rem]" : "text-6xl";
  let cifraoClass = isSingle ? "text-6xl mt-4 mr-2" : "text-3xl mt-1 mr-1";

  // Ajuste para 10 mil a 999 mil (9 a 10 caracteres, ex: 99.999,99)
  if (precoLength >= 9 && precoLength <= 10) {
    precoClass = isSingle ? "text-[8rem]" : "text-5xl";
    cifraoClass = isSingle ? "text-5xl mt-6 mr-2" : "text-2xl mt-1 mr-1";
  }
  // Ajuste para valores milionários (11+ caracteres, ex: 1.000.000,00)
  else if (precoLength > 10) {
    precoClass = isSingle ? "text-[6.5rem]" : "text-4xl";
    cifraoClass = isSingle ? "text-4xl mt-6 mr-2" : "text-xl mt-1 mr-1";
  }

  return (
    <div
      className="relative w-full h-full bg-white flex flex-col justify-center items-center overflow-hidden border border-gray-300"
      style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
    >
      {/* Canto Superior Esquerdo */}
      <img
        src="/assets/etiquetas/logo-cima.svg"
        alt="Grafismo Superior"
        className="absolute top-0 left-0 object-contain pointer-events-none select-none z-0"
        style={{
          width: isSingle ? "260px" : "130px",
          height: isSingle ? "260px" : "130px",
        }}
      />

      {/* Canto Inferior Direito */}
      <img
        src="/assets/etiquetas/logo-baixo.svg"
        alt="Grafismo Inferior"
        className="absolute bottom-0 right-0 object-contain pointer-events-none select-none z-0"
        style={{
          width: isSingle ? "260px" : "130px",
          height: isSingle ? "260px" : "130px",
        }}
      />

      {/* Conteúdo Central */}
      <div className="relative z-10 flex flex-col items-center w-full px-6">
        <div className="flex flex-col items-center mb-6">
          <h1
            className={`font-bold text-center text-[#0022e6] leading-tight ${isSingle ? "text-7xl mb-4" : "text-4xl mb-2"}`}
          >
            {data.titulo1 || "Nome do Produto"}
          </h1>
          <h2
            className={`font-medium text-center text-[#0022e6] ${isSingle ? "text-4xl" : "text-xl"}`}
          >
            {data.titulo2 || "Subtítulo / Descrição"}
          </h2>
        </div>

        <div className="flex flex-col items-center mb-10">
          <span
            className={`font-bold text-center text-[#0022e6] uppercase tracking-wider ${isSingle ? "text-4xl mb-2" : "text-lg mb-1"}`}
          >
            {data.pagamento || "À VISTA"}
          </span>
          <div className="flex items-start justify-center">
            {/* O R$ também diminui proporcionalmente e ajusta a margem superior */}
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
          <div className="flex flex-col items-center">
            <span
              className={`font-bold text-center text-[#0022e6] ${isSingle ? "text-3xl mb-1" : "text-sm"}`}
            >
              DE:
            </span>
            <div className="relative flex items-center justify-center opacity-80">
              <span
                className={`font-medium text-[#0022e6] ${isSingle ? "text-4xl mr-2" : "text-lg mr-1"}`}
              >
                R$
              </span>
              <span
                className={`font-bold text-[#0022e6] tracking-tighter ${isSingle ? "text-7xl" : "text-4xl"}`}
              >
                {data.precoAntigo}
              </span>
              <div
                className={`absolute bg-red-600 top-1/2 left-0 right-0 ${isSingle ? "h-2" : "h-1"}`}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
