# Laon Streaming - Plataforma de Catálogo de Filmes e Séries

Bem-vindo ao Laon Streaming! Este é um projeto Full Stack que consiste em uma API construída com Laravel (backend) e uma aplicação construída com Next.js (frontend).

## Índice

- [Visão Geral do Projeto](#visão-geral-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Como Rodar o Projeto (Passo a Passo)](#como-rodar-o-projeto-passo-a-passo)
  - [1. Clonar o Repositório](#1-clonar-o-repositório)
  - [2. Configuração do Backend (Laravel)](#2-configuração-do-backend-laravel)
  - [3. Configuração do Frontend (Next.js)](#3-configuração-do-frontend-nextjs)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Endpoints da API](#endpoints-da-api)

---

## Visão Geral do Projeto

A aplicação permite que usuários se cadastrem, façam login, naveguem por um catálogo de filmes e séries, visualizem detalhes de cada item e façam logout de forma segura.

- **Backend:** Uma API com Laravel 8, utilizando Sanctum para autenticação baseada em token.
- **Frontend:** Uma interface de usuário dinâmica e responsiva com Next.js 15 (App Router), utilizando Context API para gerenciamento de estado global.

---

## Tecnologias Utilizadas

### Backend
- **PHP 7.3+**
- **Laravel 8**
- **MySQL**
- **Laravel Sanctum** (para autenticação de API)
- **Composer** (para gerenciamento de dependências PHP)

### Frontend
- **Node.js 18+**
- **Next.js 15** (App Router)
- **React 18**
- **Axios** (para requisições HTTP)
- **CSS Modules** (para estilização)
- **Font Awesome** (para ícones)

---

## Pré-requisitos

Antes de começar, certifique-se de que você tem os seguintes softwares instalados na sua máquina:

- **PHP** (versão 8.1 ou superior)
- **Composer**
- **Node.js** (versão 20 ou superior)
- **NPM**
- Um servidor de banco de dados **MySQL**

---

## Como Rodar o Projeto (Passo a Passo)

Siga estas instruções na ordem para configurar e executar o ambiente de desenvolvimento.

### 1. Clonar o Repositório

Primeiro, clone o repositório do GitHub para a sua máquina local.

```bash
git clone https://github.com/william-almeida/recruiting-laon.git
cd recruiting-laon
```

### 2. Configuração do Backend (Laravel)

Navegue até a pasta do backend e siga os passos abaixo.

```bash
cd recruiting-laon-backend
```

**a. Instalar Dependências do Composer**
```bash
composer install
```

**b. Configurar o Ambiente**
Copie o arquivo de exemplo `.env.example` para um novo arquivo chamado `.env`.
```bash
cp .env.example .env
```

**c. Gerar a Chave da Aplicação**
Este comando é essencial para a segurança da aplicação.
```bash
php artisan key:generate
```

**d. Configurar o Banco de Dados**
Abra o arquivo `.env` em um editor de texto e configure as credenciais do seu banco de dados MySQL. Você precisará criar um banco de dados vazio (ex: `recruiting_laon`) primeiro.

```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=recruiting_laon
DB_USERNAME=root
DB_PASSWORD=sua_senha_do_banco
```

**e. Executar as Migrations e Seeders**
Este comando irá criar todas as tabelas no banco de dados e populá-las com dados de teste (filmes, séries, usuários, etc.).

```bash
php artisan migrate:fresh --seed
```

**f. Iniciar o Servidor do Backend**
O backend estará rodando em `http://localhost:8000`.
```bash
php artisan serve
```

### 3. Configuração do Frontend (Next.js )

Abra um **novo terminal**, navegue até a pasta do frontend e siga os passos.

```bash
cd recruiting-laon-frontend
```

**a. Instalar Dependências do Node.js**
Usando NPM:
```bash
npm install
```

**b. Configurar Variáveis de Ambiente**
Crie um arquivo chamado `.env.local` na raiz da pasta `recruiting-laon-frontend` e adicione a URL da sua API backend.

```ini
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

**c. Iniciar o Servidor de Desenvolvimento**
O frontend estará rodando em `http://localhost:3000`.

Usando NPM:
```bash
npm run dev
```

**Pronto!** Agora você pode abrir `http://localhost:3000` no seu navegador para ver a aplicação funcionando.

---

## Estrutura de Pastas

O projeto está organizado em duas pastas principais:

- **/recruiting-laon-backend**: Contém a aplicação Laravel (API ).
- **/recruiting-laon-frontend**: Contém a aplicação Next.js (Cliente).

---

## Documentação

A pasta `/docs` na raiz do projeto contém artefatos importantes para entender a arquitetura da aplicação:

- **Coleção da API:** Um arquivo JSON que pode ser importado em clientes de API como Insomnia ou Postman para testar todos os endpoints.
- **Diagrama Entidade-Relacionamento (DER):** Uma imagem do diagrama do banco de dados, mostrando as tabelas e seus relacionamentos.

---

## Endpoints da API

As principais rotas da API estão definidas em `recruiting-laon-backend/routes/api.php`.

- `POST /api/auth/register`: Registro de novo usuário.
- `POST /api/auth/login`: Autenticação de usuário.
- `POST /api/auth/logout`: Logout (requer autenticação).
- `GET /api/auth/user`: Obter dados do usuário autenticado (requer autenticação).
- `GET /api/catalog`: Listar todos os itens do catálogo (requer autenticação).
- `GET /api/catalog/{id}`: Obter detalhes de um item específico (requer autenticação).
