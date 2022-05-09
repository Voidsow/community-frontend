<template>
  <!-- <v-btn text block x-large > -->
  <!-- </v-btn> -->
  <v-card class="px-2 px-md-4 py-5 no-border" flat min-height="70">
    <v-row align-content="center">
      <!-- 左侧头像 -->
      <v-col cols="1" class="pa-0 mx-0" align-self="start">
        <v-avatar size="35" color="grey" class="mx-0">
          <router-link :to="`/user/${post.uid}`">
            <img :src="`/user/${post.uid}/header`" />
          </router-link>
        </v-avatar>
      </v-col>
      <!-- 中间内容 -->
      <v-hover v-slot="{ hover }">
        <v-col :class="{ 'on-hover': hover }">
          <router-link :to="`/post/${post.id}`">
            <v-row class="text-subtitle-2 black--text text--darken-2">
              {{ post.title }}
            </v-row>
            <v-row class="text-caption grey--text">
              <router-link :to="`/user/${post.uid}`">
                用户{{ post.uid }}
              </router-link>
              发布于 {{ dateFormat(post.gmtCreate) }}
            </v-row>
            <v-row class="text-caption grey--text text--darken-1">
              <span class="d-inline text-truncate" style="max-width: 500px">
                {{ post.content }}
              </span>
            </v-row>
          </router-link>
        </v-col>
      </v-hover>

      <v-spacer></v-spacer>
      <!-- 右边操作栏 -->
      <v-col cols="1" class="mr-0 pr-0">
        <v-row>
          <v-btn text x-small>
            <v-icon small>mdi-comment-outline</v-icon>{{ post.commentNum }}
          </v-btn>
        </v-row>
        <v-row>
          <v-btn v-bind="style" text x-small @click.stop="thumbUp">
            <v-icon small>mdi-thumb-up-outline</v-icon>
            {{ post.likeNum }}&nbsp;&nbsp;
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { dateFormat } from "@/utils";
export default {
  name: "PostItem",
  props: { post: Object },
  data() {
    return {
      like: false,
      normal: { text: true },
      active: { color: "primary" },
    };
  },
  methods: {
    dateFormat,
    thumbUp() {
      this.like = !this.like;
    },
  },
  computed: {
    style() {
      return this.like ? this.active : this.normal;
    },
  },
};
</script>

<style>
.no-border {
  border: none;
}
.no-border:hover {
  background-color: rgb(238, 238, 238);
}
a {
  color: black !important;
  text-decoration: none;
}
.on-hover {
  cursor: pointer;
}
</style>