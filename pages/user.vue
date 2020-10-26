<template>
  <div class="contentBlock form">
    <div>
      <label for="userName">Your Name</label>
      <input v-model="userName" id="userName" type="text" 
       :class="{invalid: ($v.userName.$dirty && !$v.userName.required) || ($v.userName.$dirty && !$v.userName.minLength) || ($v.userName.$dirty && !$v.userName.maxLength)}"
      placeholder="Your Name" /> 
       <span v-if="$v.userName.$dirty && !$v.userName.required" class="errorMsg">The name field is required</span>
    <span
      v-if="$v.userName.$dirty && !$v.userName.minLength"
      class="errorMsg"
    >The userName should be at least 2 characters</span>
  <span
      v-if="$v.userName.$dirty && !$v.userName.maxLength"
      class="errorMsg"
    >Username must be no more than 30 characters</span>

      <label for="phone">Phone</label>
      <input v-model="phone" id="phone" type="text" 
       :class="{invalid:  ($v.phone.$dirty && !$v.phone.minLength) || ($v.phone.$dirty && !$v.phone.maxLength) || ($v.phone.$dirty && !$v.phone.decimal)}"
      placeholder="Your phone" />
  <span
      v-if="$v.phone.$dirty && (!$v.phone.maxLength || !$v.phone.minLength || !$v.phone.decimal)"
      class="errorMsg"
    >phone number must be format (xxx)xxx-xx-xx</span>


      <img v-if="photo" :src="photo" alt="">
      <img v-else src="@/assets/user_photo.png" alt="">
      <button v-if="!loading" class="button" @click="save()">save</button>
      <button v-else class="button disabled">Loading...</button>
      <span class="errorMsg">{{submitStatus}}</span>
    </div>
  </div>
</template>
<script>
import {  required,minLength, maxLength, decimal } from "vuelidate/lib/validators";
export default {
    
  name: "Users",
  async fetch({store,route}) {
      await store.dispatch('user/loggedUser', route.params.id)
   },
  data() {
    return {
      submitStatus:'',
      userName:'',
      phone:null,
      userObj:null,
      photo:null
    };
  },
  props: {
    text: String,
  },
  validations: { 
    phone: { decimal, minLength: minLength(10),maxLength: maxLength(10) },
    userName: {required, minLength: minLength(6), maxLength: maxLength(30)}
  },
  methods: {
    save(){
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
         this.$store
          .dispatch("user/updateUser", this.user)
          .then((id) => {
            this.submitStatus = "OK";
           // this.$store.dispatch("getPosts");
           // this.$router.push("/postEdit/" + id);
          })
          .catch((err) => {
            console.log(err);
            this.submitStatus = err;
          });
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    // user() {
 
         
    //    },
    // user: {
    //   get() {
    //      return this.$store.getters['user/user'];
    //   },
    //   set(value) {
    //     this.$store.getters['user/user'];
    //   }
    // }
  },
 created(){
    
  },

  
  mounted() {
      let user=this.$store.getters['user/user']
    this.userName= user.name;
    this.phone=user.phone;
    this.photo=user.photo;
  },
};
</script>
<style lang="scss">
// @import "./../scss/_siteMenuSetup.scss";
</style>