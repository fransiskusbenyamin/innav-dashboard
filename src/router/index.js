import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Traffic from '../components/Traffic.vue'
import EditLokasi from '../components/EditLokasi.vue'
import AturJarak from '../components/AturJarak.vue'
import EditNode from '../components/EditNode.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/traffic',
    name: 'Traffic',
    component: Traffic,
    meta: { title: 'Traffic' }
  },
  {
    path: '/editlokasi',
    name: 'EditLokasi',
    component: EditLokasi,
    meta: { title: 'EditLokasi' }
  },
  {
    path: '/manage',
    name: 'AturJarak',
    component: AturJarak,
    meta: { title: 'AturJarak' }
  },
  {
    path: '/edit/:nodeId',
    name: 'EditNode',
    component: EditNode,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
