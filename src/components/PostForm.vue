<template>
  <v-card>
    <v-card-title class="pb-0 pt-3">
      <span class="text-subheading-2">发表新帖子</span>
    </v-card-title>
    <v-card-text class="pb-0">
      <v-container class="pa-0">
        <v-form ref="form">
          <v-text-field
            prepend-icon="mdi-folder"
            label="标题"
            required
            :rules="titleRules"
            v-model="title"
          >
          </v-text-field>
          <v-textarea
            label="内容"
            prepend-icon="mdi-pencil"
            hint=""
            rows="3"
            auto-grow
            v-model="content"
          >
          </v-textarea>
        </v-form>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn color="blue darken-1" text @click="clear">清空</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="$emit('close')"> 取消 </v-btn>
      <v-btn v-bind="sumbitBtnProp" @click="submit" :loading="loading">
        {{ text }}
        <v-icon v-if="status">mdi-check-circle</v-icon>
      </v-btn>
    </v-card-actions>
    <v-snackbar timeout="1000" color="error" v-model="error">
      {{ errorMsg }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="error = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
import { HOST, postFetch } from "@/utils";
export default {
  data() {
    return {
      title: "",
      content: "",
      loading: false,
      normal: {
        text: true,
        color: "blue darken-1",
      },
      success: {
        color: "green lighten-1",
      },
      status: false,
      text: "发布",
      error: false,
      errorMsg: "",
      titleRules: [
        (v) => (v.length > 4 && v.length < 64) || "标题长度须在5~64个字内",
      ],
    };
  },
  computed: {
    sumbitBtnProp() {
      return this.status ? this.success : this.normal;
    },
  },
  methods: {
    submit() {
      if (!this.$refs.form.validate()) {
        return;
      }
      postFetch(HOST + "post", {
        title: this.title,
        content: this.content,
      })
        .then((resp) => resp.json())
        .then((resp) => {
          if (resp.code === 200) {
            this.loading = false;
            this.status = true;
            this.text = "发布成功";
            setTimeout(() => {
              this.text = "提交";
              this.status = false;
              this.$emit("close");
            }, 1000);
            this.$emit("publish", resp.data);
          } else {
            this.error = true;
            this.errorMsg = resp.message;
          }
        });
    },
    clear() {
      this.title = "";
      this.content = "";
      this.$refs.form.resetValidation();
    },
  },
};
</script>