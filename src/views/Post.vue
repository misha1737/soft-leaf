<template>
  <div class="contentBlock">
    <article class="post" v-if="post">
      <h1>{{post.postName}}</h1>
      <div v-if="isUserModerator" class="isUserModerator">
        <router-link  :to="'/postEdit/'+id">edit</router-link>
      </div>
      <img class="post__img" src="./../assets/post.jpg" :alt="post.postName" />
      <h2>{{post.description}}</h2>
      <p>{{post.postContent}}</p>
  </article>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  props: {
    id: String,
  },

  computed: {
    post() {
      return this.$store.getters.post(this.id);
    },
    isUserModerator(){
      return this.$store.getters.isUserAdmin;
    }
  },
};
</script>

<style lang="scss">
@import "./../scss/views/_post.scss";
</style>;