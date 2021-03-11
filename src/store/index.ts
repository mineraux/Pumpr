import { db } from '@/firebase/db'
import router from '@/router'
import Vue from 'vue'
import Vuex from 'vuex'
import { firestoreAction, vuexfireMutations } from 'vuexfire'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    meals: [],
  },
  mutations: {
    ...vuexfireMutations
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

    async fetchUserProfile() {
      const userProfile = await db.app.auth().currentUser

      console.log(userProfile)
    },

    async saveProduct({dispatch}, product) {
      // TODO: Auto compute calories if empty
      await db.app.firestore().collection('products').doc().set(product)
    },

    async saveMeal({dispatch}, meal) {
      console.log(meal)
      await db.app.firestore().collection('meals').doc().set({meal})
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
