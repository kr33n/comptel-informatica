import React from "react";

export default function ModeloCampanha({ data, isSingle }) {
  // Conversor de escala mantido do seu modelo padrão[cite: 7]
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

  // Escala dinâmica de preços mantida[cite: 7]
  let precoFigma = 400;
  let centavosFigma = 180;
  let cifraoFigma = 108;

  if (precoLength >= 9 && precoLength <= 10) {
    precoFigma = 340;
    centavosFigma = 160;
    cifraoFigma = 96;
  } else if (precoLength > 10) {
    precoFigma = 280;
    centavosFigma = 130;
    cifraoFigma = 80;
  }

  return (
    <div
      className="relative w-full h-full bg-white flex flex-col justify-center items-center overflow-hidden print:border-0 border border-gray-300"
      style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
    >
      {/* Cartão Azul Central */}
      <div
        className="relative flex flex-col items-center bg-linear-to-b from-[#1919FE] to-[#2727D9] shadow-[0_40px_80px_rgba(0,0,0,0.15)]"
        style={{
          width: fp(2089),
          height: fp(2673),
          borderRadius: fp(160), // Bordas arredondadas do cartão
        }}
      >
        {/* Selo da Campanha Flutuando no Topo */}
        <img
          src="/assets/etiquetas/oferta.svg"
          alt="Selo da Campanha"
          className="absolute left-1/2 -translate-x-1/2 object-contain pointer-events-none select-none drop-shadow-[0_24px_32px_rgba(0,34,230,0.25)]"
          style={{
            width: fp(1632),
            height: fp(827),
            top: fp(
              -413,
            ) /* Metade da altura para fazer a imagem "vazar" para fora do cartão azul */,
          }}
        />

        {/* Container de Conteúdo Interno */}
        <div
          className="relative z-10 flex flex-col items-center w-full transition-all duration-200"
          style={{
            paddingTop:
              fp(480) /* Espaço para não encostar na imagem do selo */,
            paddingBottom: fp(160),
            paddingLeft: fp(160),
            paddingRight: fp(160),
          }}
        >
          {/* Bloco de Títulos */}
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

          {/* Bloco de Preço Principal */}
          <div
            className="flex flex-col items-center w-full"
            style={{ gap: fp(16) }}
          >
            <span
              className="font-bold text-center uppercase leading-normal text-[#FFD700]"
              style={{ fontSize: fp(96) }}
            >
              {data.pagamento || "À VISTA"}
            </span>

            <div className="flex items-center justify-center">
              <span
                className="font-medium leading-none text-[#FFD700]"
                style={{
                  fontSize: fp(cifraoFigma),
                  marginRight: fp(20),
                }}
              >
                R$
              </span>
              <div className="flex items-start">
                <span
                  className="font-bold text-[#FFD700] leading-none"
                  style={{ fontSize: fp(precoFigma), letterSpacing: fp(-8) }}
                >
                  {parteInteira}
                </span>
                <span
                  className="font-bold text-[#FFD700] leading-none"
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
            <div
              className="flex flex-col items-center"
              style={{ marginTop: fp(180) }}
            >
              <span
                className="font-bold text-center text-white uppercase tracking-wider leading-normal"
                style={{ fontSize: fp(64), marginBottom: fp(32) }}
              >
                {data.textoRodape || "DE:"}
              </span>
              <div className="flex items-center justify-center">
                <span
                  className="font-medium text-white leading-none"
                  style={{
                    fontSize: fp(64),
                    marginRight: fp(16),
                  }}
                >
                  R$
                </span>
                <div className="relative flex items-center">
                  <span
                    className="font-bold text-white leading-none"
                    style={{ fontSize: fp(180), letterSpacing: fp(-8) }}
                  >
                    {antigoInteiro}
                  </span>
                  {antigoCentavos !== undefined && (
                    <span
                      className="font-bold text-white leading-none"
                      style={{
                        fontSize:
                          fp(
                            180,
                          ) /* Centavos do preço antigo possuem a mesma altura do inteiro no seu HTML */,
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
    </div>
  );
}
