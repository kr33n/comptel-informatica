import React, { useState, useEffect } from "react";

import { templates } from "./templates";

import FormularioDinamico from "./forms/FormularioDinamico";

// shadcn/ui components

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";

import { Separator } from "@/components/ui/separator";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Printer, Trash2, Check, Eye, Copy, X } from "lucide-react";

const defaultTag = {
  titulo1: "",

  titulo2: "",

  pagamento: "",

  preco: "0,00",

  precoAntigo: "",

  textoRodape: "",

  templateId: "padrao",

  variante: "v1",
};

export default function GeradorEtiquetas() {
  const [printMode, setPrintMode] = useState("A6");
  const [openAlertaVazio, setOpenAlertaVazio] = useState(false);

  const [activeStep, setActiveStep] = useState(0);

  const [openLimparAtual, setOpenLimparAtual] = useState(false);

  const [openLimparTodos, setOpenLimparTodos] = useState(false);

  // 1. O estado inicial SEMPRE começa com as etiquetas padrão (igual no servidor)
  const [tags, setTags] = useState([
    defaultTag,
    defaultTag,
    defaultTag,
    defaultTag,
  ]);

  // Flag para sabermos que o componente já montou no navegador
  const [isMounted, setIsMounted] = useState(false);

  // 2. Roda APENAS no navegador logo após a primeira renderização
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("comptel_etiquetas");
    if (saved) {
      try {
        setTags(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao carregar dados", e);
      }
    }
  }, []);

  // 3. Salva no localStorage sempre que as tags mudarem (mas só depois de montado)
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("comptel_etiquetas", JSON.stringify(tags));
    }
  }, [tags, isMounted]);

  const currentTag = tags[activeStep];

  const isLandscape = currentTag.templateId === "paisagem";

  const hasVariantes =
    currentTag.templateId === "padrao" || currentTag.templateId === "minecraft";

  const updateActiveTag = (updates) => {
    const newTags = [...tags];

    newTags[activeStep] = { ...newTags[activeStep], ...updates };

    setTags(newTags);
  };

  const handleChange = (e) => {
    updateActiveTag({ [e.target.name]: e.target.value });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;

    const onlyDigits = value.replace(/\D/g, "");

    if (name === "precoAntigo" && onlyDigits === "") {
      updateActiveTag({ [name]: "" });

      return;
    }

    if (name === "preco" && onlyDigits === "") {
      updateActiveTag({ [name]: "0,00" });

      return;
    }

    let number = (parseInt(onlyDigits, 10) / 100).toFixed(2);

    let [intPart, decPart] = number.split(".");

    intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    updateActiveTag({ [name]: `${intPart},${decPart}` });
  };

  const handleStepChange = (newIndex) => {
    if (newIndex === activeStep) return;

    const currentTagData = tags[activeStep];

    const targetTagData = tags[newIndex];

    const isTargetEmpty =
      !targetTagData.titulo1 &&
      !targetTagData.titulo2 &&
      (targetTagData.preco === "0,00" || !targetTagData.preco) &&
      !targetTagData.precoAntigo;

    if (isTargetEmpty) {
      const newTags = [...tags];

      newTags[newIndex] = {
        ...targetTagData,

        templateId: currentTagData.templateId,

        variante: currentTagData.variante,
      };

      setTags(newTags);
    }

    setActiveStep(newIndex);

    setTimeout(() => {
      const inputTitulo1 = document.querySelector('input[name="titulo1"]');

      if (inputTitulo1) {
        inputTitulo1.focus();

        inputTitulo1.select();
      }
    }, 50);
  };

  const handleDuplicarParaProxima = () => {
    const targetIndex = activeStep < 3 ? activeStep + 1 : 0;

    const newTags = [...tags];

    newTags[targetIndex] = { ...tags[activeStep] };

    setTags(newTags);

    setActiveStep(targetIndex);

    setTimeout(() => {
      const inputTitulo1 = document.querySelector('input[name="titulo1"]');

      if (inputTitulo1) {
        inputTitulo1.focus();
      }
    }, 50);
  };

  const confirmarLimparAtual = () => {
    const newTags = [...tags];

    newTags[activeStep] = {
      ...defaultTag,

      templateId: newTags[activeStep].templateId,

      variante: newTags[activeStep].variante,
    };

    setTags(newTags);

    setOpenLimparAtual(false);
  };

  const confirmarLimparTodos = () => {
    setTags([defaultTag, defaultTag, defaultTag, defaultTag]);

    setActiveStep(0);

    setOpenLimparTodos(false);
  };

  const handlePrint = () => {
    // No modo A4 valida apenas a primeira etiqueta; no modo A6 valida todas as 4
    const listToCheck = printMode === "A4" ? [tags[0]] : tags;

    const hasFilledTag = listToCheck.some((item) => {
      const hasTitulo1 = Boolean(item.titulo1?.trim());
      const hasTitulo2 = Boolean(item.titulo2?.trim());
      const hasPrecoAntigo = Boolean(item.precoAntigo?.trim());
      const hasPreco =
        item.preco && item.preco !== "0,00" && Boolean(item.preco.trim());

      return hasTitulo1 || hasTitulo2 || hasPrecoAntigo || hasPreco;
    });

    if (!hasFilledTag) {
      setOpenAlertaVazio(true);
      return;
    }

    window.print();
  };

  const isSingle = printMode === "A4" || isLandscape;

  const printList = isSingle ? [tags[0]] : tags;

  const renderFormulario = () => (
    <FormularioDinamico
      tag={currentTag}
      onChange={handleChange}
      onPriceChange={handlePriceChange}
      onClearOldPrice={() => updateActiveTag({ precoAntigo: "" })}
      hasVariantes={hasVariantes}
    />
  );

  const renderTemplateComponent = (data, singleMode) => {
    const templateConfig =
      templates.find((t) => t.id === data.templateId) || templates[0];

    const TemplateComponent = templateConfig.getComponent
      ? templateConfig.getComponent(data.variante)
      : templateConfig.component;

    const v = data.variante || "v1";

    let defaultPagamento = "À VISTA";
    let defaultTextoRodape = "DE:";

    if (v === "v2") defaultPagamento = "00x";
    if (v === "v2") defaultTextoRodape = "À VISTA";

    if (v === "v3" || v === "v4") defaultPagamento = "POR APENAS";
    if (v === "v3") defaultTextoRodape = "ou 0x s/ juros";
    if (v === "v4") defaultTextoRodape = "0% de desconto no PIX";

    const templateData = {
      ...data,

      titulo1: data.titulo1 || "Exemplo",

      titulo2: data.titulo2 || "Exemplo",

      pagamento: data.pagamento || defaultPagamento,

      textoRodape: data.textoRodape || defaultTextoRodape,
    };

    return <TemplateComponent data={templateData} isSingle={singleMode} />;
  };

  return (
    <div className="flex flex-col lg:flex-row items-start gap-6 max-w-350 mx-auto px-4 sm:px-6 ">
      {isLandscape && (
        <style>{`

          @media print {

            @page { size: A4 landscape !important; margin: 0mm !important; }

          }

        `}</style>
      )}

      {/* PAINEL DE EDIÇÃO (FLUXO NATURAL DA PÁGINA) */}

      <Card className="w-full lg:flex-1 print:hidden shadow-sm border-border bg-card">
        <CardHeader className="px-5 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight">
                Impressão de Etiquetas
              </CardTitle>

              <CardDescription className="text-sm mt-1">
                Preencha os dados. Salve até 4 etiquetas para otimizar o uso da
                folha A4.
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch pt-4">
            <button
              type="button"
              onClick={() => {
                setPrintMode("A4");

                setActiveStep(0);
              }}
              className={`flex justify-center items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                printMode === "A4"
                  ? "bg-black"
                  : "bg-transparent hover:bg-neutral-100"
              }`}
            >
              <span
                className={`font-medium text-[16px] ${
                  printMode === "A4" ? "text-white" : "text-black"
                }`}
              >
                A4 (1 etiqueta)
              </span>
            </button>

            <button
              type="button"
              onClick={() => setPrintMode("A6")}
              className={`flex justify-center items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                printMode === "A6"
                  ? "bg-black"
                  : "bg-transparent hover:bg-neutral-100"
              }`}
            >
              <span
                className={`font-medium text-[16px] ${
                  printMode === "A6" ? "text-white" : "text-black"
                }`}
              >
                A6 (4 etiquetas)
              </span>
            </button>
          </div>

          {/* STEPPER ORIGINAL COM BOTÕES ALINHADOS ABAIXO */}

          {printMode === "A6" && (
            <div className="w-full pt-5 pb-2">
              <div className="w-full max-w-2xl">
                <div className="flex items-start justify-between">
                  {[0, 1, 2, 3].map((step, index) => {
                    const isCurrent = activeStep === step;

                    const tagData = tags[step];

                    const isFilled =
                      Boolean(tagData.titulo1?.trim()) ||
                      Boolean(tagData.titulo2?.trim()) ||
                      Boolean(tagData.precoAntigo?.trim()) ||
                      (tagData.preco !== "0,00" &&
                        Boolean(tagData.preco?.trim()));

                    return (
                      <React.Fragment key={step}>
                        <div
                          onClick={() => handleStepChange(step)}
                          className="group flex flex-col items-center cursor-pointer select-none"
                        >
                          <div
                            className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 ${
                              isCurrent
                                ? "bg-foreground text-background shadow-md ring-2 ring-foreground/20 ring-offset-2 ring-offset-background"
                                : isFilled
                                  ? "bg-foreground/90 text-background hover:bg-foreground"
                                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                            }`}
                          >
                            {isCurrent ? (
                              <Eye className="w-4 h-4" />
                            ) : isFilled ? (
                              <Check className="w-4 h-4 stroke-[2.5]" />
                            ) : (
                              step + 1
                            )}
                          </div>

                          <span
                            className={`mt-2 text-xs font-medium transition-colors ${
                              isCurrent
                                ? "text-foreground font-semibold"
                                : "text-muted-foreground group-hover:text-foreground"
                            }`}
                          >
                            Etiqueta {step + 1}
                          </span>
                        </div>

                        {index < 3 && (
                          <div
                            className={`flex-1 h-0.5 mx-3 mt-5 transition-colors duration-200 ${
                              tags[index] &&
                              (Boolean(tags[index].titulo1?.trim()) ||
                                Boolean(tags[index].titulo2?.trim()) ||
                                Boolean(tags[index].precoAntigo?.trim()) ||
                                (tags[index].preco !== "0,00" &&
                                  Boolean(tags[index].preco?.trim())))
                                ? "bg-foreground"
                                : "bg-border"
                            }`}
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Botões Copiar e Apagar Alinhados à Direita */}

              <div className="flex items-center justify-end gap-2.5 mt-10">
                <button
                  type="button"
                  onClick={handleDuplicarParaProxima}
                  className="flex items-center gap-1.5 p-2 rounded-[12px] border border-black bg-white hover:bg-neutral-50 font-medium text-sm text-black transition-colors cursor-pointer"
                >
                  <Copy className="w-3 h-3 text-black stroke-[2.2]" />

                  <span>Copiar</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOpenLimparAtual(true)}
                  className="flex items-center gap-1 p-2 rounded-[12px] border border-[#F85656]  hover:bg-[#FFF5F5] font-medium text-sm text-[#f85656] transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4 text-[#f85656] stroke-[2.2]" />

                  <span>Apagar</span>
                </button>
              </div>
            </div>
          )}
        </CardHeader>

        <CardContent className="px-5 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="font-medium text-[16px]">Modelo</Label>

              <Select
                value={currentTag.templateId}
                onValueChange={(val) =>
                  handleChange({ target: { name: "templateId", value: val } })
                }
              >
                {/* Adicionadas as classes: !border-black !rounded-t-[4px] !rounded-b-none */}
                <SelectTrigger className="w-full bg-background cursor-pointer h-12! px-4 border-[#79747e] rounded-t-sm! rounded-b-sm!">
                  <SelectValue placeholder="Selecione o modelo">
                    {templates.find((t) => t.id === currentTag.templateId)
                      ?.nome || "Modelo Padrão"}
                  </SelectValue>
                </SelectTrigger>

                <SelectContent>
                  {templates.map((t) => (
                    <SelectItem
                      key={t.id}
                      value={t.id}
                      className="cursor-pointer h-12!"
                    >
                      {t.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {hasVariantes && (
              <div className="space-y-1.5">
                <Label className="font-medium text-[16px]">Layout</Label>

                <Select
                  value={currentTag.variante || "v1"}
                  onValueChange={(val) =>
                    handleChange({ target: { name: "variante", value: val } })
                  }
                >
                  <SelectTrigger className="w-full bg-background cursor-pointer h-12! px-4 border-[#79747e]! rounded-t-sm! rounded-b-sm!">
                    <SelectValue placeholder="Selecione a variante">
                      {currentTag.variante === "v2" &&
                        "V2: Parcela em Destaque"}

                      {currentTag.variante === "v3" && "V3: Parcela no Rodapé"}

                      {currentTag.variante === "v4" && "V4: Texto Promocional"}

                      {(!currentTag.variante || currentTag.variante === "v1") &&
                        "Preço com desconto (De/Por)"}
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="v1" className="cursor-pointer h-12!">
                      Preço com desconto (De/Por)
                    </SelectItem>

                    <SelectItem value="v2" className="cursor-pointer h-12!">
                      Parcelamento
                    </SelectItem>

                    <SelectItem value="v3" className="cursor-pointer h-12!">
                      À vista e parcelado
                    </SelectItem>

                    <SelectItem value="v4" className="cursor-pointer h-12!">
                      Promocional
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="pt-2">{renderFormulario()}</div>
          {/* Adicione este bloco exatamente aqui */}
          <div className="flex items-center justify-end gap-2.5 mt-8 pt-6 border-t border-border/50">
            <button
              type="button"
              onClick={() => setOpenLimparTodos(true)}
              className="flex justify-center items-center gap-2.5 px-3 py-2.5 rounded-[12px] bg-[#fff0f0] hover:bg-[#ffe5e5] transition-colors cursor-pointer border-none"
            >
              <Trash2
                className="w-4.5 h-4.5 text-[#f85656]"
                strokeWidth={2.2}
              />
              <span className="font-medium text-[16px] text-[#f85656] leading-normal font-sans">
                Apagar tudo
              </span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="flex justify-center items-center gap-2.5 px-3 py-2.5 rounded-[12px] bg-black hover:bg-neutral-800 transition-colors cursor-pointer border-none"
            >
              <Printer className="w-4.5 h-4.5 text-white" strokeWidth={2.2} />
              <span className="font-medium text-[16px] text-white leading-normal font-sans">
                Imprimir
              </span>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* ÁREA DE PREVIEW STICKY (FICA FIXO AO ROLAR O FORMULÁRIO) */}

      <div className="w-full max-w-[380px] mx-auto lg:max-w-none lg:w-[380px] xl:w-[420px] shrink-0 print:hidden sticky top-6 flex flex-col gap-4 bg-muted/20 border border-border/60 rounded-xl p-4 sm:p-5">
        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground px-1">
          <span className="flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            Visualizando
          </span>

          <span className="bg-background px-2.5 py-1 rounded-md shadow-sm border border-border/40">
            Etiqueta {activeStep + 1}
          </span>
        </div>

        {/* Container visual da Proporção */}

        <div className="w-full aspect-[1/1.414] bg-black/5 rounded-md border border-border/40 overflow-hidden flex items-center justify-center relative">
          <div
            className={`absolute origin-center transition-transform duration-300 flex items-center justify-center ${
              isSingle
                ? "scale-[0.38] md:scale-[0.40] xl:scale-[0.44]"
                : "scale-[0.76] md:scale-[0.80] xl:scale-[0.88]"
            }`}
          >
            <div
              className="bg-white shadow-xl relative overflow-hidden shrink-0"
              style={{
                width: isSingle ? "794px" : "397px",

                height: isSingle ? "1123px" : "561.5px",
              }}
            >
              {renderTemplateComponent(currentTag, isSingle)}
            </div>
          </div>
        </div>
      </div>

      {/* GRADE COMPLETA EXCLUSIVA PARA IMPRESSÃO */}

      <div className="hidden print:block fixed inset-0 m-0 p-0 bg-white z-50 overflow-hidden">
        <div
          className="bg-white mx-auto flex flex-wrap content-start relative overflow-hidden"
          style={{
            width: isLandscape ? "295mm" : "210mm",

            height: isLandscape ? "210mm" : "297mm",
          }}
        >
          {!isSingle && !isLandscape && (
            <>
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0 border-r border-dashed border-gray-300 z-20 pointer-events-none" />

              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0 border-b border-dashed border-gray-300 z-20 pointer-events-none" />
            </>
          )}

          {printList.map((item, index) => {
            const isEmpty =
              !item.titulo1 &&
              !item.titulo2 &&
              (item.preco === "0,00" || !item.preco) &&
              !item.precoAntigo;

            return (
              <div
                key={index}
                className="print:break-inside-avoid box-border p-0 relative"
                style={{
                  width: isSingle ? "100%" : "50%",

                  height: isSingle ? "100%" : "50%",
                }}
              >
                {!isEmpty ? (
                  renderTemplateComponent(item, isSingle)
                ) : (
                  <div className="w-full h-full bg-white" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <AlertDialog open={openLimparAtual} onOpenChange={setOpenLimparAtual}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-lg rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Limpar Etiqueta Atual?</AlertDialogTitle>

            <AlertDialogDescription>
              Isso apagará os textos e preços preenchidos na etiqueta{" "}
              {activeStep + 1}. O modelo e a variação selecionados serão
              mantidos.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Cancelar
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={confirmarLimparAtual}
              className="cursor-pointer"
            >
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={openLimparTodos} onOpenChange={setOpenLimparTodos}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-lg rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Limpar Todas as Etiquetas?</AlertDialogTitle>

            <AlertDialogDescription>
              Esta ação redefinirá todas as 4 etiquetas da folha de volta ao
              estado original em branco. Essa ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Cancelar
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={confirmarLimparTodos}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer"
            >
              Limpar Tudo
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={openAlertaVazio} onOpenChange={setOpenAlertaVazio}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-lg rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Nenhuma etiqueta preenchida</AlertDialogTitle>
            <AlertDialogDescription>
              Preencha ao menos uma etiqueta antes de realizar a impressão.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setOpenAlertaVazio(false)}
              className="cursor-pointer bg-black text-white hover:bg-neutral-800 rounded-xl"
            >
              Entendi
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
