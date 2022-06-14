<template>
  <v-card>
    <v-list v-if="!loading" two-line>
      <v-subheader class="font-weight-regular">
        <clickable-span
          @click="state = FOLLOWEE"
          text="TA关注的人"
          :activate="state === FOLLOWEE"
          color="primary"
          class="mr-2"
        ></clickable-span>
        <clickable-span
          @click="state = FOLLOWER"
          :activate="state === FOLLOWER"
          text="关注TA的人"
          color="primary"
        ></clickable-span>
      </v-subheader>
      <v-divider></v-divider>

      <template v-for="(userDTO, index) in users">
        <v-list-item :key="`li${index}`">
          <router-link :to="{ name: 'user', params: { id: userDTO.user.id } }">
            <v-list-item-avatar size="50">
              <img :src="userDTO.user.headerUrl" />
            </v-list-item-avatar>
          </router-link>
          <v-list-item-content>
            <router-link
              :to="{ name: 'user', params: { id: userDTO.user.id } }"
            >
              <v-list-item-title
                v-text="userDTO.user.username"
              ></v-list-item-title>
            </router-link>
            <v-list-item-subtitle>
              <router-link :to="`/user/${userDTO.user.id}/follow#followee`">
                <span class="mr-3">关注 {{ userDTO.followeeNum }}</span>
              </router-link>
              <router-link :to="`/user/${userDTO.user.id}/follow#follower`">
                <span class="mr-3">粉丝 {{ userDTO.followerNum }}</span>
              </router-link>
              <span>点赞 {{ userDTO.likeNum }}</span>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn color="primary"><v-icon small>mdi-plus</v-icon>关注</v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider
          v-if="index < users.length - 1"
          :key="'d' + index"
          inset
        ></v-divider>
      </template>
      <v-list-item v-if="users.length === 0" dense>{{ nullTip }} </v-list-item>
    </v-list>
    <v-pagination
      v-show="pageSum > 1"
      v-model="page"
      :total-visible="pageNum"
      :length="pageSum"
    ></v-pagination>
  </v-card>
</template>

<script>
import ClickableSpan from "@/components/ClickableSpan.vue";
import { get } from "@/utils";
export default {
  components: { ClickableSpan },
  data() {
    return {
      followers: [],
      followees: [],
      users: [],

      FOLLOWEE: "followee",
      FOLLOWER: "follower",
      state: this.$route.hash.substring(1, this.$route.hash.length),
      page: 1,
      pageSize: 5,
      pageNum: 5,
      pageSum: null,

      loading: false,
    };
  },
  computed: {
    observedUid() {
      return this.$route.params.id;
    },
    nullTip() {
      return this.state === "followee"
        ? "TA还没有关注的人哦~"
        : "暂时还没有关注人TA哦~";
    },
  },
  methods: {
    fetchData() {
      this.loading = true;
      get(
        `user/${this.observedUid}/${this.state}?page=${this.page}&pageSize=${this.pageSize}`,
        (data) => {
          this.users = data.users;
          this.pageSum = Math.ceil(data.num);
        }
      );
      this.loading = false;
    },
  },
  watch: {
    state() {
      window.location.hash = this.state;
      this.fetchData();
    },
  },
};
</script>