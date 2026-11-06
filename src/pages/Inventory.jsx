import { Package } from 'lucide-react'
import PageHeader from '../components/common/PageHeader.jsx'
import Panel from '../components/common/Panel.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

export default function Inventory() {
  useDocumentTitle('Produtos e stock')
  return (
    <>
      <PageHeader title="Produtos e stock" description="Produtos, serviços, quantidades e movimentos de stock." />
      <Panel>
        <EmptyState icon={Package} title="Ainda não há produtos" status="Previsto: Fase 1 (MVP)">
          Nenhuma quantidade é apresentada até existirem registos. Produtos e stock serão construídos no MVP.
        </EmptyState>
      </Panel>
    </>
  )
}
