<template>
  <v-container>
    <v-row dense>
      <v-col cols="5" sm="4" md="2">
        <v-card>
          <v-list>
            <v-subheader class="text-subtitle-1">通知中心</v-subheader>
            <v-list-item-group v-model="select">
              <v-list-item v-for="(topic, i) in topics" :key="i" class="px-2">
                <v-list-item-content>
                  <v-list-item-title>
                    <v-icon
                      :color="topic.color"
                      size="20"
                      v-text="topic.icon"
                      class="mr-1"
                    >
                    </v-icon>
                    {{ topic.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="7" sm="8" md="10">
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { dateFormat } from "@/utils";
export default {
  data() {
    return {
      topics: [
        {
          icon: "mdi-comment-text-multiple",
          title: "评论与回复",
          color: "orange accent-1",
          route: "/notifications/comment",
        },
        {
          icon: "mdi-heart",
          title: "赞同与喜欢",
          color: "pink darken-1",
          route: "/notifications/like",
        },
        {
          icon: "mdi-account-plus",
          title: "关注我的",
          color: "primary",
          route: "/notifications/follow",
        },
      ],
      select: 1,
    };
  },
  methods: {
    dateFormat,
  },
  watch: {
    select(newVal) {
      this.$router.push(this.topics[newVal].route);
    },
  },
};
</script>