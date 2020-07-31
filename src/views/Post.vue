<template>
  <div class="contentBlock">
    <article class="post">
      <h1>{{post.postName}}</h1>
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
  },
};
</script>

<style lang="scss">
@import "./../scss/views/_post.scss";
</style>;