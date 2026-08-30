import ModeloPadrao from "./ModeloPadrao";
import ModeloPaisagem from "./ModeloPaisagem";
import ModeloMinecraft from "./ModeloMinecraft"; // <-- Importe aqui

export const templates = [
  {
    id: "padrao",
    nome: "Modelo Retrato (Azul Padrão)",
    component: ModeloPadrao,
  },
  {
    id: "minecraft",
    nome: "Minecraft (Dia das Crianças) 2026",
    component: ModeloMinecraft,
  },
];
