import ModeloPadrao from "./padrao/ModeloPadrao";
import ModeloMinecraft from "./dia_das_criancas_2026/ModeloMinecraft"; // <-- Importe aqui

export const templates = [
  {
    id: "padrao",
    nome: "Modelo Padrão Comptel 2026",
    component: ModeloPadrao,
  },
  {
    id: "minecraft",
    nome: "Minecraft (Dia das Crianças) 2026",
    component: ModeloMinecraft,
  },
];
