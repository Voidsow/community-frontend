<template>
  <v-app>
    <nav-bar></nav-bar>
    <v-main class="grey lighten-5">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  components: { NavBar },
  name: "App",

  data: () => ({
    //
  }),
};
</script>
