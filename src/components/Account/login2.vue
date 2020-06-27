<template>
  <div>
    <v-row>
      <v-col md="6" sm="12" cols="12" class="picture-container">
        <div class="side-pic"></div>
        <h4 class="white--text font-weight-thin display-4 header1">Tswaragano</h4>
      </v-col>
      <v-col md="6" sm="12" cols="12">
        <v-form ref="login" class="registerForm">
          <v-card width="500" outlined class="registerCard">
            <div class="d-flex justify-center mb-4">
              <v-avatar color="blue" size="70">
                <v-icon class="display-3 white--text">mdi-account</v-icon>
              </v-avatar>
            </div>
            <v-alert v-if="errors.text.length>0" :type="errors.type">{{ errors.text }}</v-alert>
            <v-text-field
              prepend-icon="mdi-email"
              label="Email"
              v-model="user.username"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              prepend-icon="mdi-account-lock"
              label="Password"
              type="password"
              v-model="user.password"
              :rules="[rules.required]"
            ></v-text-field>
            <v-flex class="d-flex justify-center">
              <v-btn
                @click="postLogin"
                depressed
                :loading="loading"
                :disabled="loading"
                color="blue"
                class="white--text"
              >
                <v-icon left>mdi-lock-open-variant</v-icon>login
              </v-btn>
            </v-flex>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small :to="{name:'register'}" text>Sign up</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    user: {
      username: "",
      password: ""
    },
    errors: {
      text: [],
      type: ""
    },
    loading: false,
    rules: {
      required: v => !!v || "this field is required"
    }
  }),
  methods: {
    ...mapActions(["login", "getUserDetails"]),
    async postLogin() {
      if (this.$refs.login.validate()) {
        this.loading = true;
        let data;
        data = await this.login(this.user);
        try {
          if (data.status == "400") {
            this.errors.text = "Incorrect password or email";
            this.errors.type = "error";
          }
          if (data.status == "200") {
            this.$router.push({ name: "home" });
            setTimeout(() => {
              location.reload();
            }, 500);
          }
          this.loading = false;
        } catch {
          this.errors.text = "FAID TO CONNETCT";
          this.errors.type = "error";
          this.loading = false;
        }
      }
    }
  }
};
</script>
<style>
</style>