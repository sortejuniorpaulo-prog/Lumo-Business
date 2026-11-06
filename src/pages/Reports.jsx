import { FileText } from 'lucide-react'
import PageHeader from '../components/common/PageHeader.jsx'
import Panel from '../components/common/Panel.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

export default function Reports() {
  useDocumentTitle('Relatórios')
  return (
    <>
      <PageHeader title="Relatórios" description="Relatórios de vendas, stock e finanças, com exportação." />
      <Panel>
        <EmptyState icon={FileText} title="Sem relatórios disponíveis" status="Previsto: Fase 1 (MVP)">
          Os relatórios dependem de dados reais. Os relatórios iniciais serão construídos no MVP.
        </EmptyState>
      </Panel>
    </>
  )
}
