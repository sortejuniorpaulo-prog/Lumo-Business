import { Bell, Menu, Search, User } from 'lucide-react'

export default function Topbar({ onMenu }) {
  return (
    <header className="topbar">
      <button type="button" className="icon-btn menu-btn" onClick={onMenu} aria-label="Abrir menu">
        <Menu size={20} aria-hidden="true" />
      </button>
      <div className="search">
        <Search size={18} aria-hidden="true" />
        <input
          type="search"
          disabled
          placeholder="Pesquisa global (não implementada)"
          aria-label="Pesquisa global, ainda não implementada"
        />
      </div>
      <div className="topbar-actions">
        <details className="popover">
          <summary className="icon-btn" aria-label="Notificações">
            <Bell size={20} aria-hidden="true" />
          </summary>
          <div className="popover-body">
            <p className="popover-title">Notificações</p>
            <p>Sem notificações. Os avisos e alertas da aplicação serão mostrados aqui.</p>
          </div>
        </details>
        <details className="popover">
          <summary className="icon-btn" aria-label="Perfil">
            <User size={20} aria-hidden="true" />
          </summary>
          <div className="popover-body">
            <p className="popover-title">Sessão não iniciada</p>
            <p>A autenticação e os perfis de utilizador serão adicionados numa fase seguinte.</p>
          </div>
        </details>
      </div>
    </header>
  )
}
