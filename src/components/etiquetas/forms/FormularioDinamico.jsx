import React from "react";
import { formVariantesConfig } from "./formConfig";

export default function FormularioDinamico({
  tag,
  onChange,
  onPriceChange,
  onClearOldPrice,
  hasVariantes,
}) {
  const varianteKey = tag.variante || "v1";
  const config = formVariantesConfig[varianteKey] || formVariantesConfig.v1;

  return (
    <div className="flex flex-col gap-4 mt-4 border-t border-gray-200 pt-4">
      {/* Linha 1: Título 1 | Título 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 min-h-5 leading-tight flex items-center mb-1">
            {config.titulo1.label}
          </label>
          <input
            type="text"
            name="titulo1"
            value={tag.titulo1}
            maxLength="46"
            onChange={onChange}
            placeholder={config.titulo1.placeholder}
            className="w-full rounded-md p-2.5 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 min-h-5-tight flex items-center mb-1">
            {config.titulo2.label}
          </label>
          <input
            type="text"
            name="titulo2"
            value={tag.titulo2}
            onChange={onChange}
            placeholder={config.titulo2.placeholder}
            className="w-full rounded-md p-2.5 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* Linha 2: Pagamento | Preço Principal | Preço Antigo | Rodapé */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${
          hasVariantes ? "xl:grid-cols-4" : "xl:grid-cols-3"
        } gap-4 items-end`}
      >
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 min-h-5 leading-tight flex items-center mb-1 whitespace-nowrap">
            {config.pagamento.label}
          </label>
          <input
            type="text"
            name="pagamento"
            value={tag.pagamento}
            onChange={onChange}
            placeholder={config.pagamento.placeholder}
            className="w-full rounded-md p-2.5 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 min-h-5 leading-tight flex items-center mb-1 whitespace-nowrap">
            {config.preco.label}
          </label>
          <input
            type="text"
            name="preco"
            value={tag.preco}
            onChange={onPriceChange}
            placeholder={config.preco.placeholder}
            className="w-full rounded-md p-2.5 border border-gray-300 font-bold text-blue-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 min-h-5 leading-tight flex items-center mb-1 whitespace-nowrap">
            {config.precoAntigo.label}
          </label>
          <div className="relative w-full">
            <input
              type="text"
              name="precoAntigo"
              value={tag.precoAntigo}
              onChange={onPriceChange}
              placeholder={config.precoAntigo.placeholder}
              className="w-full rounded-md p-2.5 pr-8 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {tag.precoAntigo && (
              <button
                type="button"
                onClick={onClearOldPrice}
                className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {hasVariantes && (
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 min-h-5 leading-tight flex items-center mb-1 whitespace-nowrap">
              {config.textoRodape.label}
            </label>
            <input
              type="text"
              name="textoRodape"
              value={tag.textoRodape || ""}
              onChange={onChange}
              placeholder={config.textoRodape.placeholder}
              className="w-full rounded-md p-2.5 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        )}
      </div>
    </div>
  );
}
