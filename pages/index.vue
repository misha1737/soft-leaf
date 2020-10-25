<template>
  <div class="contentBlock">
    <div class="catalog">
      <div class="posts">
        <div  v-for="post in posts" :key="post.id">
      <nuxt-link class="postPreview" :to="'/post/'+post.id"> 
      <div class="postPreview__img">
        <img v-if="post.url"  :src="post.url" alt /> 
        <img v-else class="postPreview__img" src="./../assets/post.jpg" alt />
      </div>
        <div class="postPreview__text">
          <h2>{{post.postName}}</h2>
          <h3>{{post.description}}</h3>
          <h6>{{formatTime(post.time)}}</h6>
        </div>
       </nuxt-link> 
      
    </div>
    
      </div>
      <!-- <Sitebar :posts="posts"></Sitebar> -->
    </div>
    <!-- <button class="button" @click="loadMore()">loadMore</button> -->
  </div>
</template>

<script>
import { mapState,mapMutations,mapGetters } from 'vuex'
export default {
  name: "Home",
  data() {
    return {};
  },
  props: {
    id: String,
  },
async fetch({store}) {
  if(store.getters['posts/AllPosts'].length<1){
  await store.dispatch('posts/getPosts')
  }
},

  methods: {
    formatTime(time) {
      let t = new Date(time);
      return t.toLocaleString();
    },
  },
mounted(){

    },
  computed: {
    ...mapGetters({
      posts: "posts/AllPosts",
    }),
  },
};
</script>

<style lang="scss">
@import "./../assets/scss/views/_catalog.scss";
</style>
