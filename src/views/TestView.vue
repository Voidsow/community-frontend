<template>
  <v-container>
    <v-card elevation="16"> </v-card>
  </v-container>
</template>


<script>
class Item {
  constructor(id) {
    this.id = id;
  }
}
export default {
  data() {
    return { benched: 0, items: [new Item(0)] };
  },
  methods: {
    addItem() {},
  },
  created() {
    alert("test");
    this.addItem();
  },
};
</script>

<style scoped>
</style>