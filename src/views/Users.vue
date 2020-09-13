<template>
  <div class="contentBlock">
    <div>
      <ul>
        <div v-for="user in users" :key="user.id" class="elementsList">
          <router-link :to="'/user/'+user.id" class="elementList">
            <span>{{user.name}}</span>
            <span v-if="user.moderator">-M-</span>
            <span v-if="user.admin">-A-</span>
          </router-link>
          <input
            type="checkbox"
            v-model="user.banned"
            @change="change(user)"
            name="banned"
            :disabled="user.admin"
          />
          <label for="banned">Banned</label>
          <input type="checkbox" v-model="user.moderator" name="moderator" @change="change(user)" />

          <label for="Aoderator">Moderator</label>
          <input type="checkbox" name="admin" :checked="user.admin" disabled />
          <label for="Admin">Admin</label>

          <!-- <span  @click="tryDeletePost(post.id)"><span class="removeIcon"></span></span> -->
        </div>
      </ul>
      {{state}}
    </div>
  </div>
</template>
<script>
export default {
  name: "Users",
  data() {
    return {
      categoryName: "",
      state: "",
      selected: "",
      postId: null,
      modalOpen: false,
    };
  },
  props: {
    text: String,
  },
  methods: {
    change(user) {
      this.$store.commit("getUsers", this.users);
      this.$store.dispatch("saveRule",user);
    },
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    users() {
      return this.$store.getters.AllUsers;
    },
  },
  mounted() {
    this.$store.dispatch("getUsers");
  },
};
</script>
<style lang="scss">
@import "./../scss/_siteMenuSetup.scss";
</style>