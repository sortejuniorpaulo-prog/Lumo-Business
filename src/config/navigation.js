import { LayoutDashboard, Users, Truck, Package, ShoppingCart, Wallet, FileText, Settings } from 'lucide-react'
import { ROUTES } from '../constants/routes.js'

// `module` identifica o módulo para futura ativação por empresa e permissões.
export const navigation = [
  { id: 'dashboard', label: 'Dashboard', path: ROUTES.dashboard, icon: LayoutDashboard, module: 'dashboard' },
  { id: 'clients', label: 'Clientes', path: ROUTES.clients, icon: Users, module: 'clients' },
  { id: 'suppliers', label: 'Fornecedores', path: ROUTES.suppliers, icon: Truck, module: 'suppliers' },
  { id: 'inventory', label: 'Produtos e stock', path: ROUTES.inventory, icon: Package, module: 'inventory' },
  { id: 'sales', label: 'Vendas e encomendas', path: ROUTES.sales, icon: ShoppingCart, module: 'sales' },
  { id: 'finance', label: 'Finanças', path: ROUTES.finance, icon: Wallet, module: 'finance' },
  { id: 'reports', label: 'Relatórios', path: ROUTES.reports, icon: FileText, module: 'reports' },
  { id: 'settings', label: 'Definições', path: ROUTES.settings, icon: Settings, module: 'settings' },
]
