<template>
  <div  class="form">
    <!-- tt:{{submitStatus}} -->
    <h1 class="title">Registration</h1>
    <h2 v-if="loading">loading...</h2>
    <label for="email">E-mail</label>
    <input v-model="email" id="email" type="email">
    <label for="password">Password</label>
    <input v-model="password" id="password" type="password">
    <label for="confirmPassword">Confirm password</label>
    <input v-model="confirmPassword" id="confirmPassword" type="password">
   <button class="button" @click="submit()">SIGN UP</button>
  </div>
</template>

<script>
export default {
  name: 'MainContent',
  data(){
    return{
      email:'',
      password: '',
      submitStatus: null
    }
  },
  methods:{
    submit(){
      const user = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('registerUser', user).then(()=>{
          console.log("register");
          this.submitStatus = 'OK';
          this.$router.push('/user')
      }).catch(err=>{
        console.log(err);
        this.submitStatus=err;
      })
    }
  },
  computed:{
    loading(){
      return this.$store.getters.loading
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">


</style>
 