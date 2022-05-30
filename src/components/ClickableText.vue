<template>
  <span @click="activate = !activate">
    <slot :activate="activate"></slot>
  </span>
</template>

<script>
export default {
  data() {
    return {
      activate: false,
    };
  },
    };
</script>

<style scoped>
:hover {
  cursor: pointer;
}
</style>