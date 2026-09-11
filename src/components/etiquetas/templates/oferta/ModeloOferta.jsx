import React from "react";
import ModeloMinecraftV1 from "./ModeloOfertaV1";

export default function ModeloMinecraft({ data, isSingle }) {
  const variante = data.variante || "v1";

  switch (variante) {
    case "v2":
      return <ModeloMinecraftV2 data={data} isSingle={isSingle} />;
    case "v3":
      return <ModeloMinecraftV3 data={data} isSingle={isSingle} />;
    case "v4":
      return <ModeloMinecraftV4 data={data} isSingle={isSingle} />;
    case "v1":
    default:
      return <ModeloMinecraftV1 data={data} isSingle={isSingle} />;
  }
}
