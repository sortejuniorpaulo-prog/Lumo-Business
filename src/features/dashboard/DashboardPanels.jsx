import { Activity, Banknote, Boxes, CircleAlert, Receipt, ShoppingCart } from 'lucide-react'
import Panel from '../../components/common/Panel.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'

const PANELS = [
  { id: 'finance', title: 'Indicadores financeiros', description: 'Receitas, despesas e saldo do período, com comparação.', icon: Banknote, empty: 'Sem movimentos financeiros', text: 'Os valores aparecem aqui quando existirem recebimentos e pagamentos registados.' },
  { id: 'alerts', title: 'Alertas importantes', description: 'Exceções e atrasos que exigem atenção.', icon: CircleAlert, empty: 'Sem alertas', text: 'Os alertas serão gerados por regras verificáveis sobre dados reais.' },
  { id: 'sales', title: 'Vendas', description: 'Vendas confirmadas no período.', icon: ShoppingCart, empty: 'Sem vendas registadas', text: 'O resumo depende do módulo de vendas e encomendas.' },
  { id: 'stock', title: 'Situação do stock', description: 'Produtos em rutura ou abaixo do mínimo.', icon: Boxes, empty: 'Sem produtos registados', text: 'A situação do stock depende do registo de produtos e movimentos.' },
  { id: 'receivables', title: 'Contas a receber', description: 'Saldos em aberto e vencimentos.', icon: Receipt, empty: 'Sem contas a receber', text: 'Os saldos aparecem quando existirem vendas a crédito ou parciais.' },
  { id: 'activity', title: 'Atividade recente', description: 'Últimas operações registadas na empresa.', icon: Activity, empty: 'Sem atividade registada', text: 'As operações recentes serão listadas aqui, respeitando as permissões do utilizador.' },
]

export default function DashboardPanels() {
  return (
    <div className="dash-grid">
      {PANELS.map((panel) => (
        <Panel key={panel.id} className={`dash-${panel.id}`} title={panel.title} description={panel.description}>
          <EmptyState icon={panel.icon} title={panel.empty} status="Previsto: Fase 1 (MVP)">
            {panel.text}
          </EmptyState>
        </Panel>
      ))}
    </div>
  )
}
