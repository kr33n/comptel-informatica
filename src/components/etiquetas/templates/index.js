import ModeloPadrao from "./ModeloPadrao";
import ModeloPaisagem from "./ModeloPaisagem";

export const templates = [
  {
    id: "padrao",
    nome: "Modelo Retrato (Até 4 p/ folha)",
    component: ModeloPadrao,
  },
  {
    id: "paisagem",
    nome: "Modelo Paisagem (1 p/ folha)",
    component: ModeloPaisagem,
  },
];
