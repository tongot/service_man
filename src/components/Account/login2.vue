<template>
  <div>
    <v-row>
      <v-dialog v-model="dialog" width="400" persistent>
        <v-card>
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn color="red" icon @click="closeReset">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-form ref="formForgotEmail">
              <v-text-field
                outlined
                placeholder="Enter you registered email"
                v-model="forgotEmail"
                :rules="[rules.required,rules.email]"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn :loading="loadingEmail">Send reset</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-col md="6" sm="12" cols="12" class="picture-container">
        <div class="side-pic"></div>
        <h4 class="white--text font-weight-thin display-4 header1">Tshwaragano</h4>
      </v-col>
      <v-col md="6" sm="12" cols="12">
        <v-form ref="login" class="registerForm">
          <v-card width="500" outlined class="registerCard">
            <div class="d-flex justify-center mb-4">
              <v-avatar color="blue" size="70">
                <v-icon class="display-3 white--text">mdi-account</v-icon>
              </v-avatar>
            </div>
            <v-alert v-if="get_login_error!=''" type="error">{{get_login_error }}</v-alert>
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
              <!-- <v-btn small color="pink darken-1" @click="dialog=!dialog" text>Forgot password</v-btn> -->
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
import { mapActions, mapGetters } from "vuex";
//import axios from 'axios';
export default {
  data: () => ({
    dialog: false,
    forgotEmail: "",
    loadingEmail: false,
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
      required: v => !!v || "this field is required",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    }
  }),
  methods: {
    ...mapActions(["login"]),
    async postLogin() {
      this.loading = true;
      this.login(this.user).then(() => {
        this.loading = false;
      });
    },
    closeReset() {
      this.forgotEmail = "";
      this.dialog = !this.dialog;
    }
    /* resetPassword() {
      if(this.$refs.formForgotEmail.validate){
        this.loadingEmail= true;
axios.post('/account_api/forgot-password',{
  user :this.forgotEmail
}).then((response)=>{

})
      }
    }*/
  },
  computed: mapGetters(["get_login_error"])
};
</script>
<style>
</style>