<template>
  <div class="header">
    <div class="logo">
      <nuxt-link to="/">
      <img src="./../assets/leaf.svg" alt="">
      </nuxt-link>
    </div>

    
    <ul>
      <li v-for="link in categories" :key="link.id">
        <nuxt-link :to="'/catalog/'+link.categoryName">{{link.categoryName}}</nuxt-link>
      </li>
    </ul>
   
    <div class="authMenu" >
    <nuxt-link v-if="checkUser" class="auth-button" to="/user">{{user.name}}</nuxt-link>
    <span v-if="checkUser" @click="logout()" class="auth-button">Sign out</span>
    <nuxt-link v-if="!checkUser" class="auth-button" to="/authorization">Sign in</nuxt-link>
    <nuxt-link v-if="!checkUser" class="auth-button" to="/registration">Sign up</nuxt-link>
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
      this.$store.dispatch('user/logoutUser')
      this.$router.push("/authorization");
    },
  },
  beforeCreate(){
    this.$store.dispatch('categories/loadCategories')
  },
  computed: {
    checkUser() {
      return this.$store.getters['user/checkUser'];
    },
    user(){
      return this.$store.getters['user/user'];
    },
    categories() {
      return this.$store.getters['categories/categories'];
    },
    
  },
};
</script>
<style lang="scss">
     @import "./../assets/scss/_header.scss";
</style>