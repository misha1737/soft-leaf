<template>
  <div class="contentBlock">
    <div class="catalog">
      <div class="posts" v-if="posts">
        <div v-for="post in posts" :key="post.id">
          <nuxt-link class="postPreview" :to="'/post/' + post.id">
            <div class="postPreview__img">
              <img v-if="post.url" :src="post.url" alt />
              <img
                v-else
                class="postPreview__img"
                src="@/assets/post.jpg"
                alt
              />
            </div>
            <div class="postPreview__text">
              <h2>{{ post.postName }}</h2>
              <h3>{{ post.description }}</h3>
              <h6>{{ formatTime(post.time) }}</h6>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Home",
   async fetch({store,route}) {
      await store.dispatch('posts/getPosts', route.params.id)
   },

  data() {
    return {};
  },
  beforeCreate(){
     // this.$store.dispatch('posts/getPost', this.$route.params.id)
  },
    computed: {
          posts(){
              return this.$store.getters['posts/AllPosts'];
          },
      
  },
  methods:{
      formatTime(time) {
      let t = new Date(time);
      return t.toLocaleString();
    },
  }
}
</script>

<style  lang="scss">

</style>
