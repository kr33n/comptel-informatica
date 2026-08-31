import React from "react";

export default function FormularioV1({
  tag,
  onChange,
  onPriceChange,
  onClearOldPrice,
  hasVariantes,
}) {
  return (
    <div className="flex flex-col gap-4 mt-4 border-t border-gray-200 pt-4">
      {/* Linha 1: Título 1 | Título 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 min-h-[1.25rem] leading-tight flex items-center mb-1">
            Título 1
          </label>
          <input
            type="text"
            name="titulo1"
            value={tag.titulo1}
            maxLength="46"
            onChange={onChange}
            placeholder="Cadeira Gamer Havit"
            className="w-full rounded-md p-2.5 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 min-h-[1.25rem] leading-tight flex items-center mb-1">
            Título 2
          </label>
          <input
            type="text"
            name="titulo2"
            value={tag.titulo2}
            onChange={onChange}
            placeholder="GC932 | Reclinação 166°"
            className="w-full rounded-md p-2.5 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* Linha 2: Forma de pagamento | Preço Principal | Preço Antigo | Texto do rodapé */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${
          hasVariantes ? "xl:grid-cols-4" : "xl:grid-cols-3"
        } gap-4 items-end`}
      >
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 min-h-[1.25rem] leading-tight flex items-center mb-1 whitespace-nowrap">
            Forma de Pagamento
          </label>
          <input
            type="text"
            name="pagamento"
            value={tag.pagamento}
            onChange={onChange}
            placeholder="À VISTA"
            className="w-full rounded-md p-2.5 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 min-h-[1.25rem] leading-tight flex items-center mb-1 whitespace-nowrap">
            Preço Principal
          </label>
          <input
            type="text"
            name="preco"
            value={tag.preco}
            onChange={onPriceChange}
            placeholder="0,00"
            className="w-full rounded-md p-2.5 border border-gray-300 font-bold text-blue-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 min-h-[1.25rem] leading-tight flex items-center mb-1 whitespace-nowrap">
            Preço Antigo
          </label>
          <div className="relative w-full">
            <input
              type="text"
              name="precoAntigo"
              value={tag.precoAntigo}
              onChange={onPriceChange}
              placeholder="12.999,00"
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
            <label className="text-sm font-medium text-gray-700 min-h-[1.25rem] leading-tight flex items-center mb-1 whitespace-nowrap">
              Texto do Rodapé
            </label>
            <input
              type="text"
              name="textoRodape"
              value={tag.textoRodape || ""}
              onChange={onChange}
              placeholder="DE:"
              className="w-full rounded-md p-2.5 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        )}
      </div>
    </div>
  );
}
