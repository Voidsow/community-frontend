<template>
  <v-list-item class="father">
    <router-link :to="userRoute(user.id)" class="mr-5 ml-3 child">
      <v-row justify="start">
        <v-avatar size="40"> <img :src="user.headerUrl" /> </v-avatar>
      </v-row>
    </router-link>

    <v-list-item-content class="content">
      <v-list-item-subtitle>
        <router-link :to="userRoute(user.id)">
          <b> {{ user.username }}</b>
        </router-link>
      </v-list-item-subtitle>
      <div>
        <router-link v-if="targetUser != null" :to="userRoute(targetUser.id)">
          回复 <span class="blue--text">@{{ targetUser.username }} :</span>
        </router-link>
        {{ comment.content }}
      </div>

      <!-- 操作栏 -->
      <v-row no-gutters class="grey--text text--darken-1">
        <v-col cols="6" sm="4" lg="3">
          {{ dateFormat(comment.gmtCreate) }}
        </v-col>

        <!-- 点赞按钮 -->
        <v-col cols="2" md="1">
          <clickable-span
            :activate="comment.like"
            @click="$emit('like')"
            color="primary"
            icon="mdi-thumb-up"
            :text="comment.likeNum"
          >
          </clickable-span>
        </v-col>

        <!-- 评论按钮 -->

        <v-col cols="3" lg="2">
          <clickable-span
            @click="$emit('showReply')"
            color="primary"
            icon="mdi-comment-outline"
            text="回复"
          >
          </clickable-span>
        </v-col>
      </v-row>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { dateFormat } from "@/utils";
import ClickableSpan from "@/components/ClickableSpan.vue";
export default {
  components: {
    ClickableSpan,
  },
  props: { comment: Object, user: Object, targetUser: Object },
  emit: ["like", "showReply"],
  data() {
    return {};
  },
  methods: {
    dateFormat,
    userRoute(uid) {
      return { name: "user", params: { id: uid } };
    },
  },
};
</script>

<style scoped>
.father {
  position: relative;
}
.child {
  position: absolute;
  top: 25px;
}
.content {
  margin-left: 50px;
}
</style>