<template>
  <v-container>
    <v-dialog v-model="get_dialog_login" persistent width="800">
      <v-card>
        <v-alert v-if="errors.text.length>0" :type="errors.type">{{ errors.text }}</v-alert>
        <v-tabs
          fixed-tabs
          icon-and-text
          dark
          icons-and-text
          background-color="blue lighten-1"
          v-model="tabs"
        >
          <v-tab href="#tab-1">
            login
            <v-icon>mdi-lock-open-variant</v-icon>
          </v-tab>
          <v-tab href="#tab-2">
            register
            <v-icon>mdi-account-edit</v-icon>
          </v-tab>
          <v-tabs-items v-model="tabs">
            <v-tab-item :value="'tab-1'">
              <v-card color="blue lighten-4" class="d-flex justify-center">
                <v-card flat class="px-5 pt-12 pb-12 ma-4" width="450">
                  <v-form ref="login">
                    <v-text-field
                      prepend-icon="mdi-email"
                      outlined
                      label="Email"
                      v-model="user.username"
                      :rules="[rules.required]"
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
                </v-card>
              </v-card>
            </v-tab-item>

            <v-tab-item :value="'tab-2'">
              <v-form ref="register">
                <v-card flat class="px-5 pt-12 pb-12">
                  <v-row id="register">
                    <v-flex class="pa-2">
                      <v-text-field
                        prepend-icon="mdi-email"
                        outlined
                        label="Email"
                        v-model="register_user.user.email"
                        :rules="[rules.required,rules.email]"
                      ></v-text-field>

                      <v-text-field
                        prepend-icon="mdi-account-lock"
                        label="Password"
                        outlined
                        type="password"
                        v-model="register_user.user.password"
                        :rules="[rules.required,rules.password]"
                      ></v-text-field>
                      <v-text-field
                        prepend-icon="mdi-account-lock"
                        label="Password Confirm"
                        outlined
                        type="password"
                        v-model="register_user.user.password_confirm"
                        :rules="ruleMatch"
                      ></v-text-field>
                      <v-overflow-btn
                        outlined
                        label="Select Country"
                        target="#register"
                        width="auto"
                        :items="get_countries"
                        prepend-icon="mdi-city"
                        v-model="register_user.country"
                        item-value="id"
                        :loading="loadingCountries"
                        :rules="[rules.required]"
                        item-text="name"
                      ></v-overflow-btn>
                      <v-text-field
                        prepend-icon="mdi-account-lock"
                        label="Phone"
                        outlined
                        v-model="register_user.phone_number"
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-flex>
                    <v-flex class="pa2 pr-4">
                      <v-text-field
                        prepend-icon="mdi-account-lock"
                        label="Name"
                        outlined
                        v-model="register_user.user.name"
                        :rules="[rules.required]"
                      ></v-text-field>
                      <v-text-field
                        prepend-icon="mdi-account-lock"
                        label="Surname"
                        outlined
                        v-model="register_user.user.surname"
                        :rules="[rules.required]"
                      ></v-text-field>
                      <v-text-field
                        prepend-icon="mdi-account-lock"
                        label="WhatsApp contact"
                        outlined
                        v-model="register_user.phone_number2"
                      ></v-text-field>
                      <v-textarea
                        prepend-icon="mdi-account-lock"
                        label="Address"
                        outlined
                        v-model="register_user.address"
                        :rules="[rules.required]"
                      ></v-textarea>
                      <v-flex class="d-flex justify-center">
                        <v-btn
                          depressed
                          color="blue"
                          @click="register"
                          :loading="loadingRegister"
                          class="white--text"
                        >
                          <v-icon left>mdi-account-edit</v-icon>Register
                        </v-btn>
                      </v-flex>
                    </v-flex>
                  </v-row>
                </v-card>
              </v-form>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-card>
      <v-divider></v-divider>
      <v-btn depressed color="pink darken-1" @click="showLogIn" class="white--text">Close</v-btn>
    </v-dialog>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    tabs: null,
    dialog_login: true,
    errors: {
      text: [],
      type: ""
    },
    user: {
      username: "",
      password: ""
    },
    register_user: {
      user: {
        name: "",
        surname: "",
        password: "",
        email: "",
        password_confirm: ""
      },
      phone_number: "",
      phone_number2: "",
      address: "",
      address2: "None",
      country: ""
    },
    loading: false,
    loadingCountries: false,
    loadingRegister: false,

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
    ...mapActions(["login", "Register", "showLogIn", "getCountries"]),
    //__________________login___________________________
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
            this.$router.go();
          }
          this.loading = false;
        } catch {
          this.errors.text = "FAID TO CONNETCT";
          this.errors.type = "error";
          this.loading = false;
        }
      }
    },
    //___________________________________register_____________________________
    async register() {
      if (this.$refs.register.validate()) {
        this.loadingRegister = true;
        let data;
        data = await this.Register(this.register_user);
        if (data.status == "201") {
          this.errors.text.push("Thank you for registering");
          this.errors.type = "success";
          this.loadingRegister = false;
          return;
        }
        if (data.status == "400") {
          this.errors.text = [];
          data.data.user.non_field_errors.forEach(element => {
            this.errors.text.push(element);
            this.errors.type = "error";
          });
        }
        this.loadingRegister = false;
      }
    }
  },
  mounted() {
    this.loadingCountries = true;
    this.getCountries().then(() => {
      this.loadingCountries = false;
    });
  },
  computed: {
    ...mapGetters(["get_dialog_login", "get_countries"]),
    ruleMatch() {
      const rules = [];
      if (this.register_user.user.password) {
        const rule = v =>
          (!!v && v) === this.register_user.user.password ||
          "Password did not match";
        rules.push(rule);
      }
      return rules;
    }
  }
};
</script>
