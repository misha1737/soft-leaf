<template>
  <div class=" contentBlock">
    <div class="catalog">
    <div class="posts">
    <div  v-for="post in posts" :key="post.id">
      <router-link class="postPreview" :to="'/post/'+post.id">
      <div class="postPreview__img">
        <img v-if="post.url"  :src="post.url" alt /> 
        <img v-else class="postPreview__img" src="./../assets/post.jpg" alt />
      </div>
        <div class="postPreview__text">
          <h2>{{post.postName}}</h2>
          <h3>{{post.description}}</h3>
          <h6>{{formatTime(post.time)}}</h6>
        </div>
      </router-link>
      
    </div>
    </div>
    <Sitebar :posts="posts"></Sitebar>

    </div>
    <button class="button" @click="loadMore()">loadMore</button>
  </div>
</template>

<script>
import Sitebar from './../components/Sitebar.vue'
export default {
  name: "Home",
  data() {
    return {
    };
  },
  props:{
    id: String
  },
  methods:{
    formatTime(time){
let t =  new Date(time);
  return t.toLocaleString()
    },
    loadMore(){
       this.$store.dispatch('loadPosts');
    }
  },
  components: {
    Sitebar
  },
  computed: {
     category() {
      return this.$store.getters.categoryId(this.id);
    },
    posts() {
      // return this.$store.getters.AllPosts;
      if(this.id && this.category){
      return this.$store.getters.posts(this.category.id);
      }else{
       
       return  this.$store.getters.AllPosts
      }
    },

  },
};
</script>

<style lang="scss">
@import "./../scss/views/_catalog.scss";
</style>;