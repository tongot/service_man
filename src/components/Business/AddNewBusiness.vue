<template>
  <v-container class="mx-5">
    <!-- add directors windows-->
    <v-dialog max-width="900" class="pa-2" persistent v-model="modalDirectors">
      <v-card>
        <v-card-title>
          Directors
          <v-spacer></v-spacer>
          <v-btn icon @click="closeDirectorWindow()">
            <v-icon color="pink darken-1">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6" sm="12" class="pa-2">
              <v-card class="pa-2" outlined>
                <v-card-text>
                  <v-form ref="addDirector">
                    <v-text-field
                      :rules="[rules.required]"
                      v-model="director.first_name"
                      label="Director name"
                    ></v-text-field>
                    <v-text-field
                      :rules="[rules.required]"
                      v-model="director.last_name"
                      label="Director lastname"
                    ></v-text-field>
                    <v-textarea
                      :rules="[rules.required]"
                      v-model="director.about_director"
                      label="About Director"
                    ></v-textarea>
                    <v-text-field v-model="director.social_links" label="Add Social links"></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="success" @click="addDirector()" depressed>
                    <v-icon>mdi-account-multiple-plus</v-icon>Add
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <v-list dense outlined>
                <v-list-item-group>
                  <span v-for="(director,index) in business.directors" :key="index">
                    <v-list-item v-show="director.id>=0||typeof(director.id)=='undefined'">
                      <v-list-item-title
                        @click="(directorEdit(index))"
                      >{{director.first_name+" "+director.last_name}}</v-list-item-title>
                      <v-list-item-action>
                        <v-btn color="pink darken-1" @click="removeDirector(index)" fab small>
                          <v-icon class="white--text">mdi-account-multiple-minus</v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </span>
                </v-list-item-group>
              </v-list>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="modalDirectors=false" depressed>done</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--
    contact person window-->
    <v-dialog max-width="900" class="pa-2" persistent v-model="modalContact">
      <v-card>
        <v-card-title>
          Contact Person
          <v-spacer></v-spacer>
          <v-btn icon @click="closeContactWindow()">
            <v-icon color="pink darken-1">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6" sm="12" class="pa-2">
              <v-card class="pa-2" outlined>
                <v-card-text>
                  <v-form ref="addContact">
                    <v-text-field
                      :rules="[rules.required]"
                      v-model="contactPerson.first_name"
                      label="Name"
                    ></v-text-field>
                    <v-text-field
                      :rules="[rules.required]"
                      v-model="contactPerson.last_name"
                      label="Lastname"
                    ></v-text-field>
                    <v-text-field
                      :rules="[rules.required]"
                      v-model="contactPerson.phone"
                      label="Phone"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="success" @click="addContact()" depressed>
                    <v-icon>mdi-account-multiple-plus</v-icon>Add
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <v-list dense outlined>
                <v-list-item-group>
                  <span v-for="(contact,index) in business.contact_person" :key="index">
                    <v-list-item v-show="contact.id>=0||typeof(contact.id)=='undefined'">
                      <v-list-item-title
                        @click="contactEdit(index)"
                      >{{contact.first_name+" "+contact.last_name}}</v-list-item-title>
                      <v-list-item-action>
                        <v-btn color="pink darken-1" @click="removeContact(index)" fab small>
                          <v-icon class="white--text">mdi-account-multiple-minus</v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </span>
                </v-list-item-group>
              </v-list>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="modalContact=false" depressed>done</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--
        main window
    -->

    <v-form ref="form_data">
      <v-row class="mt-2">
        <v-flex md8 lg8 class="pa-2">
          <v-row>
            <v-flex md12 lg12>
              <h3 class="headline">Business Logo</h3>
              <v-divider></v-divider>
            </v-flex>
            <v-flex md10 lg10 class="pa-4">
              <v-alert v-if="error.text!=''" dense border="left" :type="error.color">{{error.text}}</v-alert>
              <v-card flat max-width="500" max-height="500" min-height="200" min-width="200">
                <img ref="image" :src="url" style="max-height:500px; max-width:500px" />
                <v-card
                  flat
                  class="mb-1 d-flex justify-center"
                  max-height="100"
                  max-width="100"
                  style="margin-top:-100px"
                  v-if="disable_btn_upload==false"
                >
                  <img :src="destination_image" style="max-height:100px; max-width:170px;" />
                </v-card>
              </v-card>
              <v-file-input
                v-if="disable_btn_upload==true"
                ref="image_input"
                label="Click to upload image"
                accept="image/png, image/jpeg"
                prepend-icon="mdi-camera"
                @change="AddImage"
                v-model="selected_image"
                outlined
                class="mt-4"
              ></v-file-input>
              <v-row>
                <v-flex class="pa-2">
                  <v-btn
                    color="pink darken-1"
                    class="ma-2 white--text"
                    block
                    depressed
                    :disabled="disable_btn_upload"
                    @click="cancelUpload"
                  >
                    Cancel
                    <v-icon right dark>mdi-close-circle</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex class="pa-2">
                  <v-btn
                    color="blue"
                    class="ma-2 white--text"
                    block
                    depressed
                    :disabled="disable_btn_upload"
                    @click="upload"
                  >
                    Upload Logo
                    <v-icon right dark>mdi-cloud-upload</v-icon>
                  </v-btn>
                </v-flex>
              </v-row>
            </v-flex>
            <v-flex md2 lg2 class="py-4">
              <h5>Selected logo</h5>
              <v-card
                v-for="image in images_to_post"
                :key="image"
                outlined
                class="mb-1 d-flex justify-center"
                @mouseenter="showRemove"
                @mouseleave="showRemove"
              >
                <img :src="image" style="max-height:100%; max-width:100%" />
                <v-overlay absolute opacity=".7" :value="overlay" z-index="5">
                  <v-btn icon color="pink darken-1" @click="removeFromList(image)">
                    <v-icon>mdi-close-circle</v-icon>
                  </v-btn>
                </v-overlay>
              </v-card>
            </v-flex>
          </v-row>
        </v-flex>
      </v-row>
      <v-row>
        <v-flex md12 lg12></v-flex>
        <v-flex md6 lg6 class="pa-2" id="busineeInfor">
          <v-card class="pa-2" flat outlined>
            <v-card-title>Business Reg Information</v-card-title>
            <v-text-field
              prepend-icon="mdi-google-my-business"
              label="Business Name/Organisation"
              outlined
              v-model="business.name"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              prepend-icon="mdi-google-my-business"
              label="Articles of association No."
              outlined
              v-model="business.articles_number"
              :rules="[rules.required]"
            ></v-text-field>
            <v-textarea
              prepend-icon="mdi-details"
              label="Decription"
              outlined
              v-model="business.description"
              :rules="[rules.required]"
            ></v-textarea>
            <v-overflow-btn
              outlined
              label="Select your business line"
              target="#busineeInfor"
              width="auto"
              :items="get_businessCategory"
              prepend-icon="mdi-city"
              v-model="categoryId"
              item-value="id"
              item-text="name"
              :rules="[rules.required]"
            ></v-overflow-btn>
            <v-overflow-btn
              outlined
              label="Select your city"
              target="#busineeInfor"
              width="auto"
              :items="get_locations"
              prepend-icon="mdi-city"
              v-model="location_id"
              item-value="id"
              item-text="city"
              :rules="[rules.required]"
            ></v-overflow-btn>
            <h4 class="headline"></h4>
            <v-card class="mt-4 pa-4" outlined>
              <v-card-title>
                directors
                <v-spacer></v-spacer>
                <v-btn color="success" @click="modalDirectors=true" fab>
                  <v-icon>mdi-account-multiple-plus</v-icon>
                </v-btn>
              </v-card-title>
              <span v-for="(dir,index) in business.directors" :key="index">
                <v-chip pill v-show="dir.id>=0||typeof(dir.id)=='undefined'">
                  <v-avatar>
                    <v-icon>mdi-account-circle</v-icon>
                  </v-avatar>
                  {{dir.first_name+" "+dir.last_name}}
                </v-chip>
              </span>
            </v-card>
          </v-card>
        </v-flex>
        <v-flex md6 lg6 class="pa-2">
          <v-card class="pa-2" flat outlined>
            <v-card-title>Contact information</v-card-title>
            <v-text-field
              prepend-icon="mdi-email"
              label="Email address"
              outlined
              v-model="business.email"
              :rules="[rules.required,rules.email]"
            ></v-text-field>
            <v-textarea
              min-height="400"
              prepend-icon="mdi-mailbox"
              label="Address"
              outlined
              v-model="business.address"
              :rules="[rules.required]"
            ></v-textarea>
            <v-text-field
              prepend-icon="mdi-deskphone"
              label="Business Line"
              outlined
              v-model="business.phone"
              :rules="[rules.required]"
            ></v-text-field>
            <v-card class="mt-4 pa-4" outlined>
              <v-card-title>
                Contact Person
                <v-spacer></v-spacer>
                <v-btn color="success" @click="modalContact=true" fab>
                  <v-icon>mdi-account-multiple-plus</v-icon>
                </v-btn>
              </v-card-title>
              <span v-for="(cont,index) in business.contact_person" :key="index">
                <v-chip v-show="cont.id>=0||typeof(cont.id)=='undefined'" pill>
                  <v-avatar>
                    <v-icon>mdi-account-circle</v-icon>
                  </v-avatar>
                  {{cont.first_name+" "+cont.last_name}}
                </v-chip>
              </span>
            </v-card>
          </v-card>
        </v-flex>
      </v-row>
      <v-alert type="warning" v-if="alert.show">{{alert.text}}</v-alert>
      <v-row>
        <v-flex md12 lg12 class="d-flex justify-end">
          <v-btn :loading="loading" color="success" @click="postBusiness()">save business</v-btn>
        </v-flex>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
