 <template>
  <v-container>
    <v-dialog width="400" v-model="deleteDialog">
      <v-card>
        <v-card-title>Delete Business</v-card-title>
        <v-card-text>Are you sure you want to delete this business. Please not that all the associated products will be removed as well</v-card-text>
        <v-card-actions>
          <v-btn color="error" :loading="loadingDelete" @click="deleteBus()" depressed>
            <v-icon left>mdi-delete</v-icon>Delete
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="deleteDialog=!deleteDialog" color="success" depressed>Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card class="pa-2 mb-2" v-for="bus in get_ownBusiness" :key="bus.id" outlined flat>
      <v-card-title>
        <v-btn text :to="{name:'about-business',params:{businessId:bus.id}}">
          <span>{{bus.name}}</span>
        </v-btn>

        <v-chip>{{bus.category_detail.name}}</v-chip>
        <v-spacer></v-spacer>
        <v-btn
          :to="{name:'business-orders',params:{businessId:bus.id}}"
          depressed
          color="purple"
          small
          class="mr-1 white--text"
        >orders</v-btn>
        <v-btn
          :to="{name:'own-product-list', params:{businessId:bus.id}}"
          depressed
          small
          color="success"
          class="mr-1"
        >View Products</v-btn>
        <v-btn
          :to="{name:'product-new', params:{businessId:bus.id}}"
          depressed
          small
          class="mr-1"
          color="primary"
        >Add product</v-btn>
        <v-btn icon color="green darken-1" :to="{name:'business-edit',params:{businessId:bus.id}}">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="deleteB(bus.id)" color="pink darken-1">
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
  data: () => ({
    businessId: 0,
    deleteDialog: false,
    loadingDelete: false
  }),
  methods: {
    ...mapActions(["getOwnBusiness", "deleteBusiness", "notify"]),
    getDate(date) {
      return formartDate(date);
    },
    deleteB(id) {
      this.businessId = id;
      this.deleteDialog = true;
    },
    deleteBus() {
      this.loadingDelete = true;
      this.deleteBusiness(this.businessId).then(() => {
        this.loadingDelete = false;
        this.deleteDialog = false;
        this.notify({
          text: "Bussine deleted :)",
          color: "success",
          y: "bottom",
          open: true
        });
      });
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