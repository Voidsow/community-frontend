<template>
  <v-btn
    v-if="followed"
    @click="followOrNot"
    color="rgba(0, 0, 0, 0.2)"
    class="white--text"
  >
    已关注
  </v-btn>
  <v-btn v-else @click="followOrNot" color="primary">
    <v-icon small>mdi-plus</v-icon>关注
  </v-btn>
</template>

<script>
import { post } from "@/utils";
import { messagePop } from "@/store/mutation-type";
export default {
  props: { followed: Boolean, uid: Number },
  emit: ["follow"],
  methods: {
    followOrNot() {
      if (this.uid === this.$store.state.user.id) {
        this.$store.commit(messagePop, "不能关注自己哦~");
        return;
      }
      post(`follow/${this.uid}`, null, (data) => this.$emit("follow", data));
    },
  },
};
</script>