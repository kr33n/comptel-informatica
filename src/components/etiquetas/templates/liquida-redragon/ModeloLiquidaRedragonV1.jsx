import React from "react";

export default function ModeloRedragon({ data, isSingle }) {
  const fp = (figmaPx) => {
    // A base do Figma enviada para esse modelo foi 298px de largura.
    // Isso garante que o layout preencha 100% da etiqueta.
    const scale = isSingle ? 794 / 298 : 794 / 298 / 2;
    return `${Math.round(figmaPx * scale * 10) / 10}px`;
  };

  const showOldPrice = data.precoAntigo && data.precoAntigo.trim() !== "";
  const showFooter = true;

  const titulo1Text = data.titulo1 || "Nome do Produto";

  const precoStr = data.preco || "0,00";
  const [parteInteira, centavos] = precoStr.split(",");
  const precoLength = precoStr.length;

  const precoAntigoStr = data.precoAntigo || "";
  const [antigoInteiro, antigoCentavos] = precoAntigoStr.split(",");

  // Escala dinâmica adaptada para as medidas deste arquivo (base text-[48px])
  let precoFigma = 48;
  let centavosFigma = 24;
  let cifraoFigma = 14;

  if (precoLength >= 9 && precoLength <= 10) {
    precoFigma = 40;
    centavosFigma = 20;
  } else if (precoLength > 10) {
    precoFigma = 32;
    centavosFigma = 16;
  }

  return (
    <div
      className="relative w-full h-full bg-white flex flex-col justify-center items-center print:border-0 border border-gray-300"
      style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
    >
      {/* Container Principal Ajustado para Proporção Exata do Figma */}
      <div
        className="flex flex-col items-center justify-center w-full h-full"
        style={{ gap: fp(10) }}
      >
        {/* Logo Liquida Redragon (Topo) */}
        <img
          src="/assets/etiquetas/liquida-redragon.svg"
          alt="Liquida Redragon"
          className="object-contain pointer-events-none select-none"
          style={{ width: fp(219), height: fp(30) }}
        />

        {/* Cartão Vermelho */}
        <div
          className="relative bg-[#d2212d] flex flex-col overflow-hidden"
          style={{
            width: fp(251),
            height: fp(343),
            borderRadius: fp(24),
          }}
        >
          {/* Logo Dragão (Fundo Canto Inferior Direito) */}
          <img
            src="/assets/etiquetas/redragon-logo.svg"
            alt="Logo Redragon"
            className="absolute object-contain pointer-events-none select-none"
            style={{
              width: fp(212),
              height: fp(139),
              bottom: fp(-20),
              right: fp(-50), // Puxado para a direita para dar o efeito de corte
            }}
          />

          {/* Conteúdo do Cartão */}
          <div
            className="relative z-10 flex flex-col h-full w-full gap-5"
            style={{ padding: fp(16) }}
          >
            {/* Bloco Superior (Títulos + Preço Principal) */}
            <div className="flex flex-col gap-5">
              {/* Títulos */}
              <div
                className="flex flex-col items-start pt-10"
                style={{ gap: fp(4) }}
              >
                <h1
                  className="font-bold text-white w-full text-left"
                  style={{ fontSize: fp(24), lineHeight: fp(28) }}
                >
                  {titulo1Text}
                </h1>
                {data.titulo2 && (
                  <h2
                    className="font-medium text-white w-full text-left"
                    style={{ fontSize: fp(14), lineHeight: "normal" }}
                  >
                    {data.titulo2}
                  </h2>
                )}
              </div>

              {/* Preço Principal */}
              <div className="flex flex-col items-start" style={{ gap: fp(2) }}>
                <span
                  className="font-semibold text-white uppercase"
                  style={{ fontSize: fp(12) }}
                >
                  {data.pagamento || "À VISTA"}
                </span>
                <div className="flex items-start">
                  <span
                    className="font-medium text-white"
                    style={{
                      fontSize: fp(14),
                      marginTop: fp(3),
                      marginRight: fp(4),
                      lineHeight: "normal",
                    }}
                  >
                    R$
                  </span>
                  <span
                    className="font-bold text-white leading-none tracking-[-1.6px]"
                    style={{ fontSize: fp(48) }}
                  >
                    {parteInteira},
                  </span>
                  <span
                    className="font-bold text-white leading-none tracking-[0.4px]"
                    style={{
                      fontSize: fp(centavosFigma),
                      marginTop: fp(1),
                      marginLeft: fp(2),
                      textEdge: "cap",
                    }}
                  >
                    {centavos ? centavos : "00"}
                  </span>
                </div>
              </div>
            </div>

            {/* Preço Antigo (Rodapé) - Ancorado na base */}
            {showFooter && (
              <div className="flex flex-col items-start" style={{ gap: fp(4) }}>
                <span
                  className="font-semibold text-white uppercase"
                  style={{ fontSize: fp(12) }}
                >
                  {data.textoRodape || "DE:"}
                </span>
                <div className="flex items-start">
                  <span
                    className="font-medium text-white"
                    style={{
                      fontSize: fp(12),
                      marginRight: fp(4),
                    }}
                  >
                    R$
                  </span>
                  <span
                    className="font-bold text-white leading-none tracking-[0.4px]"
                    style={{ fontSize: fp(32) }}
                  >
                    {antigoInteiro},
                  </span>
                  {antigoCentavos !== undefined && (
                    <span
                      className="font-bold text-white leading-none tracking-[0.4px]"
                      style={{
                        fontSize: fp(16),
                        marginTop: fp(2),
                        marginLeft: fp(2),
                      }}
                    >
                      {antigoCentavos}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
