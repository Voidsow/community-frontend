<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="mt-3 mb-6">
          <v-img
            height="200px"
            class="align-end"
            src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
          >
            <v-card-title class="white--text mt-8 align-center">
              <v-avatar size="60">
                <img
                  alt="user"
                  src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
                />
              </v-avatar>
              <span class="ml-3">John Doe</span>
              <v-spacer></v-spacer>
              <v-btn class="mr-3">私信</v-btn>
              <v-btn color="primary"><v-icon small>mdi-plus</v-icon>关注</v-btn>
            </v-card-title>
          </v-img>

          <v-card-text class="pb-0">
            <v-row>
              <clickable-span
                v-for="route in routes"
                @click="jumpTo(route.path)"
                class="mx-1 pa-1 bottomBorder"
                :key="'route' + route.text"
                :text="route.text"
              ></clickable-span>
              <v-spacer></v-spacer>
              <clickable-span text="关注"></clickable-span>
              <clickable-span text="粉丝"></clickable-span>
              <clickable-span text="点赞"></clickable-span>
            </v-row>
          </v-card-text>
        </v-card>
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ClickableSpan from "@/components/ClickableSpan.vue";
export default {
  components: { ClickableSpan },
  data() {
    return {
      routes: [
        { text: "动态", path: { name: "user", params: { id: 1 } } },
        { text: "关注", path: { name: "follow", params: { id: 1 } } },
      ],
    };
  },
  methods: {
    jumpTo(route) {
      this.$router.push(route);
    },
  },
};
</script>

<style scoped>
/* @keyframes activatedBottom{
  from{
    border-bottom: 2px solid #3498db;
  } to{
    border-bottom: 3px solid #3498db;
  }
}
.bottomBorder:hover {
  animation:activatedBottom 1s;
} */
.bottomBorder:hover:not(.activate) {
  border-bottom: 3px solid grey;
}
.bottomBorder {
  border-bottom: 3px solid transparent;
}
.activate {
  border-bottom-color: #3498db;
}
</style>