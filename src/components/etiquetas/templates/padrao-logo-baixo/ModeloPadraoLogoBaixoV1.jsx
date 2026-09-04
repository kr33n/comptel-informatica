import React from "react";
// Certifique-se de que o caminho do import da sua logo está correto aqui
import logoComptel from "@/assets/logo-comptel-azul.svg";

export default function ModeloPadraoV1({ data, isSingle }) {
  const fp = (figmaPx) => {
    const scale = isSingle ? 794 / 2480 : 794 / 2480 / 2;
    return `${Math.round(figmaPx * scale * 10) / 10}px`;
  };

  const showOldPrice = data.precoAntigo && data.precoAntigo.trim() !== "";
  const showFooter = showOldPrice;

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
  const precoAntigoStr = data.precoAntigo || "";
  const [antigoInteiro, antigoCentavos] = precoAntigoStr.split(",");

  let precoFigma = 440;
  let centavosFigma = 200;
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
      {/* Logo Superior Centralizada */}
      <img
        src={logoComptel.src}
        alt="Logo Comptel Superior"
        className="absolute top-0 left-1/2 -translate-x-1/2 rotate-45 object-contain pointer-events-none select-none z-0"
        style={{ width: fp(2000), marginTop: fp(-1000) }}
      />

      {/* Logo Inferior Centralizada */}
      <img
        src={logoComptel.src}
        alt="Logo Comptel Inferior"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rotate-45 object-contain pointer-events-none select-none z-0"
        style={{ width: fp(2000), marginBottom: fp(-1000) }}
      />

      <div
        className="relative z-10 flex flex-col items-center w-full transition-all duration-200"
        style={{
          gap: fp(baseGapFigma),
          paddingLeft: fp(200),
          paddingRight: fp(200),
          paddingTop: fp(topOffsetFigma + 200),
          paddingBottom: fp(200),
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

        {/* BLOCO DE PREÇO PRINCIPAL CORRIGIDO: "À VISTA" em cima, R$ ao lado do número */}
        <div
          className="flex flex-col items-center w-full"
          style={{ gap: fp(16) }}
        >
          <span
            className="font-extrabold text-center text-[#0022e6] uppercase leading-normal"
            style={{ fontSize: fp(108) }}
          >
            {data.pagamento || "À VISTA"}
          </span>

          <div className="flex items-center justify-center">
            <span
              className="font-bold text-[#0022e6] leading-none"
              style={{
                fontSize: fp(cifraoFigma),
                marginRight: fp(20),
              }}
            >
              R$
            </span>
            <div className="flex items-start">
              <span
                className="font-black text-[#0022e6] leading-none"
                style={{ fontSize: fp(precoFigma), letterSpacing: fp(-8) }}
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
        </div>

        {/* Rodapé / Preço Antigo */}
        {showFooter && (
          <div className="flex flex-col items-center">
            <span
              className="font-extrabold text-center text-[#0022e6] uppercase tracking-wider leading-normal"
              style={{ fontSize: fp(72), marginBottom: fp(16) }}
            >
              {data.textoRodape || "DE:"}
            </span>
            <div className="flex items-center justify-center">
              <span
                className="font-bold text-[#0022e6] leading-none"
                style={{
                  fontSize: fp(72),
                  marginRight: fp(16),
                }}
              >
                R$
              </span>
              <div className="relative flex items-start">
                <span
                  className="font-extrabold text-[#0022e6] leading-none"
                  style={{ fontSize: fp(180), letterSpacing: fp(-8) }}
                >
                  {antigoInteiro}
                </span>
                {antigoCentavos !== undefined && (
                  <span
                    className="font-black text-[#0022e6] leading-none"
                    style={{
                      fontSize: fp(100),
                      marginLeft: fp(8),
                      marginTop: fp(12),
                      leadingTrim: "both",
                      textBoxTrim: "both",
                      letterSpacing: fp(-8),
                    }}
                  >
                    ,{antigoCentavos}
                  </span>
                )}
                {/* Linha vermelha cortando estritamente os números */}
                <div
                  className="absolute bg-[#e60000] top-1/2 left-0 right-0 pointer-events-none -translate-y-1/2"
                  style={{ height: fp(12) }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
