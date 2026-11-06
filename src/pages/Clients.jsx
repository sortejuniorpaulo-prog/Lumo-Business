import { Users } from 'lucide-react'
import PageHeader from '../components/common/PageHeader.jsx'
import Panel from '../components/common/Panel.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

export default function Clients() {
  useDocumentTitle('Clientes')
  return (
    <>
      <PageHeader title="Clientes" description="Registo de clientes, contactos, limites de crédito e histórico." />
      <Panel>
        <EmptyState icon={Users} title="Ainda não há clientes" status="Previsto: Fase 1 (MVP)">
          Esta página é apenas a estrutura. O registo de clientes será construído no MVP.
        </EmptyState>
      </Panel>
    </>
  )
}
