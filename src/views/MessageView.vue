<template>
  <v-container class="expand">
    <v-row justify="center" class="expand">
      <v-spacer></v-spacer>
      <v-col sm="8" class="expand">
        <v-card v-if="!loading" class="expand mb-1">
          <v-list two-line>
            <v-subheader>
              <span v-if="totalUnread != 0">
                <v-badge inline color="red" :content="totalUnread">
                  新消息
                </v-badge>
              </span>
              <span v-else>没有新消息</span>
            </v-subheader>
            <v-divider></v-divider>
            <template v-for="(conversation, index) in conversations">
              <v-list-item :key="`uid${conversation.talkTo.id}`">
                <router-link
                  :to="{ name: 'user', params: { id: conversation.talkTo.id } }"
                >
                  <v-list-item-avatar color="grey">
                    <v-img :src="conversation.talkTo.headerUrl"></v-img>
                  </v-list-item-avatar>
                </router-link>

                <v-list-item-content
                  class="clickable"
                  @click="toMessageLine(conversation.talkTo.id)"
                >
                  <v-list-item-title>
                    {{ conversation.talkTo.username }}
                  </v-list-item-title>
                  <v-list-item-subtitle
                    v-html="conversation.last.content"
                  ></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action
                  class="clickable"
                  @click="toMessageLine(conversation.talkTo.id)"
                >
                  <v-list-item-action-text class="grey--text">
                    {{ dateFormat(conversation.last.gmtCreate) }}
                  </v-list-item-action-text>
                  <v-badge
                    v-if="conversation.unread != 0"
                    :content="conversation.unread"
                    inline
                    color="red"
                  ></v-badge>
                  <span v-else></span>
                </v-list-item-action>
              </v-list-item>
              <v-divider
                v-if="index < conversations.length - 1"
                :key="`divider${index}`"
              ></v-divider>
            </template>
          </v-list>
        </v-card>
        <v-pagination
          v-model="page"
          :length="sum"
          :total-visible="pageNum"
          @click="test"
        ></v-pagination>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import { HOST, dateFormat, getFetch } from "@/utils";
export default {
  data() {
    return {
      totalUnread: 8,
      conversations: null,
      loading: true,
      page: 1,
      pageSize: 8,
      sum: -1,
      pageNum: 7,
    };
  },
  mounted: () => {
    this.fetchData();
  },
  methods: {
    dateFormat,
    toMessageLine(uid) {
      this.$router.push({ name: "chat", query: { uid } });
    },
    fetchData() {
      this.loading = true;
      getFetch(HOST + `chat?page=${this.page}&size=${this.pageSize}`)
        .then((resp) => resp.json())
        .then((resp) => {
          if (resp.code === 200) {
            this.totalUnread = resp.data.totalUnread;
            this.conversations = resp.data.conversations;
            this.conversations.forEach((e) => {
              e.last.gmtCreate = new Date(e.last.gmtCreate);
            });
            this.sum = resp.data.sum;
            this.loading = false;
          }
        });
    },
  },
  created() {
    this.fetchData();
  },
  watch: {
    page() {
      this.fetchData();
    },
  },
};
</script>

<style scoped>
.clickable:hover {
  cursor: pointer;
}
.expand {
  height: 99.1%;
}
</style>