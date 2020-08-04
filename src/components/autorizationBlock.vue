<template>
  <div class="authBlock">
     
      <div @click="googleSignin()">G</div>
      <div @click="facebookSignin()">F</div>
  </div>
</template>
<script>
import firestore from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/messaging'
import 'firebase/storage'
export default {
  name: "Header",
  data() {
    return {
        provider:null
    };
  },
  methods: {
    googleSignin() {
         this.$store
        .dispatch("loginUserGoogle")
        .then(() => {
            console.log('loginUserGoogle+');
        })
        .catch((err) => {
            console.log('loginUserGoogle-'+err);
          
        });
    },
    facebookSignin(){
          this.$store
        .dispatch("loginUserfacebook")
        .then(() => {
            console.log('loginUserfacebook+');
        })
        .catch((err) => {
            console.log('loginUserfacebook-'+err);
          
        });
    }
  },
   computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },

};
</script>
<style lang="scss">
@import "./../scss/_header.scss";
</style>