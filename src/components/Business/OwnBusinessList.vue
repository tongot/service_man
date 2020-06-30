 <template>
  <v-container>
    <v-card class="pa-2 mb-2" v-for="bus in get_ownBusiness" :key="bus.id" outlined flat>
      <v-card-title>
        <v-btn text :to="{name:'about-business',params:{businessId:bus.id}}">
          <span>{{bus.name}}</span>
        </v-btn>

        <v-chip>{{bus.category_detail.name}}</v-chip>
        <v-spacer></v-spacer>
        <v-btn
          text
          :to="{name:'own-product-list', params:{businessId:bus.id}}"
          depressed
          small
          color="success"
        >View Products</v-btn>
        <v-btn
          :to="{name:'product-new', params:{businessId:bus.id}}"
          depressed
          small
          color="primary"
        >Add product</v-btn>
        <v-btn icon color="green darken-1" :to="{name:'business-edit',params:{businessId:bus.id}}">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="pink darken-1">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-row>
        <v-flex md12 sm12 lg12 xl12 xs12 class>
          <v-card class="pa-2 ma-2" flat>
            <v-row>
              <v-flex md3 sm12 xs12 class="pa-1 d-flex justify-center">
                <v-img
                  v-if="bus.business_logo!==null"
                  :src="bus.business_logo"
                  height="200"
                  width="200"
                  aspect-ratio="1"
                  contain
                ></v-img>
              </v-flex>
              <v-flex md3 sm12 xs12 class="pa-2">
                <p>
                  <v-icon>mdi-details</v-icon>
                  {{bus.description}}
                </p>
                <p>
                  <v-icon>mdi-email</v-icon>
                  {{bus.email}}
                </p>
              </v-flex>
              <v-flex md3 sm12 xs12 class="pa-2">
                <h4>Contact details</h4>
                <p>
                  <v-icon color="blue">mdi-phone</v-icon>
                  {{bus.phone}}
                </p>

                <p>
                  <v-icon color="blue">mdi-mailbox</v-icon>
                  {{bus.address}}
                </p>
                <p>
                  <v-icon color="blue">mdi-city</v-icon>
                  {{bus.location_detail.city}} | {{bus.location_detail.country}}
                </p>
              </v-flex>
              <v-flex md3 sm12 xs12 class="pa-2">
                <v-list dense three-line>
                  <h4>Contact persons</h4>
                  <v-list-item-group>
                    <v-list-item v-for="contact in bus.contact_person" :key="contact.id">
                      <v-avatar
                        size="36"
                        class="text-uppercase white--text"
                        color="purple"
                      >{{contact.first_name[0]+" "+contact.last_name[0]}}</v-avatar>
                      <v-list-item-content>
                        <span
                          class="text-uppercase font-weight-regular caption"
                        >{{contact.first_name+" "+contact.last_name}}</span>

                        <div v-text="contact.phone"></div>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-flex>
            </v-row>
            <v-card class="pa-2" flat color="blue lighten-4">
              <div class="div-overflow">
                <span v-for="director in bus.directors" :key="director.id">
                  <v-chip class="text-capitalize">
                    <v-avatar
                      size="30"
                      class="text-uppercase"
                      color="blue white--text"
                    >{{director.first_name[0]+" "+director.last_name[0]}}</v-avatar>
                    {{director.first_name+" "+director.last_name}}
                  </v-chip>
                </span>
              </div>
              <v-row justify="space-around">
                <v-col cols="12" md="3" sm="12">
                  <h6 class="subtitle">Created:{{getDate(bus.date_created)}}</h6>
                </v-col>
                <v-col class="d-flex" cols="12" md="3" sm="12"></v-col>
                <v-col cols="12" md="3" sm="12" align="end">
                  <v-icon>mdi-star</v-icon>
                  <span>(455)</span>
                </v-col>
              </v-row>
            </v-card>
          </v-card>
        </v-flex>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { formartDate } from "../../scripts/otherScripts";
export default {
  data: () => ({}),
  methods: {
    ...mapActions(["getOwnBusiness"]),
    getDate(date) {
      return formartDate(date);
    }
  },

  mounted() {
    this.getOwnBusiness();
  },
  computed: mapGetters(["get_ownBusiness"])
};
</script>
<style scoped>
</style>