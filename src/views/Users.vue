<template>
  <div class="contentBlock">
    <div>
       
      <ul>
        <div v-for="user in users" :key="user.id" class="elementsList">
          <router-link  :to="'/user/'+user.id" class="elementList"  >
            <span>{{user.name}}</span ><span v-if="user.moderator">-M-</span><span v-if="user.admin">-A-</span>
           </router-link> 
           <!-- <span  @click="tryDeletePost(post.id)"><span class="removeIcon"></span></span> -->
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "Users",
  data() {
    return {
      categoryName: "",
      state:"",
      selected:"",
      postId:null,
      modalOpen: false,
     
    };
  },
  props: {
    text: String
  },
  methods: {
      
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    users() {
         return  this.$store.getters.AllUsers 
       }
  },
   mounted(){
    this.$store.dispatch('getUsers');
  }
};
</script>
<style lang="scss">
@import "./../scss/_siteMenuSetup.scss";
</style>