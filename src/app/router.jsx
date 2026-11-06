import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout.jsx'
import RouteError from './RouteError.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import NotFound from '../pages/NotFound.jsx'
import { ROUTES } from '../constants/routes.js'

const Clients = lazy(() => import('../pages/Clients.jsx'))
const Suppliers = lazy(() => import('../pages/Suppliers.jsx'))
const Inventory = lazy(() => import('../pages/Inventory.jsx'))
const Sales = lazy(() => import('../pages/Sales.jsx'))
const Finance = lazy(() => import('../pages/Finance.jsx'))
const Reports = lazy(() => import('../pages/Reports.jsx'))
const Settings = lazy(() => import('../pages/Settings.jsx'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: ROUTES.clients, element: <Clients /> },
      { path: ROUTES.suppliers, element: <Suppliers /> },
      { path: ROUTES.inventory, element: <Inventory /> },
      { path: ROUTES.sales, element: <Sales /> },
      { path: ROUTES.finance, element: <Finance /> },
      { path: ROUTES.reports, element: <Reports /> },
      { path: ROUTES.settings, element: <Settings /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
