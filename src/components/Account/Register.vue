<template>
  <div>
    <v-row>
      <v-col md="5" sm="12" cols="12" class="picture-container">
        <div class="side-pic"></div>
        <h4 class="white--text font-weight-thin display-4 header1">Tshwaragano</h4>
      </v-col>
      <v-col md="7" sm="12" cols="12">
        <v-form ref="register" class="registerForm">
          <v-card width="900" flat class="registerCard">
            <div class="d-flex justify-center mb-4">
              <v-avatar color="blue" size="70">
                <v-icon class="display-3 white--text">mdi-account-edit</v-icon>
              </v-avatar>
            </div>
            <v-alert v-if="errors.text.length>0" :type="errors.type">{{ errors.text }}</v-alert>
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
          <v-card class="font-weight-light display-1 text" flat>
            <span>Lets Do business together</span>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    errors: {
      text: [],
      type: ""
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
    ...mapActions(["getCountries", "Register"]),
    async register() {
      if (this.$refs.register.validate()) {
        this.loadingRegister = true;
        let data;
        data = await this.Register(this.register_user);
        try {
          if (data.status == "201") {
            this.$router.push({ name: "confirm-email" });
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
        } catch (error) {
          console.log(error.response);
        }
      }
    }
  },

  computed: {
    ...mapGetters(["get_countries"]),
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
  },
  mounted() {
    this.loadingCountries = true;
    this.getCountries().then(() => {
      this.loadingCountries = false;
    });
  }
};
</script>
<style>
</style>