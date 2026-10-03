import React from "react";

export default function ModeloMesDasCriancasV2({ data, isSingle }) {
  const fp = (figmaPx) => {
    const scale = isSingle ? 794 / 2480 : 794 / 2480 / 2;
    return `${Math.round(figmaPx * scale * 10) / 10}px`;
  };

  const showOldPrice = data.precoAntigo && data.precoAntigo.trim() !== "";
  const showFooter = showOldPrice;

  const titulo1Text = data.titulo1 || "Kit Teclado Gamer +\nMouse Gamer";
  const titulo2Text = data.titulo2 || "";

  // 1. Função para contar linhas reais de um texto
  const contarLinhas = (texto, caracteresPorLinha) => {
    if (!texto || texto.trim() === "") return 0;

    // Divide o texto pelas quebras manuais (\n)
    const linhasManuais = texto.split("\n");

    // Para cada linha manual, calcula quantas linhas visuais ela ocupa se for longa
    return linhasManuais.reduce((acc, linha) => {
      const linhasEstimadas = Math.ceil(linha.length / caracteresPorLinha) || 1;
      return acc + linhasEstimadas;
    }, 0);
  };

  // Título 1 considera ~25 caracteres por linha para mudar de linha visualmente
  const t1Lines = contarLinhas(titulo1Text, 25);

  // Subtítulo (Título 2) considera ~32 caracteres por linha
  const t2Lines = contarLinhas(titulo2Text, 32);

  // Total real de linhas combinadas no topo
  const estimatedLines = t1Lines + t2Lines;

  // Definições do layout conforme a quantidade total de linhas
  let baseGapFigma;
  let topOffsetFigma;
  let titulo1FontSize;
  let titulo2FontSize;

  if (estimatedLines <= 1) {
    // Apenas 1 linha no total
    baseGapFigma = 200;
    topOffsetFigma = 40;
    titulo1FontSize = 240;
    titulo2FontSize = 110;
  } else if (estimatedLines === 2) {
    baseGapFigma = 200;
    topOffsetFigma = 20; // Sobe o conteúdo levemente
    titulo1FontSize = 190;
    titulo2FontSize = 90;
  } else if (estimatedLines >= 3) {
    baseGapFigma = 120; // Reduz a distância entre título, preço e rodapé
    topOffsetFigma = 0; // Puxa o conteúdo mais para cima para aproveitar o espaço do topo
    titulo1FontSize = 180; // Diminui a fonte do título de 160 para 135
    titulo2FontSize = 100; // Diminui a fonte do subtítulo de 80 para 70
  }

  const precoStr = data.preco || "9.999,00";
  const [parteInteira, centavos] = precoStr.split(",");
  const precoLength = precoStr.length;

  const precoAntigoStr = data.precoAntigo || "538,00";
  const [antigoInteiro, antigoCentavos] = precoAntigoStr.split(",");

  // Ajuste dinâmico de fontes para preços longos
  let precoFigma = estimatedLines >= 3 ? 380 : 440;
  let centavosFigma = estimatedLines >= 3 ? 170 : 200;
  let cifraoFigma = estimatedLines >= 3 ? 100 : 120;

  if (precoLength >= 9 && precoLength <= 10) {
    precoFigma = 340;
    centavosFigma = 160;
    cifraoFigma = 90;
  } else if (precoLength > 10) {
    precoFigma = 280;
    centavosFigma = 130;
    cifraoFigma = 75;
  }

  // Fontes do preço antigo/rodapé adaptadas dinamicamente
  const antigoInteiroFigma = estimatedLines >= 3 ? 140 : 180;
  const antigoCentavosFigma = estimatedLines >= 3 ? 80 : 100;

  return (
    <div
      className="relative w-full h-full flex flex-col justify-center items-center overflow-hidden print:border-0 border border-gray-300"
      style={{
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
        backgroundColor: "#5cd8f0",
      }}
    >
      {/* 1. Imagem do Cenário (z-30) */}
      <img
        src="/assets/etiquetas/background-pixel-art-landscape.svg"
        alt="Cenário Mês das Crianças"
        className="absolute inset-0 w-full h-full object-cover z-30 pointer-events-none select-none"
      />

      {/* 2. Container Principal */}
      <div className="flex flex-col items-center justify-center relative z-10 w-full h-full">
        {/* Aba Superior (Top Tab) com Logo */}
        <div
          className="bg-white relative z-10 flex items-center justify-center"
          style={{
            width: fp(1280),
            height: fp(500),
            borderTopLeftRadius: fp(200),
            borderTopRightRadius: fp(200),
            marginBottom: fp(-20),
          }}
        >
          <img
            src="/assets/etiquetas/brand-mes-das-criancas-logo.svg"
            alt="Mês das Crianças"
            className="object-contain relative z-40 pointer-events-none select-none"
            style={{
              width: fp(1080),
              height: fp(1080),
            }}
          />
        </div>

        {/* Corpo Principal do Cartão Branco */}
        <div
          className="bg-white relative z-10 flex flex-col items-center transition-all duration-200"
          style={{
            width: fp(2040),
            height: fp(2190),
            borderRadius: fp(200),
            paddingTop: fp(80 + topOffsetFigma), // Offset dinâmico compensa o crescimento do título
            paddingBottom: fp(120),
            paddingLeft: fp(140),
            paddingRight: fp(140),
            gap: fp(baseGapFigma),
          }}
        >
          {/* Títulos com escala e espaçamento dinâmicos */}
          <div
            className="flex flex-col items-center w-full text-center relative z-40"
            style={{ gap: fp(64) }}
          >
            <h1
              className="font-extrabold text-[#303030] leading-tight w-full whitespace-pre-line"
              style={{ fontSize: fp(titulo1FontSize) }}
            >
              {titulo1Text}
            </h1>
            {data.titulo2 && (
              <h2
                className="font-semibold text-[#303030] leading-tight w-full whitespace-pre-line break-words overflow-hidden"
                style={{ fontSize: fp(titulo2FontSize) }}
              >
                {data.titulo2}
              </h2>
            )}
          </div>

          {/* Preço Principal */}
          <div className="flex items-center justify-center relative z-40 w-full">
            <div
              className="flex flex-col items-center justify-center font-bold text-[#303030]"
              style={{ gap: fp(36), marginRight: fp(40) }}
            >
              <span
                className="leading-normal font-extrabold"
                style={{ fontSize: fp(cifraoFigma) }}
              >
                R$
              </span>
              <span
                className="leading-tight uppercase"
                style={{ fontSize: fp(estimatedLines >= 3 ? 76 : 96) }}
              >
                {data.pagamento || "10X"}
              </span>
            </div>

            <div className="flex items-start">
              <span
                className="font-black text-[#303030] leading-none"
                style={{ fontSize: fp(precoFigma), letterSpacing: fp(-8) }}
              >
                {parteInteira},
              </span>
              <span
                className="font-black text-[#303030] leading-none"
                style={{
                  fontSize: fp(centavosFigma),
                  marginLeft: fp(8),
                  marginTop: fp(16),
                  letterSpacing: fp(-8),
                }}
              >
                {centavos ? centavos : "00"}
              </span>
            </div>
          </div>

          {/* Preço Antigo (Rodapé) */}
          {showFooter && (
            <div className="flex flex-col items-center relative z-40 w-full">
              <span
                className="font-extrabold text-center text-[#303030] uppercase tracking-wider leading-normal"
                style={{ fontSize: fp(60), marginBottom: fp(4) }}
              >
                {data.textoRodape || "À VISTA"}
              </span>
              <div className="flex items-start justify-center">
                <span
                  className="font-bold text-[#303030]"
                  style={{
                    fontSize: fp(60),
                    marginRight: fp(10),
                    marginTop: fp(6),
                  }}
                >
                  R$
                </span>
                <div className="flex items-start">
                  <span
                    className="font-extrabold text-[#303030] leading-none"
                    style={{
                      fontSize: fp(antigoInteiroFigma),
                      letterSpacing: fp(-8),
                    }}
                  >
                    {antigoInteiro},
                  </span>
                  {antigoCentavos !== undefined && (
                    <span
                      className="font-black text-[#303030] leading-none"
                      style={{
                        fontSize: fp(antigoCentavosFigma),
                        marginLeft: fp(4),
                        marginTop: fp(8),
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
