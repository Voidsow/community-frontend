<template>
  <v-dialog v-model="dialog" max-width="450px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on"> 注册 </v-btn>
    </template>
    <v-card>
      <v-card-title class="d-flex justify-center">
        <span class="text-h5">注册</span>
      </v-card-title>
      <v-card-text class="pb-0">
        <v-container>
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                label="用户名"
                required
                dense
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="密码"
                type="password"
                dense
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="确认密码"
                type="password"
                dense
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="邮箱" required dense outlined></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="px-8 pt-0 pb-3">
        <v-btn large color="primary" block @click="dialog = false">
          注册
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
export default {
  data() {
    return { dialog: false };
  },
};
</script>

<style scoped>
.captcha {
  width: 150px;
  height: 56px;
}
</style>