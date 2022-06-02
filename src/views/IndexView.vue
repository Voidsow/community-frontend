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
              v-for="(post, index) in posts"
              :key="post.id"
              :post="post"
              :user="users[index]"
              :like="likes[index]"
              class="touch px-3"
            ></post>
          </v-col>
        </v-row>
        <v-pagination
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
import { HOST } from "@/utils";
export default {
  components: {
    post: PostItem,
    postForm: PostForm,
  },
  data() {
    return {
      posts: null,
      users: null,
      likes: null,
      select: "推荐",
      rankBy: ["推荐", "最新"],
      sheet: false,
      page: 1,
      length: 5,
      pageSize: 10,
      loading: false,
    };
  },
  methods: {
    submit() {},
    fetchData() {
      this.loading = true;
      fetch(HOST + `?page=${this.page}&size=${this.pageSize}`)
        .then((resp) => resp.json())
        .then((resp) => {
          let data = resp.data;
          data.posts.forEach((post) => {
            post.gmtCreate = new Date(post.gmtCreate);
          });
          if (this.posts !== null) console.log(this.posts.length);
          this.posts = data.posts;
          this.users = data.users;
          this.likes = data.likes;
          this.length = data.lastPage;
          this.loading = false;
        });
    },
  },
  watch: {
    page() {
      this.fetchData();
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