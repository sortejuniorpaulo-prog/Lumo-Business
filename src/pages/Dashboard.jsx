import PageHeader from '../components/common/PageHeader.jsx'
import DashboardPanels from '../features/dashboard/DashboardPanels.jsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

export default function Dashboard() {
  useDocumentTitle('Dashboard')
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Visão geral da empresa. Ainda não há dados: nenhum valor é apresentado até existirem registos reais."
      />
      <DashboardPanels />
    </>
  )
}
