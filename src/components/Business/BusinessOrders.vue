<template>
  <v-container>
    <v-dialog width="700" v-model="dialog">
      <v-card>
        <v-card-title>Reason for declining</v-card-title>
        <v-card-text>
          <h4>this message will be sent to you client view email</h4>
          <v-form ref="formReason">
            <v-alert type="warning" v-if="error!=''">{{error}}</v-alert>
            <v-textarea :rules="[rules.required]" v-model="declineMessage"></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog=!dialog" depressed class="error">cancel</v-btn>
          <v-btn @click="postDecline()" :loading="loadingD" depressed class="success">continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-list>
      <v-card
        @click="viewOrder(index,order)"
        outlined
        v-for="(order,index) in get_orders"
        :key="order.id"
      >
        <v-list-group no-action>
          <template v-slot:activator>
            <v-avatar v-if="order.approved=='NEW'" size="10" color="blue"></v-avatar>
            <v-list-item-avatar>
              <v-avatar :color="isOrderViewed(order.viewed)" size="48">
                <span v-if="order.viewed==true" class="white--text">seen</span>
                <span v-if="order.viewed==false" class="white--text">new</span>
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <v-chip>
                  <strong>Product name :</strong>
                  {{order.product_detail.name}}
                </v-chip>
                <v-chip>
                  <strong>Customer name :</strong>
                  {{order.first_name+' '+order.last_name}}
                </v-chip>
              </v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item>
            <v-list-item-content>
              <v-row>
                <v-col md="6" xs="12" sm="12">
                  <dl>
                    <dt>
                      <strong>Country</strong>
                    </dt>
                    <dd>{{order.country}}</dd>
                    <v-divider></v-divider>
                    <br />
                    <dt>
                      <strong>Street Address</strong>
                    </dt>
                    <dd>{{order.street_address}}</dd>
                    <v-divider></v-divider>
                    <br />
                    <dt>
                      <strong>Street Address 2</strong>
                    </dt>
                    <dd>{{order.street_address2}}</dd>
                    <v-divider></v-divider>
                    <br />
                    <dt>
                      <strong>Email Address</strong>
                    </dt>
                    <dd>{{order.email_address}}</dd>
                    <v-divider></v-divider>
                    <br />
                    <dt>
                      <strong>Phone Number</strong>
                    </dt>
                    <dd>{{order.phone_number}}</dd>
                  </dl>
                </v-col>
                <v-col md="6" xs="12" sm="12">
                  <dl>
                    <dt>
                      <strong>Order Number</strong>
                    </dt>
                    <dd>
                      <v-chip pill small color="primary">{{order.id}}</v-chip>
                    </dd>
                    <v-divider></v-divider>
                    <br />
                    <dt>
                      <strong>Product Name</strong>
                    </dt>
                    <dd>{{order.product_detail.name}}</dd>
                    <v-divider></v-divider>
                    <br />
                    <dt>
                      <strong>Product Id</strong>
                    </dt>
                    <dd>{{order.product_detail.id}}</dd>
                    <v-divider></v-divider>
                    <br />
                    <dt>
                      <strong>Order Date</strong>
                    </dt>
                    <dd v-text="getDate(order.date_of_order)"></dd>
                    <v-divider></v-divider>
                    <br />
                    <dt>
                      <strong>status</strong>
                    </dt>
                    <dd>
                      <v-alert outlined type="error" v-if="order.approved=='NO'">declined</v-alert>
                      <v-alert outlined v-if="order.approved=='YES'" type="success">Approved</v-alert>
                      <v-alert outlined v-if="order.approved=='NEW'" type="info">New</v-alert>
                    </dd>
                  </dl>
                </v-col>
              </v-row>
              <v-row v-if="order.approved=='NEW'" justify="end">
                <v-btn
                  class="mr-2"
                  color="error"
                  @click="declineOrder(order.id,index)"
                  small
                  depressed
                >Decline</v-btn>
                <v-btn
                  class="mr-4"
                  color="primary"
                  @click="postApprove(order.id,index)"
                  :loading="loadingApp"
                  small
                  depressed
                >Approve</v-btn>
              </v-row>
              <v-row v-if="order.approved!='NEW'" justify="end">
                <v-btn
                  class="mr-2"
                  color="error"
                  @click="deleteOrder(order.id,index)"
                  small
                  depressed
                  :loading="loadingDlt"
                >Delete</v-btn>
              </v-row>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-card>
    </v-list>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { formartDate } from "../../scripts/otherScripts";
