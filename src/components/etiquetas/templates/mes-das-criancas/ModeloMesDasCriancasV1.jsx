import React from "react";

export default function ModeloNovoV1({ data, isSingle }) {
  const fp = (figmaPx) => {
    // A base do Figma enviada para esse modelo foi 298px de largura.
    // Isso garante que o layout preencha 100% da etiqueta.
    const scale = isSingle ? 794 / 298 : 794 / 298 / 2;
    return `${Math.round(figmaPx * scale * 10) / 10}px`;
  };

  const showOldPrice = data.precoAntigo && data.precoAntigo.trim() !== "";

  const titulo1Text = data.titulo1 || "Kit Teclado Gamer +\nMouse Gamer";
  const titulo2Text =
    data.titulo2 || "Teclado mecânico RGB\nMouse com 14000 dpi";

  const precoStr = data.preco || "9.999,00";
  const [parteInteira, centavos] = precoStr.split(",");
  const precoLength = precoStr.length;

  const precoAntigoStr = data.precoAntigo || "538,00";
  const [antigoInteiro, antigoCentavos] = precoAntigoStr.split(",");

  // Ajuste dinâmico de fontes para preços longos
  let precoFigma = 48;
  let centavosFigma = 24;

  if (precoLength >= 9 && precoLength <= 10) {
    precoFigma = 40;
    centavosFigma = 20;
  } else if (precoLength > 10) {
    precoFigma = 32;
    centavosFigma = 16;
  }

  return (
    <div
      className="relative w-full h-full flex flex-col justify-center items-center overflow-hidden print:border-0 border border-gray-300"
      style={{
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
        backgroundColor: "#5cd8f0", // Cor do céu de fundo
      }}
    >
      {/* 1. Imagem do Cenário posicionada na frente (z-30) */}
      <img
        src="/assets/etiquetas/background-pixel-art-landscape.svg"
        alt="Cenário Mês das Crianças"
        className="absolute inset-0 w-full h-full object-cover z-30 pointer-events-none select-none"
      />

      {/* 2. Container Principal do Cartão Branco */}
      <div className="flex flex-col items-center justify-center relative z-10">
        {/* Aba Superior (Top Tab) do Cartão com a Logo */}
        <div
          className="bg-white relative z-10 flex items-center justify-center"
          style={{
            width: fp(154),
            height: fp(60),
            borderTopLeftRadius: fp(24),
            borderTopRightRadius: fp(24),
            marginBottom: fp(-2),
          }}
        >
          {/* Logo Mês das Crianças inserida na aba superior */}
          <img
            src="/assets/etiquetas/brand-mes-das-criancas-logo.svg"
            alt="Mês das Crianças"
            className="object-contain relative z-40 pointer-events-none select-none"
            style={{
              width: fp(130),
              height: fp(130),
            }}
          />
        </div>

        {/* Corpo Principal do Cartão Branco */}
        <div
          className="bg-white relative z-10 flex flex-col items-center"
          style={{
            width: fp(245),
            height: fp(263),
            borderRadius: fp(24),
            paddingTop: fp(16),
            paddingBottom: fp(20),
            paddingLeft: fp(16),
            paddingRight: fp(16),
            gap: fp(6),
          }}
        >
          {/* Títulos */}
          <div
            className="flex flex-col items-center w-full text-center relative z-40"
            style={{ gap: fp(4) }}
          >
            <h1
              className="font-bold text-[#303030] leading-tight whitespace-pre-line line-clamp-2"
              style={{ fontSize: fp(24), gap: fp(16) }}
            >
              {titulo1Text}
            </h1>
            {titulo2Text && (
              <h2
                className="font-medium text-[#303030] leading-snug whitespace-pre-line line-clamp-2"
                style={{ fontSize: fp(14) }}
              >
                {titulo2Text}
              </h2>
            )}
          </div>

          {/* Preço Principal (À Vista) */}
          <div className="flex flex-col items-center w-full relative z-40">
            <span
              className="font-semibold text-[#303030] uppercase"
              style={{ fontSize: fp(12) }}
            >
              {data.pagamento || "À VISTA"}
            </span>
            <div
              className="flex items-start justify-center w-full"
              // style={{ marginTop: fp(2) }}
            >
              <span
                className="font-medium text-[#303030]"
                style={{
                  fontSize: fp(14),
                  marginRight: fp(4),
                  // marginTop: fp(6),
                }}
              >
                R$
              </span>
              <div className="flex items-start">
                <span
                  className="font-bold text-[#303030] leading-none"
                  style={{ fontSize: fp(32), letterSpacing: "-1px" }}
                >
                  {parteInteira},
                </span>
                <span
                  className="font-bold text-[#303030] leading-none"
                  style={{ fontSize: fp(16), marginTop: fp(4) }}
                >
                  {centavos ? centavos : "00"}
                </span>
              </div>
            </div>
          </div>

          {/* Preço Antigo (Rodapé) */}
          {showOldPrice && (
            <div className="flex flex-col items-center w-full relative z-40">
              <span
                className="font-semibold text-[#303030] uppercase"
                style={{ fontSize: fp(12) }}
              >
                {data.textoRodape || "DE:"}
              </span>
              <div
                className="flex items-start justify-center w-full"
                // style={{ marginTop: fp(2) }}
              >
                <span
                  className="font-medium text-[#303030]"
                  style={{
                    fontSize: fp(12),
                    marginRight: fp(2),
                    // marginTop: fp(4),
                  }}
                >
                  R$
                </span>
                <div className="flex items-start">
                  <span
                    className="font-bold text-[#303030] leading-none"
                    style={{ fontSize: fp(32) }}
                  >
                    {antigoInteiro},
                  </span>
                  <span
                    className="font-bold text-[#303030] leading-none"
                    style={{ fontSize: fp(16), marginTop: fp(2) }}
                  >
                    {antigoCentavos ? antigoCentavos : "00"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
