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
import { Printer, Trash2, RotateCcw } from "lucide-react";

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
          <CardTitle className="text-xl font-bold tracking-tight">
            Criar Etiqueta
          </CardTitle>
          <CardDescription>
            Configure os dados e o layout para impressão
          </CardDescription>

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

          {/* STEPPER (Navegação A6) */}
          {printMode === "A6" && (
            <div className="mt-3 p-3 bg-muted/40 rounded-lg border border-border/60">
              <span className="block text-[11px] font-semibold text-muted-foreground mb-2 uppercase tracking-wider text-center">
                Etiqueta em edição
              </span>
              <div className="grid grid-cols-4 gap-2">
                {[0, 1, 2, 3].map((step) => (
                  <Button
                    key={step}
                    type="button"
                    variant={activeStep === step ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleStepChange(step)}
                    className="font-bold text-sm h-9 cursor-pointer"
                  >
                    {step + 1}
                  </Button>
                ))}
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

          <Separator className="my-2" />

          {/* AÇÕES FINAIS */}
          <div className="space-y-2 pt-2">
            <Button
              type="button"
              onClick={handlePrint}
              className="w-full gap-2 font-bold shadow cursor-pointer"
              size="lg"
            >
              <Printer className="w-4 h-4" />
              Imprimir Folha
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setOpenLimparAtual(true)}
                className="gap-1.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Limpar Atual
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setOpenLimparTodos(true)}
                className="gap-1.5 text-xs text-destructive border-destructive/20 hover:bg-destructive/10 hover:text-destructive cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Limpar Todos
              </Button>
            </div>
          </div>
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
