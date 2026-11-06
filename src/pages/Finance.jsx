import { Wallet } from 'lucide-react'
import PageHeader from '../components/common/PageHeader.jsx'
import Panel from '../components/common/Panel.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

export default function Finance() {
  useDocumentTitle('Finanças')
  return (
    <>
      <PageHeader title="Finanças" description="Fluxo de caixa, contas a receber e contas a pagar." />
      <Panel>
        <EmptyState icon={Wallet} title="Sem registos financeiros" status="Previsto: Fase 1 (MVP)">
          Nenhum saldo é apresentado até existirem movimentos reais. As finanças essenciais serão construídas no MVP.
        </EmptyState>
      </Panel>
    </>
  )
}
