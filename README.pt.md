# Dashboard de Contratos

Este projeto tem como objetivo fornecer uma interface interativa e intuitiva para visualizar, filtrar e analisar informações relacionadas aos contratos da empresa. O dashboard permite acompanhar métricas, gráficos e uma tabela detalhada dos contratos.

[[Inglês](README.md) | [Português](README.pt.md)]

<p align="center">
  <img src="dashboard.gif" alt="Dashboard de Contratos" width="1000"/>
</p>

<h2 align="center">Índice</h2>
<p align="center">
 <a href="#principais-funcionalidades">Principais Funcionalidades</a> •
 <a href="#estrutura-do-projeto">Estrutura do Projeto</a> •
 <a href="#tecnologias-utilizadas">Tecnologias Utilizadas</a> •
 <a href="#bibliotecas-e-ferramentas">Bibliotecas e Ferramentas</a> •
 <a href="#instruções-de-instalação">Instruções de Instalação</a> •
 <a href="#uso-de-ia">Uso de IA</a> •
 <a href="#desafios-e-soluções">Desafios e Soluções</a> •
 <a href="#próximos-passos">Próximos Passos</a> •
 <a href="#dúvidas-e-suporte">Dúvidas e Suporte</a>

## Principais Funcionalidades

A aplicação oferece uma interface intuitiva para gerenciamento de contratos, incluindo:

- Cartões de Métricas:

  - Exibe informações sobre o número total de contratos, contratos ativos, contratos próximos ao vencimento e o valor total dos contratos.

- Gráficos e Visualizações:

  - Gráfico de expiração de contratos.
  - Gráfico de distribuição por status.
  - Gráfico de distribuição por tipo de contrato.

- Tabela de Contratos:

  - Exibe detalhes como identificador, cliente/fornecedor, datas de início e vencimento, status, valor e tipo de ocntrato.
  - Contém ordenação, filtragem e paginação.

- Interatividade com o usuário:

  - Modal com listagem de contratos filtrados por métricas.
  - Modal com detalhes dos contratos selecionados.
  - Permite adição, edição e exclusão de contratos.
  - Filtros globais para refinar os dados do dashboard.

- Outras funcionalidades:
  - Modo escuro
  - Vários temas de cores

## Estrutura do Projeto

O projeto segue uma estrutura modular e reutilizável, com componentes separados e organizados em pastas específicas.

```bash
/dashboard-gerenciamento-contratos
├── api/            # API do projeto com JSON mockado
├── app/            # Configuração principal e páginas da aplicação
├── components/     # Componentes reutilizáveis
│  ├─ shared        # Componentes compartilhados
│  ├─ pages         # Componentes de páginas
│  └─ ui            # Componentes de UI
├── interfaces      # Tipagem de dados
├── public          # Arquivos estáticos
├── services        # Lógica para consumo de API
├── stores          # Gerenciamento de estado global
│  └─ hooks         # Hooks customizados
├── utils           # Funções auxiliares
├── .env            # Variáveis de ambiente
└── README.md       # Documentação do projeto
```

## Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

### Front-end

- Next.js
- React
- TypeScript

### Testes

- Jest
- React Testing Library

### Bibliotecas e Ferramentas

- Tailwind CSS
- Shadcn UI
- Eslint
- Prettier
- Husky
- Zod
- Tanstack React Table
- Recharts

### Backend (Mock API)

A API foi mockada para desenvolvimento, oferecendo endpoints para:

- Criar, ler, atualizar e deletar contratos
- ler status de contratos
- ler tipo de contratos

## Instruções de Instalação

1. Clone o repositório

```bash
git clone https://github.com/jvmoraesdev/contract-management-dashboard.git
```

2. Instale as dependências

```bash
yarn
```

3. Crie um container docker

```bash
docker compose up
```

Acesse: http://localhost:3000

## Uso de IA

### Ferramentas Utilizadas

- TempoLabs
  - IA para geração de código front-end e mockups
- Cursor
  - IA de pair programming e geração de código, junto do TempoLabs foi a mais utilizada durante o desenvolvimento.
- Github Copilot
  - Autocompletar código baseado em contexto e melhores práticas
- V0
  - Geração de interfaces e componentes UI baseados em IA com base em mockup e prompt.
- bolt.new
  - Ferramenta para criação rápida de aplicativos e código gerado por IA.

### Benefícios Obtidos

- Grande ajuda na limpeza, conversão e adição de novos dados de mock para testes mais robustos
- Aumento considerável na produtividade;
- Melhoria na qualidade do código;
- Facilitação na escrita de testes;
- Documentação mais consistente;
- Resolução mais rápida de bugs;

## Desafios e Soluções

### Responsividade

**Desafio:** Adaptação para múltiplos dispositivos
**Solução:** Design system flexível e breakpoints consistentes

### Estado Global

**Desafio:** Gerenciamento complexo de estado
**Solução:** Uso de Context API e custom hooks

### Revisão de código

**Desafio:** Revisão de código constante para melhoria de qualidade
**Solução:** Melhora nos prompts para a IA, uso de ferramentas de lint e prettier para manutenção do código

## Próximos Passos

- Aumentar a cobertura de testes
- Adição da biblioteca de internacionalização
- Integração com APIs reais
- Adicionar feedbacks de usuários via toast
- Adicionar a tela de carregamento para chamadas de API

## Dúvidas e Suporte

Quaisquer dúvidas entre em contato através do email [moraejosev@gmail.com](mailto:moraejosev@gmail.com), e eu terei o maior prazer em ajudar!
