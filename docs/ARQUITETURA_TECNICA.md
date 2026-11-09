# LUMO BUSINESS

## Arquitectura Técnica da Base de Dados — Versão 1.1

**Estado:** Actualização das decisões aprovadas pelo utilizador
**Base:** Versão 1.0
**Fase:** 1 — Fundação, autenticação, empresas, membros e permissões
**Tecnologia prevista:** Supabase, PostgreSQL, Supabase Auth e Row Level Security (RLS)

---

## 1. Objectivo

Definir uma arquitectura segura, escalável e multiempresa para o Lumo Business, garantindo que cada empresa tenha os seus próprios dados, utilizadores, configurações e permissões.

Esta versão 1.1 mantém a base técnica da versão 1.0 e acrescenta as decisões aprovadas sobre gestão de funcionários, funções, permissões, administração e consulta da auditoria.

## 2. Estrutura principal

| Entidade | Responsabilidade |
|---|---|
| `companies` | Registo, estado e configurações das empresas |
| `profiles` | Informações globais dos utilizadores |
| `company_members` | Associação de utilizadores às empresas, função e estado da participação |
| `platform_roles` | Funções globais da plataforma |
| `invitations` | Convites enviados aos funcionários |
| `access_requests` | Pedidos de entrada nas empresas |
| `roles` | Funções internas de cada empresa |
| `permissions` | Catálogo de permissões por módulo e operação |
| `role_permissions` | Permissões padrão associadas às funções |
| `member_permissions` | Permissões personalizadas por funcionário |
| `approval_rules` | Limites e regras de aprovação |
| `approval_requests` | Pedidos e decisões de aprovação |
| `audit_logs` | Histórico protegido de actividades e operações |
| `support_access_grants` | Autorizações excepcionais e temporárias de suporte |

A estrutura é conceptual. Tipos de dados, relações, restrições, índices e políticas RLS serão definidos nas migrações SQL antes da implementação.

## 3. Contas e empresas

- Cada utilizador terá uma conta individual através do Supabase Auth.
- Os dados pessoais serão mantidos em `profiles`, associados ao identificador da conta de autenticação.
- Um utilizador poderá pertencer a várias empresas com uma única conta.
- Cada associação terá função, estado e permissões independentes.
- O utilizador deverá seleccionar a empresa em que pretende trabalhar.
- A suspensão ou o encerramento da participação numa empresa não bloqueará automaticamente o acesso às outras empresas.
- Os dados empresariais serão sempre isolados.
- A conta global do utilizador e a sua participação em cada empresa serão conceitos separados.

## 4. Entrada de funcionários

Serão permitidos dois métodos:

**Convite:** um administrador autorizado convida um funcionário por e-mail.

**Pedido de acesso:** um utilizador solicita entrada numa empresa e aguarda aprovação.

- Somente um administrador autorizado poderá aprovar ou rejeitar pedidos de acesso.
- Cada decisão deverá guardar o responsável, a data, a hora e o resultado.
- O convite deverá ter validade, utilização única e associação ao endereço de e-mail previsto.
- A aceitação do convite exige autenticação e validação da identidade correspondente.

## 5. Funções e permissões

### 5.1 Funções padrão

Cada empresa terá três funções internas padrão:

1. **Colaborador**
2. **Gerente**
3. **Administrador da empresa**

O **superadministrador** será uma função global da plataforma, independente das funções internas das empresas. Não será uma função comum de funcionário.

### 5.2 Permissões padrão e personalizadas

- Cada funcionário recebe inicialmente as permissões padrão da sua função.
- As permissões são definidas por módulo e operação: consultar, criar, editar, eliminar e aprovar.
- Somente um administrador da empresa poderá personalizar as permissões dos funcionários.
- O gerente poderá gerir operações do negócio, mas não poderá alterar permissões de acesso.
- O funcionário não poderá alterar as próprias permissões.
- O administrador poderá conceder permissões adicionais ou retirar permissões específicas, dentro dos limites de segurança e da hierarquia de funções.
- Todas as alterações deverão ser registadas na auditoria.

### 5.3 Limites das personalizações

- As personalizações não poderão ultrapassar as regras obrigatórias de segurança da plataforma.
- Uma função inferior não poderá conservar privilégios exclusivos de uma função superior.
- Uma permissão personalizada não poderá permitir que um utilizador altere as próprias permissões ou contorne a separação de funções.
- As regras técnicas de precedência entre permissões padrão, concessões individuais e restrições serão definidas explicitamente antes da criação das políticas RLS.

## 6. Gestão de administradores

