import { Link } from 'react-router-dom'
import { CircleAlert } from 'lucide-react'
import PageHeader from '../components/common/PageHeader.jsx'
import Panel from '../components/common/Panel.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import { ROUTES } from '../constants/routes.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

export default function NotFound() {
  useDocumentTitle('Página não encontrada')
  return (
    <>
      <PageHeader title="Página não encontrada" />
      <Panel>
        <EmptyState icon={CircleAlert} title="Este endereço não existe">
          Verifique o endereço ou volte ao início.
        </EmptyState>
        <div>
          <Link className="btn" to={ROUTES.dashboard}>Ir para o Dashboard</Link>
        </div>
      </Panel>
    </>
  )
}
