<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8">
        <v-card v-if="!loading" elevation="8">
          <v-row no-gutters>
            <v-col>
              <v-list :height="height" class="overflow-auto pb-0">
                <!-- 根据发信人改变块内元素顺序 -->
                <v-list-item
                  class="px-1"
                  dense
                  v-for="(message, index) in messages"
                  :key="'temp' + index"
                  :class="`d-flex ${direciton(message.speaker)} align-start`"
                >
                  <v-avatar size="38" class="mx-1">
                    <img :src="users[message.speaker].headerUrl" />
                  </v-avatar>
                  <v-list-item-content>
                    <v-row dense>
                      <v-col class="py-0">
                        <v-alert
                          dense
                          color="primary"
                          :class="`bubble white--text rounded-lg ${bubbleStyle(
                            message.speaker
                          )}`"
                        >
                          {{ message.content }}
                        </v-alert>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col cols="12" align-self="end">
              <v-toolbar dense bottom>
                <v-text-field
                  v-model="msg"
                  hide-details
                  flat
                  single-line
                  solo
                ></v-text-field>
                <v-btn class="ml-1" color="primary" @click="sendMsg">
                  发送
                </v-btn>
              </v-toolbar>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { get, post } from "@/utils";
export default {
  data() {
    return {
      msg: "",
      messages: [],
      users: null,

      loading: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    talkToUid() {
      return this.$route.query.uid;
    },
    height() {
      return this.$vuetify.breakpoint.height - 120;
    },
  },
  mounted() {
    this.loading = true;
    this.fetchData();
    this.loading = false;
  },
  methods: {
    direciton(uid) {
      return "flex-row" + (uid != this.user.id ? "" : "-reverse");
    },
    bubbleStyle(uid) {
      return (
        "rounded-" +
        (uid != this.user.id ? "tl-0 lean-left" : "tr-0 lean-right")
      );
    },
    sendMsg() {
      if (this.msg)
        post(
          "chat",
          {
            listener: this.talkToUid,
            content: this.msg,
          },
          (data) => {
            this.messages.push(data);
            this.msg = "";
          }
        );
    },
    fetchData() {
      get(`chat/${this.talkToUid}`, (data) => {
        this.messages = data.messages;
        this.users = {
          [this.talkToUid]: data.talkTo,
          [this.$store.state.user.id]: this.$store.state.user,
        };
      });
    },
  },
};
</script>

<style scoped>
.bubble {
  width: fit-content;
}
.lean-left {
  margin-right: auto;
}
.lean-right {
  margin-left: auto;
}
.expand {
  height: 100%;
}
</style>