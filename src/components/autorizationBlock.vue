<template>
  <div class="authBlock">
     
      <div class="authBlock__googleIcon icon" @click="googleSignin()"></div>
      <div class="authBlock__facebookIcon icon" @click="facebookSignin()"></div>
  </div>
</template>
<script>
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
@import "./../scss/components/_authBlock.scss";
</style>