import Cropper from "cropperjs";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  name: "add_new_product",
  data: () => ({
    isEditing: false,
    editingContact: false,
    modalDirectors: false,
    modalContact: false,
    location_id: 0,
    categoryId: 0,
    cropper: {},
    image: null,
    destination_image: null,
    url: "",
    canvas_logo: null,
    selected_image: null,
    disable_btn_upload: true,
    cropped_image: null,
    images_to_post: [],
    overlay: false,
    error: {
      text: "",
      color: ""
    },
    alert: {
      show: false,
      text: ""
    },
    loading: false,
    business: {
      business_logo: null,
      id: null,
      articles_number: "",
      email: "",
      name: "",
      description: "",
      city: null,
      address: "",
      phone: "",
      contact_person: [],
      directors: []
    },
    contactPerson: {
      id: 0,
      first_name: "",
      last_name: "",
      phone: ""
    },
    director: {
      id: 0,
      first_name: "",
      last_name: "",
      about_director: "",
      social_links: ""
    },
    //validations for the form
    rules: {
      required: value => !!value || "This field is requierd.",
      counter: value => value.length <= 20 || "Max 20 characters",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    }
  }),

  methods: {
    ...mapActions([
      "getLocations",
      "getBusinessById",
      "getBusinessCategory",
      "notify"
    ]),

    //______________________________________contact window____________________________________________
    addContact() {
      if (this.$refs.addContact.validate()) {
        if (this.editingContact == true) {
          this.editingContact == false;
          this.contactPerson = {};
        } else {
          this.business.contact_person.push(this.contactPerson);
          this.contactPerson = {};
        }
      }
    },
    removeContact(index) {
      if (this.isEditing) {
        this.business.contact_person[index].id =
          -1 * this.business.contact_person[index].id;
        if (this.business.contact_person[index].id == 0) {
          this.business.contact_person.splice(index, 1);
        }
      } else {
        this.business.contact_person.splice(index, 1);
      }
    },
    closeContactWindow() {
      this.modalContact = false;
    },
    contactEdit(index) {
      if (this.isEditing) {
        this.editingContact = true;
        this.contactPerson = this.business.contact_person[index];
      }
    },
    //______________________________________directors window____________________________________________
    addDirector() {
      if (this.$refs.addDirector.validate()) {
        this.business.directors.push(this.director);
        this.director = {};
      }
    },

    removeDirector(index) {
      if (this.isEditing) {
        this.business.directors[index].id =
          -1 * this.business.directors[index].id;
        if (this.business.directors[index].id == 0) {
          this.business.directors.splice(index, 1);
        }
      } else {
        this.business.directors.splice(index, 1);
      }
    },
    closeDirectorWindow() {
      this.modalDirectors = false;
    },
    directorEdit(index) {
      if (this.isEditing) {
        this.editingContact = true;
        this.director = this.business.directors[index];
      }
    },
    //____________________________________________________________________________________________________
    AddImage() {
      if (this.selected_image != null) {
        this.url = URL.createObjectURL(this.selected_image);
        if (this.url != "") {
          this.image = this.$refs.image;
        }
        setTimeout(() => {
          this.setCropper();
        }, 1000);
      } else {
        this.resetUpload();
      }
    },
    setCropper() {
      this.cropper = new Cropper(this.image, {
        zoomable: false,
        scalable: false,
        aspectRatio: 1
      });
      this.disable_btn_upload = false;
    },
    upload() {
      this.error.text = "";
      if (this.images_to_post.length === 1) {
        this.error.text =
          "You have reached maxmum images allowed remove the other to change";
        this.error.color = "warning";
        return;
      }
      const canvas = this.cropper.getCroppedCanvas();
      this.destination_image = canvas.toDataURL("image/png");
      this.canvas_logo = canvas;
      this.images_to_post.push(this.destination_image);
      this.resetUpload();
    },
    cancelUpload() {
      this.resetUpload();
    },
    resetUpload() {
      this.cropper.destroy();
      this.disable_btn_upload = true;
      this.destination_image = null;
      this.selected_image = null;
      this.url = "";
    },
    showRemove() {
      this.overlay = this.overlay == true ? false : true;
    },
    removeFromList(image) {
      this.error.text = "";
      let img = this.images_to_post.indexOf(image);
      this.images_to_post.splice(img, 1);
    },
    async postBusiness() {
      this.alert.show = false;
      if (
        this.business.contact_person.length < 1 ||
        this.business.directors.length < 1
      ) {
        this.alert.show = true;
        this.alert.text = "Provide at least 1 director 1 contact person";
        return;
      }
      if (
        this.business.contact_person.filter(item => item.id > -1).length < 1
      ) {
        this.alert.show = true;
        this.alert.text = "No contact(s) person provided";
        return;
      }
      if (this.business.directors.filter(item => item.id > -1).length < 1) {
        this.alert.show = true;
        this.alert.text = "No director(s) provided";
        return;
      }
      console.log(JSON.stringify(this.business.directors));
      console.log(this.business);
      if (this.$refs.form_data.validate()) {
        this.loading = true;
        let response;
        const formData = new FormData();
        if (Object.keys(this.cropper).length !== 0) {
          this.canvas_logo.toBlob(blob => {
            formData.append("business_logo", blob, "business_logo.png");
          }, "image/png");
        }

        setTimeout(async () => {
          if (this.isEditing) {
            formData.append("id", this.business.id);
          }
          formData.append("articles_number", this.business.articles_number);
          formData.append("directorJ", JSON.stringify(this.business.directors));
          formData.append(
            "contactJ",
            JSON.stringify(this.business.contact_person)
          );
          formData.append("name", this.business.name);
          formData.append("location", this.location_id);
          formData.append("category", this.categoryId);
          formData.append("email", this.business.email);
          formData.append("description", this.business.description);
          formData.append("phone", this.business.phone);
          formData.append("address", this.business.address);
          formData.append("owner", this.get_user.id);

          try {
            if (this.isEditing) {
              response = await axios.put(
                "/business_api/business/" + this.business.id + "/",
                formData
              );
            } else {
              response = await axios.post("/business_api/business/", formData);
            }
            if (response.status == "201" || response.status == "200") {
              this.loading = false;
              this.notify({
                text: "Saved :-)",
                color: "success",
                open: true
              });
              this.$router.push({ name: "my-business" });
            } else {
              this.loading = false;
              console.log(response.data);
            }
          } catch (e) {
            this.loading = false;
            console.log(e.response);
          }
        }, 500);
      }
    }
  },
  computed: mapGetters([
    "get_locations",
    "get_user",
    "get_business",
    "get_businessCategory"
  ]),
  created() {
    if (typeof this.$route.params.businessId != "undefined") {
      this.isEditing = true;
      this.getBusinessById(this.$route.params.businessId).then(() => {
        this.business = this.get_business;
        if (this.business.business_logo != null) {
          this.images_to_post.push(this.business.business_logo);
        }
        this.location_id = this.business.location;
        this.categoryId = this.business.category;
      });
    }
  },
  mounted() {
    this.getLocations();
    this.getBusinessCategory();
  }
};
</script>