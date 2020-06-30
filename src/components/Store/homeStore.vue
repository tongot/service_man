<template>
  <v-row>
    <v-col cols="12" md="6" sm="12">
      <v-card style="background: rgba(0,0,0,.5);" class="mx-auto" width="400">
        <v-row justify="center">
          <v-col>
            <v-img width="300" class="mx-auto" height="300" :src="get_business.business_logo"></v-img>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="d-flex justify-center">
              <h4 class="text-uppercase grey--text my-5">{{get_business.name}}</h4>
            </div>
            <div class="d-flex justify-center">
              <v-btn fab class="mx-1 font-weight-light">
                <v-icon>mdi-facebook</v-icon>
              </v-btn>
              <v-btn fab class="mx-1">
                <v-icon>mdi-instagram</v-icon>
              </v-btn>
              <v-btn fab class="mx-1">
                <v-icon>mdi-twitter</v-icon>
              </v-btn>
            </div>
            <p class="mx-3 grey--text" style="text-align: center;">{{get_business.description}}</p>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="12" md="6" sm="12">
      <v-card style="background: rgba(0,0,0,.5);" class="mx-auto" max-width="700">
        <v-row>
          <v-col>
            <v-card style="background: rgba(0,0,0,0);" flat class="mx-4">
              <div>
                <h4 class="grey--text font-weight-light display-2">
                  Welcome
                  <span>
                    <v-icon class="display-1" color="grey">mdi-exclamation-thick</v-icon>
                  </span>
                </h4>
              </div>
              <p class="font-weight-light grey--text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Soluta esse laudantium hic dolore dignissimos, eius voluptate! Ex,
                perspiciatis temporibus laboriosam ullam optio facere cum dolore,
                consequatur beatae est tempora velit.
              </p>

              <h3 class="grey--text font-weight-light display-1">Our quick contact</h3>
              <v-row class="justify-space-around align-start">
                <v-col class="d-flex">
                  <v-card
                    v-for="contact in get_business.contact_person"
                    :key="contact.id"
                    max-width="344"
                    style="background: rgba(0,0,0,0);"
                    class="ma-1"
                    outlined
                  >
                    <v-list-item two-line>
                      <v-list-item-content>
                        <div
                          class="overline mb-4 white--text"
                        >{{contact.first_name+" "+contact.last_name }}</div>
                        <v-list-item-subtitle class="white--text">
                          <span>
                            <v-icon></v-icon>
                          </span>
                          {{contact.phone}}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-avatar tile size="80" color="purple">
                        <v-icon color="white">mdi-card-account-phone</v-icon>
                      </v-list-item-avatar>
                    </v-list-item>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: mapGetters(["get_business"])
};
</script>