# LUMO BUSINESS

## Arquitectura Técnica da Base de Dados --- Versão 1.0

**Estado:** Aprovada como base de trabalho\
**Fase:** 1 --- Fundação, autenticação, empresas e permissões\
**Tecnologia:** Supabase, PostgreSQL, Supabase Auth e Row Level Security
(RLS)

## 1. Objectivo

Definir uma arquitectura segura, escalável e multiempresa para o Lumo
Business, garantindo que cada empresa tenha os seus próprios dados,
utilizadores, configurações e permissões.

## 2. Estrutura principal

  Entidade             Responsabilidade
  -------------------- -----------------------------------------
  companies            Registo e configurações das empresas
  profiles             Informações dos utilizadores
  company_members      Associação dos utilizadores às empresas
  platform_roles       Funções globais da plataforma
  invitations          Convites enviados aos funcionários
  access_requests      Pedidos de entrada nas empresas
  roles                Papéis internos de cada empresa
  permissions          Catálogo de permissões
  role_permissions     Permissões associadas aos papéis
  member_permissions   Personalizações individuais
  approval_rules       Limites e regras de aprovação
  approval_requests    Pedidos de aprovação
  audit_logs           Histórico de actividades e operações

## 3. Contas e empresas

-   Cada utilizador terá uma conta individual através do Supabase Auth.
-   Os dados pessoais serão mantidos em `profiles`.
-   Um utilizador poderá pertencer a várias empresas.
-   Cada associação terá papel e permissões independentes.
-   O utilizador deverá seleccionar a empresa em que pretende trabalhar.
-   Os dados empresariais serão sempre isolados.

## 4. Entrada de funcionários

Serão permitidos dois métodos:

**Convite:** o administrador convida um funcionário por e-mail.

**Pedido de acesso:** o funcionário solicita entrada numa empresa e
aguarda aprovação.

Somente um administrador autorizado poderá aprovar ou rejeitar pedidos.

Cada decisão deverá guardar o responsável, a data, a hora e o resultado.

## 5. Papéis e permissões

Papéis padrão:

1.  Colaborador.
2.  Gerente.
3.  Administrador da empresa.

O superadministrador será uma função global, independente dos papéis
internos.

O administrador poderá personalizar as permissões de cada funcionário
por módulo e operação:

-   Consultar.
-   Criar.
-   Editar.
-   Eliminar.
-   Aprovar.

As permissões individuais não poderão ultrapassar as regras obrigatórias
de segurança da plataforma.

## 6. Aprovações e limites

Cada empresa poderá configurar limites por operação, função ou
funcionário.

Exemplos:

-   Aprovação de despesas.
-   Limites de descontos.
-   Ajustes de stock.
-   Cancelamento de vendas concluídas.

Quando uma operação exigir aprovação independente, o solicitante não
poderá aprová-la.

Todas as decisões deverão ficar registadas.

## 7. Segurança e isolamento

-   Utilização de Row Level Security (RLS) nas tabelas com dados
    empresariais.
-   Verificação da associação do utilizador à empresa em cada operação.
-   Políticas de acesso aplicadas no PostgreSQL, não apenas no frontend.
-   Nenhuma empresa poderá consultar dados de outra.
-   Utilizadores não poderão aumentar os próprios privilégios.
-   Chaves privilegiadas nunca serão expostas no frontend.

## 8. Acesso excepcional do superadministrador

O superadministrador não terá acesso automático aos dados privados das
empresas.

O suporte excepcional deverá ter:

-   Justificação obrigatória.
-   Autorização da empresa sempre que possível.
-   Acesso temporário e limitado.
-   Registo das acções realizadas.
-   Expiração automática do acesso.

## 9. Auditoria

A auditoria deverá ser protegida contra alterações indevidas.

Os utilizadores não poderão editar nem apagar os registos.

Cada evento deverá guardar, conforme aplicável:

-   Empresa.
-   Utilizador responsável.
-   Tipo de operação.
-   Registo afectado.
-   Data e hora.
-   Resultado.
-   Informações necessárias para investigação.

A implementação deverá utilizar permissões de escrita controladas,
mecanismos append-only, protecção administrativa e cópias de segurança.

## 10. Arquitectura de implementação

A implementação será feita por etapas:

1.  Autenticação e perfis.
2.  Empresas e associações.
3.  Convites e pedidos de acesso.
4.  Papéis e permissões.
5.  Políticas RLS e isolamento.
6.  Aprovações e limites.
7.  Auditoria e acesso excepcional.

Cada etapa deverá incluir migrações SQL versionadas, testes de segurança
e validação antes de avançar.

## 11. Regras de desenvolvimento

-   Não remover funcionalidades existentes sem autorização.
-   Fazer cópias de segurança antes de alterações.
-   Manter migrações SQL versionadas no Git.
-   Separar ambientes de desenvolvimento, teste e produção.
-   Testar o isolamento entre empresas com utilizadores diferentes.
-   Não considerar uma operação segura apenas porque o frontend escondeu
    um botão.

**Fim do documento --- Versão 1.0 aprovada como base de trabalho.**
