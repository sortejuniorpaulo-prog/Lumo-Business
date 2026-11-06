import Badge from './Badge.jsx'

export default function EmptyState({ icon: Icon, title, status, children }) {
  return (
    <div className="empty">
      {Icon && <Icon className="empty-icon" size={22} aria-hidden="true" />}
      <h3>{title}</h3>
      <p>{children}</p>
      {status && <Badge>{status}</Badge>}
    </div>
  )
}
