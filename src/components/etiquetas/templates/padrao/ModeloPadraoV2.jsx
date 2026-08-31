import React from "react";

export default function ModeloPadraoV2({ data, isSingle }) {
  // Conversor exclusivo para este arquivo (Figma 2480px -> CSS 794px)
  const fp = (figmaPx) => {
    const scale = isSingle ? 794 / 2480 : 794 / 2480 / 2;
    return `${Math.round(figmaPx * scale * 10) / 10}px`;
  };

  const showOldPrice = data.precoAntigo && data.precoAntigo.trim() !== "";
  const showFooter = showOldPrice;

  const titulo1Text = data.titulo1 || "Nome do Produto";

  // Calcula o número estimado de linhas do Título 1
  const lineBreaks = titulo1Text.split("\n").length;
  const estimatedLines = Math.max(
    lineBreaks,
    Math.ceil(titulo1Text.length / 18),
  );

  let baseGapFigma = 256;
  if (estimatedLines === 2) {
    baseGapFigma = 160;
  } else if (estimatedLines >= 3) {
    baseGapFigma = 80;
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

      {/* Div principal com gap dinâmico */}
      <div
        className="relative z-10 flex flex-col items-center w-full px-6 transition-all duration-200"
        style={{ gap: fp(baseGapFigma) }}
      >
        {/* Bloco de Títulos */}
        <div className="flex flex-col items-center" style={{ gap: fp(48) }}>
          <h1
            className="font-extrabold text-center text-[#0022e6] leading-normal"
            style={{ fontSize: fp(220) }}
          >
            {titulo1Text}
          </h1>
          <h2
            className="font-bold text-center text-[#0022e6] leading-normal"
            style={{ fontSize: fp(108) }}
          >
            {data.titulo2 || "Subtítulo / Descrição"}
          </h2>
        </div>

        {/* Bloco de Preço Principal (Parcela em Destaque) */}
        <div className="flex items-start justify-center">
          {/* R$ e 10x empilhados à esquerda */}
          <div
            className="flex flex-col items-end justify-start font-bold text-[#0022e6]"
            style={{
              marginRight: fp(16),
              marginTop: fp(24),
            }}
          >
            <span
              className="leading-none"
              style={{ fontSize: fp(cifraoFigma) }}
            >
              R$
            </span>
            <span
              className="leading-tight mt-1"
              style={{ fontSize: fp(cifraoFigma * 0.95) }}
            >
              {data.pagamento || "10x"}
            </span>
          </div>

          {/* Inteiro e Centavos */}
          <div className="flex items-start">
            <span
              className="font-black text-[#0022e6] leading-none"
              style={{
                fontSize: fp(precoFigma),
                letterSpacing: fp(-8),
              }}
            >
              {parteInteira}
            </span>
            <span
              className="font-black text-[#0022e6] leading-none"
              style={{
                fontSize: fp(centavosFigma),
                marginLeft: fp(8),
                marginTop: fp(24),
                letterSpacing: fp(-8),
                leadingTrim: "both",
                textBoxTrim: "both",
              }}
            >
              ,{centavos ? centavos : "00"}
            </span>
          </div>
        </div>

        {/* Rodapé (Valor Total à Vista) */}
        {showFooter && (
          <div className="flex flex-col items-center">
            <span
              className="font-bold text-center text-[#0022e6] uppercase tracking-wider leading-normal"
              style={{ fontSize: fp(64), marginBottom: fp(8) }}
            >
              {data.textoRodape || "À VISTA"}
            </span>
            <div className="flex items-start justify-center">
              <span
                className="font-bold text-[#0022e6]"
                style={{
                  fontSize: fp(64),
                  marginTop: fp(16),
                  marginRight: fp(12),
                }}
              >
                R$
              </span>
              <div className="flex items-start">
                <span
                  className="font-black text-[#0022e6] leading-none"
                  style={{ fontSize: fp(160) }}
                >
                  {antigoInteiro}
                </span>
                {antigoCentavos !== undefined && (
                  <span
                    className="font-black text-[#0022e6] leading-none"
                    style={{
                      fontSize: fp(90),
                      marginLeft: fp(4),
                      marginTop: fp(12),
                      leadingTrim: "both",
                      textBoxTrim: "both",
                    }}
                  >
                    ,{antigoCentavos}
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
