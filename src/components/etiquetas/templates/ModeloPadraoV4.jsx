import React from "react";

export default function ModeloPadraoV4({ data, isSingle }) {
  const showFooter = !!data.textoRodape;

  const precoStr = data.preco || "0,00";
  const precoLength = precoStr.length;

  let precoClass = isSingle ? "text-[10rem]" : "text-6xl";
  let cifraoClass = isSingle ? "text-6xl mt-4 mr-2" : "text-3xl mt-1 mr-1";

  if (precoLength >= 9 && precoLength <= 10) {
    precoClass = isSingle ? "text-[8rem]" : "text-5xl";
    cifraoClass = isSingle ? "text-5xl mt-6 mr-2" : "text-2xl mt-1 mr-1";
  } else if (precoLength > 10) {
    precoClass = isSingle ? "text-[6.5rem]" : "text-4xl";
    cifraoClass = isSingle ? "text-4xl mt-6 mr-2" : "text-xl mt-1 mr-1";
  }

  return (
    <div
      className="relative w-full h-full bg-white flex flex-col justify-center items-center overflow-hidden border border-gray-300"
      style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
    >
      <img
        src="/assets/etiquetas/logo-cima.svg"
        alt="Grafismo Superior"
        className="absolute top-0 left-0 object-contain pointer-events-none select-none z-0"
        style={{
          width: isSingle ? "260px" : "130px",
          height: isSingle ? "260px" : "130px",
        }}
      />
      <img
        src="/assets/etiquetas/logo-baixo.svg"
        alt="Grafismo Inferior"
        className="absolute bottom-0 right-0 object-contain pointer-events-none select-none z-0"
        style={{
          width: isSingle ? "260px" : "130px",
          height: isSingle ? "260px" : "130px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center w-full px-6">
        <div className="flex flex-col items-center gap-12">
          <h1
            className={` font-bold text-center text-[#0022e6] leading-tight ${isSingle ? "text-7xl" : "text-4xl"}`}
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
            {data.pagamento}
          </span>
          <div className="flex items-start justify-center">
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

        {showFooter && (
          <div className="flex flex-col items-center">
            <span
              className={`font-bold text-center text-[#0022e6] ${isSingle ? "text-4xl mt-4" : "text-[0.95rem] mt-2"}`}
            >
              {data.textoRodape}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
