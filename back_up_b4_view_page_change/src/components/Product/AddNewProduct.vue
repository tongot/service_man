<template>
    <v-container>
        <v-form ref="formProduct">

        <v-toolbar flat dark color="blue">
            <v-toolbar-title>
                Add new product
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon :to="{name:'my-business'}">
                <v-icon>mdi-close-circle</v-icon>
            </v-btn>
        </v-toolbar>
        <v-row class="d-flex justify-center">
            <v-flex id="productInfo" class="pa-1" md6>
                <v-card class="pa-2 mt-4 " flat>

                        <v-text-field prepend-icon="mdi-tag" label="Product Name" :rules="[rules.required,rules.minLength]"  outlined v-model="product.name">
                        </v-text-field>
                        <v-textarea prepend-icon="mdi-details" label="Product Details" :rules="[rules.required,rules.minLength]" outlined
                            v-model="product.description">
                        </v-textarea>
                        <v-overflow-btn outlined label="Select Product Category" :rules="[rules.required]" target="#productInfor" width="auto"
                            class="ma-5" :items="get_productCategory" prepend-icon="mdi-city" v-model="product.product_category"
                            item-value="id" item-text="name">
                        </v-overflow-btn>
                        <v-text-field prepend-icon="mdi-tag" label="Price" :rules="[rules.required]" type="number" outlined v-model="product.price">

                        </v-text-field>
                        <v-text-field prepend-icon="mdi-cash-100" :rules="[rules.required]" label="Quantity" type="number" outlined v-model="product.quantity">

                        </v-text-field>
                </v-card>
            </v-flex>
            <v-flex  class="pa-1" md6>
                <v-row class="pa-4" justify="space-around">
                    <v-flex>
                        <v-checkbox label="Available" color="primary" v-model="product.product_available"></v-checkbox>
                    </v-flex>
                    <v-flex>
                        <v-checkbox label="Price Negotiable" color="primary" v-model="product.price_neg"></v-checkbox>
                    </v-flex>
                    <v-flex>
                        <v-radio-group v-model="product.product_new">
                            <v-radio label="Brand new" color="success" :value="true"></v-radio>
                            <v-radio label="Used" color="warning" :value="false"></v-radio>
                        </v-radio-group>

                    </v-flex>
                </v-row>
                <v-row class="ma-2" v-if="errorAttrb!==''">
                    <v-alert type="warning">
                        {{errorAttrb}}
                    </v-alert>
                </v-row>
                <v-row class="ma-2">

                    <h3 center v-if="product.other_properties.length>0">other attributes</h3>

                    <v-flex v-for="(item,index) in product.other_properties" md12 :key="item.count">
                        <v-row>
                            <v-flex md4>
                                <v-text-field prepend-icon="mdi-tag" label="Property" outlined :rules="[rules.required,rules.minLength]"
                                    v-model="item.property_name" @keyup="OnAttrbChange()" :disabled="item.enabled">
                                </v-text-field>
                            </v-flex>
                            <v-flex md7>
                                <v-text-field prepend-icon="mdi-information-variant" label="Description" outlined :rules="[rules.required,rules.minLength]"
                                    v-model="item.description" @keyup="OnAttrbChange()" :disabled="item.enabled">
                                </v-text-field>
                            </v-flex>
                            <v-flex>
                                <v-btn icon color="pink darken-1" @click="deleteFromOtherAttrb(index)">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </v-flex>
                        </v-row>
                    </v-flex>
                    <v-row>
                        <v-btn depressed block text @click="AddNewAttrb()" color="primary" :disabled="addOtherAttrb">
                            click to add other attributes
                        </v-btn>
                    </v-row>
                    <v-row>
                        <v-flex class="justify-end d-flex">
                            <v-btn v-if="!is_edit" text large @click="postForm()">
                                 Next
                                <v-icon right>mdi-chevron-double-right</v-icon>
                            </v-btn>
                              <v-btn v-if="is_edit" color="primary" depressed @click="update()">
                                 Save Edit
                                <v-icon right>mdi-content-save</v-icon>
                            </v-btn>
                        </v-flex>
                    </v-row>
                </v-row>
            </v-flex>
        </v-row>
                </v-form >
    </v-container>
