# Comptel Informática — Landing Page

Landing page institucional da **Comptel Informática**, desenvolvida com foco em alta performance, acessibilidade e SEO.

## 🛠️ Tecnologias Utilizadas

* **Framework:** Astro (SSG/SSR)
* **UI / Componentes:** React, Tailwind CSS
* **Recursos Adicionais:** Partytown (para otimização de scripts de terceiros)

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
* Node.js (versão 18 ou superior)
* npm, pnpm ou yarn

### Passo a Passo

1. **Clonar o repositório:**

        git clone https://github.com/usuario/comptel-landing-page.git
        cd comptel-landing-page

2. **Instalar as dependências:**

        npm install

3. **Iniciar o servidor de desenvolvimento:**

        npm run dev

   Acesse a aplicação em `http://localhost:4321`.

4. **Gerar a build de produção:**

        npm run build

---

## 📊 Performance & Diagnóstico (Lighthouse)

Status do último teste de auditoria realizado via Lighthouse:

| Categoria | Pontuação | Status |
| :--- | :---: | :--- |
| **Performance** | `93/100` | 🟢 Excelente |
| **Accessibility** | `100/100` | 🟢 Perfeito |
| **Best Practices** | `96/100` | 🟢 Excelente |
| **SEO** | `100/100` | 🟢 Perfeito |

### Métricas Principais (Core Web Vitals)
* **First Contentful Paint (FCP):** 0.5s
* **Speed Index:** 1.4s
* **Time to Interactive (TTI):** 1.6s
* **Largest Contentful Paint (LCP):** 1.6s
* **Total Blocking Time (TBT):** 0ms
* **Cumulative Layout Shift (CLS):** 0

---

## 📋 Plano de Otimização (PONTOS A CORRIGIR)

Embora as notas estejam altas, os seguintes pontos foram identificados para melhorias futuras no código:

* **Otimização de Imagens (`Image Delivery`):**
  * Definir dimensões explícitas (`width` e `height`) nas tags `<img>` para evitar avisos de layout shift.
  * Redimensionar e comprimir as imagens em WebP para exibição em telas menores (`carousel-1.webp`, `gamer.webp`, `perifericos.webp`).
* **Atributos de Preconnect:**
  * Revisar a tag `<link rel="preconnect">` dos Google Fonts no `<head>`, pois o Lighthouse apontou que não está sendo utilizada corretamente.
* **Política de Cache:**
  * Configurar cabeçalhos `Cache-Control` mais longos no servidor de hospedagem para recursos estáticos e scripts de terceiros (como os da API do Google Maps).
* **Limpeza de Scripts (`Unused JS`):**
  * Testar o build de produção final fora do ambiente local, pois parte do código não utilizado detectado no relatório era proveniente de extensões do navegador Chrome (ex: Adobe Acrobat).
