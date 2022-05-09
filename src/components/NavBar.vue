<template>
  <nav>
    <v-app-bar class="grey lighten-3 text-uppercase" app>
      <v-app-bar-nav-icon
        @click="drawer.open = !drawer.open"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <span class="font-weight-light">Café</span>
        <span class="font-weight-bold"> Stella</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn text class="ml-1">
        <span>登 录</span>
        <v-icon right>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- 抽屉 -->
    <v-navigation-drawer v-model="drawer.open" app class="">
      <v-row class="mt-3">
        <v-col class="d-flex justify-center">
          <v-avatar size="100"><img src="/ava.webp" /></v-avatar>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex justify-center">
          <post-form></post-form>
        </v-col>
      </v-row>
      <v-list>
        <v-list-item
          link
          v-for="item in drawer.items"
          :key="item.title"
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
export default {
  components: { PostForm },
  name: "NavBar",
  data() {
    return {
      drawer: {
        open: false,
        items: [
          { title: "首页", icon: "mdi-home", route: "/" },
          { title: "个人中心", icon: "mdi-account", route: "/user" },
          { title: "发布的帖子", icon: "mdi-forum", route: "/user/posts" },
          {title: "评论",icon: "mdi-comment-multiple",route: "/user/comments"},
        ],
      },
    };
  },
};
</script>
