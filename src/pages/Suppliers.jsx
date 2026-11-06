import { Truck } from 'lucide-react'
import PageHeader from '../components/common/PageHeader.jsx'
import Panel from '../components/common/Panel.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

export default function Suppliers() {
  useDocumentTitle('Fornecedores')
  return (
    <>
      <PageHeader title="Fornecedores" description="Perfis de fornecedores, contactos e histórico de compras." />
      <Panel>
        <EmptyState icon={Truck} title="Ainda não há fornecedores" status="Previsto: Fase 1 (MVP)">
          Esta página é apenas a estrutura. O registo de fornecedores será construído no MVP.
        </EmptyState>
      </Panel>
    </>
  )
}
