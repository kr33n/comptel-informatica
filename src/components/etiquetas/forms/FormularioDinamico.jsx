import React from "react";
import { formVariantesConfig } from "./formConfig";

export default function FormularioDinamico({
  tag,
  onChange,
  onPriceChange,
  onClearOldPrice,
  hasVariantes, // Mantido apenas para evitar quebrar a chamada no GeradorEtiquetas
}) {
  const varianteKey = tag.variante || "v1";
  const config = formVariantesConfig[varianteKey] || formVariantesConfig.v1;

  return (
    <div className="flex flex-col gap-3 self-stretch mt-2">
      <span className="font-medium text-[20px] text-black">
        Dados da etiqueta
      </span>

      <div className="flex flex-col gap-0.5 self-stretch">
        {/* Título (Sempre visível e 100% de largura) */}
        <div className="flex flex-col gap-1 self-stretch">
          <span className="font-medium text-[16px] text-black">
            {config.titulo1.label}
          </span>
          <div className="flex flex-col self-stretch h-14 rounded-tl rounded-tr">
            <div className="flex flex-col gap-2.5 self-stretch rounded border border-solid border-[#79747e] bg-white">
              <div className="flex items-center gap-1 self-stretch px-4 py-1 rounded-tl rounded-tr">
                <div className="flex flex-col justify-center grow h-8 py-1">
                  <input
                    type="text"
                    name="titulo1"
                    value={tag.titulo1}
                    maxLength="46"
                    onChange={onChange}
                    placeholder={config.titulo1.placeholder}
                    className="flex items-center self-stretch font-normal text-base text-black placeholder:text-[#c1c0c2] outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtítulo (Sempre visível e 100% de largura) */}
        <div className="flex flex-col gap-1 self-stretch">
          <span className="font-medium text-[16px] text-black">
            {config.titulo2.label}
          </span>
          <div className="flex flex-col self-stretch h-14 rounded-tl rounded-tr">
            <div className="flex flex-col gap-2.5 self-stretch rounded border border-solid border-[#79747e] bg-white">
              <div className="flex items-center gap-1 self-stretch px-4 py-1 rounded-tl rounded-tr">
                <div className="flex flex-col justify-center grow8 py-1">
                  <input
                    type="text"
                    name="titulo2"
                    value={tag.titulo2}
                    onChange={onChange}
                    maxLength="50"
                    placeholder={config.titulo2.placeholder}
                    className="flex items-center self-stretch font-normal text-base text-black placeholder:text-[#c1c0c2] outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grade de Campos Dinâmicos Inferiores (2 colunas na V1, 3 colunas nas demais) */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${config.layout.length === 3 ? "lg:grid-cols-3" : ""} gap-6 self-stretch`}
        >
          {config.layout.map((fieldKey) => {
            const fieldConfig = config[fieldKey];
            const isPrice = fieldKey === "preco" || fieldKey === "precoAntigo";
            const hasClear = fieldKey === "precoAntigo"; // O botão "X" para limpar fica atrelado ao precoAntigo para ocultar o rodapé facilmente

            return (
              <div key={fieldKey} className="flex flex-col gap-2 grow">
                <span className="font-medium text-[16px] text-black">
                  {fieldConfig.label}
                </span>
                <div className="flex flex-col self-stretch rounded-tl rounded-tr">
                  <div className="flex flex-col gap-2.5 self-stretch rounded border border-solid border-[#79747e] bg-white">
                    <div className="flex items-center gap-1 self-stretch px-4 py-1 rounded-tl rounded-tr relative">
                      <div className="flex flex-col justify-center grow h-8 py-1">
                        <input
                          type="text"
                          name={fieldKey}
                          value={tag[fieldKey] || ""}
                          onChange={isPrice ? onPriceChange : onChange}
                          placeholder={fieldConfig.placeholder}
                          className={`flex items-center self-stretch font-normal text-base text-black placeholder:text-[#c1c0c2] outline-none bg-transparent ${hasClear ? "pr-6" : ""}`}
                        />
                      </div>
                      {hasClear && tag[fieldKey] && (
                        <button
                          type="button"
                          onClick={onClearOldPrice}
                          className="absolute right-3 flex items-center text-gray-400 hover:text-black cursor-pointer"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
