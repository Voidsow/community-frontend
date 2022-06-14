<template>
  <nav>
    <v-app-bar dense class="grey lighten-3" app>
      <v-app-bar-nav-icon @click="open = !open"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link :to="{ name: 'index' }">
          <span class="font-weight-light">Café</span>
          <span class="font-weight-bold"> Stella</span>
        </router-link>
      </v-toolbar-title>

      <!-- 搜索栏 -->
      <v-spacer></v-spacer>
      <v-toolbar dense color="rgba(255,255,255,0)" rounded flat>
        <v-text-field
          v-model="query"
          filled
          solo
          dense
          hide-details
          single-line
        ></v-text-field>

        <v-btn icon @click="search">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>

      <v-spacer></v-spacer>
      <register-form v-if="!logined"></register-form>
      <login-form v-if="!logined"></login-form>

      <!-- 通知按钮 -->
      <v-btn v-if="user" to="/notifications" text rounded small>
        <v-icon small>mdi-bell</v-icon>
      </v-btn>
      <!-- 私信按钮 -->
      <v-btn v-if="user" to="/message" text rounded small>
        <v-icon small>mdi-comment-multiple</v-icon>
      </v-btn>

      <!-- 个人中心 -->
      <v-menu v-if="logined" open-on-hover offset-y>
        <template v-slot:activator="{ on, attrs }">
          <router-link :to="{ name: 'user', params: { id: user.id } }">
            <v-btn rounded text v-bind="attrs" v-on="on">
              <v-avatar size="33" class="mr-1">
                <img :src="user.headerUrl" />
              </v-avatar>
              <span>{{ user.username }}</span>
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
      <v-row v-if="user" class="my-2">
        <v-col class="d-flex justify-center">
          <v-avatar size="100"><img :src="user.headerUrl" /></v-avatar>
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
    <v-snackbar
      v-model="snackbar"
      centered
      timeout="2000"
      color="snackBarColor"
    >
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </nav>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import RegisterForm from "@/components/RegisterForm.vue";
import { HOST, post } from "@/utils";
import { LOGOUT, setQuery } from "@/store/mutation-type";
export default {
  name: "NavBar",
  components: {
    LoginForm,
    RegisterForm,
  },
  data() {
    return {
      open: false,
      query: "",
      HOST: HOST,
    };
  },

  computed: {
    user() {
      return this.$store.state.user;
    },
    logined() {
      return this.user;
    },
    snackbar: {
      get() {
        return this.$store.state.messageBar;
      },
      set(newVal) {
        return (this.$store.state.messageBar = newVal);
      },
    },
    snackBarColor() {
      return this.$store.state.messageLevel;
    },
    message() {
      return this.$store.state.info;
    },
    items() {
      let tmp = [{ title: "首页", icon: "mdi-home", route: "/" }];
      if (this.$store.state.user) {
        tmp.push(
          {
            title: "个人中心",
            icon: "mdi-account",
            route: `/user/${this.user.id}`,
          },
          {
            title: "私信",
            icon: "mdi-comment-multiple",
            route: "/message",
          },
          {
            title: "通知",
            icon: "mdi-bell",
            route: { name: "notifyComment" },
          },
          { title: "设置", icon: "mdi-cog", route: "/setting" }
        );
      }
      return tmp;
    },
  },
  methods: {
    logout() {
      post("logout", null, () => this.$store.commit(LOGOUT));
    },
    search() {
      this.$router.push("/");
      this.$store.commit(setQuery, this.query);
    },
  },
};
</script>

<style>
a {
  color: black !important;
  text-decoration: none;
}
.no-border {
  border: none;
}
em {
  background-color: #d1c4e9;
  font-style: normal;
}
</style>
