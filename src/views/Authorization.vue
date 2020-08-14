<template>
  <div class="form small contentSmallBlock">
    <!-- tt:{{submitStatus}} -->
    <p class="title">Authorization</p>
    <label for="email">E-mail</label>
    <input v-model="email" id="email" type="email"  placeholder="Enter E-mail" />
    <label for="password">Password</label>
    <input v-model="password" id="password" type="password"  placeholder="Enter password"/>
    <button v-if="!loading" class="button" @click="submit()">SIGN IN</button>
    <button v-else class="button disabled">Loading...</button>
    <autorizationBlock/>
    <span
      class="errorMsg"
    >{{submitStatus}}</span>
  </div>
</template>

<script>
import autorizationBlock from "./../components/autorizationBlock.vue"
export default {

  name: "MainContent",
  data() {
    return {
      email: "",
      password: "",
      submitStatus: null,
    };
  },
   components: {
    autorizationBlock,
  },
  validations:{

  },
  methods: {
    submit() {
      const user = {
        email: this.email,
        password: this.password,
      };
      this.$store
        .dispatch("loginUser", user)
        .then(() => {
          this.submitStatus = "OK";
          this.$router.push("/user");
        })
        .catch((err) => {
          this.submitStatus = err;
        });
    },
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
 