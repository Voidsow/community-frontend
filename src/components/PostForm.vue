<template>
  <div>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on"> Create a new project </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">New Project</span>
        </v-card-title>
        <v-card-text>
          <v-container>
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
                rows="1"
                auto-grow
                v-model="content"
              >
              </v-textarea>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="clear">Clear up</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn v-bind="sumbitBtnProp" @click="submmit" :loading="loading">
            {{ text }}
            <v-icon v-if="status">mdi-check-circle</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
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
      text: "submit",
      titleRules: [(v) => v.length > 3 || "title's length must larger than 3"],
    };
  },
  computed: {
    sumbitBtnProp() {
      return this.status ? this.success : this.normal;
    },
  },
  methods: {
    submmit() {
      if (!this.$refs.form.validate()) {
        return;
      }
      new Promise((resolve) => {
        this.loading = true;
        setTimeout(() => {
          resolve();
        }, 1000);
      }).then(() => {
        this.loading = false;
        this.status = true;
        this.text = "success";
        setTimeout(() => {
          this.text = "submit";
          this.status = false;
          this.dialog = false;
        }, 1000);
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