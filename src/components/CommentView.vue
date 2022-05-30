<template>
  <div>
    <comment-item
      :comment="commentVO.comment"
      :user="commentVO.user"
      @like="updateLike(commentVO.comment)"
      @showReply="showReply(commentVO.user)"
    >
    </comment-item>
    <v-list-item v-show="commentVO.secondComments != null || show">
      <v-list-item-avatar></v-list-item-avatar>
      <v-list-item-content>
        <comment-item
          v-for="(subCommentVo, index) in commentVO.secondComments"
          :key="index"
          :comment="subCommentVo.secondComment"
          :user="subCommentVo.user"
          :targetUser="subCommentVo.targetUser"
          @like="updateLike(subCommentVo.secondComment)"
          @showReply="showReply(subCommentVo.user)"
        >
        </comment-item>
        <!-- 回复框 -->
        <v-list-item v-show="show">
          <v-list-item-avatar>
            <img :src="user.headerUrl" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-textarea
              v-model="content"
              solo
              outlined
              rows="2"
              hide-details
              :placeholder="placeholder"
            ></v-textarea>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn
              @click="publish"
              block
              color="primary"
              max-height="66"
              min-height="66"
            >
              发布
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>
    
<script>
import CommentItem from "@/components/CommentItem.vue";
import { dateFormat } from "@/utils";
export default {
  components: {
    CommentItem,
  },
  props: { commentVO: Object, updateLike: Function, publishSub: Function },
  data() {
    return { show: false, target: null, placeholder: "", content: "" };
  },
  methods: {
    dateFormat,
    showReply(target) {
      if (this.show && target === this.target) {
        this.show = false;
      } else {
        this.show = true;
        this.target = target;
        this.placeholder = `回复 @${target.username}:`;
      }
    },
    publish() {
      alert("test");
      let toPub = {
        id: 999,
        content: this.content,
        like: false,
        likeNum: 0,
        gmtCreate: new Date(),
      };
      this.publishSub(
        this.commentVO.secondComments,
        toPub,
        this.user,
        this.target
      );
      alert("test");
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>