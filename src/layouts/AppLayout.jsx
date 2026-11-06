import { Suspense, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'
import LoadingState from '../components/common/LoadingState.jsx'

export default function AppLayout() {
  const [navOpen, setNavOpen] = useState(false)
  const { pathname } = useLocation()
  const [previousPath, setPreviousPath] = useState(pathname)

  if (previousPath !== pathname) {
    setPreviousPath(pathname)
    setNavOpen(false)
  }

  return (
    <div className="shell">
      <a className="skip-link" href="#conteudo">Saltar para o conteúdo</a>
      <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />
      <div className="shell-main">
        <Topbar onMenu={() => setNavOpen(true)} />
        <main id="conteudo" className="content" tabIndex={-1}>
          <Suspense fallback={<LoadingState label="A carregar a página" />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
