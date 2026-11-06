# Lumo Business: Fase 0 (fundação técnica e sistema visual)

Estado: implementada, **build ainda não executada**. Referência: Documento Mestre de Requisitos v1.0 (2 de novembro de 2026).

## Escopo

Incluído: estrutura React + Vite, sistema visual, layout (sidebar, topbar, conteúdo), 8 páginas estruturais com estados vazios, Dashboard com 6 painéis vazios e preparação da configuração Supabase.

Fora do âmbito: autenticação, permissões reais, operações de vendas, stock ou finanças, cliente Supabase, qualquer dado fictício.

## Decisões aprovadas

- Azul vivo #2563EB (prompt da fase), com azul-marinho #142B4A, branco #FFFFFF, cinza claro #F1F5F9 e texto #172033. Prevalece sobre o roxo sugerido no Documento Mestre.
- React Router (`react-router-dom`) e Lucide React.
- Configuração Supabase preparada sem instalar `@supabase/supabase-js`.
- Tipografia do sistema (sem fontes externas).
- Ficheiros existentes e recursos do template são mantidos (sem apagar nada).

## Ficheiros

Novos:

- `.env.example`, `docs/FASE_0.md`, `public/lumo-mark.svg`
- `src/app/`: `router.jsx`, `RouteError.jsx`
- `src/components/common/`: `Badge`, `EmptyState`, `ErrorState`, `LoadingState`, `PageHeader`, `Panel` (`.jsx`)
- `src/config/`: `env.js`, `navigation.js`
- `src/constants/`: `routes.js`, `access.js`
- `src/features/dashboard/DashboardPanels.jsx`
- `src/hooks/useDocumentTitle.js`
- `src/layouts/`: `AppLayout.jsx`, `Sidebar.jsx`, `Topbar.jsx`
- `src/pages/`: `Dashboard`, `Clients`, `Suppliers`, `Inventory`, `Sales`, `Finance`, `Reports`, `Settings`, `NotFound` (`.jsx`)
- `src/services/supabase.js`
- `src/styles/`: `variables.css`, `globals.css`, `layout.css`, `components.css`
- `.gitkeep` em `src/context/`, `src/utils/`, `src/components/forms/`, `src/components/tables/`

Modificados:

- `.gitignore` (acrescentado `.env`, `.env.*` e `!.env.example`; conteúdo anterior mantido)
- `index.html` (idioma `pt`, título, descrição, cor do tema, ícone `lumo-mark.svg`)
- `README.md` (secção do projeto no topo; texto original do template mantido abaixo)
- `src/main.jsx` (importa os novos estilos)
- `src/App.jsx` (substitui o ecrã de demonstração pelo router; a versão anterior fica no histórico Git)
- `package.json` (acrescentadas `react-router-dom` e `lucide-react`; dependências e scripts existentes mantidos)

Mantidos sem alteração e sem uso: `src/index.css`, `src/App.css`, `src/assets/*`, `public/favicon.svg`, `public/icons.svg`.

## Dependências

Acrescentadas ao `package.json`: `react-router-dom` (`^7.0.0`) e `lucide-react` (`>=0.468.0 <2.0.0`). As dependências e os scripts existentes não foram alterados. Não é instalado `@supabase/supabase-js`.

O `package-lock.json` **não vai no ZIP**: só o `npm install` o consegue gerar com as versões e os hashes reais. O lock atual do repositório fica como está até correres:

```
npm install
```

Depois, faz commit do `package-lock.json` atualizado. Se quiseres as versões mais recentes de cada pacote, usa `npm install react-router-dom@latest lucide-react@latest`.

## Variáveis de ambiente

`VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` (ver `.env.example`). Só a chave pública (anon) pode estar no frontend. Chaves privilegiadas nunca entram no repositório.

## Comportamento dos elementos interativos

- Pesquisa global: desativada e identificada como não implementada.
- Notificações e perfil: abrem um painel com estado vazio e explicam o que falta.
- Menu móvel: abre e fecha (botão, sobreposição, tecla Escape e mudança de página).
- Páginas carregadas sob demanda, com estado de carregamento e página de erro de rota.

## Verificações

Feitas no ambiente de desenvolvimento do assistente (sem rede, sem `node_modules` do projeto):

- `package.json` comparado com o da branch `fase-0-fundacao`: todas as dependências e scripts originais mantidos.

- Todos os imports locais existem e as 8 rotas definidas coincidem com as usadas no router e na navegação.
- Compilação dos ficheiros com esbuild (sintaxe JSX e CSS), com os 4 pacotes externos tratados como externos.

**Por executar** (a cargo do responsável, no Termux): `npm install`, `npm run build`, `npm run lint`, navegação pelas 8 rotas e teste de responsividade em telemóvel e desktop.

## Limitações conhecidas

- Atualização direta de uma rota (por exemplo `/clientes`) em produção exige reescrita para `index.html` no alojamento (fallback de SPA). A configuração no EdgeOne ainda não foi verificada.
- Os painéis de notificações e perfil (`details`) não fecham ao clicar fora.
- Nomes de ícones Lucide foram escolhidos pelos nomes atuais; se a build indicar um ícone inexistente, trocar o nome em `src/config/navigation.js` ou no ficheiro indicado.
- Contraste e acessibilidade foram considerados no desenho, mas não medidos com ferramenta.
- Níveis de acesso (`src/constants/access.js`) são apenas metadados; não aplicam permissões.

## Próximo passo sugerido

Rever esta fase e só depois autorizar a Fase 1 (autenticação e permissões, empresas e isolamento, módulos do MVP).
