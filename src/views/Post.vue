<template>
  <div class="contentBlock">
    <article class="post" v-if="post">
      <h1>{{post.postName}}</h1>
      <h6>{{formatTime(post.time)}}</h6>
      <div v-if="isUserModerator" class="isUserModerator">

        <router-link  :to="'/postEdit/'+id"> <span class="editIcon"></span>Edit post </router-link>
      </div>
      <img v-if="post.url" class="post__img" :src="post.url" :alt="post.postName" />
      <img v-else class="post__img" src="./../assets/post.jpg" :alt="post.postName" />
      <h2>{{post.description}}</h2>
      <span class="postContent" v-html="post.postContent"></span>
  </article>
 
  <CommentsBlock :id="id">

  </CommentsBlock>
  </div>
</template>

<script>
import CommentsBlock from "./../components/CommentsBlock.vue"
export default {
  name: "Home",
  data() {
    return {};
  },
  props: {
    id: String,
  },
components: {
     CommentsBlock,
  },
    methods:{
    formatTime(time){
let t =  new Date(time);
  return t.toLocaleString()
    }
  },
  computed: {
    post() {
      return this.$store.getters.post(this.id);
    },
    isUserModerator(){
      return this.$store.getters.isUserAdmin;
    }
  },
  mounted(){
 this.$store.dispatch('loadComments', {id:this.id});
  }
};
</script>

<style lang="scss">
@import "./../scss/views/_post.scss";
@import "./../scss/components/_commentsBlock.scss";
</style>;