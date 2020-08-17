import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false

import firestore from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/messaging'
import 'firebase/storage'

Vue.use(Vuelidate)
new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    const firebaseConfig = {
      apiKey: "AIzaSyDWsufelpETP0UH1SfGDx_LIc2HgU8_nMk",
      authDomain: "vuefirebase-65c7e.firebaseapp.com",
      databaseURL: "https://vuefirebase-65c7e.firebaseio.com",
      projectId: "vuefirebase-65c7e",
      storageBucket: "vuefirebase-65c7e.appspot.com",
      messagingSenderId: "820675737205",
      appId: "1:820675737205:web:6c383a836505b625c6aa3c"
    };

    firestore.initializeApp(firebaseConfig);
    firestore.auth().onAuthStateChanged(user=>{
      if (user){
        this.$store.dispatch('loggedUser',user);
      }
      this.$store.dispatch('getPosts');
      this.$store.dispatch('loadCategories');
    })
    
    
  }
}).$mount('#app')
