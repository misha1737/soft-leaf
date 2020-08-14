<template>
  <div class="AdminPanel top" @click="$emit('reply',result=false)">
    <router-link to="/postEdit/0">
      <div class="component">Create Post</div>
    </router-link>
    <router-link to="/postList">
      <div class="component">Edit Posts</div>
    </router-link>
    <router-link to="/siteMenuSetup">
      <div class="component">Site menu</div>
    </router-link>
    <router-link to="/">
      <div class="component">Users</div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: "AdminPanel",
  data() {
    return {};
  },
  props: {
    text: String
  },
  methods: {},
  computed: {}
};
</script>
<style lang="scss">
@import "./../scss/components/_adminPanel.scss";
</style>