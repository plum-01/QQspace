import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserList from '../views/UserList'
import UserProfile from '../views/UserProfile'
import LoginView from '../views/LoginView'
import RegistView from '../views/RegistView'
import NotFound from '../views/NotFound'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/userlist/',
    name: 'userlist',
    component: UserList
  },
  {
    path: '/404/',
    name: '404',
    component: NotFound
  },
  {
    path: '/userprofile/:userId/', //冒号表示后面的userID是个参数
    name: 'userprofile',
    component: UserProfile
  },
  {
    path: '/login/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/regist/',
    name: 'regist',
    component: RegistView
  },
  {
    path: '/:catchAll(.*)',
    redirect: "/404/"
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
