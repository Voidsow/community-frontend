<template>
  <div>
    <comment-item
      :comment="comment"
      @like="$emit('updateLike', comment)"
      @showReply="showReply(null)"
    >
    </comment-item>
    <v-list-item v-show="comment.subComments.length > 0 || show">
      <v-list-item-avatar></v-list-item-avatar>
      <v-list-item-content>
        <comment-item
          v-for="(subComment, index) in comment.subComments"
          :key="index"
          :comment="subComment"
          @like="$emit('updateLike', subComment)"
          @showReply="showReply(subComment)"
        >
        </comment-item>
        <!-- 回复框 -->
        <comment-box
          :show="show"
          :targetComment="comment"
          :targetUser="targetUser"
          :atComment="atComment"
          @publish="pubSub"
        ></comment-box>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>
    
<script>
import CommentItem from "@/components/CommentItem.vue";
import CommentBox from "@/components/CommentBox.vue";
import { dateFormat } from "@/utils";
export default {
  components: {
    CommentItem,
    CommentBox,
  },
  props: {
    comment: Object,
    pubSub: Function,
    //焦点，失去焦点时应该自动关闭box
    show: Boolean,
  },
  emit: ["click", "pubSub", "updateLike"],
  data() {
    return {
      targetUser: null,
      atComment: null,
      replyTo: "",
    };
  },
  methods: {
    dateFormat,
    showReply(target) {
      this.atComment = target;
      if (target != null) this.targetUser = target.user;
      this.$emit("click");
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    logined() {
      return this.user !== null;
    },
  },
};
</script>