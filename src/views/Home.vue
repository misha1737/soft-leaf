<template>
  <div class="about">
    <h1>This is a Home page</h1>
    {{posts}}
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {

    };
  },


  computed: {
    posts() {
      return this.$store.getters.posts;
    },
  },


  };
</script>