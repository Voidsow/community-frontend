<template>
  <span @click="$emit('click')">
    <v-icon small :color="activate ? color : ''">
      {{ _icon }}
    </v-icon>
    <span :class="textStyle" v-html="text"></span>
  </span>
</template>

<script>
export default {
  props: ["text", "color", "icon", "activate"],
  emit: ["click"],
  methods: {
    onClick() {
      this.$emit("click");
    },
  },
  computed: {
    _icon() {
      return this.activate ? this.icon : this.icon + "-outline";
    },
    textStyle() {
      return { [`${this.color}--text`]: this.activate };
    },
  },
};
</script>

<style scoped>
:hover {
  cursor: pointer;
}
</style>