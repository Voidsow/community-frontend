<template>
  <v-card v-if="!loading">
    <v-list three-line>
      <template v-for="(notification, index) in notifications">
        <v-list-item :key="`n${index}`">
          <router-link
            :to="{ name: 'user', params: { id: notification.user.id } }"
          >
            <v-list-item-avatar color="grey">
              <img :src="notification.user.headerUrl" />
            </v-list-item-avatar>
          </router-link>
          <v-list-item-content>
            <v-list-item-title>
              <router-link
                :to="{ name: 'user', params: { id: notification.user.id } }"
              >
                <span class="primary--text">
                  {{ notification.user.username }}
                </span>
              </router-link>
              回复了你的{{ ENTITY[notification.type] }} ·
              {{ dateFormat(notification.time) }}
            </v-list-item-title>
            <v-list-item-subtitle class="my-1">
              <div class="my-2 text-subtitle-1 font-weight-bold">回复：{{ notification.reply }}</div>
              <div class="quote primary--text">
                <router-link :to="`/post/${notification.postId}`">
                  {{ notification.replied }}
                </router-link>
              </div>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="`d-sub-${index}`"></v-divider>
      </template>
      <v-list-item v-if="notifications.length === 0">
        暂时还没有新消息哦~
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { dateFormat, getFetch, HOST } from "@/utils";
export default {
  data() {
    return {
      notifications: [],

      loading: false,
      ENTITY: ["帖子", "评论"],
    };
  },
  methods: {
    dateFormat,
    fetchData() {
      this.loading = true;
      getFetch(HOST + "notification/comment")
        .then((resp) => resp.json())
        .then((resp) => {
          if (resp.code === 200) {
            resp.data.forEach(
              (notification) =>
                (notification.time = new Date(notification.time))
            );
            this.notifications = resp.data;
            this.loading = false;
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
.quote {
  border-left: 5cm black;
}
</style>