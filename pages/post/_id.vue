<template>
  <div class="contentBlock">
    <article class="post" v-if="post">
      <h1>{{post.postName}}</h1>
      <h3>{{formatTime(post.time)}}</h3>
      <!-- <div v-if="isUserModerator" class="isUserModerator">
        <router-link  :to="'/postEdit/'+id"> <div class="editButton"><span class="editIcon"></span>Edit post</div> </router-link>
      </div> -->
      <img v-if="post.url" class="post__img" :src="post.url" :alt="post.postName" />
      <img v-else class="post__img" src="./../../assets/post.jpg" :alt="post.postName" />
      <h2 class="description">{{post.description}}</h2>
      <span class="postContent" v-html="post.postContent"></span>
      
  </article>
 
  <!-- <CommentsBlock :id="id">

  </CommentsBlock> -->
  </div>
</template>

<script>
export default {
  name: "Home",
   async fetch({store,route}) {
      await store.dispatch('posts/getPost', route.params.id)
   },
//     validate ({ params }) {
//     // Должен быть числом
//     return /^\d+$/.test(params.id)
//   },
  data() {
    return {};
  },
  beforeCreate(){
     // this.$store.dispatch('posts/getPost', this.$route.params.id)
  },
    computed: {
          post(){
              return this.$store.getters['posts/getPost'];
          }
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
@import "./../../assets/scss/views/_post.scss";
</style>
