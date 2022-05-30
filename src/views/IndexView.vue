<template>
  <div class="index">
    <v-container class="mt-4">
      <v-row justify="center">
        <v-col sm="9" md="7" lg="8" class="px-lg-5">
          <v-row>
            <!-- 筛选排序 -->
            <v-col cols="5" sm="3" lg="2">
              <v-select
                class="rounded"
                v-model="select"
                :items="rankBy"
                :menu-props="{ bottom: true, offsetY: true }"
                hide-details="true"
                filled
                dense
              >
              </v-select>
            </v-col>
            <v-spacer></v-spacer>
            <!-- 发帖按钮弹出底部表单 -->
            <v-col cols="3" sm="2" lg="1" class="px-lg-0">
              <v-bottom-sheet v-model="sheet" inset>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn block color="blue" dark v-bind="attrs" v-on="on">
                    发布
                  </v-btn>
                </template>
                <v-sheet class="text-center">
                  <post-form @close="sheet = !sheet"></post-form>
                </v-sheet>
              </v-bottom-sheet>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col sm="9" md="7" lg="8">
          <post
            v-for="post in posts"
            :key="post.id"
            :post="post"
            class="touch px-3"
          ></post>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PostItem from "@/components/PostItem.vue";
import PostForm from "@/components/PostForm.vue";
import { setPost } from "@/store/mutation-type";
export default {
  components: {
    post: PostItem,
    postForm: PostForm,
  },
  data() {
    return {
      posts: [
        {
          id: "1",
          uid: 1,
          title: "title1 lofei rjeif ejrieohn ej eru",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore aspernatur dolorum cum cumque earum velit, alias voluptatum minima ab quis. Illo perferendis nostrum eligendi quos aspernatur voluptatem provident consequuntur sapiente.",
          type: 0,
          status: 1,
          score: 100,
          gmtCreate: new Date(),
          likeNum: 1,
          like: false,
          commentNum: 100,
        },
        {
          id: "2",
          uid: 1,
          title: "title1 fheufh jijifej kjioji",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore aspernatur dolorum cum cumque earum velit, alias voluptatum minima ab quis. Illo perferendis nostrum eligendi quos aspernatur voluptatem provident consequuntur sapiente.",
          type: 0,
          status: 1,
          score: 100,
          gmtCreate: new Date(),
          likeNum: 1,
          like: false,
          commentNum: 100,
        },
        {
          id: "3",
          uid: 1,
          title: "title1 eir0jr fejin e jeir",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore aspernatur dolorum cum cumque earum velit, alias voluptatum minima ab quis. Illo perferendis nostrum eligendi quos aspernatur voluptatem provident consequuntur sapiente.",
          type: 0,
          status: 1,
          score: 100,
          gmtCreate: new Date(),
          likeNum: 1,
          like: false,
          commentNum: 100,
        },
        {
          id: "4",
          uid: 1,
          title: "title4 feifj ji efehnf fj",
          content: "12345",
          type: 0,
          status: 1,
          score: 100,
          gmtCreate: new Date(),
          likeNum: 1,
          like: false,
          commentNum: 100,
        },
        {
          id: "5",
          uid: 1,
          title: "title5 fjeiufjheu jiji fnej enin fnwej enj f aenf",
          content: "12345",
          type: 0,
          status: 1,
          score: 100,
          gmtCreate: new Date(),
          likeNum: 1,
          like: false,
          commentNum: 100,
        },
        {
          id: "6",
          uid: 1,
          title: "title6 fjief nejrn an fej nij",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore aspernatur dolorum cum cumque earum velit, alias voluptatum minima ab quis. Illo perferendis nostrum eligendi quos aspernatur voluptatem provident consequuntur sapiente.",
          type: 0,
          status: 1,
          score: 100,
          gmtCreate: new Date(),
          likeNum: 1,
          like: false,
          commentNum: 100,
        },
        {
          id: "7",
          uid: 1,
          title: "title7 fejij na fen n feniniejrei",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore aspernatur dolorum cum cumque earum velit, alias voluptatum minima ab quis. Illo perferendis nostrum eligendi quos aspernatur voluptatem provident consequuntur sapiente.",
          type: 0,
          status: 1,
          score: 100,
          gmtCreate: new Date(),
          likeNum: 1,
          like: false,
          commentNum: 100,
        },
        {
          id: "8",
          uid: 1,
          title: "title8 fjien enrj enjr anfg wa fojfiejS",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore aspernatur dolorum cum cumque earum velit, alias voluptatum minima ab quis. Illo perferendis nostrum eligendi quos aspernatur voluptatem provident consequuntur sapiente.",
          type: 0,
          status: 1,
          score: 100,
          gmtCreate: new Date(),
          likeNum: 1,
          like: false,
          commentNum: 100,
        },
        {
          id: "9",
          uid: 1,
          title: "title9 fein  jeinre eorjm enrjen rnemi d",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore aspernatur dolorum cum cumque earum velit, alias voluptatum minima ab quis. Illo perferendis nostrum eligendi quos aspernatur voluptatem provident consequuntur sapiente.",
          type: 0,
          status: 1,
          score: 100,
          gmtCreate: new Date(),
          likeNum: 1,
          like: false,
          commentNum: 100,
        },
        {
          id: "10",
          uid: 1,
          title: "title10 fjeifj  jeir enjnpe ewnm jfei an fekm",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore aspernatur dolorum cum cumque earum velit, alias voluptatum minima ab quis. Illo perferendis nostrum eligendi quos aspernatur voluptatem provident consequuntur sapiente.",
          type: 0,
          status: 1,
          score: 100,
          gmtCreate: new Date(),
          likeNum: 1,
          like: false,
          commentNum: 100,
        },
      ],
      select: "推荐",
      rankBy: ["推荐", "最新"],
      sheet: false,
    };
  },
  methods: {
    submit() {},
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === "post")
      this.$store.commit(setPost, this.posts[to.params.id]);
    next();
  },
};
</script>

<style>
.touch:hover {
  background-color: rgb(238, 238, 238);
}
</style>