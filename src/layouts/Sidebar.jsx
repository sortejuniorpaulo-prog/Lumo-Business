import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { X } from 'lucide-react'
import { navigation } from '../config/navigation.js'

export default function Sidebar({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <>
      {open && <div className="sidebar-overlay" onClick={onClose} aria-hidden="true" />}
      <aside className={`sidebar${open ? ' is-open' : ''}`} aria-label="Navegação principal">
        <div className="sidebar-head">
          <div className="brand">
            <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
              <rect width="32" height="32" rx="8" fill="#2563EB" />
              <path d="M11 8v13h10" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <span>
              Lumo
              <small>Business</small>
            </span>
          </div>
          <button type="button" className="icon-btn sidebar-close" onClick={onClose} aria-label="Fechar menu">
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <nav>
          <ul className="nav-list">
            {navigation.map(({ id, label, path, icon: Icon }) => (
              <li key={id}>
                <NavLink to={path} end={path === '/'} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                  <Icon size={19} aria-hidden="true" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <p className="sidebar-foot">Fase 0: fundação técnica</p>
      </aside>
    </>
  )
}
