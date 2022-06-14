<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card v-if="!loading" class="mt-3 mb-6">
          <v-img
            height="200px"
            class="align-end"
            src="https://cdn.luogu.org/images/bg/fe/DSCF0530-shrink.jpg"
          >
            <v-card-title class="white--text mt-8 align-center">
              <v-avatar size="60">
                <img alt="头像" :src="profile.user.headerUrl" />
              </v-avatar>
              <span class="ml-3">{{ profile.user.username }}</span>
              <v-spacer></v-spacer>
              <v-btn
                v-if="!user"
                @click="jumpToChat"
                color="rgba(0, 0, 0, 0.2)"
                class="mr-3 white--text"
              >
                私信
              </v-btn>
              <follow-btn
                :followed="profile.followed"
                :uid="profile.user.id"
                @follow="follow"
              ></follow-btn>
            </v-card-title>
          </v-img>

          <v-card-text class="py-0">
            <v-row no-gutters justify="space-between">
              <v-col>
                <v-tabs v-model="select">
                  <v-tab
                    v-for="(route, index) in routes"
                    @click="jumpTo(route.path)"
                    :key="'tab' + index"
                  >
                    {{ route.text }}
                  </v-tab>
                </v-tabs>
              </v-col>
              <v-spacer></v-spacer>
              <v-col class="d-flex justify-end" align-self="center">
                <v-btn
                  @click="jumpToFollow('followee')"
                  class="pa-0 ma-0 d-none d-sm-flex"
                  plain
                  :ripple="false"
                >
                  <div>关注<br />{{ profile.followeeNum }}</div>
                </v-btn>
                <v-btn
                  @click="jumpToFollow('follower')"
                  :to="`/user/${observedUid}/follow#follower`"
                  class="pa-0 ma-0 d-none d-sm-flex"
                  plain
                  :ripple="false"
                >
                  <div>粉丝<br />{{ profile.followerNum }}</div>
                </v-btn>
                <v-btn class="pa-0 ma-0 d-none d-sm-flex" plain :ripple="false">
                  <div>点赞<br />{{ profile.likeNum }}</div>
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
import { get } from "@/utils";
import FollowBtn from "@/components/FollowBtn.vue";
export default {
  components: { FollowBtn },
  data() {
    let observedUid = this.$route.params.id;
    return {
      profile: null,
      observedUid,
      routes: [
        {
          text: "动态",
          path: `/user/${observedUid}/timeLine`,
        },
        { text: "关注", path: `/user/${observedUid}/follow#followee` },
      ],
      select: null,
      loading: true,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    jumpTo(route) {
      this.$router.push(route);
    },
    jumpToChat() {
      if (this.user && this.observedUid !== this.user.id)
        this.$router.push({
          name: "chat",
          query: { uid: this.profile.user.id },
        });
    },
    jumpToFollow(hash) {
      this.select = 1;
      this.$router.push(`/user/${this.observedUid}/follow#${hash}`);
    },
    follow(followed) {
      this.profile.followed = followed;
      this.profile.followerNum += followed ? 1 : -1;
    },
    fetchData() {
      get(`user/${this.observedUid}`, (data) => {
        this.profile = data;
        this.loading = false;
      });
    },
  },
  watch: {
    user(newVal) {
      if (newVal) this.fetchData();
      else this.profile.followed = false;
    },
  },
  created() {
    this.loading = true;
    this.fetchData();
  },
};
</script>

<style scoped>
</style>