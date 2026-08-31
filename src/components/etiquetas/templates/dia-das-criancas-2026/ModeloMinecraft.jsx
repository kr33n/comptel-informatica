import React from "react";
import ModeloMinecraftV1 from "./ModeloMinecraftV1";
import ModeloMinecraftV2 from "./ModeloMinecraftV2";
import ModeloMinecraftV3 from "./ModeloMinecraftV3";
import ModeloMinecraftV4 from "./ModeloMinecraftV4";

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
