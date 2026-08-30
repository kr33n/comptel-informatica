import React from "react";
import ModeloPadraoV1 from "./ModeloPadraoV1";
import ModeloPadraoV2 from "./ModeloPadraoV2";
import ModeloPadraoV3 from "./ModeloPadraoV3";
import ModeloPadraoV4 from "./ModeloPadraoV4";

export default function ModeloPadrao({ data, isSingle }) {
  const variante = data.variante || "v1";

  switch (variante) {
    case "v2":
      return <ModeloPadraoV2 data={data} isSingle={isSingle} />;
    case "v3":
      return <ModeloPadraoV3 data={data} isSingle={isSingle} />;
    case "v4":
      return <ModeloPadraoV4 data={data} isSingle={isSingle} />;
    case "v1":
    default:
      return <ModeloPadraoV1 data={data} isSingle={isSingle} />;
  }
}
