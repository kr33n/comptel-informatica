import React from "react";

export default function ModeloOfertaV2({ data, isSingle }) {
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
  if (estimatedLines >= 3) {
    baseGapFigma = 140;
  }

  const precoStr = data.preco || "0,00";
  const [parteInteira, centavos] = precoStr.split(",");
  const precoLength = precoStr.length;
  const precoAntigoStr = data.precoAntigo || "";
  const [antigoInteiro, antigoCentavos] = precoAntigoStr.split(",");

  let precoFigma = 440;
  let centavosFigma = 200;

  if (precoLength >= 9 && precoLength <= 10) {
    precoFigma = 380;
    centavosFigma = 180;
  } else if (precoLength > 10) {
    precoFigma = 300;
    centavosFigma = 140;
  }

  return (
    <div
      className="relative w-full h-full bg-white flex flex-col justify-center items-center overflow-hidden print:border-0 border border-gray-300"
      style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
    >
      <div
        className="relative flex flex-col items-center bg-linear-to-b from-[#1919FE] to-[#2727D9] shadow-[0_30px_60px_rgba(107,153,245,0.25)]"
        style={{ width: fp(2089), height: fp(2673), borderRadius: fp(160) }}
      >
        <img
          src="/assets/etiquetas/oferta.svg"
          alt="Selo da Campanha"
          className="absolute left-1/2 -translate-x-1/2 object-contain pointer-events-none select-none drop-shadow-[0_24px_32px_rgba(0,34,230,0.25)]"
          style={{ width: fp(1632), height: fp(827), top: fp(-413) }}
        />

        <div
          className="relative z-10 flex flex-col items-center w-full transition-all duration-200"
          style={{
            paddingTop: fp(480),
            paddingBottom: fp(160),
            paddingLeft: fp(160),
            paddingRight: fp(160),
          }}
        >
          <div
            className="flex flex-col items-center w-full"
            style={{ gap: fp(48), marginBottom: fp(baseGapFigma) }}
          >
            <h1
              className="font-bold text-center text-white leading-normal w-full"
              style={{ fontSize: fp(220) }}
            >
              {titulo1Text}
            </h1>
            <h2
              className="font-medium text-center text-white leading-normal w-full"
              style={{ fontSize: fp(108) }}
            >
              {data.titulo2 || "Subtítulo / Descrição"}
            </h2>
          </div>

          <div className="flex items-center justify-center">
            {/* Bloco R$ e Parcelas Empilhado (Amarelo) */}
            <div
              className="flex flex-col items-center justify-center font-bold text-[#FFD700]"
              style={{ gap: fp(56), marginRight: fp(49.5) }}
            >
              <span
                className="leading-normal font-extrabold"
                style={{ fontSize: fp(120) }}
              >
                R$
              </span>
              <span className="leading-tight" style={{ fontSize: fp(96) }}>
                {data.pagamento || "10x"}
              </span>
            </div>

            <div className="flex items-start">
              <span
                className="font-black text-[#FFD700] leading-none"
                style={{ fontSize: fp(precoFigma), letterSpacing: fp(-8) }}
              >
                {parteInteira},
              </span>
              <span
                className="font-black text-[#FFD700] leading-none"
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

          {showFooter && (
            <div
              className="flex flex-col items-center"
              style={{ marginTop: fp(180) }}
            >
              <span
                className="font-extrabold text-center text-white uppercase tracking-wider leading-normal"
                style={{ fontSize: fp(72), marginBottom: fp(8) }}
              >
                {data.textoRodape || "À VISTA"}
              </span>
              <div className="flex items-start justify-center">
                <span
                  className="font-bold text-white"
                  style={{
                    fontSize: fp(72),
                    marginRight: fp(12),
                    marginTop: fp(8),
                  }}
                >
                  R$
                </span>
                <div className="flex items-start">
                  <span
                    className="font-extrabold text-white leading-none "
                    style={{ fontSize: fp(180), letterSpacing: fp(-8) }}
                  >
                    {antigoInteiro},
                  </span>
                  {antigoCentavos !== undefined && (
                    <span
                      className="font-black text-white leading-none"
                      style={{
                        fontSize: fp(100),
                        marginLeft: fp(4),
                        marginTop: fp(12),
                        leadingTrim: "both",
                        textBoxTrim: "both",
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
    </div>
  );
}
