<template>
  <div class="posts contentBlock">
    <p class="title">This is a Home page</p>
    <div  v-for="post in posts" :key="post.id">
      <router-link class="postPreview" :to="'/post/'+post.id">
     
        <img v-if="post.url" class="postPreview__img" :src="post.url" alt /> 
        <img v-else class="postPreview__img" src="./../assets/post.jpg" alt />
        <div class="postPreview__text">
          <h2>{{post.postName}}</h2>
          <h3>{{post.description}}</h3>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },

  computed: {
    posts() {
      return this.$store.getters.posts;
    },
  },
};
</script>

<style lang="scss">
@import "./../scss/views/_posts.scss";
</style>;