import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { appsConfig } from '@/data/apps'

// One route for the whole desktop. The optional segment names the window on top,
// so /projects can be shared and the phone's back gesture closes a window.
const appPattern = appsConfig.map((app) => app.id).join('|')

const routes: RouteRecordRaw[] = [
  {
    path: `/:app(${appPattern})?`,
    name: 'home',
    component: HomeView,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
