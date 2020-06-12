<template>
    <v-container>
        <v-dialog
      v-model="get_dialog_login"
      persistent
      width="800"
      >
                <v-card>
                    <v-alert v-if="errors.text!==''" :type="errors.type">
                            {{errors.text}}
                    </v-alert>
                    <v-tabs fixed-tabs 
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
                                <v-card flat class="px-5 pt-12 pb-12 ma-4"
                                    width="450"
                                    >
                                        <v-text-field
                                        prepend-icon="mdi-email"
                                        outlined
                                        label="Email"
                                        v-model="user.username"
                                        >
                                        </v-text-field>
                                        <v-text-field
                                        prepend-icon="mdi-account-lock"
                                        label="Password"
                                        outlined
                                        type="password"
                                        v-model="user.password"
                                        >
                                        </v-text-field>
                                        <v-flex class="d-flex justify-center">
                                            <v-btn @click="postLogin" depressed 
                                            :loading="loading" :disabled="loading"
                                            color="blue" class="white--text">
                                            <v-icon left>mdi-lock-open-variant</v-icon>
                                            login
                                        </v-btn>
                                        </v-flex>
                                    
                                    </v-card>
                                </v-card>
                               
                            </v-tab-item> 

                             <v-tab-item :value="'tab-2'">
                                <v-card flat class="px-5 pt-12 pb-12">
                                    <v-row>
                                        <v-flex class="pa-2">
 <v-text-field
                                    prepend-icon="mdi-email"
                                    outlined
                                    label="Email"
                                    v-model="register_user.user.email"
                                    >
                                    </v-text-field>
                                                  
                                      <v-text-field
                                    prepend-icon="mdi-account-lock"
                                    label="Password"
                                    outlined
                                    type="password"
                                    v-model="register_user.user.password"
                                    >
                                    </v-text-field>
                                     <v-text-field
                                    prepend-icon="mdi-account-lock"
                                    label="Password Confirm"
                                    outlined
                                    type="password"
                                    v-model="register_user.user.password_confirm"
                                    >
                                     </v-text-field>
                                         <v-text-field
                                    prepend-icon="mdi-account-lock"
                                    label="Phone"
                                    outlined
                                    v-model="register_user.phone_number"
                                    >
                                    </v-text-field>
                                        </v-flex>
                                        <v-flex class="pa2 pr-4"> 
                                              <v-text-field
                                    prepend-icon="mdi-account-lock"
                                    label="Name"
                                    outlined
                                    v-model="register_user.user.name"
                                    >
                                    </v-text-field>
                                    <v-text-field
                                    prepend-icon="mdi-account-lock"
                                    label="Surname"
                                    outlined
                                    v-model="register_user.user.surname"
                                    >
                                    </v-text-field>
            <v-text-field
                                    prepend-icon="mdi-account-lock"
                                    label="WhatsApp contact"
                                    outlined
                                    v-model="register_user.phone_number2"

                                    >
                                    </v-text-field>
                                             <v-textarea
                                    prepend-icon="mdi-account-lock"
                                    label="Address"
                                    outlined
                                    v-model="register_user.address"
                                    >
                                     </v-textarea>
                                    <v-flex class="d-flex justify-center">
                                         <v-btn depressed color="blue"
                                         @click="register"
                                        class="white--text">
                                        <v-icon left>mdi-account-edit</v-icon>
                                        Register
                                    </v-btn>
                                    </v-flex>
                                        </v-flex>
                                    </v-row>
                                   
                        
                                   
                                </v-card>
                            </v-tab-item> 

                        </v-tabs-items>
                    </v-tabs>   
                </v-card>
                <v-divider></v-divider>
                     <v-btn depressed color="pink darken-1"
                        @click="showLogIn"
                    class="white--text">
                    Close
                </v-btn>
        </v-dialog>
    </v-container>
</template>
<script>
import {mapActions, mapGetters} from 'vuex';
export default {
    data:()=>({
        tabs:null,
        dialog_login:true,
        errors:{
            text:'',
            type:''
        },
        user:{
            username:'',
            password:''
        },
        register_user:{
            user:{
                name:'',
                surname:'',
                password:'',
                email:'',
                password_confirm:''
            },
            phone_number:'',
            phone_number2:'',
            address:'',
            address2:'None'
        },
        loading:false
    }),
    methods:{
        ...mapActions(['login','Register','showLogIn']),

        async postLogin(){
            this.loading=true;
             let data
            data = await this.login(this.user)
            try{
                if(data.status=="400")
                {
                    this.errors.text="Incorrect password or email";
                    this.errors.type ="error"
                   
                }if
                (data.status=="200")
                {
                    this.$router.go()
                    
                }   this.loading=false
            }catch{
                 this.errors.text="FAID TO CONNETCT";
                this.errors.type ="error"
                this.loading= false;
            }
          
        },
        async register(){
            let data;
            data = await this.Register(this.register_user)
            console.log(data.data) 
            if (data.status=="400")
            {
                this.errors.text="please enter all details correctly\n-password is matching\n-email is valid";
                this.errors.type ="error"
            }
            if(data.status=="201"){
                this.errors.text="User successfully registered";
                this.errors.type ="success"
            }
            if(data.data.user.non_field_errors==="This email is already in use")
            {
                 this.errors.text="This email is already in use";
                this.errors.type ="error"
            }

        }
    },
    computed:mapGetters(['get_dialog_login'])
}
</script>