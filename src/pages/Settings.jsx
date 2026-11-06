import { Settings as SettingsIcon } from 'lucide-react'
import PageHeader from '../components/common/PageHeader.jsx'
import Panel from '../components/common/Panel.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import Badge from '../components/common/Badge.jsx'
import { getBackendStatus } from '../services/supabase.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

export default function Settings() {
  useDocumentTitle('Definições')
  const { configured } = getBackendStatus()
  return (
    <>
      <PageHeader title="Definições" description="Configuração da aplicação e, mais tarde, da empresa." />
      <div className="dash-grid">
        <Panel className="dash-finance" title="Ligação ao backend" description="Estado da configuração do Supabase neste ambiente.">
          <div className="status-list">
            <div className="status-row">
              <span>
                Variáveis de ambiente
                <small>VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY</small>
              </span>
              <Badge tone={configured ? 'success' : 'neutral'}>{configured ? 'Definidas' : 'Não definidas'}</Badge>
            </div>
            <div className="status-row">
              <span>
                Cliente Supabase
                <small>Será instalado quando existirem operações reais.</small>
              </span>
              <Badge tone="neutral">Não instalado</Badge>
            </div>
          </div>
        </Panel>
        <Panel className="dash-alerts" title="Empresa e utilizadores">
          <EmptyState icon={SettingsIcon} title="Sem opções ainda" status="Previsto: Fase 1 (MVP)">
            Moeda, fuso horário, utilizadores e módulos serão configurados aqui.
          </EmptyState>
        </Panel>
      </div>
    </>
  )
}
