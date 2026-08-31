import ModeloPadraoV1 from "./padrao/ModeloPadraoV1";
import ModeloPadraoV2 from "./padrao/ModeloPadraoV2";
import ModeloPadraoV3 from "./padrao/ModeloPadraoV3";
import ModeloPadraoV4 from "./padrao/ModeloPadraoV4";

import ModeloMinecraftV1 from "./dia-das-criancas-2026/ModeloMinecraftV1";
import ModeloMinecraftV2 from "./dia-das-criancas-2026/ModeloMinecraftV2";
import ModeloMinecraftV3 from "./dia-das-criancas-2026/ModeloMinecraftV3";
import ModeloMinecraftV4 from "./dia-das-criancas-2026/ModeloMinecraftV4";

// Mapeamento direto de componentes por variante
const padraoVariants = {
  v1: ModeloPadraoV1,
  v2: ModeloPadraoV2,
  v3: ModeloPadraoV3,
  v4: ModeloPadraoV4,
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
    nome: "Modelo Padrão",
    getComponent: (variante = "v1") =>
      padraoVariants[variante] || ModeloPadraoV1,
  },
  {
    id: "minecraft",
    nome: "Dia das Crianças (Minecraft)",
    getComponent: (variante = "v1") =>
      minecraftVariants[variante] || ModeloMinecraftV1,
  },
];
