import { db } from "@/firebase/db";
import Vue from "vue";
import Vuex, { Getter } from "vuex";
import { firestoreAction, vuexfireMutations } from 'vuexfire'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    names : [
      {
        name: "test"
      }
    ]
  },
  mutations: vuexfireMutations,
  actions: {
    bindTodos: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('todos', db.collection('todos'))
    }),
  },
  modules: {},
  getters: {
    names: state => state.names
  }
});
