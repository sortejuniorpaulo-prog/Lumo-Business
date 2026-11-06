import { ShoppingCart } from 'lucide-react'
import PageHeader from '../components/common/PageHeader.jsx'
import Panel from '../components/common/Panel.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

export default function Sales() {
  useDocumentTitle('Vendas e encomendas')
  return (
    <>
      <PageHeader title="Vendas e encomendas" description="Encomendas, vendas, pagamentos e entregas." />
      <Panel>
        <EmptyState icon={ShoppingCart} title="Ainda não há vendas" status="Previsto: Fase 1 (MVP)">
          Esta página é apenas a estrutura. Vendas e encomendas serão construídas no MVP.
        </EmptyState>
      </Panel>
    </>
  )
}
