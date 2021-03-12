import { db } from '@/firebase/db'
import router from '@/router'
import { UserInfo } from '@/types/firebase'
import { Meal } from '@/types/Meal'
import { Product } from '@/types/Product'
import Vue from 'vue'
import Vuex from 'vuex'
import { firestoreAction, vuexfireMutations } from 'vuexfire'

Vue.use(Vuex)

type State = {
  products: Product[]
  meals: Meal[]
  user: UserInfo | null
}

export default new Vuex.Store<State>({
  state: {
    products: [],
    meals: [],
    user: null
  },
  mutations: {
    ...vuexfireMutations,
    setUser(state, user: UserInfo) {
      state.user = user
    }
  },
  actions: {
    async login({ dispatch }, form) {
      try {
        const { user } = await db.app
          .auth()
          .signInWithEmailAndPassword(form.email, form.password)

        dispatch('fetchUserProfile', user)

        router.push('/')
      } catch (err) {
        console.log('Error login')
      }
    },

    async logout() {
      try {
        await db.app.auth().signOut()
      } catch (err) {
        console.log('Logout error')
      }
    },

    async fetchUserProfile() {
      const userProfile = await db.app.auth().currentUser

      this.commit('setUser', userProfile)
    },

    async saveProduct(_, product) {
      // TODO: Auto compute calories if empty
      await db.app
        .firestore()
        .collection('products')
        .doc()
        .set(product)
    },

    async saveMeal(_, meal) {
      await db.app
        .firestore()
        .collection('meals')
        .doc()
        .set({ meal })
    },

    bindProductsRef: firestoreAction(context => {
      return context.bindFirestoreRef('products', db.collection('products'))
    }),

    bindMealsRef: firestoreAction(context => {
      return context.bindFirestoreRef('meals', db.collection('meals'))
    })
  },
  modules: {},
  getters: {}
})
