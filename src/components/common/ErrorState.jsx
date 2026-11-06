import { CircleAlert } from 'lucide-react'

export default function ErrorState({ title = 'Ocorreu um erro', onRetry, children }) {
  return (
    <div className="empty error-box" role="alert">
      <CircleAlert className="empty-icon" size={22} aria-hidden="true" />
      <h3>{title}</h3>
      <p>{children}</p>
      {onRetry && (
        <button type="button" className="btn" onClick={onRetry}>
          Tentar novamente
        </button>
      )}
    </div>
  )
}
