<template>
  <ol>
    <li>{{ item.field1 }}</li>
    <li>{{ item.field2 }}</li>
    <button @click="item.field1"></button>
  </ol>
</template>

<script>
export default {
  props: ["item", "mutation"],
  data: () => {},
};
</script>

<style scoped>
</style>