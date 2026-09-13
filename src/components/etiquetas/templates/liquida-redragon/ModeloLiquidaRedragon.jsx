import React from "react";
import ModeloMinecraftV1 from "./ModeloLiquidaRedragonV1";

export default function ModeloMinecraft({ data, isSingle }) {
  const variante = data.variante || "v1";

  switch (variante) {
    case "v1":
    default:
      return <ModeloLiquidaRedragonV1 data={data} isSingle={isSingle} />;
  }
}
