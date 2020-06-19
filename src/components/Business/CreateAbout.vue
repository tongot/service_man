<template>
  <v-container>
    <v-card>
      <v-card-title>
        About your business
        <v-spacer></v-spacer>
        <v-btn icon :to="{name:'my-business'}">
          <v-icon color="pink darken-1">mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card outlined class="ma-4">
        <v-card-text>
          <span>
            You can read more about how to write about you business
            <a
              href="https://www.beamlocal.com/how-to-write-a-powerful-business-description-for-your-website/"
              target="_blank"
            >here</a>. You can use
            <a href="https://www.grammarly.com/" target="_blank">grammarly</a> to avoid grammar errors and just come back to paste your writting here
          </span>
        </v-card-text>
      </v-card>
      <v-card-text>
        <vue-editor class="mb-5" v-model="about.content" :editorToolbar="toolbar"></vue-editor>
        <h2>Select your business main color below</h2>
        <v-divider></v-divider>
        <v-row>
          <v-col class="d-flex justify-center">
            <v-color-picker v-model="about.color"></v-color-picker>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :loading="loading" color="success" @click="saveProfile()">
          <v-icon left>mdi-content-save</v-icon>save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { VueEditor } from "vue2-editor";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";

export default {
  components: {
    VueEditor
  },
  data: () => ({
    loading: false,
    about: {
      id: "",
      color: "",
      content: "",
      businessId: ""
    },
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" }
      ],
      ["link", "video"],
      [{ indent: "-1" }, { indent: "+1" }]
    ]
  }),
  methods: {
    ...mapActions(["getBusinessProfile", "getBusinessById", "notify"]),
    saveProfile() {
      if (this.about.id !== 0) {
        this.loading = true;
        axios
          .put(
            "/business_api/business_profiles/" + this.about.id + "/",
            {
              id: this.about.id,
              about: this.about.content,
              main_color: this.about.color,
              business: this.about.businessId
            },
            e => {
              console.log(e);
              this.loading = false;
            }
          )
          .then(() => {
            this.notify({
              text: "Saved :-)",
              color: "success",
              open: true
            });
            this.loading = false;
            this.$router.push({ name: "my-business" });
          })
          .catch(e => {
            console.log(e.response);
          });
      } else {
        this.loading = true;
        axios
          .post(
            "/business_api/business_profiles/",
            {
              about: this.about.content,
              main_color: this.about.color,
              business: this.about.businessId
            },
            e => {
              console.log(e.response);
              this.loading = false;
            }
          )
          .then(response => {
            if (response.status === 201) this.about.id = response.data.id;
            this.loading = false;
            this.notify({
              text: "Saved :-)",
              color: "success",
              open: true
            });
            this.$router.push({ name: "my-business" });
          })
          .catch(e => {
            console.log(e.response);
          });
      }
    }
  },
  computed: mapGetters(["get_ownBusiness"]),
  mounted() {
    this.about.businessId = this.$route.params.businessId;
    this.getBusinessById(this.about.businessId).then(respo => {
      axios
        .get("/business_api/business_profiles/" + respo.profile.id)
        .then(
          data => {
            this.about.color = data.data.main_color;
            this.about.content = data.data.about;
            this.about.id = data.data.id;
          },
          e => {
            if (e.response.status === 404) {
              this.about.id = 0;
            }
          }
        )
        .catch(e => {
          console.log(e.response);
        });
    });
  }
};
</script>