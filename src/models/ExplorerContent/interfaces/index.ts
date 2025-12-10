export interface ExplorerItem {
  id: string
  title: string
  description?: string
  icon?: string
  type: 'app' | 'section' | 'action'
  action?: () => void
}
