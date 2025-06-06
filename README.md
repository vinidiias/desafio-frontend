# 📦 Lista de Produtos - Desafio Front-end Júnior

Este projeto é uma aplicação web de listagem de produtos e desenvolvida como parte de um desafio técnico para uma vaga de Desenvolvedor Front-end Júnior.

## 🚀 Tecnologias Utilizadas

* **Next.js 15+ (App Router):** Framework React para renderização Server-Side Rendering (SSR), Static Site Generation (SSG) e Server Components.
* **React.js 19+:** Biblioteca para construção da interface de usuário.
* **TypeScript:** Linguagem para tipagem estática e segurança de código.
* **Tailwind CSS:** Framework CSS utilitário para estilização rápida e responsiva.
* **TanStack Table v8:** Biblioteca headless para construção de tabelas complexas com filtragem, ordenação e paginação.
* **Material-UI (MUI):** Para componentes específicos (como CircularProgress, AppBar e Button do Material).
* **`use` Hook (React):** Para consumir Promises em Client Components.

## ✅ Boas Práticas Adotadas

* **Versionamento com Git e GitHub:**
    * **Commits Atômicos e Semânticos:** Uso da convenção Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`) para um histórico claro e legível.
    * **Feature Branches:** Desenvolvimento isolado em branches específicas (`feat/`, `fix/`, `refactor/`) para cada funcionalidade ou correção.
    * **Pull Requests (PRs):** Utilização de PRs para revisão de código e integração formal das branches na `main`.
    * **Estrutura por Módulos:** Organização de arquivos (componentes, serviços, tipos) por funcionalidades/rotas (`app/products/`).
    * **Separação de Preocupações (SoC):** Lógica de busca de dados em arquivos de serviço (`productService.ts`), UI em componentes, estilos em Tailwind CSS.
    * **Componentes Reutilizáveis:** Criação de componentes UI genéricos (`Input`, `Select`, `Product Table`) na pasta `src/components/ui/`.
* **Tipagem com TypeScript:**
    * Tipagem de componentes, serviços e tipos de dados.
* **Consumo de APIs:**
    * Funções de serviço centralizadas (`productService.ts`) para encapsular a lógica de comunicação com a API.
* **Next.js App Router:**
    * **Server Components:** Busca inicial de dados no servidor (`app/products/page.tsx`) para otimização de performance e SEO.
    * **Client Components:** Uso de `"use client"` para componentes interativos (`ProductTable.tsx`).
    * **`use()` Hook:** Consumo de Promises em Client Components para dados adicionais ou passados do servidor.
    * **`Suspense`:** Para gerenciar estados de carregamento durante a obtenção de dados assíncronos.

## ⚙️ Como Rodar o Projeto

Siga os passos abaixo para configurar e executar o projeto em sua máquina local:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/vinidiias/desafio-frontend.git](https://github.com/vinidiias/desafio-frontend.git)
    cd desafio-frontend
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    # ou
    yarn dev
    ```

4.  **Acesse a aplicação:**
    Abra seu navegador e navegue para `http://localhost:3000`.

5.  **Navegue para a página de produtos:**
    Você pode ir diretamente para `http://localhost:3000/products` ou usar o link "Products" na Navbar.

## 🌐 Deploy

Este projeto está publicado em: [Link](https://desafio-frontend-puce.vercel.app/)

## 🧑‍💻 Autor

**[Vinícius de Oliveira Dias]**

* [LinkedIn](https://www.linkedin.com/in/vinicius-diass/)
* [GitHub](https://github.com/vinidiias)
* [Portfólio](https://my-portfolio-three-plum-56.vercel.app/)