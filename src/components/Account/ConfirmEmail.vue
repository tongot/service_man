<template>
  <v-container>
    <!--modal change email
    -->
    <v-dialog persistent v-model="userEmailInput" width="500">
      <v-card>
        <v-card-title>
          Change email from {{get_confirm_email}}
          <span class="red--text">&nbsp;</span>
        </v-card-title>
        <v-card-text>
          <v-alert v-if="error!=''" type="error" color="warning">{{error}}</v-alert>
          <v-form ref="formChangeEmail">
            <v-text-field
              :rules="[rules.required,rules.email]"
              v-model="newEmail"
              label="new email"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="error" @click="cancelChange()">cancel</v-btn>
          <v-btn class="success" :loading="loadResend" @click="changeEmail()">change</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-alert color="warning" class="mt-4" outlined>
      <v-icon color="warning" left>mdi-alert</v-icon>Please enter confirmation code sent to your email
    </v-alert>
    <v-row justify="center" align="center">
      <v-col cols="12" md="4" sm="12" class="justify-center">
        <v-row justify="center">
          <h2 class="mt-12">
            <strong>{{get_confirm_email}}</strong>
            <v-btn
              class="ml-2 primary--text"
              small
              text
              @click="userEmailInput=!userEmailInput"
            >change email</v-btn>
          </h2>
        </v-row>
        <v-row justify="center">
          <h2 class="mt-12 font-weight-thin">Enter code from email</h2>
        </v-row>
        <v-form ref="formConfirmNumber">
          <v-row justify="center">
            <v-btn :loading="loadResend" @click.prevent="ResendCode()" depressed>
              resend code
              <v-icon right>mdi-send</v-icon>
            </v-btn>
          </v-row>
          <span class="subtitle red--text">{{error}}</span>
          <v-text-field type="number" v-model="code" :rules="[rules.required,rules.maxLength]"></v-text-field>
        </v-form>
        <v-row justify="center">
          <v-btn :loading="loadConfirm" class="primary" @click="confirm()" depressed>Confirm</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
export default {
  data: () => ({
    error: "",
    loadConfirm: false,
    userEmailInput: false,
    loadResend: false,
    emailChangeLoad: false,
    newEmail: "",
    code: null,
    rules: {
      required: v => !!v || "this field is required",
      maxLength: v => (v && v.length === 6) || "",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    }
  }),
  methods: {
    ...mapActions(["setConfirmEmail", "notify"]),
    cancelChange() {
      this.error = "";
      this.newEmail = "";
      this.userEmailInput = false;
    },
    changeEmail() {
      if (this.$refs.formChangeEmail.validate()) {
        this.ResendCode();
      }
    },
    confirm() {
      this.error = "";
      if (this.$refs.formConfirmNumber.validate()) {
        this.loadConfirm = true;
        axios
          .get(
            "/account_api/confirm-email/?user=" +
              this.get_confirm_email +
              "&code=" +
              this.code
          )
          .then(
            response => {
              this.loadConfirm = false;
              if (response.status === 200) {
                this.$router.push({ name: "login" });
              }
            },
            e => {
              if (e.response.status === 400) {
                this.error = e.response.data.message;
                this.loadConfirm = false;
              }
            }
          );
      }
    },
    ResendCode() {
      this.error = "";
      this.loadResend = true;
      this.newEmail =
        this.newEmail == "" ? this.get_confirm_email : this.newEmail;
      axios
        .post("/account_api/confirm-email/", {
          user: this.newEmail,
          old_user: this.get_confirm_email
        })
        .then(
          response => {
            if (response.status === 201) {
              this.setConfirmEmail(this.newEmail);
              this.userEmailInput = false;
              (this.newEmail = ""), (this.loadResend = false);
              this.notify({
                text: "Email resend, Please check your inbox",
                color: "success",
                open: true,
                y: "bottom"
              });
            }
          },
          e => {
            this.loadResend = false;
            this.error = e.response.data.message;
          }
        );
    }
  },
  computed: mapGetters(["get_confirm_email"]),
  created() {
    if (this.get_confirm_email == "" || this.get_confirm_email == null) {
      this.$router.push({ name: "login" });
    }
  }
};
</script>