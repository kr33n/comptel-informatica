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
import { Printer, Trash2, Check, Eye, Copy } from "lucide-react";

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
  const [activeStep, setActiveStep] = useState(0);

  const [openLimparAtual, setOpenLimparAtual] = useState(false);
  const [openLimparTodos, setOpenLimparTodos] = useState(false);

  const [tags, setTags] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("comptel_etiquetas");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Erro ao carregar dados", e);
        }
      }
    }
    return [defaultTag, defaultTag, defaultTag, defaultTag];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("comptel_etiquetas", JSON.stringify(tags));
    }
  }, [tags]);

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

  const handleDuplicarParaProxima = (e, sourceIndex) => {
    e.stopPropagation();

    const targetIndex = sourceIndex < 3 ? sourceIndex + 1 : sourceIndex - 1;

    const newTags = [...tags];
    newTags[targetIndex] = { ...tags[sourceIndex] };
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
    const TemplateComponent =
      templates.find((t) => t.id === data.templateId)?.component ||
      templates[0].component;

    const v = data.variante || "v1";
    let defaultPagamento = "MÉTODO DE PAGAMENTO";
    if (v === "v2") defaultPagamento = "00x";
    if (v === "v3" || v === "v4") defaultPagamento = "POR APENAS";

    let defaultTextoRodape = "DE:";
    if (v === "v2") defaultTextoRodape = "MÉTODO DE PAGAMENTO";
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
    <div className="flex flex-col lg:flex-row items-start gap-6 max-w-350 mx-auto px-4 sm:px-6 pb-16">
      {isLandscape && (
        <style>{`
          @media print {
            @page { size: A4 landscape !important; margin: 0mm !important; }
          }
        `}</style>
      )}

      {/* PAINEL DE EDIÇÃO (FLUXO NATURAL DA PÁGINA) */}
      <Card className="w-full lg:flex-1 print:hidden shadow-sm border-border bg-card">
        <CardHeader className="p-5 sm:p-6 pb-4">
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

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setOpenLimparTodos(true)}
                title="Limpar todas as etiquetas"
                className="h-10 w-10 text-muted-foreground hover:text-destructive hover:bg-destructive/10 hover:border-destructive/30 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                size="icon"
                onClick={handlePrint}
                title="Imprimir folha"
                className="h-10 w-10 shadow-sm cursor-pointer"
              >
                <Printer className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 p-1 bg-muted rounded-lg mt-5 max-w-sm">
            <Button
              type="button"
              variant={printMode === "A4" ? "default" : "ghost"}
              size="sm"
              onClick={() => {
                setPrintMode("A4");
                setActiveStep(0);
              }}
              className="text-xs font-semibold shadow-none cursor-pointer h-9"
            >
              A4 (1 Etiqueta)
            </Button>
            <Button
              type="button"
              variant={printMode === "A6" ? "default" : "ghost"}
              size="sm"
              onClick={() => setPrintMode("A6")}
              className="text-xs font-semibold shadow-none cursor-pointer h-9"
            >
              A6 (4 Etiquetas)
            </Button>
          </div>

          {printMode === "A6" && (
            <div className="w-full pt-5 pb-2 max-w-2xl">
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
                            step + 1
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

                        <div className="mt-1 flex items-center gap-1">
                          {step < 3 && (
                            <button
                              type="button"
                              onClick={(e) =>
                                handleDuplicarParaProxima(e, step)
                              }
                              title="Duplicar para a próxima"
                              className="p-1 text-muted-foreground hover:text-primary hover:bg-muted/80 rounded transition-colors cursor-pointer border border-border/40"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveStep(step);
                              setOpenLimparAtual(true);
                            }}
                            title="Limpar Etiqueta"
                            className="p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors cursor-pointer border border-border/40"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
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
          )}
        </CardHeader>

        <Separator />

        <CardContent className="p-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/20 p-4 rounded-xl border border-border/50">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Modelo Geral</Label>
              <Select
                value={currentTag.templateId}
                onValueChange={(val) =>
                  handleChange({ target: { name: "templateId", value: val } })
                }
              >
                <SelectTrigger className="w-full bg-background cursor-pointer h-10">
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
                      className="cursor-pointer"
                    >
                      {t.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {hasVariantes && (
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">
                  Variação do Layout
                </Label>
                <Select
                  value={currentTag.variante || "v1"}
                  onValueChange={(val) =>
                    handleChange({ target: { name: "variante", value: val } })
                  }
                >
                  <SelectTrigger className="w-full bg-background cursor-pointer h-10">
                    <SelectValue placeholder="Selecione a variante">
                      {currentTag.variante === "v2" &&
                        "V2: Parcela em Destaque"}
                      {currentTag.variante === "v3" && "V3: Parcela no Rodapé"}
                      {currentTag.variante === "v4" && "V4: Texto Promocional"}
                      {(!currentTag.variante || currentTag.variante === "v1") &&
                        "V1: Padrão (Preço + De/Por)"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="v1" className="cursor-pointer">
                      V1: Padrão (Preço + De/Por)
                    </SelectItem>
                    <SelectItem value="v2" className="cursor-pointer">
                      V2: Parcela em Destaque
                    </SelectItem>
                    <SelectItem disabled value="v3" className="cursor-pointer">
                      V3: Parcela no Rodapé
                    </SelectItem>
                    <SelectItem disabled value="v4" className="cursor-pointer">
                      V4: Texto Promocional
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="pt-2">{renderFormulario()}</div>
        </CardContent>
      </Card>

      {/* ÁREA DE PREVIEW STICKY (FICA FIXO AO ROLAR O FORMULÁRIO) */}
      <div className="w-full lg:w-95 xl:w-105 shrink-0 print:hidden sticky top-6 flex flex-col gap-4 bg-muted/20 border border-border/60 rounded-xl p-4 sm:p-5">
        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground px-1">
          <span className="flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            Visualizando
          </span>
          <span className="bg-background px-2.5 py-1 rounded-md shadow-sm border border-border/40">
            Etiqueta {activeStep + 1}
          </span>
        </div>

        <div className="w-full aspect-[1/1.414] bg-white shadow-md rounded-md border border-border/40 overflow-hidden flex items-center justify-center">
          {renderTemplateComponent(currentTag, isSingle)}
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
    </div>
  );
}
