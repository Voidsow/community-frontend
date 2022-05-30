<template>
  <v-container class="expand pb-0">
    <v-row justify="center" class="expand">
      <v-col cols="12" sm="8" class="expand pb-0">
        <v-card class="expand">
          <v-row class="expand" no-gutters>
            <v-col cols="12">
              <v-list>
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
                <v-btn class="ml-1" color="primary" @click="sendMsg"
                  >发送</v-btn
                >
              </v-toolbar>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      msg: "",
      messages: [
        {
          id: 1,
          speaker: 1,
          listener: 2,
          conversationId: "1-2",
          content: "你好",
          gmtCreate: new Date(),
          status: 0,
        },
        {
          id: 1,
          speaker: 2,
          listener: 1,
          conversationId: "1-2",
          content: "你好",
          gmtCreate: new Date(),
          status: 0,
        },
        {
          id: 1,
          speaker: 1,
          listener: 2,
          conversationId: "1-2",
          content: "很高兴认识你",
          gmtCreate: new Date(),
          status: 0,
        },
        {
          id: 1,
          speaker: 2,
          listener: 1,
          conversationId: "1-2",
          content: "我也是",
          gmtCreate: new Date(),
          status: 0,
        },
        {
          id: 1,
          speaker: 1,
          listener: 2,
          conversationId: "1-2",
          content: "这周的天气真不错",
          gmtCreate: new Date(),
          status: 0,
        },
        {
          id: 1,
          speaker: 2,
          listener: 1,
          conversationId: "1-2",
          content: "是啊",
          gmtCreate: new Date(),
          status: 0,
        },
        {
          id: 1,
          speaker: 1,
          listener: 2,
          conversationId: "1-2",
          content: "周末一起出去玩怎么样？",
          gmtCreate: new Date(),
          status: 0,
        },
      ],
      users: {
        1: {
          id: 1,
          headerUrl: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          username: "Taro",
        },
        2: {
          id: 2,
          headerUrl: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          username: "Jack",
        },
      },
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
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
      this.messages.push({
        id: 1,
        speaker: 1,
        listener: 2,
        conversationId: "1-2",
        content: this.msg,
        gmtCreate: new Date(),
        status: 0,
      });
      this.msg = "";
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