<template>
    <v-container>
        <v-dialog v-model="get_message_dialog" 
        max-width="700"
        persistent>
        <v-form ref="formMessage">
             <v-card class="pa-2">
                <v-card-title><span class="display-1">Contact Seller</span>
                <v-spacer> </v-spacer>
                    <v-btn @click="openMessageDialog()" icon>
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
               
                 </v-card-title>
                <v-textarea outlined label="Type your message here" :rules="[rules.required,rules.max_length_text]" v-model="message.text"></v-textarea>
                <v-text-field outlined label="Your contact number" :rules="[rules.required,rules.max_length_phone]" v-model="message.phone"></v-text-field>
                <v-text-field outlined label="Your email address" :rules="[rules.email]" v-model="message.email"></v-text-field>
                <v-card-actions>
                    <v-btn text @click="openMessageDialog()">cancel</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn depressed color="success" :loading="loading"
                    @click="postMessage()">
                        <v-icon left>mdi-send</v-icon>
                        send
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
           
            <v-card class="mt-2">
                <v-card-title>Quick contact</v-card-title>
                <v-card-text>
                    <v-list dense>
                        <v-list-item-group>
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon>mdi-shopping</v-icon>
                                  </v-list-item-icon>
                                <v-list-item-content class="headline">
                                    {{get_business.name}}
                                </v-list-item-content>
                            </v-list-item>
                             <v-list-item>
                                <v-list-item-icon>
                                    <v-icon>mdi-phone</v-icon>
                                  </v-list-item-icon>
                                <v-list-item-content>
                                    {{get_business.phone}}
                                </v-list-item-content>
                            </v-list-item>
                             <v-list-item>
                                <v-list-item-icon>
                                    <v-icon>mdi-email</v-icon>
                                  </v-list-item-icon>
                                <v-list-item-content >
                                    {{get_business.email}}
                                </v-list-item-content>
                            </v-list-item>
                             <v-list-item>
                                <v-list-item-icon>
                                    <v-icon>mdi-account</v-icon>
                                  </v-list-item-icon>
                                <v-list-item-content>
                                    Contact Person : {{get_business.contact_persona_name}}
                                </v-list-item-content> 
                                <v-list-item-action>
                                         <v-btn disabled>
                                       <v-icon>mdi-phone</v-icon>{{get_business.contact_persona_phone}}
                                       </v-btn> 
                                    </v-list-item-action>
                            </v-list-item>
                             <v-list-item>
                                <v-list-item-icon>
                                    <v-icon>mdi-mailbox</v-icon>
                                  </v-list-item-icon>
                                <v-list-item-content>
                                   <address>{{get_business.address}}</address>
                                </v-list-item-content>
                            </v-list-item>
                            </v-list-item-group>
                    </v-list>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
export default {
    data:()=>({
        message:{
            text:'',
            phone:'',
            email:'',
            businessId:'',
            product:''
        },
        loading:false,
        rules:{
            required:v=>!!v||"this fieled is required",
            max_length_text : v=>{return typeof(v)!='undefined'? v.length>2||"message too short":false},
            max_length_phone : v=>{return typeof(v)!='undefined'? v.length>2||"invalid number":false},
             email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

            return value!=''? pattern.test(value) || 'Invalid e-mail.':true
          },
        }
    }),
    methods:{
        ...mapActions(['sendMessage','openMessageDialog','notify']),
        postMessage(product){
            if(this.$refs.formMessage.validate())
            {
                this.loading = true;
                this.message.businessId=this.get_business.id
                this.message.product=product
                this.sendMessage(this.message).then(()=>{
                    this.loading=false;
                    this.openMessageDialog()
                    this.notify({text:"Message send to seller, they will contact you", color:"dark",open:true})
                    this.message={}
                },(error)=>{
                    console.log(error)
                })
            }

        }
    },
    computed:mapGetters(['get_message_dialog','get_business'])

}
</script>