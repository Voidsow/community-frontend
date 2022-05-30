<template>
  <v-container>
    <v-row justify="conter">
      <v-spacer></v-spacer>
      <v-col sm="8">
        <v-card>
          <v-list two-line>
            <v-subheader>
              <v-span v-if="unread != 0">
                <v-badge color="red" :content="unread">新消息</v-badge>
              </v-span>
              <span v-else>没有新消息</span>
            </v-subheader>
            <template v-for="(item, index) in items">
              <v-list-item :key="item.title">
                <v-list-item-avatar>
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-content class="clickable" @click="toMessageLine">
                  <v-list-item-title v-html="item.title"></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="item.subtitle"
                  ></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action class="clickable" @click="toMessageLine">
                  <v-list-item-action-text class="grey--text"
                    >时间</v-list-item-action-text
                  >
                  <v-badge content="2" inline color="red"></v-badge>
                </v-list-item-action>
              </v-list-item>
              <v-divider v-if="index < items.length" :key="index"></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      unread: 9,
      items: [
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Brunch this weekend?",
          subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "Oui oui",
          subtitle:
            '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
          title: "Birthday gift",
          subtitle:
            '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
          title: "Recipe to try",
          subtitle:
            '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
    };
  },
  methods: {
    toMessageLine() {
      this.$router.push({ name: "messages", params: { uid: 2 } });
    },
  },
};
</script>

<style scoped>
.clickable:hover {
  cursor: pointer;
}
</style>