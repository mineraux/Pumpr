import { db } from '@/firebase/db'
import router from '@/router'
import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations } from 'vuexfire'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: vuexfireMutations,
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
    }
  },
  modules: {},
  getters: {}
})
