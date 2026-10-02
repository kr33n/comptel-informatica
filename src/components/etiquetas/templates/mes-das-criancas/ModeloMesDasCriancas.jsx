import React from "react";
import ModeloNovoV1 from "./ModeloMesDasCriancasV1";

export default function ModeloNovo({ data, isSingle }) {
  const variante = data.variante || "v1";

  switch (variante) {
    case "v1":
    default:
      return <ModeloNovoV1 data={data} isSingle={isSingle} />;
  }
}
