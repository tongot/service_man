 <template>
  <v-row>
    <v-dialog v-model="dialogChangePass" persistent width="400">
      <v-card>
        <v-card-title>Change password</v-card-title>
        <v-card-text>
          <v-form ref="formChangePassword">
            <v-alert v-if="errorPassword!=''" type="warning">{{errorPassword}}</v-alert>
            <v-text-field
              outlined
              v-model="password.oldPassword"
              placeholder="Old password"
              :rules="[rules.required]"
              type="password"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="password.newPassword"
              placeholder="New password"
              :rules="[rules.required,rules.password]"
              type="password"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="password.confirmPassword"
              placeholder="Confirm password"
              :rules="ruleMatch"
              type="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed small class="error" @click="cancelChange()">cancel</v-btn>
          <v-btn
            depressed
            small
            class="success"
            @click="changePassword()"
            :loading="loadPassChange"
          >change</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog persistent v-model="get_email_dialog" width="500">
      <v-card>
        <v-card-title>
          Change email from {{get_user.email}}
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
          <v-btn class="error" @click="setEmailDialog()">cancel</v-btn>
          <v-btn class="success" :loading="loadChangeEmail" @click="changeEmail()">change</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-col cols="12" md="6" sm="12">
      <v-card outlined>
        <v-row justify="center">
          <v-icon class="display-2 ma-5">mdi-account</v-icon>
        </v-row>
        <v-card-text>
          <h3>Name</h3>
          <p class="text-capitalize">{{get_user.name}} {{get_user.surname}}</p>
          <h3>Email</h3>
          <v-btn text color="primary" @click="showLogIn('change-email')" small>
            {{get_user.email}}
            <v-icon right>mdi-pencil</v-icon>
          </v-btn>

          <h3>Region</h3>
          <p class="text-capitalize">{{get_user.country}}</p>
          <h3>Password</h3>
          <v-chip small pill @click="dialogChangePass=!dialogChangePass">change password</v-chip>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="6" sm="12">
      <v-card outlined>
        <v-row justify="center">
          <v-icon class="display-2 ma-5">mdi-card-account-phone</v-icon>
        </v-row>
        <v-card-text>
          <h3>Contact Phone</h3>
          <p class="text-capitalize">{{get_user.phone_number}}</p>
          <h3>Contact Whats app number</h3>
          <p class="text-capitalize">{{get_user.phone_number2}}</p>
          <h3>Address</h3>
          <address class="text-capitalize">{{get_user.address}}</address>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  data: () => ({
    errorPassword: "",
    password: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    },
    loadPassChange: false,
    dialogChangePass: false,
    error: "",
    userEmailInput: false,
    loadChangeEmail: false,
    newEmail: "",
    rules: {
      required: v => !!v || "this field is required",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
      password: v => {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/;
        return pattern.test(v) || "your password is too weak";
      }
    }
  }),
  methods: {
    ...mapActions([
      "setConfirmEmail",
      "logout",
      "notify",
      "showLogIn",
      "setEmailDialog"
    ]),
    changePassword() {
      this.errorPassword = "";
      if (this.$refs.formChangePassword.validate()) {
        this.loadPassChange = true;
        axios
          .post("/account_api/change-password/", {
            user: this.get_user.email,
            password: this.password.oldPassword,
            new_password: this.password.newPassword,
            password_confirm: this.password.confirmPassword
          })
          .then(
            response => {
              console.log(response);
              if (
                response.status === 200 &&
                response.data.message == "password_changed"
              ) {
                this.notify({
                  text: "Password change was successful",
                  open: true,
                  y: "bottom",
                  color: "success"
                });
              } else {
                this.errorPassword = response.data.message;
              }
              this.loadPassChange = false;
            },
            e => {
              console.log(e);
              this.errorPassword = e.response.data.message;
              this.loadPassChange = false;
            }
          );
      }
    },
    cancelChange() {
      this.dialogChangePass = !this.dialogChangePass;
      this.password.oldPassword = "";
      this.password.newPassword = "";
      this.password.confirmPassword = "";
    },
    changeEmail() {
      this.error = "";
      this.loadChangeEmail = true;
      axios
        .patch("/account_api/confirm-email/", {
          user: this.get_user.email,
          newEmail: this.newEmail
        })
        .then(
          response => {
            if (response.status === 200) {
              this.setConfirmEmail(this.newEmail);
              this.loadChangeEmail = false;
              this.notify({
                text: "Email resend, Please check your inbox",
                color: "success",
                open: true,
                y: "bottom"
              });
              this.logout(true);
            } else {
              this.error = response.data.message;
            }
          },
          e => {
            this.loadChangeEmail = false;
            this.error = e.response.data.message;
          }
        );
    }
  },
  computed: {
    ...mapGetters(["get_user", "get_email_dialog"]),
    ruleMatch() {
      const rules = [];
      if (this.password.newPassword) {
        const rule = v =>
          (!!v && v) === this.password.newPassword || "Password did not match";
        rules.push(rule);
      }
      return rules;
    }
  }
};
</script>