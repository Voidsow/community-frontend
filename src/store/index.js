/* jshint esversion:6 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    messageBar: false,
    query: "",
    info: "",
  },
  getters: {
  },
  mutations: {
    authorize(state, user) {
      state.user = user;
    },
    logout(state) {
      state.user = null;
    },
    messagePop(state, message) {
      state.messageBar = true;
      state.info = message;
    },
    setQuery(state, query) {
      state.query = query;
    }
  },
  actions: {

  },
  modules: {
  }
});