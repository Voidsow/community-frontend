<template>
  <v-card>
    <v-list two-line>
      <v-subheader class="font-weight-regular">
        <clickable-span
          @click="state = followee"
          text="TA关注的人"
          :activate="state === followee"
          color="primary"
          class="mr-2"
        ></clickable-span>
        <clickable-span
          @click="state = follower"
          :activate="state === follower"
          text="关注TA的人"
          color="primary"
        ></clickable-span>
      </v-subheader>
      <v-divider></v-divider>

      <!-- 评论列表 -->
      <template v-for="(user, index) in users">
        <v-list-item :key="`li${index}`">
          <router-link :to="{ name: user, params: { id: user.id } }">
            <v-list-item-avatar size="50">
              <img :src="user.headerUrl" />
            </v-list-item-avatar>
          </router-link>
          <v-list-item-content>
            <v-list-item-title v-text="user.username"></v-list-item-title>
            <v-list-item-subtitle>
              <router-link :to="{ name: 'follow', params: { id: user.id } }">
                关注 0
              </router-link>
              <router-link :to="`/user/${user.id}/follow#follower`"
                >粉丝 0</router-link
              >
              点赞 0
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn color="primary"><v-icon small>mdi-plus</v-icon>关注</v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider
          v-if="index < users.length - 1"
          :key="'d' + index"
          inset
        ></v-divider>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import ClickableSpan from "@/components/ClickableSpan.vue";
export default {
  components: { ClickableSpan },
  mounted(){
      console.log(Location);
  },
  data() {
    return {
      followers: [
        {
          id: 1,
          headerUrl: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          username: "Taro",
        },
        {
          id: 2,
          headerUrl: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          username: "Jack",
        },
      ],
      followees: [
        {
          id: 2,
          headerUrl: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          username: "Jack",
        },
        {
          id: 3,
          headerUrl: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          username: "Minato",
        },
      ],
      followee: 0,
      follower: 1,
      state: 1,
    };
  },
  computed: {
    users() {
      return this.state === this.followee ? this.followees : this.followers;
    },
  },
};
</script>