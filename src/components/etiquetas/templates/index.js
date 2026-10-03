import ModeloPadraoLogoBaixoV1 from "./padrao-logo-baixo/ModeloPadraoLogoBaixoV1";
import ModeloPadraoLogoBaixoV2 from "./padrao-logo-baixo/ModeloPadraoLogoBaixoV2";

import ModeloLiquidaRedragonV1 from "./liquida-redragon/ModeloLiquidaRedragonV1";

import ModeloMesDasCriancasV1 from "./mes-das-criancas/ModeloMesDasCriancasV1";
import ModeloMesDasCriancasV2 from "./mes-das-criancas/ModeloMesDasCriancasV2";
import ModeloMesDasCriancasV5 from "./mes-das-criancas/ModeloMesDasCriancasV5";

const padraoLogoBaixoVariants = {
  v1: ModeloPadraoLogoBaixoV1,
  v2: ModeloPadraoLogoBaixoV2,
};

const liquidaRedragonVariants = {
  v1: ModeloLiquidaRedragonV1,
};
const MesDasCriancasVariants = {
  v1: ModeloMesDasCriancasV1,
  v2: ModeloMesDasCriancasV2,
  v5: ModeloMesDasCriancasV5,
};

export const templates = [
  {
    id: "padrao-logo-baixo",
    nome: "Modelo Padrão (Logo em Baixo)",
    variantes: [
      { id: "v1", nome: "Preço com desconto (De/Por)" },
      { id: "v2", nome: "Parcelamento" },
      { id: "v3", nome: "À vista e parcelado" },
      { id: "v4", nome: "Promocional" },
    ],
    getComponent: (variante = "v1") =>
      padraoLogoBaixoVariants[variante] || ModeloPadraoLogoBaixoV1,
  },
  {
    id: "liquida-redragon",
    nome: "Liquida Redragon",
    variantes: [{ id: "v1", nome: "Padrão" }],
    getComponent: (variante = "v1") =>
      liquidaRedragonVariants[variante] || ModeloLiquidaRedragonV1,
  },
  {
    id: "mes-das-criancas",
    nome: "Mês das Crianças",
    variantes: [
      { id: "v1", nome: "Preço com desconto (De/Por)" },
      { id: "v2", nome: "Parcelamento" },
      { id: "v5", nome: "A partir de" },
      // { id: "v4", nome: "Promocional" },
    ],
    getComponent: (variante = "v1") =>
      MesDasCriancasVariants[variante] || ModeloMesDasCriancasV1,
  },
];
