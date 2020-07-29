<template>
  <div class="header">
    <ul>
      <li v-for="link in linkMenu" :key="link.title">
        <router-link :to="link.url">{{link.title}}</router-link>
      </li>
      
    </ul>
    <span v-if="checkUser" @click="logout()" class="auth-button">logout</span>
  </div>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.dispatch("logoutUser");
    },
  },
  computed: {
    checkUser() {
      return this.$store.getters.checkUser;
    },
    linkMenu() {
      if (this.checkUser) {
        return [
          { title: "Home", url: "/" },
          { title: "About", url: "/about" },
        ];
      }
      return [
        { title: "Home", url: "/" },
        { title: "Registration", url: "/registration" },
        { title: "Authorization", url: "/authorization" },
      ];
    },
  },
};
</script>
<style lang="scss">
    @import "./../scss/_header.scss";
</style>