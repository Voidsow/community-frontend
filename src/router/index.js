/* jshint esversion:6 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import IndexView from '../views/IndexView.vue';
import PostView from "@/views/PostView.vue";
import UserView from "@/views/UserView.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'index',
    component: IndexView
  },
  {
    path: '/post/:id',
    name: "post",
    component: PostView
  },
  {
    path: "/user/:id",
    name: "user",
    component: UserView
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
