/* jshint esversion:6 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    post: undefined,
    user: {
      id: 1,
      headerUrl: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
      username: "Taro",
    },
  },
  getters: {
  },
  mutations: {
    setPost(state, post) {
      state.post = post;
    },
    incrPostLike(state) {
      state.post.likeNum += state.post.like ? -1 : 1;
      state.post.like = !state.post.like;
    },
  },
  actions: {

  },
  modules: {
  }
});