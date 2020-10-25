<template>
  <div>
    <Header>
      </Header>
    <Nuxt />
  </div>
</template>

<script>
import Header from './../components/Header.vue'
// import AdminPanel from './components/AdminPanel.vue'
export default {
  name: 'app',
     data(){
            return{
  
            }
        },
  components: {
    Header,
  },
   computed: {
  // isUserAdmin(){
  //     return this.$store.getters.isUserAdmin;
  //   }
   }
}

</script>
<style lang="scss">
  // @import "./scss/_variables.scss";
  // @import "./scss/_base.scss";

</style>

