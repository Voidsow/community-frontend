<template>
  <v-card>
    <v-list v-if="!loading">
      <template v-for="(like, index) in likes">
        <v-list-item :key="`n${index}`" two-line>
          <router-link :to="`/user/${like.user.id}`">
            <v-list-item-avatar color="grey">
              <img :src="like.user.headerUrl" />
            </v-list-item-avatar>
          </router-link>
          <v-list-item-content>
            <v-list-item-title>
              <span>
                <router-link :to="`/user/${like.user.id}`">
                  <span class="font-weight-bold">{{ like.user.username }}</span>
                </router-link>
                赞了你的{{ entity(like.type) }}&nbsp;
              </span>
              <router-link :to="`/post/${like.postId}`">
                <span class="primary--text">{{ like.content }}</span>
              </router-link>
              <span></span>
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ dateFormat(like.time) }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider
          inset
          :key="`d${index}`"
          v-if="index < likes.length - 1"
        ></v-divider>
      </template>
      <v-list-item v-if="likes.length === 0"> 暂时还没有新消息哦~ </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { dateFormat, get, POST } from "@/utils";
export default {
  data() {
    return {
      likes: [],

      loading: false,
    };
  },
  methods: {
    dateFormat,
    entity(type) {
      return type === POST ? "帖子" : "评论";
    },
    fetchData() {
      this.loading = true;
      get("notification/like", (data) => {
        this.likes = data;
        this.likes.forEach((like) => (like.time = new Date(like.time)));
        this.loading = false;
      });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
</style>