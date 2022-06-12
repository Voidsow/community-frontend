/* jshint esversion:6 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import IndexView from '../views/IndexView.vue';
import PostView from "@/views/PostView.vue";
import ProfileView from "@/views/ProfileView.vue";
import MessageView from "@/views/MessageView.vue";
import MessageLineView from "@/views/MessageLineView.vue";
import FollowView from "@/views/FollowView.vue";
import TestView from "@/views/TestView.vue";
import NotificationView from "@/views/NotificationView.vue";
import FollowNotify from "@/views/FollowNotify.vue";
import LikeNotify from "@/views/LikeNotify.vue";
import NotifyComment from "@/views/NotifyComment.vue";
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
    component: ProfileView,
    children: [
      {
        name: "follow",
        path: "follow",
        component: FollowView
      }
    ]
  },
  {
    path: "/message",
    name: "message",
    component: MessageView
  },
  {
    path: "/chat",
    name: "chat",
    component: MessageLineView
  },
  {
    path: "/test",
    name: "test",
    component: TestView
  },
  {
    path: "/notifications",
    name: "notification",
    component: NotificationView,
    children: [
      {
        path: "follow",
        component: FollowNotify
      },
      {
        path: "like",
        component: LikeNotify
      },
      {
        path: "comment",
        component: NotifyComment
      },
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
