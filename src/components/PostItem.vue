<template>
  <!-- <v-btn text block x-large > -->
  <!-- </v-btn> -->
  <v-card flat class="py-5">
    <v-row>
      <!-- 左侧头像 -->
      <v-col cols="2" sm="1" class="pt-1 px-sm-1 px-md-1 px-lg-4 px-xl-6"> 
        <v-avatar size="35" color="grey" >
          <router-link :to="`/user/${post.uid}`">
            <img :src="`/user/${post.uid}/header`" />
          </router-link>
        </v-avatar>
      </v-col>
      <!-- 中间内容 -->
      <v-hover v-slot="{ hover }">
        <v-col cols="8" sm="10" :class="{ 'on-hover': hover }">
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
              <span class="d-inline text-truncate" style="max-width: 600px">
                {{ post.content }}
              </span>
            </v-row>
          </router-link>
        </v-col>
      </v-hover>

      <!-- 右边操作栏 -->
      <v-col cols="2" sm="1" >
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
// import { setPost } from '@/store/mutation-type';
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
    setPost(e) {
      console.log(e.target);
      // this.$store.commit(setPost,this.post);
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
a {
  color: black !important;
  text-decoration: none;
}
.on-hover {
  cursor: pointer;
}
</style>