<template>
  <div class="sitebar">
    <h2>НОВЕ</h2>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <h3>{{post.postName}}</h3>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  props:{
      posts:{}
  }
};
</script>

<style lang="scss">
@import "./../scss/views/_sitebar.scss";
</style>;