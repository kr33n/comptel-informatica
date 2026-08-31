import React, { useState, useEffect } from "react";
import { templates } from "./templates";
import FormularioV1 from "./forms/FormularioV1";
import FormularioV2 from "./forms/FormularioV2";
import FormularioV3 from "./forms/FormularioV3";
import FormularioV4 from "./forms/FormularioV4";

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
import { Printer, Trash2, RotateCcw, Check, Eye, Copy } from "lucide-react";

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
  // --- GERENCIAMENTO DE ESTADO ---
  const [printMode, setPrintMode] = useState("A6"); // "A4" ou "A6"
  const [activeStep, setActiveStep] = useState(0);

  // Estados dos Diálogos de Confirmação (shadcn/ui)
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

  // --- VARIÁVEIS DA ETIQUETA ATIVA ---
  const currentTag = tags[activeStep];
  const isLandscape = currentTag.templateId === "paisagem";
  const hasVariantes =
    currentTag.templateId === "padrao" || currentTag.templateId === "minecraft";

  // --- HANDLERS ---
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
        inputTitulo1.select(); // Opcional: seleciona o texto existente para facilitar a edição
      }
    }, 50);
  };

  const handleDuplicarParaProxima = (e, sourceIndex) => {
    e.stopPropagation(); // Evita acionar o clique de navegação do step

    // Define o destino: o próximo slot ou o anterior caso esteja no último (slot 4)
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

  // --- RENDERIZADORES ---
  const isSingle = printMode === "A4" || isLandscape;
  const displayList = isSingle ? [tags[0]] : tags;

  const renderFormulario = () => {
    const props = {
      tag: currentTag,
      onChange: handleChange,
      onPriceChange: handlePriceChange,
      onClearOldPrice: () => updateActiveTag({ precoAntigo: "" }),
      hasVariantes,
    };

    if (!hasVariantes || currentTag.variante === "v1")
      return <FormularioV1 {...props} />;
    if (currentTag.variante === "v2") return <FormularioV2 {...props} />;
    if (currentTag.variante === "v3") return <FormularioV3 {...props} />;
    if (currentTag.variante === "v4") return <FormularioV4 {...props} />;

    return <FormularioV1 {...props} />;
  };

  const renderTemplate = (data, index) => {
    const isEmpty =
      !data.titulo1 &&
      !data.titulo2 &&
      (data.preco === "0,00" || !data.preco) &&
      !data.precoAntigo;
    const isEditingThis = !isSingle && activeStep === index;

    if (isEmpty && !isSingle && !isEditingThis) {
      return (
        <div
          className="w-full h-full border-2 border-dashed border-muted-foreground/20 rounded-lg flex flex-col items-center justify-center bg-muted/30 print:bg-white print:border-none cursor-pointer hover:bg-muted/60 transition-colors"
          onClick={() => handleStepChange(index)}
        >
          <span className="text-muted-foreground font-semibold text-sm print:hidden">
            Etiqueta {index + 1} Vazia
          </span>
          <span className="text-muted-foreground/70 text-xs mt-0.5 print:hidden">
            Clique para editar
          </span>
        </div>
      );
    }

    const TemplateComponent =
      templates.find((t) => t.id === data.templateId)?.component ||
      templates[0].component;

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

    return (
      <div
        className={`w-full h-full transition-all cursor-pointer rounded-sm ${
          isEditingThis
            ? "ring-2 ring-primary ring-offset-2 shadow-sm print:ring-0 print:ring-offset-0"
            : "hover:ring-2 hover:ring-primary/40 hover:ring-offset-1 print:hover:ring-0"
        }`}
        onClick={() => handleStepChange(index)}
      >
        <TemplateComponent data={templateData} isSingle={isSingle} />
      </div>
    );
  };

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
      <Card className="w-full lg:w-1/3 print:hidden h-full flex flex-col shadow-sm border-border bg-card">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <CardTitle className="text-xl font-bold tracking-tight">
                Criar Etiqueta
              </CardTitle>
              <CardDescription>
                Configure os dados e o layout para impressão
              </CardDescription>
            </div>

            {/* Ações Rápidas no Cabeçalho */}
            <div className="flex items-center gap-1.5">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setOpenLimparTodos(true)}
                title="Limpar todas as etiquetas"
                className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 hover:border-destructive/30 cursor-pointer transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </Button>

              <Button
                type="button"
                size="icon"
                onClick={handlePrint}
                title="Imprimir folha"
                className="h-9 w-9 shadow-sm cursor-pointer"
              >
                <Printer className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* TOGGLE DE MODO: A4 vs A6 */}
          <div className="grid grid-cols-2 p-1 bg-muted rounded-lg mt-3">
            <Button
              type="button"
              variant={printMode === "A4" ? "default" : "ghost"}
              size="sm"
              onClick={() => {
                setPrintMode("A4");
                setActiveStep(0);
              }}
              className="text-xs font-semibold shadow-none cursor-pointer"
            >
              A4 (1 Etiqueta)
            </Button>
            <Button
              type="button"
              variant={printMode === "A6" ? "default" : "ghost"}
              size="sm"
              onClick={() => setPrintMode("A6")}
              className="text-xs font-semibold shadow-none cursor-pointer"
            >
              A6 (4 Etiquetas)
            </Button>
          </div>

          {/* STEPPER BASE SHADCN (Navegação A6) */}
          {printMode === "A6" && (
            <div className="w-full pt-4 pb-2">
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
                      {/* Step Item */}
                      <div
                        onClick={() => handleStepChange(step)}
                        className="group flex flex-col items-center cursor-pointer select-none"
                      >
                        <div
                          className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 ${
                            isCurrent
                              ? "bg-primary text-primary-foreground shadow-sm ring-2 ring-primary ring-offset-2 ring-offset-background"
                              : isFilled
                                ? "bg-primary text-primary-foreground hover:bg-primary/90"
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
                          className={`mt-2 text-[11px] font-medium transition-colors ${
                            isCurrent
                              ? "text-foreground font-semibold"
                              : "text-muted-foreground group-hover:text-foreground"
                          }`}
                        >
                          Etiqueta {step + 1}
                        </span>

                        {/* Ações Rápidas: Duplicar e Limpar */}
                        <div className="mt-1 flex items-center gap-1">
                          {step < 3 && (
                            <button
                              type="button"
                              onClick={(e) =>
                                handleDuplicarParaProxima(e, step)
                              }
                              title={`Duplicar Etiqueta ${step + 1} para Etiqueta ${step + 2}`}
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
                            title={`Limpar Etiqueta ${step + 1}`}
                            className="p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors cursor-pointer border border-border/40"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Linha Conectora entre os steps */}
                      {index < 3 && (
                        <div
                          className={`flex-1 h-[2px] mx-2 mt-4.5 transition-colors duration-200 ${
                            tags[index] &&
                            (Boolean(tags[index].titulo1?.trim()) ||
                              Boolean(tags[index].titulo2?.trim()) ||
                              Boolean(tags[index].precoAntigo?.trim()) ||
                              (tags[index].preco !== "0,00" &&
                                Boolean(tags[index].preco?.trim())))
                              ? "bg-primary"
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

        <CardContent className="flex-1 overflow-y-auto space-y-4 pt-4">
          {/* SELETORES GERAIS */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground">
                Modelo Geral
              </Label>
              <Select
                value={currentTag.templateId}
                onValueChange={(val) =>
                  handleChange({ target: { name: "templateId", value: val } })
                }
              >
                <SelectTrigger className="w-full bg-background cursor-pointer">
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
                <Label className="text-xs font-semibold text-foreground">
                  Variação do Layout
                </Label>
                <Select
                  value={currentTag.variante || "v1"}
                  onValueChange={(val) =>
                    handleChange({ target: { name: "variante", value: val } })
                  }
                >
                  <SelectTrigger className="w-full bg-background cursor-pointer">
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
                    <SelectItem disabled value="v2" className="cursor-pointer">
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

          {/* FORMULÁRIO DINÂMICO DA VARIANTE */}
          {renderFormulario()}
        </CardContent>
      </Card>

      {/* ÁREA DE PREVIEW / FOLHA A4 */}
      <div className="w-full lg:w-2/3 h-full flex justify-center items-start print:items-start print:fixed print:inset-0 print:m-0 print:p-0 print:bg-white print:z-50 bg-muted/40 border border-border/60 rounded-xl p-8 print:border-none print:rounded-none overflow-y-auto print:overflow-hidden">
        <div className="transform scale-[0.45] md:scale-[0.5] lg:scale-[0.55] xl:scale-[0.7] 2xl:scale-[0.8] origin-top print:scale-100 print:transform-none transition-transform duration-300">
          <div
            className="bg-white shadow-xl print:shadow-none mx-auto flex flex-wrap content-start relative overflow-hidden transition-all duration-300 rounded-sm"
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
          </div>
        </div>
      </div>

      {/* MODAL: LIMPAR ATUAL */}
      <AlertDialog open={openLimparAtual} onOpenChange={setOpenLimparAtual}>
        <AlertDialogContent>
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

      {/* MODAL: LIMPAR TODOS */}
      <AlertDialog open={openLimparTodos} onOpenChange={setOpenLimparTodos}>
        <AlertDialogContent>
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