- Uma empresa poderá ter vários administradores.
- Todos os administradores activos poderão gerir as permissões dos funcionários.
- Um administrador poderá retirar o acesso administrativo de outro administrador, mediante confirmação especial.
- A operação deverá registar o responsável, a pessoa afectada, a data, a hora e o motivo.
- O sistema deverá impedir que a empresa fique sem pelo menos um administrador activo.
- Um administrador não poderá remover a própria autorização administrativa através do processo de remoção de outro administrador.
- Se o único administrador quiser sair, deverá primeiro indicar outro membro, promovê-lo a administrador e concluir a transferência.
- A saída do administrador anterior só será permitida depois de o sistema confirmar que existe outro administrador activo.
- As alterações administrativas deverão ser auditadas.

## 7. Suspensão e encerramento da participação

### 7.1 Suspensão

- O administrador poderá suspender imediatamente a participação de um funcionário na sua empresa.
- A suspensão retira o acesso desse funcionário à empresa suspensora.
- A suspensão não bloqueia a conta global nem o acesso às outras empresas em que o utilizador tenha participação activa.
- O histórico das operações realizadas permanece intacto.
- O administrador poderá reactivar a participação.
- A suspensão e a reactivação deverão guardar responsável, data, hora e motivo.

### 7.2 Encerramento definitivo da participação

- O administrador poderá encerrar a participação de um funcionário na empresa.
- O funcionário perde o acesso àquela empresa.
- O histórico das operações realizadas permanece guardado e associado à identidade do autor.
- A conta global continua activa se o utilizador pertencer a outras empresas.
- A empresa poderá convidar novamente o utilizador no futuro.
- O encerramento deverá ser registado na auditoria, incluindo responsável, data, hora e motivo.

### 7.3 Identidade e histórico

- O nome e a identificação necessários para interpretar os registos históricos deverão permanecer associados às operações realizadas.
- Os registos não deverão ser substituídos genericamente por «Utilizador eliminado» quando a participação terminar.
- A conservação de dados pessoais deverá respeitar os prazos legais e as regras de protecção de dados aplicáveis.
- O acesso aos dados históricos continuará limitado a utilizadores autorizados.

### 7.4 Regresso de um funcionário

- O administrador poderá reactivar a participação anterior ou enviar um novo convite.
- As permissões anteriores não serão restauradas automaticamente.
- Antes de devolver o acesso, o administrador deverá rever e confirmar a função e as permissões.
- O histórico antigo permanece associado ao funcionário.
- A reactivação ou o novo convite deverá ser registado na auditoria.

## 8. Alteração de função

### 8.1 Promoção ou mudança de função

- Quando um funcionário mudar de função, o sistema aplicará as permissões padrão da nova função.
- As personalizações anteriores ficarão sujeitas a revisão.
- O administrador decidirá quais personalizações compatíveis poderão continuar.
- Permissões adicionais não serão restauradas automaticamente sem confirmação.
- A alteração deverá registar a função anterior, a nova função, o responsável, a data, a hora e o motivo.

### 8.2 Redução de função

- Ao passar de gerente para colaborador, o funcionário perderá imediatamente as permissões exclusivas de gerente.
- Essas permissões exclusivas não poderão ser mantidas como personalizações.
- O administrador poderá conceder outras permissões compatíveis com a nova função.
- A alteração deverá ser registada na auditoria.

### 8.3 Histórico

O histórico de alterações deverá permitir consultar:

- Funcionário afectado.
- Função anterior e nova função.
- Permissões concedidas ou retiradas.
- Administrador responsável.
- Data e hora.
- Motivo da alteração.

Os registos históricos serão protegidos contra edição e eliminação por utilizadores da empresa.

## 9. Aprovações e limites

Cada empresa poderá configurar limites por operação, função ou funcionário.

Exemplos:

- Aprovação de despesas.
- Limites de descontos.
- Ajustes de stock.
- Cancelamento de vendas concluídas.

- Quando uma operação exigir aprovação independente, o solicitante não poderá aprová-la.
- As decisões deverão ficar registadas.
- As regras de aprovação deverão respeitar as permissões do utilizador e os limites definidos pela empresa.
- A configuração de aprovações não poderá contornar as regras obrigatórias de segurança.

## 10. Segurança e isolamento

- Utilização de Row Level Security (RLS) nas tabelas com dados empresariais.
- Verificação da associação activa do utilizador à empresa em cada operação.
- Políticas de acesso aplicadas no PostgreSQL, não apenas no frontend.
- Nenhuma empresa poderá consultar dados de outra.
- Utilizadores não poderão aumentar os próprios privilégios.
- Apenas administradores autorizados poderão gerir funções e permissões da empresa.
- O sistema deverá impedir a remoção ou desactivação do último administrador activo.
- Chaves privilegiadas nunca serão expostas no frontend.
- As relações entre registos empresariais deverão impedir referências cruzadas entre empresas.
- A suspensão ou o encerramento de uma participação deverá ser aplicado no backend e nas políticas de acesso, não apenas na interface.

