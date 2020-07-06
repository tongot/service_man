<template>
  <v-container>
    <v-dialog v-model="get_dialog_login" persistent width="450">
      <v-card>
        <v-card-title>
          Please provide password
          <v-spacer></v-spacer>
          <v-btn @click="showLogIn('')" icon color="red">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-alert v-if="get_login_error!=''" type="error">{{get_login_error }}</v-alert>
          <v-form ref="login">
            <v-text-field
              prepend-icon="mdi-email"
              outlined
              label="Email"
              v-if="get_from!='change-email'"
              v-model="user.username"
              :rules="get_from=='change-email'?[]:[rules.required]"
            ></v-text-field>
            <v-text-field
              prepend-icon="mdi-account-lock"
              label="Password"
              outlined
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
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    user: {
      username: "",
      password: ""
    },
    loading: false,
    rules: {
      required: v => !!v || "this field is required"
    }
  }),
  methods: {
    ...mapActions(["login", "showLogIn"]),
    //__________________login___________________________
    async postLogin() {
      if (this.get_from == "change-email") {
        this.user.username = this.get_user.email;
      }
      this.loading = true;
      this.login(this.user).then(() => {
        this.loading = false;
        this.user.username = "";
        this.user.password = "";
      });
    }
    //___________________________________register_____________________________
  },
  computed: {
    ...mapGetters([
      "get_dialog_login",
      "get_login_error",
      "get_from",
      "get_user"
    ])
  }
};
</script>
