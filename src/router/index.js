import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/index.vue'
import { pages } from './pages'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, ...pages

  ]
})