</template>
<script>
    import {
        mapActions,
        mapGetters
    } from 'vuex'
    export default {
        name: "add_new_product",
        data: () => ({
            cropper: {},
            product: {
                business:null,
                id:null,
                name: '',
                description: '',
                price: '',
                product_available: true,
                price_neg: false,
                product_new: true,
                quantity: false,
                product_category:'',
                other_properties:[]
            },
            businessId:null,
            addOtherAttrb: false,
            //defination of other attributs to the product
            errorAttrb: '',
            count: 1,

            disable_btn_upload: true,
            overlay: false,
            error: {
                text: '',
                color: ''
            },
            ///validation rules 
            rules:{
                required: value => !!value || 'This field is requierd.',
                minLength:value => value.length>2|| "Name is too short, must be at least 2 letters long",
            },
            is_edit :false
        }),

        methods: {
            ...mapActions(['getProductCategory','postProduct','getProductToEdit','updateProduct','setIsEditing']),
            AddNewAttrb() {
                if (this.product.other_properties.length > 0) {
                    this.count = this.product.other_properties.length + 1;
                }
                var otherProAttrb = {
                    property_name: '',
                    description: '',
                    count: this.count,
                    enabled: false,
                }
                this.errorAttrb = '';
                if (this.product.other_properties.length > 1) {
                    let Added = this.product.other_properties[this.product.other_properties.length - 1].property_name
                    let exist = this.product.other_properties.filter((item) => {
                        return item.property_name == Added
                    })
                    if (exist.length > 1) {
                        this.addOtherAttrb = true
                        this.errorAttrb = "This property has been added"
                        return
                    }

                }
                this.product.other_properties.push(otherProAttrb)
                //check if we have added more that one in list to disable it from editing
                if (this.product.other_properties.length > 1) {
                    // get lust added value by
                    this.product.other_properties[this.product.other_properties.length - 2].enabled = true
                }
                this.addOtherAttrb = true
            },

            OnAttrbChange() {
                let currentProp = this.product.other_properties[this.product.other_properties.length - 1]
                if (currentProp.property_name === '' || currentProp.description === '') {
                    this.addOtherAttrb = true;
                } else {
                    this.addOtherAttrb = false;
                }
            },
            deleteFromOtherAttrb(index) {
                this.product.other_properties.splice(index, 1);
                if (this.product.other_properties.length == 0) {
                    this.addOtherAttrb = false;
                } else {
                    if (this.product.other_properties[this.product.other_properties.length - 1].enabled == true) {
                        this.addOtherAttrb = false;
                    }

                }
            },
            async postForm() {
                if(this.$refs.formProduct.validate())
                {  
                    this.product.business= this.$route.params.businessId
                    this.postProduct(this.product,this.product.other_properties)

                }
              
            },
             update()
            {
                if(this.$refs.formProduct.validate())
                {
                    this.updateProduct(this.product)
                }
            }
        },
        computed:  {
            ...mapGetters(['get_productCategory','get_product','']),
            
            },
        created(){
                this.setIsEditing(false);
        },
        mounted() {
            this.getProductCategory();
            //if router is for editing 
             if(typeof this.$route.params.edit!='undefined')
                {
                    
                    if(this.$route.params.edit==='edit')
                    {
                         this.getProductToEdit(this.$route.params.productId).then(()=>{
                        if(this.get_product.id===null)
                        {
                            this.$router.push('/business/my-business')
                        }
                        this.product = this.get_product
                        this.setIsEditing(true);
                        this.is_edit=true;
                        
                    })
                    }
                    else{
                        console.log("hit")
                            this.$router.push('/business/my-business')
                    }
                 
                }
        }
    }
</script>