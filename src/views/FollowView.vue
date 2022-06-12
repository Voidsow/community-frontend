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
      <v-list-item v-if="users.length === 0" dense> TA还没有关注用户哦~ </v-list-item>
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
import { getFetch, HOST } from "@/utils";
export default {
  components: { ClickableSpan },
  created() {
    this.state = this.$route.hash.substring(1, this.$route.hash.length);
  },
  data() {
    return {
      followers: [
        {
          id: 1,
          headerUrl: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          username: "Taro",
        },
        {
          id: 2,
          headerUrl: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          username: "Jack",
        },
      ],
      followees: [
        {
          id: 2,
          headerUrl: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          username: "Jack",
        },
        {
          id: 3,
          headerUrl: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          username: "Minato",
        },
      ],
      users: null,

      FOLLOWEE: "followee",
      FOLLOWER: "follower",
      state: null,
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
  },
  methods: {
    fetchData() {
      this.loading = true;
      getFetch(
        HOST +
          `user/${this.observedUid}/${this.state}?page=${this.page}&pageSize=${this.pageSize}`
      )
        .then((resp) => resp.json())
        .then((resp) => {
          if (resp.code === 200) {
            alert(200);
            this.users = resp.data.users;
            this.pageSum = Math.ceil(resp.data.num);
          }
        });
      this.loading = false;
    },
  },
  watch: {
    state() {
      this.fetchData();
    },
  },
};
</script>