## 11. Acesso excepcional do superadministrador

O superadministrador não terá acesso automático aos dados privados das empresas.

O suporte excepcional deverá ter:

- Justificação obrigatória.
- Autorização da empresa sempre que possível.
- Acesso temporário e limitado ao objectivo aprovado.
- Registo das acções realizadas.
- Expiração automática do acesso.
- Processo documentado para situações de emergência, com auditoria posterior quando a autorização prévia não for possível.

As autorizações excepcionais deverão ser representadas por registos próprios, separados das permissões normais de funcionário. A existência de uma função global de superadministrador, por si só, não concederá acesso aos dados privados.

## 12. Auditoria

### 12.1 Protecção dos registos

- A auditoria deverá ser protegida contra alterações indevidas.
- Os utilizadores da empresa não poderão editar nem apagar registos de auditoria.
- O superadministrador também não poderá modificar directamente o histórico.
- A implementação deverá usar escrita controlada e mecanismos append-only, com protecção adequada na base de dados e nas cópias de segurança.

### 12.2 Informação registada

Cada evento deverá guardar, conforme aplicável:

- Empresa.
- Utilizador responsável.
- Tipo de operação.
- Registo afectado.
- Data e hora.
- Resultado.
- Motivo, quando exigido.
- Informações necessárias para investigação, sem guardar segredos ou dados excessivos.

### 12.3 Consulta da auditoria

- **Administrador da empresa:** pode consultar a auditoria completa da sua empresa.
- **Gerente:** pode consultar apenas os registos operacionais para os quais tenha autorização.
- **Colaborador:** não tem acesso à auditoria administrativa.
- **Superadministrador:** não tem acesso automático à auditoria privada das empresas; qualquer acesso excepcional segue as regras de suporte autorizado e temporário.

A consulta da auditoria também deverá respeitar o isolamento entre empresas.

### 12.4 Histórico de gestão

As alterações de funções, permissões, suspensão, reactivação, encerramento e transferência de administração deverão ser registadas com os dados necessários para identificar quem realizou a acção, quem foi afectado, quando ocorreu e qual foi o motivo.

A retenção deverá respeitar os requisitos legais e as políticas de conservação aprovadas.

## 13. Arquitectura de implementação

A implementação será feita por etapas:

1. Autenticação e perfis.
2. Empresas e associações.
3. Convites e pedidos de acesso.
4. Funções e permissões.
5. Gestão de membros, suspensão, encerramento e reactivação.
6. Políticas RLS e isolamento.
7. Aprovações e limites.
8. Auditoria e acesso excepcional.

Cada etapa deverá incluir migrações SQL versionadas, testes de segurança e validação antes de avançar.

## 14. Regras de desenvolvimento

- Não remover funcionalidades existentes sem autorização.
- Fazer cópias de segurança antes de alterações.
- Manter migrações SQL versionadas no Git.
- Separar ambientes de desenvolvimento, teste e produção.
- Testar o isolamento entre empresas com utilizadores diferentes.
- Testar utilizadores que pertencem a várias empresas.
- Testar suspensão e encerramento de uma participação sem afectar outras empresas.
- Testar a protecção do último administrador activo.
- Testar alterações de função e precedência de permissões.
- Testar a impossibilidade de alterar ou apagar auditoria.
- Não considerar uma operação segura apenas porque o frontend escondeu um botão.
- Não executar alterações na base de dados de produção sem revisão, cópia de segurança e validação.

## 15. Pontos técnicos a especificar antes das migrações SQL

Os seguintes detalhes deverão ser definidos no desenho do esquema e nas políticas antes de executar SQL:

- Estados exactos de empresas, convites, pedidos de acesso e participações.
- Catálogo inicial de permissões por módulo e operação.
- Precedência técnica entre permissões padrão, personalizações e restrições de segurança.
- Regras de promoção, redução de função e protecção do último administrador.
- Estrutura e limites de `support_access_grants`.
- Funções auxiliares e políticas RLS, incluindo prevenção de recursão e controlo de privilégios.
- Regras de retenção, arquivo e protecção dos registos de auditoria.

Estes pontos são tarefas de especificação técnica; não representam decisões adicionais já aprovadas.

---

**Fim do documento — Versão 1.1.**
**A versão 1.1 actualiza a versão 1.0 com as decisões aprovadas sobre membros, funções, permissões, administração e auditoria.**
