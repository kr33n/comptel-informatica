import React from "react";

export default function ModeloMinecraftV2({ data, isSingle }) {
  const showOldPrice = data.precoAntigo && data.precoAntigo.trim() !== "";
  const precoStr = data.preco || "0,00";
  const precoLength = precoStr.length;

  let precoClass = isSingle ? "text-[9rem]" : "text-5xl";
  let stackCifraoClass = isSingle ? "text-5xl" : "text-2xl";
  let stackParcelaClass = isSingle ? "text-4xl mt-2" : "text-lg mt-1";

  if (precoLength >= 9 && precoLength <= 10) {
    precoClass = isSingle ? "text-[7rem]" : "text-4xl";
    stackCifraoClass = isSingle ? "text-4xl" : "text-xl";
    stackParcelaClass = isSingle ? "text-3xl mt-1" : "text-base mt-0.5";
  } else if (precoLength > 10) {
    precoClass = isSingle ? "text-[5.5rem]" : "text-3xl";
    stackCifraoClass = isSingle ? "text-3xl" : "text-lg";
    stackParcelaClass = isSingle ? "text-2xl mt-1" : "text-sm mt-0.5";
  }

  return (
    <div
      className="relative w-full h-full bg-white flex flex-col items-center overflow-hidden border-[6px] border-[#000000]"
      style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
    >
      {/* HEADER E SELO (Mesmo do V1) */}
      <div className="w-full flex flex-col z-10 absolute top-0">
        <div
          className={`w-full bg-[#47A036] ${isSingle ? "h-12" : "h-6"} border-b-4 border-[#000000]`}
        ></div>
        <div
          className={`w-full bg-[#8B5A2B] ${isSingle ? "h-6" : "h-3"} border-b-[6px] border-[#000000]`}
        ></div>
      </div>
      <div
        className={`absolute ${isSingle ? "top-[3.2rem]" : "top-[1.4rem]"} bg-[#FDB813] border-4 border-black uppercase text-center text-black font-black z-30 whitespace-nowrap ${isSingle ? "text-3xl px-8 py-2.5 shadow-[5px_5px_0px_#000000]" : "text-[0.7rem] px-3 py-1 shadow-[3px_3px_0px_#000000]"}`}
      >
        Dia das Crianças Comptel
      </div>

      {/* AVATARES LATERAIS OMITIDOS POR BREVIDADE MAS INCLUÍDOS NO ARQUIVO FINAL */}
      <img
        src="https://minotar.net/helm/MHF_Steve/150.png"
        alt="Steve"
        className={`absolute border-4 border-black shadow-[4px_4px_0px_#000000] z-10 ${isSingle ? "top-28 left-6 w-20 h-20" : "top-14 left-3 w-10 h-10"}`}
      />
      <img
        src="https://minotar.net/helm/MHF_Enderman/150.png"
        alt="Enderman"
        className={`absolute border-4 border-black shadow-[4px_4px_0px_#000000] z-10 ${isSingle ? "top-28 right-6 w-20 h-20" : "top-14 right-3 w-10 h-10"}`}
      />
      <img
        src="https://minotar.net/helm/MHF_Zombie/150.png"
        alt="Zombie"
        className={`absolute border-4 border-black shadow-[4px_4px_0px_#000000] z-10 ${isSingle ? "top-[46%] left-6 w-16.25 h-16.25" : "top-[46%] left-3 w-8 h-8"}`}
      />
      <img
        src="https://minotar.net/helm/MHF_Skeleton/150.png"
        alt="Skeleton"
        className={`absolute border-4 border-black shadow-[4px_4px_0px_#000000] z-10 ${isSingle ? "top-[46%] right-6 w-16.25 h-16.25" : "top-[46%] right-3 w-8 h-8"}`}
      />
      <img
        src="https://minotar.net/helm/MHF_Creeper/150.png"
        alt="Creeper"
        className={`absolute border-4 border-black shadow-[4px_4px_0px_#000000] z-10 ${isSingle ? "bottom-20 left-6 w-21.25 h-21.25" : "bottom-10 left-3 w-10.5 h-10.5"}`}
      />
      <img
        src="https://minotar.net/helm/MHF_Pig/150.png"
        alt="Pig"
        className={`absolute border-4 border-black shadow-[4px_4px_0px_#000000] z-10 ${isSingle ? "bottom-20 right-6 w-21.25 h-21.25" : "bottom-10 right-3 w-10.5 h-10.5"}`}
      />

      <div
        className={`absolute bg-[#8B5A2B] border-[3px] border-black z-10 ${isSingle ? "w-8 h-8 left-28 bottom-36 shadow-[4px_4px_0px_#000]" : "w-4 h-4 left-14 bottom-16 shadow-[2px_2px_0px_#000]"}`}
      ></div>
      <div
        className={`absolute bg-[#47A036] border-[3px] border-black z-10 ${isSingle ? "w-10 h-10 right-24 top-52 shadow-[4px_4px_0px_#000]" : "w-5 h-5 right-12 top-28 shadow-[2px_2px_0px_#000]"}`}
      ></div>
      <div
        className={`absolute bg-[#FDB813] border-[3px] border-black z-10 ${isSingle ? "w-6 h-6 left-24 top-56 shadow-[4px_4px_0px_#000]" : "w-3 h-3 left-12 top-30 shadow-[2px_2px_0px_#000]"}`}
      ></div>

      {/* CONTEÚDO CENTRAL (V2) */}
      <div className="relative z-20 flex flex-col items-center w-full px-20 flex-1 justify-center mt-14">
        <div className="flex flex-col items-center mb-6 w-full">
          <h1
            className={`font-black text-center text-black leading-tight uppercase ${isSingle ? "text-7xl mb-2" : "text-4xl mb-1"}`}
            style={{
              textShadow: isSingle
                ? "4px 4px 0px #cccccc"
                : "2px 2px 0px #cccccc",
            }}
          >
            {data.titulo1 || "Nome do Produto"}
          </h1>
          <h2
            className={`font-bold text-center text-[#555555] ${isSingle ? "text-4xl" : "text-xl"}`}
          >
            {data.titulo2 || "Subtítulo / Descrição"}
          </h2>
        </div>

        {/* Bloco de Preço Principal (Parcela em Destaque) */}
        <div className="flex items-center justify-center mb-6">
          <div className={`flex flex-col items-center justify-center mr-3`}>
            <span
              className={`font-black text-black leading-none ${stackCifraoClass}`}
              style={{
                textShadow: isSingle
                  ? "4px 4px 0px #cccccc"
                  : "2px 2px 0px #cccccc",
              }}
            >
              R$
            </span>
            <span
              className={`font-black text-black leading-none ${stackParcelaClass}`}
              style={{
                textShadow: isSingle
                  ? "4px 4px 0px #cccccc"
                  : "2px 2px 0px #cccccc",
              }}
            >
              {data.pagamento || "10x"}
            </span>
          </div>
          <span
            className={`font-black text-black leading-none tracking-tighter ${precoClass}`}
            style={{
              textShadow: isSingle
                ? "8px 8px 0px #cccccc"
                : "4px 4px 0px #cccccc",
            }}
          >
            {precoStr}
          </span>
        </div>

        {/* Rodapé (Valor Total à Vista sem risco) */}
        {showOldPrice && (
          <div className="flex flex-col items-center">
            <span
              className={`font-bold text-center text-[#888888] uppercase tracking-wider ${isSingle ? "text-3xl mb-1" : "text-sm"}`}
            >
              {data.textoRodape || "À VISTA"}
            </span>
            <div className="flex items-center justify-center">
              <span
                className={`font-bold text-[#888888] ${isSingle ? "text-4xl mr-1" : "text-lg mr-0.5"}`}
              >
                R$
              </span>
              <span
                className={`font-bold text-[#888888] tracking-tighter ${isSingle ? "text-[5rem]" : "text-3xl"}`}
              >
                {data.precoAntigo}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER: Pedra Cobblestone */}
      <div className="w-full flex flex-col z-10 absolute bottom-0">
        <div
          className={`w-full bg-[#7D7D7D] ${isSingle ? "h-4" : "h-2"} border-t-4 border-[#000000]`}
        ></div>
        <div
          className={`w-full bg-[#595959] ${isSingle ? "h-8" : "h-4"} border-t-4 border-[#000000]`}
        ></div>
      </div>
    </div>
  );
}
