<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="mt-3 mb-6">
          <v-img
            height="200px"
            class="align-end"
            src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
          >
            <!-- src="https://cdn.luogu.com.cn/upload/usericon/8457.png" -->
            <v-card-title class="white--text mt-8 align-center">
              <v-avatar size="60">
                <img alt="头像" :src="profile.user.headerUrl" />
              </v-avatar>
              <span class="ml-3">{{ profile.user.username }}</span>
              <v-spacer></v-spacer>
              <v-btn
                :to="{ name: 'chat', query: { uid: profile.user.id } }"
                color="rgba(0, 0, 0, 0.2)"
                class="mr-3 white--text"
              >
                私信
              </v-btn>
              <v-btn
                v-if="profile.isFollowed"
                color="rgba(0, 0, 0, 0.2)"
                class="white--text"
              >
                已关注
              </v-btn>
              <v-btn v-else color="primary">
                <v-icon small>mdi-plus</v-icon>关注
              </v-btn>
            </v-card-title>
          </v-img>

          <v-card-text class="py-0">
            <v-row no-gutters justify="space-between">
              <v-col>
                <v-tabs>
                  <v-tab
                    v-for="route in routes"
                    :key="route.text"
                    :to="route.path"
                  >
                    {{ route.text }}
                  </v-tab>
                </v-tabs>
              </v-col>
              <v-spacer></v-spacer>
              <v-col class="d-flex justify-end" align-self="center">
                <v-btn class="pa-0 ma-0" plain :ripple="false">
                  <div>点赞<br />{{ profile.likeNum }}</div>
                </v-btn>
                <v-btn class="pa-0 ma-0" plain :ripple="false">
                  <div>关注<br />{{ profile.followeeNum }}</div>
                </v-btn>
                <v-btn class="pa-0 ma-0" plain :ripple="false">
                  <div>粉丝<br />{{ profile.followerNum }}</div>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getFetch, HOST } from "@/utils";
export default {
  data() {
    return {
      routes: [
        { text: "动态", path: { name: "user", params: { id: 1 } } },
        { text: "关注", path: { name: "follow", params: { id: 1 } } },
      ],

      profile: null,
    };
  },
  computed: {
    follow() {
      return this.profile.isFollowed ? "已关注" : "关注";
    },
  },
  methods: {
    jumpTo(route) {
      this.$router.push(route);
    },
    fetchData() {
      getFetch(HOST + `user/${this.$route.params.id}`)
        .then((resp) => resp.json())
        .then((resp) => {
          if (resp.code == 200) {
            this.profile = resp.data;
          }
        });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.white-border {
  border: 1em solid white;
}
</style>