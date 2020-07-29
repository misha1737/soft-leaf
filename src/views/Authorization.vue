<template>
  <div class="hello">
    tt:{{submitStatus}}
    <h1>authorization</h1>
    <h2 v-if="loading">loading...</h2>
    <label for="email">E-mail</label>
    <input v-model="email" id="email" type="email">
    <label for="password">Password</label>
    <input v-model="password" id="password" type="password">
   <button @click="submit()">click</button>
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
      this.$store.dispatch('loginUser', user).then(()=>{
          console.log("login");
          this.submitStatus = 'OK';
          this.$router.push('/ok')
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

.hello{
  display: flex;
    flex-direction: column;
    width: 300px;
    label{
      margin:10px 0;
    }
    button{
      margin-top:10px;
    }
}

</style>
 