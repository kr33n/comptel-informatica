# 💻 Comptel Informática

Landing page institucional moderna, focada em alta performance, acessibilidade e SEO, desenvolvida para a **Comptel Informática**.

---

## 🚀 Tecnologias

O projeto foi construído utilizando um ecossistema moderno para garantir o melhor tempo de carregamento e experiência de usuário:

* **[Astro](https://astro.build/):** Framework web focado em conteúdo e velocidade (SSG/SSR).
* **[React](https://reactjs.org/):** Biblioteca para a construção de interfaces de usuário e componentes interativos (utilizados via hidratação parcial).
* **[Tailwind CSS](https://tailwindcss.com/):** Framework de CSS utilitário para estilização rápida, padronizada e responsiva.
* **[Partytown](https://partytown.builder.io/):** Otimização que move a execução de scripts de terceiros para web workers, liberando a thread principal.

---

## 📂 Estrutura do Projeto

A organização segue o padrão recomendado pela documentação do Astro:

    /
    ├── public/             # Arquivos estáticos servidos diretamente (favicon, fontes)
    ├── src/
    │   ├── assets/         # Imagens otimizadas (WebP/SVG) e estilos globais
    │   ├── components/     # Componentes reutilizáveis (React e Astro)
    │   ├── layouts/        # Estruturas base de página (ex: Layout padrão)
    │   └── pages/          # Rotas da aplicação (ex: index.astro)
    ├── astro.config.mjs    # Configurações do framework e integrações
    ├── package.json        # Dependências e scripts
    └── tailwind.config.mjs # Configurações de design system do Tailwind

---

## ⚙️ Como Executar

### Pré-requisitos
* **Node.js** (versão 18 ou superior recomendada)
* Gerenciador de pacotes (`npm`, `yarn` ou `pnpm`)

### Instalação e Execução local

1. **Clone este repositório:**
   
        git clone [https://github.com/kr33n/comptel-informatica.git](https://github.com/kr33n/comptel-informatica.git)

2. **Acesse a pasta do projeto:**
   
        cd comptel-informatica

3. **Instale as dependências necessárias:**
   
        npm install

4. **Inicie o servidor de desenvolvimento:**
   
        npm run dev

5. Abra o navegador e acesse `http://localhost:4321`.

---

## 📜 Comandos Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor local de desenvolvimento com Hot Module Replacement (HMR). |
| `npm run build` | Gera a versão de produção otimizada no diretório `dist/`. |
| `npm run preview` | Inicia um servidor local estático para visualizar a build de produção gerada. |

---

## 📊 Performance e Qualidade

A aplicação foi rigorosamente otimizada para atingir os mais altos padrões web, apresentando resultados excelentes em auditorias de Core Web Vitals (Lighthouse):

* **Acessibilidade:** 100/100
* **SEO:** 100/100
* **Melhores Práticas:** 96/100
* **Performance:** 93/100

*Métriças de destaque: First Contentful Paint (FCP) de 0.5s e Cumulative Layout Shift (CLS) em 0.*

---

*Desenvolvido para a [Comptel Informática](#).*
