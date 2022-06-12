<template>
  <v-card v-if="!loading">
    <v-list>
      <template v-for="(user, index) in users">
        <v-list-item :key="`u${index}`">
          <router-link :to="{ name: 'user', params: { id: user.id } }">
            <v-list-item-avatar color="grey">
              <img :src="user.headerUrl" />
            </v-list-item-avatar>
          </router-link>
          <v-list-item-content>
            <v-list-item-title>
              <router-link :to="{ name: 'user', params: { id: user.id } }">
                <span class="primary--text">{{ user.username }}</span>
              </router-link>
              关注了你
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ dateFormat(times[index]) }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider
          v-if="index < users.length - 1"
          :key="`d${index}`"
        ></v-divider>
      </template>
      <v-list-item v-if="users.length === 0">
        暂时还没有人关注你哦~
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { dateFormat, getFetch, HOST } from "@/utils";
export default {
  data() {
    return {
      users: [],
      times: null,

      loading: false,
    };
  },
  methods: {
    dateFormat,
    fetchData() {
      this.loading = true;
      getFetch(HOST + "notification/follow")
        .then((resp) => resp.json())
        .then((resp) => {
          if (resp.code === 200) {
            this.users = resp.data.users;
            this.times = resp.data.times.map((time) => (time = new Date(time)));
            this.loading = false;
          }
        });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>