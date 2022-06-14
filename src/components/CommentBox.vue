<template>
  <v-list-item v-show="show">
    <v-list-item-avatar>
      <img :src="header" />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-textarea
        :disabled="!logined"
        v-model="content"
        solo
        outlined
        rows="2"
        hide-details
        :placeholder="placeholder"
      ></v-textarea>
    </v-list-item-content>
    <v-list-item-action>
      <v-tooltip v-model="success" top>
        <template v-slot:activator="{ attrs }">
          <v-btn
            @click="publish"
            v-bind="attrs"
            block
            :disabled="!logined"
            color="primary"
            max-height="66"
            min-height="66"
          >
            发布
          </v-btn>
        </template>
        <span>发布成功</span>
      </v-tooltip>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import {post } from "@/utils";
export default {
  props: {
    show: Boolean,
    //二级回复从属的一级评论
    targetComment: Object,
    //如果回复的是二级评论，需要记录被回复的用户
    atComment: Object,
    targetUser: Object,
  },
  emit: ["publish"],
  data() {
    return {
      content: "",

      success: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    logined() {
      return this.user !== null;
    },
    placeholder() {
      if (this.logined) {
        if (this.targetComment !== null)
          return `回复 @${
            this.targetUser === null
              ? this.targetComment.user.username
              : this.targetUser.username
          } :`;
        else return "发表你的看法";
      } else return "请先登录";
    },
    header() {
      return this.logined ? this.user.headerUrl : "/unloginHeader.png";
    },
  },
  methods: {
    publish() {
      let data = { pid: this.$route.params.id, content: this.content };
      //回复评论不为空，表示发表的是一级评论
      let isSub = this.targetComment != null;
      let replyToSub = this.targetUser != null;
      if (isSub) {
        //被回复对象为二级评论，还需要记录被回复用户
        if (replyToSub) {
          data.replyToUid = this.targetUser.id;
          data.atCommentId = this.atComment.id;
        }
        data.replyTo = this.targetComment.id;
      }
      post("comment", data, (data) => {
        let comment = data;
        comment.user = this.user;
        comment.gmtCreate = new Date(comment.gmtCreate);
        if (!isSub) {
          comment.subComments = [];
        } else if (replyToSub) comment.target = this.targetUser;
        this.success = true;
        setTimeout(() => (this.success = false), 1000);
        this.$emit("publish", comment);
        this.content = "";
      });
    },
  },
};
</script>