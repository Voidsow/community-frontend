<template>
  <v-container class="post mt-6">
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="10" md="9">
        <v-card class="my-2">
          <v-list>
            <v-list-item>
              <router-link :to="{ name: 'user', params: { id: user.id } }">
                <v-list-item-avatar>
                  <v-img :src="user.headerUrl"></v-img>
                </v-list-item-avatar>
              </router-link>
              <v-list-item-content>
                <v-list-item-title>
                  <router-link :to="{ name: 'user', params: { id: user.id } }">
                    {{ user.username }}
                  </router-link>
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ dateFormat(post.gmtCreate) }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn color="primary">关注TA</v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item class="py-5">{{ post.content }}</v-list-item>
            <v-divider></v-divider>
            <v-list-item dense>
              <clickable-span
                class="mr-3"
                :activate="post.like"
                icon="mdi-thumb-up"
                color="primary"
                :text="post.likeNum"
                @click="likeOrNot"
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
            <v-list-item>
              <v-list-item-content>
                <v-row dense>
                  <v-col cols="2" sm="1" class="mr-sm-2">
                    <v-avatar>
                      <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg" />
                    </v-avatar>
                  </v-col>
                  <v-col>
                    <v-textarea
                      v-model="commentText"
                      rows="2"
                      solo
                      outlined
                      autofocus
                      placeholder="发表你的看法"
                    >
                    </v-textarea>
                  </v-col>
                  <v-col cols="3" sm="2">
                    <v-btn
                      @click="pubComment"
                      color="primary"
                      class="white--text"
                      min-height="66"
                      max-height="66"
                      >发表<br />评论</v-btn
                    >
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>

            <!-- 评论列表 -->
            <template v-for="(commentVo, index) in comments">
              <comment-view
                :commentVO="commentVo"
                :key="commentVo.comment.id"
                :updateLike="likeComment"
                :publishSub="pubSubComment"
              ></comment-view>
              <v-divider
                v-if="index != comments.length - 1"
                :key="'d' + index"
                inset
              ></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import CommentView from "@/components/CommentView.vue";
import { dateFormat } from "@/utils";
import ClickableSpan from "@/components/ClickableSpan.vue";
import { incrPostLike } from "@/store/mutation-type";
export default {
  components: {
    CommentView,
    ClickableSpan,
  },
  data: () => ({
    comments: [
      {
        comment: {
          id: 1,
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione error minima dolor unde sint temporibus ipsum ea! Voluptatibus reiciendis quos molestiae, aliquid sunt, quibusdam sit, a sequi corrupti voluptate veniam.",
          gmtCreate: new Date(),
          like: false,
          likeNum: 0,
          commentNum: 0,
        },
        user: {
          id: 1,
          headerUrl: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          username: "Taro",
        },
        secondComments: [
          {
            secondComment: {
              id: 4,
              content: "Jack 回复 Taro",
              like: false,
              likeNum: 0,
              gmtCreate: new Date(),
            },
            user: {
              id: 2,
              headerUrl: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
              username: "Jack",
            },
          },
          {
            secondComment: {
              id: 5,
              content: "Minato 回复 Jack",
              like: false,
              likeNum: 0,
              gmtCreate: new Date(),
            },
            user: {
              id: 3,
              headerUrl: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
              username: "Minato",
            },
            targetUser: {
              id: 2,
              headerUrl: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
              username: "Jack",
            },
          },
        ],
      },
      {
        comment: {
          id: 2,
          content: "this is the comment1",
          gmtCreate: new Date(),
          like: false,
          likeNum: 0,
          commentNum: 0,
        },
        user: {
          id: 2,
          headerUrl: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          username: "Jack",
        },
        secondComments: [
          {
            secondComment: {
              id: 6,
              content: "Taro 回复 Jack",
              like: false,
              likeNum: 0,
              gmtCreate: new Date(),
            },
            user: {
              id: 1,
              headerUrl: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
              username: "Taro",
            },
          },
        ],
      },
      {
        comment: {
          id: 3,
          content: "this is the comment2",
          gmtCreate: new Date(),
          like: false,
          likeNum: 0,
          commentNum: 0,
        },
        user: {
          id: 3,
          headerUrl: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          username: "Minato",
        },
      },
    ],
    author: {
      id: 1,
      headerUrl: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
      username: "Taro",
    },
    devCounter: 100000,
    commentText: "",
    subCommentText: "",
    like: false,
  }),

  computed: {
    post() {
      return this.$store.state.post;
    },
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    pubComment() {
      this.comments.push({
        comment: {
          id: this.devCounter++,
          content: this.commentText,
          gmtCreate: new Date(),
          likeNum: 0,
          commentNum: 0,
        },
        user: this.$store.state.user,
      });
    },
    likeOrNot() {
      this.$store.commit(incrPostLike);
    },
    dateFormat,
    likeComment(comment) {
      comment.likeNum += comment.like ? -1 : 1;
      comment.like = !comment.like;
    },
    pubSubComment(subComments, reply, user, targetUser) {
      // alert("inPubSubComment")
      subComments.push({
        secondComment: reply,
        user,
        targetUser,
      });
    },
  },
};
</script>