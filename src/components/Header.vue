<template>
  <div class="header">
    <div class="logo">
      <router-link to="/">
      <img src="./../assets/leaf.svg" alt="">
      </router-link>
    </div>

    
    <ul>
      <li v-for="link in categories" :key="link.id">
        <router-link :to="'/catalog/'+link.categoryName">{{link.categoryName}}</router-link>
      </li>
    </ul>
    
    <div class="authMenu" >
    <router-link v-if="checkUser" class="auth-button" to="/user">{{user.name}}</router-link>
    <span v-if="checkUser" @click="logout()" class="auth-button">Sign out</span>
    <router-link v-if="!checkUser" class="auth-button" to="/authorization">Sign in</router-link>
    <router-link v-if="!checkUser" class="auth-button" to="/registration">Sign up</router-link>
    </div>
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
      this.$router.push("/authorization");
    },
  },
  computed: {
    checkUser() {
      return this.$store.getters.checkUser;
    },
    user(){
      return this.$store.getters.user;
    },
    categories() {
      return this.$store.getters.categories;
    },
    // linkMenu() {
    //   if (this.checkUser) {
    //     return [
    //       { title: "Home", url: "/" },
    //       { title: "About", url: "/about" },
    //       { title: "User", url: "/user" },
    //     ];
    //   }
    //   return [
    //     { title: "Home", url: "/" },
    //    { title: "About", url: "/about" },
    //   ];
    // },
  },
};
</script>
<style lang="scss">
    @import "./../scss/_header.scss";
</style>