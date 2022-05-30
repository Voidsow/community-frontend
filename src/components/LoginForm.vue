<template>
  <v-dialog v-model="dialog" max-width="450px">
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
              <v-text-field label="用户名" required outlined></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="密码"
                type="password"
                required
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="6">
              <v-text-field
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
                    class="captcha"
                    src="/captcha.png"
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
            <v-col
              ><v-checkbox
                hide-details="auto"
                dense
                v-model="longTerm"
                label="三十天内免登录"
              ></v-checkbox
            ></v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="px-8 pt-0 pb-3">
        <v-btn large color="primary" block @click="dialog = false">
          登录
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
export default {
  data() {
    return { dialog: false, longTerm: false };
  },
};
</script>

<style scoped>
.captcha {
  width: 150px;
  height: 56px;
}
</style>