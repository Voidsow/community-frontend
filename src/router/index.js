/* jshint esversion:6 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import IndexView from '../views/IndexView.vue';
import PostView from "@/views/PostView.vue";
import UserView from "@/views/UserView.vue";
import MessageView from "@/views/MessageView.vue";
import MessageLineView from "@/views/MessageLineView.vue";
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
    component: PostView,
    props: true
  },
  {
    path: "/user/:id",
    name: "user",
    component: UserView
  },
  {
    path: "/message",
    name: "message",
    component: MessageView
  },
  {
    path: "/message/to/:uid",
    name: "messages",
    component: MessageLineView
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
