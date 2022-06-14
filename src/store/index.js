/* jshint esversion:6 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem("user")),
    messageBar: false,
    query: "",
    info: "",
    messageLevel: "info",

    token: localStorage.getItem("token"),
  },
  getters: {
  },
  mutations: {
    authorize(state, data) {
      state.token = data.token;
      localStorage.setItem("token", data.token);
      state.user = data.user;
      localStorage.setItem("user", JSON.stringify(data.user));
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.clear(); 
    },
    messagePop(state, message, level) {
      state.messageBar = true;
      state.info = message;
      state.messageLevel = level;
    },
    setQuery(state, query) {
      state.query = query;
    },
  },
  actions: {

  },
  modules: {
  }
});