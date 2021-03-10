import { db } from "@/firebase/db";
import Vue from "vue";
import Vuex, { Getter } from "vuex";
import { firestoreAction, vuexfireMutations } from 'vuexfire'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: vuexfireMutations,
  actions: {
    async login({dispatch}, form) {
      const { user } = await db.app.auth().signInWithEmailAndPassword(form.email, form.password)

      dispatch('fetchUserProfile', user)
    },

    async fetchUserProfile({ commit }, user) {
      const userProfile = await db.app.auth().currentUser
    }
  },
  modules: {},
  getters: {}
});
