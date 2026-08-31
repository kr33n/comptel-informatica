import React from "react";

export default function ModeloPadraoV2({ data, isSingle }) {
  const showOldPrice = data.precoAntigo && data.precoAntigo.trim() !== "";
  const showFooter = showOldPrice || data.textoRodape;

  const precoStr = data.preco || "0,00";
  const precoLength = precoStr.length;

  let precoClass = isSingle ? "text-[10rem]" : "text-6xl";
  let parcelaCifraoClass = isSingle ? "text-5xl mb-2" : "text-2xl mb-1";
  let parcelaTextClass = isSingle ? "text-4xl" : "text-base";

  if (precoLength >= 9 && precoLength <= 10) {
    precoClass = isSingle ? "text-[8rem]" : "text-5xl";
    parcelaCifraoClass = isSingle ? "text-4xl mb-1" : "text-xl mb-1";
    parcelaTextClass = isSingle ? "text-3xl" : "text-sm";
  } else if (precoLength > 10) {
    precoClass = isSingle ? "text-[6.5rem]" : "text-4xl";
    parcelaCifraoClass = isSingle ? "text-3xl mb-1" : "text-lg mb-1";
    parcelaTextClass = isSingle ? "text-2xl" : "text-xs";
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
          <div className="flex items-start justify-center">
            <div
              className={`flex flex-col items-end mr-3 ${isSingle ? "mt-6" : "mt-2"}`}
            >
              <span
                className={`font-bold text-[#0022e6] leading-none ${parcelaCifraoClass}`}
              >
                R$
              </span>
              <span
                className={`font-bold text-[#0022e6] leading-none ${parcelaTextClass}`}
              >
                {data.pagamento}
              </span>
            </div>
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
              className={`font-bold text-center text-[#0022e6] ${isSingle ? "text-3xl mb-1" : "text-[0.8rem]"}`}
            >
              {data.textoRodape}
            </span>
            {showOldPrice && (
              <div className="flex items-center justify-center opacity-90">
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
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
