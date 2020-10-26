<template>
  <div>
    <Header>
      </Header>
    <Nuxt />
  </div>
</template>

<script>
import Header from './../components/Header.vue'
import firebase from 'firebase/app'
// import AdminPanel from './components/AdminPanel.vue'
export default {
  async fetch({store}) {
    
    await store.dispatch('categories/loadCategories')
    
  },
  name: 'app',
     data(){
            return{
  
            }
        },
  components: {
    Header,
  },


  created(){
    if (!firebase.app.length){
      app=firebase.initializeApp(firebaseConfig);
    }
    firebase.auth().onAuthStateChanged(user=>{
      if (user){
        this.$store.dispatch('user/loggedUser', user)
      }
      
    })
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

