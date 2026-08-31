import React from "react";

export default function FormularioV1({
  tag,
  onChange,
  onPriceChange,
  onClearOldPrice,
  hasVariantes,
}) {
  return (
    <div className="grid grid-cols-1 gap-4 mt-4 border-t border-gray-200 pt-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Título 1
        </label>
        <input
          type="text"
          name="titulo1"
          value={tag.titulo1}
          maxLength="46"
          onChange={onChange}
          placeholder="Cadeira Gamer Havit"
          className="mt-1 block w-full rounded-md p-2.5 border border-gray-300"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Título 2
        </label>
        <input
          type="text"
          name="titulo2"
          value={tag.titulo2}
          onChange={onChange}
          placeholder="GC932 | Reclinação 166°"
          className="mt-1 block w-full rounded-md p-2.5 border border-gray-300"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Forma de Pagamento
        </label>
        <input
          type="text"
          name="pagamento"
          value={tag.pagamento}
          onChange={onChange}
          placeholder="À VISTA"
          className="mt-1 block w-full rounded-md p-2.5 border border-gray-300"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Preço Principal
          </label>
          <input
            type="text"
            name="preco"
            value={tag.preco}
            onChange={onPriceChange}
            className="mt-1 block w-full rounded-md p-2.5 border border-gray-300 font-bold text-blue-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Preço Antigo
          </label>
          <div className="relative mt-1">
            <input
              type="text"
              name="precoAntigo"
              value={tag.precoAntigo}
              onChange={onPriceChange}
              placeholder="12.999,00"
              className="block w-full rounded-md p-2.5 pr-8 border border-gray-300"
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
      </div>
      {hasVariantes && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Texto do Rodapé
          </label>
          <input
            type="text"
            name="textoRodape"
            value={tag.textoRodape || ""}
            onChange={onChange}
            placeholder="DE:"
            className="mt-1 block w-full rounded-md p-2.5 border border-gray-300"
          />
        </div>
      )}
    </div>
  );
}
