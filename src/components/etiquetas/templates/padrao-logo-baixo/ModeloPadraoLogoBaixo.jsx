import React from "react";
import ModeloPadraoLogoBaixoV1 from "./ModeloPadraoLogoBaixoV1";
import ModeloPadraoLogoBaixoV2 from "./ModeloPadraoLogoBaixoV2";

export default function ModeloPadraoLogoBaixo({ data, isSingle }) {
  const variante = data.variante || "v1";

  switch (variante) {
    case "v2":
      return <ModeloPadraoLogoBaixoV2 data={data} isSingle={isSingle} />;
    case "v1":
    default:
      return <ModeloPadraoLogoBaixoV1 data={data} isSingle={isSingle} />;
  }
}
