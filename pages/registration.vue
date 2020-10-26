<template>
  <div class="form small contentSmallBlock">
    <p class="title">Registration</p>
    <label for="userName">Your mame</label>
    <input
      v-model="userName"
      :class="{invalid: ($v.userName.$dirty && !$v.userName.required) || ($v.userName.$dirty && !$v.userName.minLength) || ($v.userName.$dirty && !$v.userName.maxLength)}"
      id="userName"
      type="text"
      placeholder="Enter your name"
    />
    <span v-if="$v.userName.$dirty && !$v.userName.required" class="errorMsg">The name field is required</span>
    <span
      v-if="$v.userName.$dirty && !$v.userName.minLength"
      class="errorMsg"
    >The userName should be at least 2 characters</span>
  <span
      v-if="$v.userName.$dirty && !$v.userName.maxLength"
      class="errorMsg"
    >Username must be no more than 30 characters</span>



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
import { email, required, minLength, maxLength } from "vuelidate/lib/validators";
export default {
  name: "Registration",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      submitStatus: null,
      userName:""
    };
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    userName: {required, minLength: minLength(2), maxLength: maxLength(30)}
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
        userName: this.userName
      };
      this.$store
        .dispatch('user/registerUser', user)
        .then(() => {
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
