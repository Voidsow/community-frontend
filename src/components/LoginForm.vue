<template>
  <v-dialog v-model="open" max-width="450px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on"> 登录 </v-btn>
    </template>
    <v-card>
      <v-card-title class="d-flex justify-center">
        <span class="text-h5">登录</span>
      </v-card-title>
      <v-card-text class="pb-0">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="username"
                label="用户名"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="psw"
                label="密码"
                type="password"
                required
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters justify="space-between">
            <v-col cols="5" sm="auto">
              <v-text-field
                v-model="captcha"
                hide-details="auto"
                label="验证码"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <img
                    @click="updateCaptcha"
                    class="captcha"
                    :src="captchaURL"
                    alt="验证码"
                    title=""
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <span>刷新验证码</span>
              </v-tooltip>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>
              <v-checkbox
                hide-details="auto"
                dense
                v-model="longTerm"
                label="三十天内免登录"
              >
              </v-checkbox>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="px-8 pt-0 pb-3">
        <v-btn :loading="loading" large color="primary" block @click="login">
          登录
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar timeout="1000" color="error" v-model="error">
      {{ errorMsg }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="error = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-dialog>
</template>


<script>
import { postFetch } from "@/utils";
import { authorize } from "@/store/mutation-type";
export default {
  data() {
    return {
      username: "",
      psw: "",
      captcha: "",
      longTerm: false,

      open: false,
      loading: false,
      success: false,
      error: false,
      errorMsg: "",
      captchaPrefix: "http://localhost:8081/captcha",
      seed: -1,
    };
  },
  computed: {
    captchaURL() {
      return this.captchaPrefix + "?" + this.seed;
    },
  },
  methods: {
    login() {
      this.loading = true;
      postFetch("http://localhost:8081/login", {
        username: this.username,
        psw: this.psw,
        captcha: this.captcha,
        longTerm: this.longTerm,
      })
        .then((resp) => resp.json())
        .then((resp) => {
          if (resp.code !== 200) {
            this.errorMsg = resp.message;
            this.error = true;
          } else {
            this.$store.commit(authorize, resp.data);
            this.success = true;
            this.dialog = false;
          }
          this.loading = false;
        });
    },
    updateCaptcha() {
      this.seed = (Math.random() * 100) / 1;
    },
  },
};
</script>

<style scoped>
.captcha {
  height: 56px;
}
.captcha:hover {
  cursor: pointer;
}
</style>