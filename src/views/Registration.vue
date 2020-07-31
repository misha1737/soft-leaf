<template>
  <div class="form small">
    <p class="title">Registration</p>

    <label for="email">E-mail</label>
    <input
      v-model.trim="email"
      :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
      id="email"
      type="email"
      placeholder="Enter E-mail"
    />
    <span v-if="$v.email.$dirty && !$v.email.required" class="errorMsg">The e-mail field is required</span>
    <span
      v-if="$v.email.$dirty && !$v.email.email"
      class="errorMsg"
    >The email address is badly formatted.</span>

    <label for="password">Password</label>
    <input
      v-model="password"
      :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
      id="password"
      type="password"
      placeholder="Enter Password"
    />

    <span
      v-if="$v.password.$dirty && !$v.password.required"
      class="errorMsg"
    >The password field is required</span>
    <span
      v-if="$v.password.$dirty && !$v.password.minLength"
      class="errorMsg"
    >Password should be at least 6 characters</span>
    <label for="confirmPassword">Confirm password</label>
    <input
      v-model="confirmPassword"
      id="confirmPassword"
      type="password"
       :class="{invalid:confirmPassword!=password && $v.password.$dirty}"
      placeholder="Confirm password"
    />
    <span
      v-if="confirmPassword!=password && $v.password.$dirty"
      class="errorMsg"
    >Password confirmation does not match</span>
    <button v-if="!loading" class="button" @click="submit()">SIGN UP</button>
    <button v-else class="button disabled">Loading...</button>
    <span
      class="errorMsg"
    >{{submitStatus}}</span>
  </div>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";
export default {
  name: "Registration",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      submitStatus: null,
    };
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
  },
  methods: {
    submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      if(this.password != this.confirmPassword){
        return;
      }
      const user = {
        email: this.email,
        password: this.password,
      };
      this.$store
        .dispatch("registerUser", user)
        .then(() => {
          console.log("register");
          this.submitStatus = "OK";
          this.$router.push("/user");
        })
        .catch((err) => {
          console.log(err);
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
 