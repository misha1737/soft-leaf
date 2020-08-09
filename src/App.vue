<template>
  <div id="app">
    <div id="nav">
      <Header>
      </Header>
      <AdminPanel v-if="isUserAdmin"></AdminPanel>
    
    </div>
    <router-view/>
  </div>
</template>
<script>
import Header from './components/Header.vue'
import AdminPanel from './components/AdminPanel.vue'
export default {
  name: 'app',
     data(){
            return{
  
            }
        },
  components: {
    Header,
    AdminPanel
  },
   computed: {
  isUserAdmin(){
      return this.$store.getters.isUserAdmin;
    }
   }
}

</script>
<style lang="scss">
  @import "./scss/_variables.scss";
  @import "./scss/_base.scss";

</style>
