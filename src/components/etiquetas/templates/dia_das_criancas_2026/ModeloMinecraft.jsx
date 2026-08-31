import React from "react";

export default function ModeloMinecraft({ data, isSingle }) {
  const showOldPrice = data.precoAntigo && data.precoAntigo.trim() !== "";

  const precoStr = data.preco || "0,00";
  const precoLength = precoStr.length;

  let precoClass = isSingle ? "text-[9rem]" : "text-5xl";
  let cifraoClass = isSingle ? "text-5xl mt-6 mr-2" : "text-2xl mt-1 mr-1";

  if (precoLength >= 9 && precoLength <= 10) {
    precoClass = isSingle ? "text-[7rem]" : "text-4xl";
    cifraoClass = isSingle ? "text-4xl mt-6 mr-2" : "text-xl mt-1 mr-1";
  } else if (precoLength > 10) {
    precoClass = isSingle ? "text-[5.5rem]" : "text-3xl";
    cifraoClass = isSingle ? "text-3xl mt-6 mr-2" : "text-lg mt-1 mr-1";
  }

  // 6 Avatares oficiais do Minecraft
  const steveImg = "https://minotar.net/helm/MHF_Steve/150.png";
  const endermanImg = "https://minotar.net/helm/MHF_Enderman/150.png";
  const creeperImg = "https://minotar.net/helm/MHF_Creeper/150.png";
  const pigImg = "https://minotar.net/helm/MHF_Pig/150.png";
  const zombieImg = "https://minotar.net/helm/MHF_Zombie/150.png";
  const skeletonImg = "https://minotar.net/helm/MHF_Skeleton/150.png";

  return (
    <div
      className="relative w-full h-full bg-white flex flex-col items-center overflow-hidden border-[6px] border-[#000000]"
      style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
    >
      {/* HEADER: Grama e Terra */}
      <div className="w-full flex flex-col z-10 absolute top-0">
        <div
          className={`w-full bg-[#47A036] ${isSingle ? "h-12" : "h-6"} border-b-4 border-[#000000]`}
        ></div>
        <div
          className={`w-full bg-[#8B5A2B] ${isSingle ? "h-6" : "h-3"} border-b-[6px] border-[#000000]`}
        ></div>
      </div>

      {/* SELO: Dia das Crianças Comptel (Posicionado no topo com largura ajustada) */}
      <div
        className={`absolute ${isSingle ? "top-[3.2rem]" : "top-[1.4rem]"} bg-[#FDB813] border-4 border-black uppercase text-center text-black font-black z-30 whitespace-nowrap ${isSingle ? "text-3xl px-8 py-2.5 shadow-[5px_5px_0px_#000000]" : "text-[0.7rem] px-3 py-1 shadow-[3px_3px_0px_#000000]"}`}
      >
        Dia das Crianças Comptel
      </div>

      {/* CABEÇAS SUPERIORES (Deslocadas para baixo do banner) */}
      <img
        src={steveImg}
        alt="Steve"
        className={`absolute border-4 border-black shadow-[4px_4px_0px_#000000] z-10 ${isSingle ? "top-28 left-6 w-20 h-20" : "top-14 left-3 w-10 h-10"}`}
      />
      <img
        src={endermanImg}
        alt="Enderman"
        className={`absolute border-4 border-black shadow-[4px_4px_0px_#000000] z-10 ${isSingle ? "top-28 right-6 w-20 h-20" : "top-14 right-3 w-10 h-10"}`}
      />

      {/* CABEÇAS INTERMEDIÁRIAS */}
      <img
        src={zombieImg}
        alt="Zombie"
        className={`absolute border-4 border-black shadow-[4px_4px_0px_#000000] z-10 ${isSingle ? "top-[46%] left-6 w-16.25 h-16.25" : "top-[46%] left-3 w-8 h-8"}`}
      />
      <img
        src={skeletonImg}
        alt="Skeleton"
        className={`absolute border-4 border-black shadow-[4px_4px_0px_#000000] z-10 ${isSingle ? "top-[46%] right-6 w-16.25 h-16.25" : "top-[46%] right-3 w-8 h-8"}`}
      />

      {/* CABEÇAS INFERIORES */}
      <img
        src={creeperImg}
        alt="Creeper"
        className={`absolute border-4 border-black shadow-[4px_4px_0px_#000000] z-10 ${isSingle ? "bottom-20 left-6 w-21.25 h-21.25" : "bottom-10 left-3 w-10.5 h-10.5"}`}
      />
      <img
        src={pigImg}
        alt="Pig"
        className={`absolute border-4 border-black shadow-[4px_4px_0px_#000000] z-10 ${isSingle ? "bottom-20 right-6 w-21.25 h-21.25" : "bottom-10 right-3 w-10.5 h-10.5"}`}
      />

      {/* MINI BLOCOS PIXELADOS LATERAIS */}
      <div
        className={`absolute bg-[#8B5A2B] border-[3px] border-black z-10 ${isSingle ? "w-8 h-8 left-28 bottom-36 shadow-[4px_4px_0px_#000]" : "w-4 h-4 left-14 bottom-16 shadow-[2px_2px_0px_#000]"}`}
      ></div>
      <div
        className={`absolute bg-[#47A036] border-[3px] border-black z-10 ${isSingle ? "w-10 h-10 right-24 top-52 shadow-[4px_4px_0px_#000]" : "w-5 h-5 right-12 top-28 shadow-[2px_2px_0px_#000]"}`}
      ></div>
      <div
        className={`absolute bg-[#FDB813] border-[3px] border-black z-10 ${isSingle ? "w-6 h-6 left-24 top-56 shadow-[4px_4px_0px_#000]" : "w-3 h-3 left-12 top-30 shadow-[2px_2px_0px_#000]"}`}
      ></div>

      {/* CONTEÚDO CENTRAL */}
      <div className="relative z-20 flex flex-col items-center w-full px-20 flex-1 justify-center mt-14">
        <div className="flex flex-col items-center mb-4 w-full">
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

        <div className="flex flex-col items-center mb-6">
          <span
            className={`font-black text-center text-[#47A036] uppercase tracking-widest ${isSingle ? "text-5xl mb-2" : "text-2xl mb-1"}`}
            style={{
              textShadow: isSingle
                ? "3px 3px 0px #d1f0c9"
                : "1px 1px 0px #d1f0c9",
            }}
          >
            {data.pagamento || "À VISTA"}
          </span>
          <div className="flex items-start justify-center">
            <span
              className={`font-black text-black ${cifraoClass}`}
              style={{
                textShadow: isSingle
                  ? "4px 4px 0px #cccccc"
                  : "2px 2px 0px #cccccc",
              }}
            >
              R$
            </span>
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
        </div>

        {showOldPrice && (
          <div className="flex flex-col items-center">
            <span
              className={`font-bold text-center text-[#888888] ${isSingle ? "text-4xl mb-1" : "text-lg"}`}
            >
              DE:
            </span>
            <div className="relative flex items-center justify-center opacity-90">
              <span
                className={`font-bold text-[#888888] ${isSingle ? "text-5xl mr-2" : "text-2xl mr-1"}`}
              >
                R$
              </span>
              <span
                className={`font-bold text-[#888888] tracking-tighter ${isSingle ? "text-[5.5rem]" : "text-4xl"}`}
              >
                {data.precoAntigo}
              </span>
              <div
                className={`absolute bg-[#E33232] top-1/2 -left-2.5 -right-2.5 border-y-2 border-black ${isSingle ? "h-3" : "h-1.5"}`}
              ></div>
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
