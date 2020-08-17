<template>
  <div class="contentBlock">
    <modal v-if="modalOpen" :text="'Delete post?'" v-on:reply="removePost"></modal>
    <div class="postList">
      <ul >
        <div v-for="post in posts" :key="post.id" class="elementsList">
          <router-link  :to="'/postEdit/'+post.id" class="elementList"  >
            <span>{{post.postName}}</span>
            
           </router-link> 
           <span  @click="tryDeletePost(post.id)"><span class="removeIcon"></span></span>
</div>
      </ul>
      <!-- <button v-if="!loading" class="button" @click="saveCategories()">Save Posts</button>
      <button v-else class="button disabled">Loading...</button>
      {{state}} -->
    </div>
  </div>
</template>
<script>
import modal from "./../components/Modal.vue";
export default {
  name: "SiteMenuSetup",
  data() {
    return {
      categoryName: "",
      state:"",
      selected:"",
      postId:null,
       modalOpen: false,
    };
  },
  props: {
    text: String
  },
  components: {
    modal
  },
  methods: {
 
    saveCategories() {
      this.$store
        .dispatch("saveCategories")
        .then(() => {
        this.$store.dispatch("getPosts");
          this.state="categoriesSaved"
        });
    },
    tryDeletePost(postId){
      this.postId=postId;
      this.modalOpen=true;

    },
    removePost(result) {
      if (!result) {
         this.postId=null;
        this.modalOpen = false;
        return;
      }
      this.$store
        .dispatch("removePost", this.postId)
        .then(() => {
          this.submitStatus = "OK";
          this.$store.dispatch("getPosts");
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
    posts: {
      get() {
        return  this.$store.getters.AllPosts
      },
      set(value) {
        this.$store.commit("getPosts", value);
      }
    }
  }
};
</script>
<style lang="scss">
@import "./../scss/_siteMenuSetup.scss";
</style>