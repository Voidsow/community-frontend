<template>
  <div class="index">
    <v-container class="mt-4">
      <div v-if="!loading">
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
                    <post-form
                      @publish="publish"
                      @close="sheet = !sheet"
                    ></post-form>
                  </v-sheet>
                </v-bottom-sheet>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col v-if="posts.length !== 0" sm="9" md="7" lg="8">
            <post
              v-for="(post, index) in posts"
              :key="post.id"
              :post="post"
              :user="users[index]"
              @like="like"
              class="touch px-3"
            ></post>
          </v-col>
          <span v-else class="my-10">没有找到相关帖子</span>
        </v-row>
        <v-pagination
          v-if="length > 1"
          v-model="page"
          :length="length"
          total-visible="7"
          class="my-5"
        ></v-pagination>
      </div>
    </v-container>
  </div>
</template>

<script>
import PostItem from "@/components/PostItem.vue";
import PostForm from "@/components/PostForm.vue";
import { getFetch, HOST } from "@/utils";
import { setQuery } from "@/store/mutation-type";
export default {
  components: {
    post: PostItem,
    postForm: PostForm,
  },
  data() {
    return {
      posts: [],
      users: null,
      select: "推荐",
      rankBy: ["推荐", "最新"],
      sheet: false,
      page: 1,
      length: 5,
      pageSize: 10,
      loading: false,
    };
  },
  computed: {
    query() {
      return this.$store.state.query;
    },
  },
  methods: {
    like(data) {
      data.post.likeNum = data.likeNum;
      data.post.like = data.like;
    },
    publish(post) {
      post.gmtCreate = new Date(post.gmtCreate);
      this.posts.push(post);
      this.users.push(this.$store.state.user);
    },
    fetchData() {
      this.loading = true;
      let url =
        HOST +
        (this.query !== "" ? `search?q=${this.query}&` : "?") +
        `page=${this.page}&size=${this.pageSize}`;
      alert(url);
      getFetch(url)
        .then((resp) => resp.json())
        .then((resp) => {
          let data = resp.data;
          data.posts.forEach((post) => {
            post.gmtCreate = new Date(post.gmtCreate);
          });
          if (this.posts !== null) console.log(this.posts.length);
          this.posts = data.posts;
          this.users = data.users;
          this.length = data.lastPage;
          this.loading = false;
        });
      this.$store.commit(setQuery, "");
    },
  },
  watch: {
    page() {
      this.fetchData();
    },
    query(newVal) {
      if (newVal !== "") this.fetchData();
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style>
.touch:hover {
  background-color: rgb(238, 238, 238);
}
</style>