import axios from "axios";
export default {
  data: () => ({
    loadingDlt: false,
    isDecline: false,
    loadingApp: false,
    error: "",
    orderId: 0,
    orderIndex: 0,
    loading: false,
    loadingD: false,
    dialog: false,
    declineMessage: "",
    rules: {
      required: v => !!v || "Please provide a reason"
    }
  }),
  methods: {
    ...mapActions(["getOrders", "setOrderAsViewed", "notify"]),
    getDate(date) {
      return formartDate(date);
    },
    declineOrder(id, index) {
      this.orderId = id;
      this.orderIndex = index;
      this.dialog = !this.dialog;
      this.isDecline = true;
    },
    postDecline() {
      let approved = "NO";
      this.error = "";
      if (this.$refs.formReason.validate()) {
        this.loadingD = true;
        const business = this.$route.params.businessId;
        axios
          .patch("/business_api/orders-own/?businessId=" + business, {
            reason: this.declineMessage,
            businessId: business,
            approved: approved,
            orderId: this.orderId,
            user: this.get_user.name
          })
          .then(
            response => {
              if (response.status === 200) {
                this.notify({
                  text: "Order was declined :(, message send to client",
                  open: true,
                  color: "warning",
                  y: "bottom"
                });
                this.get_orders[this.orderIndex].approved = approved;
                this.loadingD = false;
                this.dialog = false;
              }
              this.loadingD = false;
              this.dialog = false;
            },
            e => {
              this.error = e.response.data.message;
              this.loadingD = false;
              this.dialog = false;
            }
          );
      }
    },
    postApprove(id, index) {
      let approved = "YES";
      this.loadingApp = true;
      const business = this.$route.params.businessId;
      axios
        .patch("/business_api/orders-own/?businessId=" + business, {
          reason: "",
          businessId: business,
          approved: approved,
          orderId: id,
          user: this.get_user.name
        })
        .then(
          response => {
            console.log(response);
            if (response.status === 200) {
              this.notify({
                text: "Order approved :)",
                open: true,
                color: "success",
                y: "bottom"
              });
              this.get_orders[index].approved = approved;
              this.loadingApp = false;
            }
            this.loadingApp = false;
          },
          e => {
            this.error = e.response.data.message;
            this.loadingApp = false;
          }
        );
    },
    deleteOrder(id, index) {
      this.loadingDlt = true;
      const business = this.$route.params.businessId;
      axios
        .delete(
          "/business_api/orders-own/?businessId=" + business + "&orderId=" + id
        )
        .then(
          response => {
            if (response.status === 204) {
              this.notify({
                text: "Deleted :)",
                open: true,
                color: "success",
                y: "bottom"
              });
              this.get_orders.splice(index, 1);
            }
            this.loadingDlt = false;
          },
          e => {
            console.log(e.response);
            this.loadingDlt = false;
          }
        );
    },
    isOrderViewed(order) {
      return order ? "grey lighten-1" : "success";
    },
    viewOrder(postion, order) {
      if (order.viewed == false) {
        var order1 = {
          id: order.id,
          businessId: order.business,
          index: postion
        };
        this.setOrderAsViewed(order1);
      }
    }
  },
  computed: mapGetters(["get_orders", "get_user"]),
  mounted() {
    this.loading = true;
    this.getOrders(this.$route.params.businessId)
      .then(response => {
        if (response.status == "200") {
          this.loading = false;
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  }
};
</script>