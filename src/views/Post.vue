<template>
  <div class="contentBlock">
    <article class="post" v-if="post">
      <h1>{{post.postName}}</h1>
      <div v-if="isUserModerator" class="isUserModerator">
        <router-link  :to="'/postEdit/'+id">edit</router-link>
      </div>
      <img v-if="post.url" class="post__img" :src="post.url" :alt="post.postName" />
      <img v-else class="post__img" src="./../assets/post.jpg" :alt="post.postName" />
      <h2>{{post.description}}</h2>
      <span v-html="post.postContent"></span>
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
</style>;