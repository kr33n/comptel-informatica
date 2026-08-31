import React from "react";

export default function ModeloPadraoV3({ data, isSingle }) {
  // Conversor exclusivo para este arquivo (Figma 2480px -> CSS 794px)
  const fp = (figmaPx) => {
    const scale = isSingle ? 794 / 2480 : 794 / 2480 / 2;
    return `${Math.round(figmaPx * scale * 10) / 10}px`;
  };

  const showOldPrice = data.precoAntigo && data.precoAntigo.trim() !== "";
  const showFooter = showOldPrice;

  const titulo1Text = data.titulo1 || "Nome do Produto";

  // Calcula o número estimado de linhas do Título 1 para evitar sobreposição
  const lineBreaks = titulo1Text.split("\n").length;
  const estimatedLines = Math.max(
    lineBreaks,
    Math.ceil(titulo1Text.length / 18),
  );

  let baseGapFigma = 256;
  let topOffsetFigma = 0;

  if (estimatedLines === 2) {
    baseGapFigma = 140;
    topOffsetFigma = 90;
  } else if (estimatedLines >= 3) {
    baseGapFigma = 70;
    topOffsetFigma = 130;
  }

  const precoStr = data.preco || "0,00";
  const [parteInteira, centavos] = precoStr.split(",");
  const precoLength = precoStr.length;
  const precoAntigoStr = data.precoAntigo || "";
  const [antigoInteiro, antigoCentavos] = precoAntigoStr.split(",");

  let precoFigma = 400;
  let centavosFigma = 180;
  let cifraoFigma = 108;

  if (precoLength >= 9 && precoLength <= 10) {
    precoFigma = 360;
    centavosFigma = 160;
    cifraoFigma = 96;
  } else if (precoLength > 10) {
    precoFigma = 280;
    centavosFigma = 130;
    cifraoFigma = 80;
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
          width: fp(812),
          height: fp(812),
        }}
      />

      {/* Canto Inferior Direito */}
      <img
        src="/assets/etiquetas/logo-baixo.svg"
        alt="Grafismo Inferior"
        className="absolute bottom-0 right-0 object-contain pointer-events-none select-none z-0"
        style={{
          width: fp(812),
          height: fp(812),
        }}
      />

      {/* Div principal com gap dinâmico e margens de segurança proporcionais */}
      <div
        className="relative z-10 flex flex-col items-center w-full transition-all duration-200"
        style={{
          gap: fp(baseGapFigma),
          paddingLeft: fp(220),
          paddingRight: fp(220),
          paddingTop: fp(topOffsetFigma),
        }}
      >
        {/* Bloco de Títulos */}
        <div
          className="flex flex-col items-center w-full"
          style={{ gap: fp(48) }}
        >
          <h1
            className="font-extrabold text-center text-[#0022e6] leading-normal w-full"
            style={{ fontSize: fp(220) }}
          >
            {titulo1Text}
          </h1>
          <h2
            className="font-semibold text-center text-[#0022e6] leading-normal w-full"
            style={{ fontSize: fp(108) }}
          >
            {data.titulo2 || "Subtítulo / Descrição"}
          </h2>
        </div>

        {/* Bloco de Preço Principal */}
        <div className="flex flex-col items-center" style={{ gap: fp(64) }}>
          <span
            className="font-extrabold text-center text-[#0022e6] uppercase leading-normal"
            style={{ fontSize: fp(96) }}
          >
            {data.pagamento || "POR APENAS"}
          </span>
          <div className="flex items-start justify-center">
            <span
              className="font-semibold text-[#0022e6] leading-normal"
              style={{
                fontSize: fp(108),
                marginRight: fp(16),
                marginTop: fp(62), // Alinha o R$ um pouco mais abaixo do topo do número principal
              }}
            >
              R$
            </span>
            <div className="flex items-start">
              <span
                className="font-extrabold text-[#0022e6] leading-normal"
                style={{
                  fontSize: fp(400),
                  letterSpacing: fp(-8),
                }}
              >
                {parteInteira},
              </span>
              <span
                className="font-black text-[#0022e6] leading-normal"
                style={{
                  fontSize: fp(centavosFigma),
                  marginLeft: fp(8),
                  marginTop: fp(24),
                  letterSpacing: fp(-8),
                }}
              >
                {centavos ? centavos : "00"}
              </span>
            </div>
          </div>
        </div>

        {/* Rodapé (Texto Auxiliar e Valor Parcelado) */}
        {showFooter && (
          <div className="flex flex-col items-center" style={{ gap: fp(32) }}>
            <span
              className="font-semibold text-center text-[#0022e6] leading-normal"
              style={{ fontSize: fp(64) }}
            >
              {data.textoRodape || "ou 10x s/ juros"}
            </span>
            <div className="flex items-start justify-center">
              <span
                className="font-semibold text-[#0022e6] leading-none"
                style={{
                  fontSize: fp(64),
                  marginRight: fp(12),
                  marginTop: fp(10), // // Trocamos margin por gap na div pai, se preferir, ou mantenha o gap padrão
                }}
              >
                R$
              </span>
              <div
                className="flex items-start justify-center"
                style={{ gap: fp(8) }}
              >
                <span
                  className="font-extrabold text-[#0022e6] leading-none"
                  style={{ fontSize: fp(180), letterSpacing: fp(-8) }}
                >
                  {antigoInteiro},
                </span>
                {antigoCentavos !== undefined && (
                  <span
                    className="font-extrabold text-[#0022e6] leading-none"
                    style={{
                      fontSize: fp(90),
                      letterSpacing: fp(-8),
                    }}
                  >
                    {antigoCentavos}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
