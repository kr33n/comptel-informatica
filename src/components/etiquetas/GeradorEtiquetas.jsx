import React, { useState } from "react";
import { templates } from "./templates";

export default function GeradorEtiquetas() {
  const [etiquetasSalvas, setEtiquetasSalvas] = useState([]);

  // 1. Draft agora inicia vazio (usando apenas placeholders na interface)
  const [draft, setDraft] = useState({
    titulo1: "",
    titulo2: "",
    pagamento: "",
    preco: "0,00", // Valor inicial cravado em 0,00
    precoAntigo: "",
    templateId: "padrao",
  });

  const isLandscape = draft.templateId === "paisagem";

  // Handler para campos de texto normais
  const handleChange = (e) => {
    setDraft({ ...draft, [e.target.name]: e.target.value });
  };

  // 2. Handler exclusivo para campos de preço (Preenchimento Direita -> Esquerda)
  const handlePriceChange = (e) => {
    const { name, value } = e.target;

    // Remove tudo que não for número
    const onlyDigits = value.replace(/\D/g, "");

    // Se o campo for Preço Antigo e o usuário apagar tudo, deixa vazio para sumir o "DE:"
    if (name === "precoAntigo" && onlyDigits === "") {
      setDraft({ ...draft, [name]: "" });
      return;
    }

    // Se for o Preço Atual e apagar tudo, trava no 0,00
    if (name === "preco" && onlyDigits === "") {
      setDraft({ ...draft, [name]: "0,00" });
      return;
    }

    // Transforma a string de números puros em decimal (ex: 1234 -> 12.34)
    let number = (parseInt(onlyDigits, 10) / 100).toFixed(2);
    let [intPart, decPart] = number.split(".");

    // Adiciona o ponto de milhar
    intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // Salva no formato brasileiro
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

    // Tratamento visual: Se o draft estiver vazio, mostra o placeholder no preview
    const templateData = {
      ...data,
      titulo1: data.titulo1 || "Cadeira Gamer Havit",
      titulo2: data.titulo2 || "GC932 | Reclinação 166°",
      pagamento: data.pagamento || "À VISTA",
    };

    return <TemplateComponent data={templateData} isSingle={isSingle} />;
  };

  const emptySlots =
    !isSingle && displayList.length < 4
      ? Array.from({ length: 4 - displayList.length })
      : [];

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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Título 1
            </label>
            <input
              type="text"
              name="titulo1"
              value={draft.titulo1}
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
              Forma de Pagamento
            </label>
            <input
              type="text"
              name="pagamento"
              value={draft.pagamento}
              onChange={handleChange}
              placeholder="À VISTA"
              className="mt-1 block w-full rounded-md p-2.5 border border-gray-300"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Preço Atual
              </label>
              {/* Note o handlePriceChange aqui */}
              <input
                type="text"
                name="preco"
                value={draft.preco}
                onChange={handlePriceChange}
                className="mt-1 block w-full rounded-md p-2.5 border border-gray-300 font-bold text-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Preço Antigo
              </label>
              {/* Note o handlePriceChange aqui */}
              <input
                type="text"
                name="precoAntigo"
                value={draft.precoAntigo}
                onChange={handlePriceChange}
                placeholder="12.999,00"
                className="mt-1 block w-full rounded-md p-2.5 border border-gray-300"
              />
            </div>
          </div>
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

        {/* Tabela de Fila (some automaticamente no modo Paisagem) */}
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
                        className="px-4 py-3 text-gray-700 font-medium truncate max-w-45"
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
        {/* Wrapper de Escala */}
        <div className="transform scale-[0.45] md:scale-[0.5] lg:scale-[0.55] xl:scale-[0.7] 2xl:scale-[0.8] origin-top print:scale-100 print:transform-none transition-transform duration-300">
          <div
            className="bg-white shadow-2xl print:shadow-none mx-auto flex flex-wrap content-start relative overflow-hidden transition-all duration-300"
            style={{
              width: isLandscape ? "295mm" : "210mm",
              height: isLandscape ? "210mm" : "297mm",
            }}
          >
            {/* LINHAS GUIAS DE CORTE EM CRUZ */}
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
