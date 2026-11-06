import { useRouteError } from 'react-router-dom'
import ErrorState from '../components/common/ErrorState.jsx'

export default function RouteError() {
  const error = useRouteError()
  console.error(error)
  return (
    <div className="content">
      <ErrorState title="Não foi possível mostrar esta página" onRetry={() => window.location.reload()}>
        Ocorreu um erro inesperado. Tente novamente; se o problema persistir, contacte o suporte.
      </ErrorState>
    </div>
  )
}
