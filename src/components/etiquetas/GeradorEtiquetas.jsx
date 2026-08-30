import React, { useState } from "react";
import { templates } from "./templates";

export default function GeradorEtiquetas() {
  const [etiquetasSalvas, setEtiquetasSalvas] = useState([]);

  // Adicionamos 'variante' e 'textoRodape' ao estado inicial
  const [draft, setDraft] = useState({
    titulo1: "",
    titulo2: "",
    pagamento: "",
    preco: "0,00",
    precoAntigo: "",
    textoRodape: "",
    templateId: "padrao",
    variante: "v1", // Variante Padrão
  });

  const isLandscape = draft.templateId === "paisagem";
  const isPadrao = draft.templateId === "padrao";

  // Helpers para identificar a variação atual e mudar os labels do formulário
  const isV1 = draft.variante === "v1" || !draft.variante;
  const isV2 = draft.variante === "v2";
  const isV3 = draft.variante === "v3";
  const isV4 = draft.variante === "v4";

  const handleChange = (e) => {
    setDraft({ ...draft, [e.target.name]: e.target.value });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const onlyDigits = value.replace(/\D/g, "");

    if (name === "precoAntigo" && onlyDigits === "") {
      setDraft({ ...draft, [name]: "" });
      return;
    }
    if (name === "preco" && onlyDigits === "") {
      setDraft({ ...draft, [name]: "0,00" });
      return;
    }

    let number = (parseInt(onlyDigits, 10) / 100).toFixed(2);
    let [intPart, decPart] = number.split(".");
    intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    setDraft({ ...draft, [name]: `${intPart},${decPart}` });
  };

  const handleSalvar = () => {
    if (isLandscape) return;
    if (etiquetasSalvas.length >= 4) {
      alert("A folha suporta no máximo 4 etiquetas.");
      return;
    }
    setEtiquetasSalvas([...etiquetasSalvas, draft]);
  };

  const handleRemover = (indexToRemove) => {
    setEtiquetasSalvas(
      etiquetasSalvas.filter((_, index) => index !== indexToRemove),
    );
  };

  const handleLimpar = () => {
    setEtiquetasSalvas([]);
  };

  const handlePrint = () => {
    window.print();
  };

  const displayList = isLandscape
    ? [draft]
    : etiquetasSalvas.length === 4
      ? etiquetasSalvas
      : [...etiquetasSalvas, draft];

  const isSingle = displayList.length === 1;

  const renderTemplate = (data, index) => {
    const TemplateComponent =
      templates.find((t) => t.id === data.templateId)?.component ||
      templates[0].component;

    // Detecta a variante para injetar os placeholders corretos no preview
    const v = data.variante || "v1";
    let defaultPagamento = "À VISTA";
    if (v === "v2") defaultPagamento = "10x";
    if (v === "v3" || v === "v4") defaultPagamento = "POR APENAS";

    let defaultTextoRodape = "DE:";
    if (v === "v2") defaultTextoRodape = "À VISTA";
    if (v === "v3") defaultTextoRodape = "ou 10x s/ juros";
    if (v === "v4") defaultTextoRodape = "5% de desconto no PIX";

    const templateData = {
      ...data,
      titulo1: data.titulo1 || "Cadeira Gamer Havit",
      titulo2: data.titulo2 || "GC932 | Reclinação 166°",
      pagamento: data.pagamento || defaultPagamento,
      textoRodape: data.textoRodape || defaultTextoRodape,
    };

    return <TemplateComponent data={templateData} isSingle={isSingle} />;
  };

  const emptySlots =
    !isSingle && displayList.length < 4
      ? Array.from({ length: 4 - displayList.length })
      : [];

  // --- Lógica de Labels Dinâmicas para o Formulário ---
  let labelPagamento = "Forma de Pagamento";
  let placeholderPagamento = "À VISTA";
  if (isV2) {
    labelPagamento = "Qtd. Parcelas (ex: 10x)";
    placeholderPagamento = "10x";
  } else if (isV3 || isV4) {
    labelPagamento = "Chamada Superior";
    placeholderPagamento = "POR APENAS";
  }

  let labelPreco = isV2 ? "Valor da Parcela" : "Preço Principal";

  let labelRodape = "Preço Antigo";
  let placeholderRodape = "12.999,00";
  if (isV2) {
    labelRodape = "Valor Total à Vista";
    placeholderRodape = "6.999,00";
  } else if (isV3) {
    labelRodape = "Valor da Parcela";
    placeholderRodape = "199,00";
  }

  let labelTextoRodape = "Texto do Rodapé";
  let placeholderTextoRodape = "DE:";
  if (isV2) {
    labelTextoRodape = "Texto Auxiliar";
    placeholderTextoRodape = "À VISTA";
  } else if (isV3) {
    labelTextoRodape = "Texto da Parcela";
    placeholderTextoRodape = "ou 10x s/ juros";
  } else if (isV4) {
    labelTextoRodape = "Texto Promocional";
    placeholderTextoRodape = "5% de desconto no PIX";
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-[1600px] mx-auto h-[calc(100%-6rem)] px-6">
      {isLandscape && (
        <style>{`
          @media print {
            @page { size: A4 landscape !important; margin: 0mm !important; }
          }
        `}</style>
      )}

      {/* PAINEL DE CONTROLES */}
      <div className="w-full lg:w-1/3 space-y-6 print:hidden bg-gray-50 p-6 rounded-xl border border-gray-200 h-full overflow-y-auto">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Criar Etiqueta</h2>
          <p className="text-sm text-gray-500">
            {isLandscape
              ? "Formato: Paisagem (1 p/ folha)"
              : `Etiquetas na folha: ${etiquetasSalvas.length}/4`}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Modelo
            </label>
            <select
              name="templateId"
              value={draft.templateId}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 p-2.5 border bg-white"
            >
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Sub-menu de Variações visível apenas no Modelo Padrão */}
          {isPadrao && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Variação do Layout
              </label>
              <select
                name="variante"
                value={draft.variante || "v1"}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 p-2.5 border bg-white font-medium text-blue-800"
              >
                <option value="v1">V1: Padrão (Preço + De/Por)</option>
                <option disabled value="v2">
                  V2: Parcela em Destaque
                </option>
                <option disabled value="v3">
                  V3: Parcela no Rodapé
                </option>
                <option disabled value="v4">
                  V4: Texto Promocional
                </option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Título 1
            </label>
            <input
              type="text"
              name="titulo1"
              value={draft.titulo1}
              maxLength="46"
              onChange={handleChange}
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
              value={draft.titulo2}
              onChange={handleChange}
              placeholder="GC932 | Reclinação 166°"
              className="mt-1 block w-full rounded-md p-2.5 border border-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {labelPagamento}
            </label>
            <input
              type="text"
              name="pagamento"
              value={draft.pagamento}
              onChange={handleChange}
              placeholder={placeholderPagamento}
              className="mt-1 block w-full rounded-md p-2.5 border border-gray-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {labelPreco}
              </label>
              <input
                type="text"
                name="preco"
                value={draft.preco}
                onChange={handlePriceChange}
                className="mt-1 block w-full rounded-md p-2.5 border border-gray-300 font-bold text-blue-600"
              />
            </div>

            {/* O campo de Preço Antigo/Secundário some na V4 pois ela é apenas texto */}
            {!isV4 && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {labelRodape}
                </label>
                <div className="relative mt-1">
                  <input
                    type="text"
                    name="precoAntigo"
                    value={draft.precoAntigo}
                    onChange={handlePriceChange}
                    placeholder={placeholderRodape}
                    className="block w-full rounded-md p-2.5 pr-8 border border-gray-300"
                  />
                  {draft.precoAntigo && (
                    <button
                      type="button"
                      onClick={() => setDraft({ ...draft, precoAntigo: "" })}
                      className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Campo liberado para editar o "DE:", "À VISTA" ou a Promocão do rodapé */}
          {isPadrao && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {labelTextoRodape}
              </label>
              <input
                type="text"
                name="textoRodape"
                value={draft.textoRodape || ""}
                onChange={handleChange}
                placeholder={placeholderTextoRodape}
                className="mt-1 block w-full rounded-md p-2.5 border border-gray-300"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={handleSalvar}
            disabled={isLandscape || etiquetasSalvas.length >= 4}
            className={`w-full font-bold py-3 px-4 rounded-lg transition-colors ${isLandscape || etiquetasSalvas.length >= 4 ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "bg-gray-800 hover:bg-gray-900 text-white"}`}
          >
            {isLandscape
              ? "Apenas 1 por folha (Modo Paisagem)"
              : "Adicionar Etiqueta à Folha"}
          </button>

          <div className="flex gap-3">
            <button
              onClick={handleLimpar}
              className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Limpar Folha
            </button>
            <button
              onClick={handlePrint}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Imprimir Folha
            </button>
          </div>
        </div>

        {/* Tabela de Fila */}
        {!isLandscape && etiquetasSalvas.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200 pb-4">
            <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">
              Fila de Impressão ({etiquetasSalvas.length})
            </h3>
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-gray-500">
                      Produto
                    </th>
                    <th className="px-4 py-2 text-right font-medium text-gray-500">
                      Ação
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {etiquetasSalvas.map((etiqueta, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td
                        className="px-4 py-3 text-gray-700 font-medium truncate max-w-[180px]"
                        title={etiqueta.titulo1}
                      >
                        {etiqueta.titulo1}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleRemover(index)}
                          className="text-red-500 hover:text-red-700 font-semibold text-xs uppercase"
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ÁREA DE PREVIEW / FOLHA A4 */}
      <div className="w-full lg:w-2/3 h-full flex justify-center items-start print:items-start print:fixed print:inset-0 print:m-0 print:p-0 print:bg-white print:z-50 bg-gray-200 p-8 rounded-xl print:rounded-none overflow-y-auto print:overflow-hidden">
        <div className="transform scale-[0.45] md:scale-[0.5] lg:scale-[0.55] xl:scale-[0.7] 2xl:scale-[0.8] origin-top print:scale-100 print:transform-none transition-transform duration-300">
          <div
            className="bg-white shadow-2xl print:shadow-none mx-auto flex flex-wrap content-start relative overflow-hidden transition-all duration-300"
            style={{
              width: isLandscape ? "295mm" : "210mm",
              height: isLandscape ? "210mm" : "297mm",
            }}
          >
            {!isSingle && !isLandscape && (
              <>
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0 border-r border-dashed border-gray-400 z-20 pointer-events-none" />
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0 border-b border-dashed border-gray-400 z-20 pointer-events-none" />
              </>
            )}

            {displayList.map((item, index) => (
              <div
                key={index}
                className="print:break-inside-avoid box-border p-2 print:p-0 relative"
                style={{
                  width: isSingle ? "100%" : "50%",
                  height: isSingle ? "100%" : "50%",
                }}
              >
                {renderTemplate(item, index)}
              </div>
            ))}

            {emptySlots.map((_, index) => (
              <div
                key={`empty-${index}`}
                className="box-border p-2 print:p-2"
                style={{ width: "50%", height: "50%" }}
              >
                <div className="w-full h-full border border-dashed border-gray-200 flex items-center justify-center bg-gray-50 print:bg-white print:border-none">
                  <span className="text-gray-300 print:hidden">
                    Espaço Vazio
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
