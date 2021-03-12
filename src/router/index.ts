import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import MyDiet from '../views/MyDiet.vue'
import MyMeals from '../views/MyMeals.vue'
import { db } from '@/firebase/db'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Log In',
    component: Login
  },
  {
    path: '/my-diet',
    name: 'My diet',
    component: MyDiet,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/my-meals',
    name: 'My Meals',
    component: MyMeals,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, _, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !db.app.auth().currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
