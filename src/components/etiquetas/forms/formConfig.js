export const formVariantesConfig = {
  v1: {
    titulo1: { label: "Título", placeholder: "Ex: Monitor AOC" },
    titulo2: { label: "Subtítulo", placeholder: "Ex: FHD | 120hz" },
    layout: ["precoAntigo", "preco"], // Define que V1 tem apenas De e Por
    precoAntigo: { label: "De", placeholder: "00.000,00" },
    preco: { label: "Por", placeholder: "00.000,00" },
  },
  v2: {
    titulo1: { label: "Título", placeholder: "Ex: PC Gamer Completo" },
    titulo2: {
      label: "Subtítulo",
      placeholder: "Ex: Ryzen 5 | 16GB | SSD 512GB",
    },
    layout: ["pagamento", "preco", "precoAntigo"],
    pagamento: { label: "Quantidade de parcelas", placeholder: "Ex: 10x" },
    preco: { label: "Valor da parcela", placeholder: "0,00" },
    precoAntigo: { label: "Total", placeholder: "00.000,00" },
  },
  v3: {
    titulo1: { label: "Título", placeholder: "Ex: Monitor Gamer 180Hz" },
    titulo2: { label: "Subtítulo", placeholder: "Ex: 24 Polegadas | 1ms IPS" },
    layout: ["preco", "textoRodape", "precoAntigo"],
    preco: { label: "Valor à vista", placeholder: "00.000,00" },
    textoRodape: { label: "Quantidade de parcelas", placeholder: "Ex: ou 10x" },
    precoAntigo: { label: "Valor da parcela", placeholder: "0,00" },
  },
  v4: {
    titulo1: { label: "Título", placeholder: "Ex: Teclado Mecânico RGB" },
    titulo2: {
      label: "Subtítulo",
      placeholder: "Ex: Switch Red | Layout ABNT2",
    },
    layout: ["preco", "textoRodape"], // Removemos o "pagamento" daqui
    preco: { label: "Valor à vista", placeholder: "00.000,00" },
    textoRodape: {
      label: "Condição promocional",
      placeholder: "Ex: 5% de desconto no PIX",
    },
  },
};
