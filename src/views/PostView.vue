<template>
  <v-container class="post mt-6">
    <v-row v-if="!loading">
      <v-spacer></v-spacer>
      <v-col cols="12" sm="10" md="9">
        <v-card class="my-2">
          <v-list>
            <v-list-item>
              <router-link
                :to="{ name: 'user', params: { id: author.user.id } }"
              >
                <v-list-item-avatar>
                  <v-img :src="author.user.headerUrl"></v-img>
                </v-list-item-avatar>
              </router-link>
              <v-list-item-content>
                <v-list-item-title>
                  <router-link
                    :to="{ name: 'user', params: { id: author.user.id } }"
                  >
                    {{ author.user.username }}
                  </router-link>
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ dateFormat(post.gmtCreate) }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <follow-btn
                  @follow="follow"
                  :followed="author.followed"
                  :uid="author.user.id"
                ></follow-btn>
              </v-list-item-action>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item class="py-2">{{ post.content }}</v-list-item>
            <v-divider></v-divider>
            <v-list-item dense>
              <clickable-span
                class="mr-3"
                :activate="post.like"
                icon="mdi-thumb-up"
                color="primary"
                :text="post.likeNum"
                @click="likeOrNot(post, POST)"
              >
              </clickable-span>
              <clickable-span
                icon="mdi-comment"
                color="primary"
                :text="post.commentNum"
              >
              </clickable-span>
            </v-list-item>
          </v-list>
        </v-card>
        <v-card>
          <v-list>
            <v-subheader>评论</v-subheader>
            <!-- 评论框 -->
            <comment-box
              show
              :targetComment="null"
              :targetUser="null"
              :atComment="null"
              @publish="pubComment"
            ></comment-box>

            <!-- 评论列表 -->
            <template v-for="(comment, index) in comments">
              <comment-view
                :comment="comment"
                :key="comment.id"
                :pubSub="pubSubComment(comment.subComments)"
                :show="focus == comment.id"
                @updateLike="likeComment"
                @click="focus = comment.id"
              ></comment-view>
              <v-divider
                v-if="index < comments.length - 1"
                :key="'d' + index"
                inset
              ></v-divider>
            </template>
          </v-list>
        </v-card>
        <v-pagination
          v-if="comments.length !== 0"
          v-model="page"
          :length="length"
          :total-visible="pageNum"
          class="my-2"
        ></v-pagination>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import CommentView from "@/components/CommentView.vue";
import CommentBox from "@/components/CommentBox.vue";
import ClickableSpan from "@/components/ClickableSpan.vue";
import FollowBtn from "@/components/FollowBtn.vue";
import { dateFormat, HOST, postFetch } from "@/utils";
export default {
  components: {
    CommentView,
    ClickableSpan,
    CommentBox,
    FollowBtn,
  },
  data: () => ({
    post: null,
    comments: null,
    author: null,

    devCounter: 100000,
    commentText: "",
    subCommentText: "",
    page: 1,
    length: -1,
    pageSize: 10,
    pageNum: 7,
    // 需要显示的评论框
    focus: -1,
    loading: false,

    POST: 0,
    COMMENT: 1,
  }),
  created() {
    this.fetchData();
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    pid() {
      return this.$route.params.id;
    },
  },
  watch: {
    //登录后马上重新请求数据以更新点赞信息
    user() {
      this.fetchData();
    },
  },
  methods: {
    pubComment(comment) {
      this.post.commentNum += 1;
      this.comments.push(comment);
    },
    likeOrNot(entity, type) {
      postFetch(HOST + "like", { type, id: entity.id })
        .then((resp) => resp.json())
        .then((resp) => {
          if (resp.code === 200) {
            entity.likeNum = resp.data.num;
            entity.like = resp.data.like;
          }
        });
    },
    follow(followed) {
      this.author.followed = followed;
    },
    likeComment(entity) {
      this.likeOrNot(entity, this.COMMENT, entity.id);
    },
    pubSubComment(subComments) {
      return (comment) => subComments.push(comment);
    },
    fetchData() {
      this.loading = true;
      fetch(HOST + `post/${this.pid}/?page=${this.page}&size=${this.pageSize}`)
        .then((resp) => resp.json())
        .then((resp) => {
          let data = resp.data;
          data.post.gmtCreate = new Date(data.post.gmtCreate);
          data.comments.forEach((comment) => {
            comment.gmtCreate = new Date(comment.gmtCreate);
            // 防止之后push空数组
            if (comment.subComments === null) comment.subComments = [];
            else
              comment.subComments.forEach((subComment) => {
                subComment.gmtCreate = new Date(subComment.gmtCreate);
              });
          });
          this.comments = data.comments;
          this.post = data.post;
          this.author = data.author;
          this.length = data.lastPage;
          this.loading = false;
        });
    },
    dateFormat,
  },
};
</script>