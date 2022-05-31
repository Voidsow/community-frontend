<template>
  <nav>
    <v-app-bar dense class="grey lighten-3" app>
      <v-app-bar-nav-icon @click="open = !open"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light">Café</span>
        <span class="font-weight-bold"> Stella</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <register-form v-if="!logined"></register-form>
      <login-form v-if="!logined"></login-form>
      <v-menu v-if="logined" open-on-hover offset-y>
        <template v-slot:activator="{ on, attrs }">
          <router-link :to="{ name: 'user', params: { id: user.id } }">
            <v-btn rounded text v-bind="attrs" v-on="on">
              <v-avatar size="33" class="mr-1">
                <img :src="user.headerUrl" />
              </v-avatar>
              {{ user.username }}
            </v-btn>
          </router-link>
        </template>

        <v-list>
          <v-list-item-group>
            <v-list-item v-for="(item, index) in items" dense :key="index">
              <router-link :to="item.route">
                <v-list-item-title>
                  <v-icon small class="pr-1">{{ item.icon }}</v-icon>
                  {{ item.title }}
                </v-list-item-title>
              </router-link>
            </v-list-item>
          </v-list-item-group>
          <v-divider></v-divider>
          <v-list-item-group>
            <v-list-item dense @click="logout">
              <v-list-item-title>
                <v-icon small class="pr-1">mdi-logout</v-icon>
                退出
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- 抽屉 -->
    <v-navigation-drawer v-model="open" app class="">
      <v-row class="mt-3">
        <v-col class="d-flex justify-center">
          <v-avatar size="100"><img :src="'/ava.webp'" /></v-avatar>
        </v-col>
      </v-row>
      <v-list nav>
        <v-list-item
          link
          v-for="item in items"
          :key="item.itle"
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-subtitle>{{ item.title }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import RegisterForm from "@/components/RegisterForm.vue";
import { HOST } from "@/utils";
import { logout } from "@/store/mutation-type";
export default {
  name: "NavBar",
  components: {
    LoginForm,
    RegisterForm,
  },
  data() {
    return {
      open: false,
      items: [
        { title: "首页", icon: "mdi-home", route: "/" },
        { title: "个人中心", icon: "mdi-account", route: "/user" },
        { title: "设置", icon: "mdi-cog", route: "/setting" },
        {
          title: "私信",
          icon: "mdi-comment-multiple",
          route: "/message",
        },
      ],
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    logined() {
      return this.user !== null;
    },
  },
  methods: {
    logout() {
      alert('test')
      fetch(HOST + "logout")
        .then((resp) => resp.json())
        .then((resp) => {
          if (resp.code === 200) this.$store.commit(logout);
        });
    },
  },
};
</script>
