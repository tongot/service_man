<template>
  <v-container>
    <v-card flat>
      <div class="d-flex justify-center mb-4">
        <v-avatar color="blue" size="70">
          <v-icon class="display-3 white--text">mdi-account-edit</v-icon>
        </v-avatar>
      </div>
      <v-alert v-if="errors.text.length>0" :type="errors.type">{{ errors.text }}</v-alert>
      <v-form ref="formEdit">
        <v-row v-if="user!=null" id="register">
          <v-flex class="pa-2">
            <v-text-field
              prepend-icon="mdi-email"
              outlined
              label="Email"
              v-model="user.email"
              :rules="[rules.required,rules.email]"
              disabled
            ></v-text-field>
            <v-overflow-btn
              outlined
              label="Select Country"
              target="#register"
              width="auto"
              :loading="loadingCountries"
              :items="get_countries"
              prepend-icon="mdi-city"
              v-model="user.country"
              :item-value="user.countryId"
              :rules="[rules.required]"
              item-text="name"
            ></v-overflow-btn>
            <v-text-field
              prepend-icon="mdi-account-lock"
              label="Phone"
              outlined
              v-model="user.phone_number"
              :rules="[rules.required]"
            ></v-text-field>
          </v-flex>
          <v-flex class="pa2 pr-4">
            <v-text-field
              prepend-icon="mdi-account-lock"
              label="Name"
              outlined
              v-model="user.name"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              prepend-icon="mdi-account-lock"
              label="Surname"
              outlined
              v-model="user.surname"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              prepend-icon="mdi-account-lock"
              label="WhatsApp contact"
              outlined
              v-model="user.phone_number2"
            ></v-text-field>
            <v-textarea
              prepend-icon="mdi-account-lock"
              label="Address"
              outlined
              v-model="user.address"
              :rules="[rules.required]"
            ></v-textarea>
            <v-flex class="d-flex justify-center">
              <v-btn
                @click="postEdit()"
                :loading="loading"
                depressed
                color="blue"
                class="white--text"
              >
                <v-icon left>mdi-account-edit</v-icon>Edit
              </v-btn>
            </v-flex>
          </v-flex>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  data: () => ({
    loadingCountries: false,
    loading: false,
    errors: {
      text: "",
      type: ""
    },

    user: {},
    rules: {
      required: v => !!v || "this field is required",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    }
  }),
  methods: {
    ...mapActions(["getUserDetails", "notify", "getCountries"]),
    setUser(user) {
      this.user = user;
    },
    postEdit() {
      if (this.$refs.formEdit.validate()) {
        let country = this.get_countries.filter(
          item => item.name == this.user.country
        );

        this.loading = true;
        axios
          .patch(
            "http://localhost:8081/account_api/account/" +
              this.user.user_detail_id +
              "/",
            {
              user: {
                id: this.user.id,
                email: this.user.email,
                name: this.user.name,
                surname: this.user.surname
              },
              id: this.user.user_detail_id,
              address: this.user.address,
              address2: this.user.address2,
              phone_number: this.user.phone_number,
              phone_number2: this.user.phone_number2,
              country: country[0].id
            }
          )
          .then(
            response => {
              this.loading = false;
              if (response.status === 201) {
                this.getUserDetails();
                this.$router.push({ name: "account-detail" });
                this.notify({
                  text: "saved :-)",
                  color: "success",
                  open: true,
                  y: "bottom"
                });
              }
            },
            e => {
              this.loading = false;
              console.log(e.response);
            }
          );
      }
    }
  },
  computed: mapGetters(["get_countries", "get_user"]),
  mounted() {
    this.loadingCountries = true;
    this.getCountries().then(() => {
      this.loadingCountries = false;
    });
    let user = new this.setUser(this.get_user);
    this.user = user.user;
  }
};
</script>