import ModeloPadraoV1 from "./padrao/ModeloPadraoV1";
import ModeloPadraoV2 from "./padrao/ModeloPadraoV2";
import ModeloPadraoV3 from "./padrao/ModeloPadraoV3";
import ModeloPadraoV4 from "./padrao/ModeloPadraoV4";

import ModeloMinecraftV1 from "./dia-das-criancas-2026/ModeloMinecraftV1";
import ModeloMinecraftV2 from "./dia-das-criancas-2026/ModeloMinecraftV2";
import ModeloMinecraftV3 from "./dia-das-criancas-2026/ModeloMinecraftV3";
import ModeloMinecraftV4 from "./dia-das-criancas-2026/ModeloMinecraftV4";

import ModeloPadraoLogoBaixoV1 from "./padrao-logo-baixo/ModeloPadraoLogoBaixoV1";
import ModeloPadraoLogoBaixoV2 from "./padrao-logo-baixo/ModeloPadraoLogoBaixoV2";

// Mapeamento direto de componentes por variante
const padraoVariants = {
  v1: ModeloPadraoV1,
  v2: ModeloPadraoV2,
  v3: ModeloPadraoV3,
  v4: ModeloPadraoV4,
};

const padraoLogoBaixoVariants = {
  v1: ModeloPadraoLogoBaixoV1,
  v2: ModeloPadraoLogoBaixoV2,
};

const minecraftVariants = {
  v1: ModeloMinecraftV1,
  v2: ModeloMinecraftV2,
  v3: ModeloMinecraftV3,
  v4: ModeloMinecraftV4,
};

export const templates = [
  {
    id: "padrao",
    nome: "Modelo Padrão (Logo Diagonal)",
    variantes: [
      { id: "v1", nome: "Preço com desconto (De/Por)" },
      { id: "v2", nome: "Parcelamento" },
      { id: "v3", nome: "À vista e parcelado" },
      { id: "v4", nome: "Promocional" },
    ],
    getComponent: (variante = "v1") =>
      padraoVariants[variante] || ModeloPadraoV1,
  },
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
  // {
  //   id: "minecraft",
  //   nome: "Dia das Crianças (Minecraft)",
  //   getComponent: (variante = "v1") =>
  //     minecraftVariants[variante] || ModeloMinecraftV1,
  // },
];
