import React from "react";

export default function ModeloPadraoV4({ data, isSingle }) {
  const fp = (figmaPx) => {
    const scale = isSingle ? 794 / 2480 : 794 / 2480 / 2;
    return `${Math.round(figmaPx * scale * 10) / 10}px`;
  };

  const textoRodape = data.textoRodape || "5% de desconto no PIX";
  const showFooter = textoRodape.trim() !== "";

  const titulo1Text = data.titulo1 || "Nome do Produto";

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

  let precoFigma = 440; // Aumentado
  let centavosFigma = 200; // Aumentado
  let cifraoFigma = 120;

  if (precoLength >= 9 && precoLength <= 10) {
    precoFigma = 380;
    centavosFigma = 180;
    cifraoFigma = 100;
  } else if (precoLength > 10) {
    precoFigma = 300;
    centavosFigma = 140;
    cifraoFigma = 80;
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
        style={{ width: fp(812), height: fp(812) }}
      />
      <img
        src="/assets/etiquetas/logo-baixo.svg"
        alt="Grafismo Inferior"
        className="absolute bottom-0 right-0 object-contain pointer-events-none select-none z-0"
        style={{ width: fp(812), height: fp(812) }}
      />

      <div
        className="relative z-10 flex flex-col items-center w-full transition-all duration-200"
        style={{
          gap: fp(baseGapFigma),
          paddingLeft: fp(200),
          paddingRight: fp(200),
          paddingTop: fp(topOffsetFigma),
        }}
      >
        <div
          className="flex flex-col items-center w-full"
          style={{ gap: fp(48) }}
        >
          <h1
            className="font-extrabold text-center text-[#0022e6] leading-normal w-full"
            style={{ fontSize: fp(250) }}
          >
            {titulo1Text}
          </h1>
          <h2
            className="font-semibold text-center text-[#0022e6] leading-normal w-full"
            style={{ fontSize: fp(120) }}
          >
            {data.titulo2 || "Subtítulo / Descrição"}
          </h2>
        </div>

        <div className="flex flex-col items-center" style={{ gap: fp(16) }}>
          <span
            className="font-extrabold text-center text-[#0022e6] uppercase leading-normal"
            style={{ fontSize: fp(108) }}
          >
            {data.pagamento || "POR APENAS"}
          </span>
          <div className="flex items-start justify-center">
            <span
              className="font-bold text-[#0022e6] leading-none"
              style={{
                fontSize: fp(cifraoFigma),
                marginRight: fp(16),
                marginTop: fp(40),
              }}
            >
              R$
            </span>
            <div className="flex items-start">
              <span
                className="font-black text-[#0022e6] leading-none"
                style={{ fontSize: fp(precoFigma), letterSpacing: fp(-8) }}
              >
                {parteInteira},
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
                {centavos ? centavos : "00"}
              </span>
            </div>
          </div>
        </div>

        {showFooter && (
          <div className="flex flex-col items-center">
            <span
              className="font-bold text-center text-[#0022e6] leading-normal"
              style={{ fontSize: fp(108) }}
            >
              {textoRodape}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
