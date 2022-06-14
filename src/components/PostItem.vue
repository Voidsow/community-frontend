<template>
  <v-card flat class="py-5">
    <v-row>
      <!-- 左侧头像 -->
      <v-col cols="2" sm="1" class="pt-1 px-sm-1 px-md-1 px-lg-4 px-xl-6">
        <router-link :to="`/user/${user.id}`">
          <v-avatar size="35" color="grey">
            <img :src="user.headerUrl" />
          </v-avatar>
        </router-link>
      </v-col>
      <!-- 中间内容 -->
      <v-hover v-slot="{ hover }">
        <v-col cols="8" sm="10" :class="{ 'on-hover': hover }">
          <router-link :to="`/post/${post.id}`">
            <v-row
              v-html="post.title"
              class="text-subtitle-2 black--text text--darken-2"
            >
            </v-row>
            <v-row class="text-caption grey--text">
              <span>
                <router-link :to="`/user/${user.id}`">
                  {{ user.username }}
                </router-link>
                发布于 {{ dateFormat(post.gmtCreate) }}
              </span>
            </v-row>
            <v-row class="text-caption grey--text text--darken-1">
              <span
                v-html="post.content"
                class="d-inline text-truncate"
                style="max-width: 600px"
              >
              </span>
            </v-row>
          </router-link>
        </v-col>
      </v-hover>

      <!-- 右边操作栏 -->
      <v-col cols="2" sm="1">
        <v-row>
          <v-btn text x-small plain :ripple="false">
            <v-icon small>mdi-comment-outline</v-icon>{{ post.commentNum }}
          </v-btn>
        </v-row>
        <v-row>
          <v-btn
            v-bind="style"
            text
            x-small
            @click="like"
            plain
            :ripple="false"
          >
            <v-icon v-if="post.like" small>mdi-thumb-up</v-icon>
            <v-icon v-else small>mdi-thumb-up-outline</v-icon>
            {{ post.likeNum }}
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { dateFormat, post, POST } from "@/utils";
export default {
  name: "PostItem",
  props: { post: Object, user: Object },
  emit: ["like"],
  created() {},
  data() {
    return {
      normal: { text: true },
      active: { color: "primary" },
    };
  },
  methods: {
    like() {
      post(
        "like",
        {
          type: POST,
          id: this.post.id,
        },
        (data) => {
          this.$emit("like", {
            likeNum: data.num,
            like: data.like,
            post: this.post,
          });
        }
      );
    },
    dateFormat,
  },
  computed: {
    style() {
      return this.post.like ? this.active : this.normal;
    },
  },
};
</script>

<style>
.on-hover {
  cursor: pointer;
}
</style>