# 💻 Comptel Informática - Landing Page & Links

Landing page institucional e página de links (Bio/Linktree) moderna, ultra-rápida e totalmente responsiva desenvolvida para a **Comptel Informática**.

O projeto apresenta a marca, destaca soluções em setups customizados (PC Gamer, Workstation/Home Office e Periféricos), informa dados de localização da loja física no Shopping Laranjeiras (Serra/ES) e oferece canais diretos de atendimento via WhatsApp e redes sociais.

---

## 🚀 Tecnologias Utilizadas

- **[Astro](https://astro.build/):** Framework web focado em performance e entrega de HTML estático com JavaScript zero por padrão.
- **TypeScript:** Garante tipagem estática e maior confiabilidade na navegação dinâmica do carrossel.
- **CSS3 Moderno:** Utilização de Flexbox, CSS Variables, Media Queries customizadas e funções de cálculo (`calc()`) para layout fluido.
- **HTML5 Semântico:** Estruturação limpa voltada para acessibilidade e bom posicionamento em SEO.

---

## ✨ Destaques do Projeto

- **Hero Carousel Responsivo:**
  - Layout dinâmico que se adapta entre Desktop (banner horizontal com sobreposição de produto) e Mobile (empilhamento de card centralizado).
  - Deslocamento contínuo em pixels dinâmicos no JavaScript (`offsetWidth` + `gap`), garantindo respiro e alinhamento _pixel-perfect_ em qualquer resolução.
- **Carrossel de Marcas:** Seção de parceiros com logos vetorizadas (Bluecase, Galax, Intel, NVIDIA, Redragon).
- **Grid de Categorias:** Cards em pílulas focados em conversão para Workstations, PCs Gamer e Periféricos.
- **Página de Links (`/links`):**
  - Hub de Links no estilo Linktree integrado com a identidade visual da loja.
  - Botões diretos para atendimento no WhatsApp, Instagram e Facebook.
  - Formatação customizada para logos retangulares com container proporcional (`12rem` x `4.5rem`).
- **Localização e Atendimento:** Informações claras da loja física (Shopping Laranjeiras, Loja 138 - Serra/ES) e horários de funcionamento.

---

## 🎨 Identidade Visual & Design System

- **Cores Principais:** Azul Elétrico (`#0339E8` / `#1919FE`), Branco (`#FFFFFF`) e Cinza Suave (`#F8F9FA`).
- **Tipografia:** Semântica e escalável, ajustada com `rem` para manter a proporcionalidade em todas as densidades de tela.
- **Componentes Destacados:**
  - `.carousel-wrapper`: Máscara de contenção e controle de transição do hero.
  - `.link-button`: Botões interativos em formato pílula para a página de links.
  - `.avatar`: Moldura retangular proporcional para logos institucionais.

---

## 🛠️ Como Rodar o Projeto Localmente

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18.x ou superior)
- Um gerenciador de pacotes (`npm`, `pnpm` ou `yarn`)

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/seu-usuario/comptel-informatica.git](https://github.com/seu-usuario/comptel-informatica.git)
   cd comptel-informatica
   ```
