<template>
  <div class="contentBlock">
    <div class="postList">
      <ul>
       
          <div v-for="post in posts" :key="post.id">
            <span>{{post.postName}}</span>
            
            <span @click=" deletePost(post.postName)">X</span>
          </div>

      </ul>
      <button v-if="!loading" class="button" @click="saveCategories()">Save Posts</button>
      <button v-else class="button disabled">Loading...</button>
      {{state}}
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  name: "SiteMenuSetup",
  data() {
    return {
      categoryName: "",
      state:"",
      selected:""
    };
  },
  props: {
    text: String
  },
  components: {
    draggable
  },
  methods: {
 
    saveCategories() {
      this.$store
        .dispatch("saveCategories")
        .then(() => {
        this.$store.dispatch("loadPosts");
          this.state="categoriesSaved"
        });
    },
    deletePost(categoryName) {
    //    this.categories= this.categories.filter(elememt=> {
    //     return elememt.categoryName != categoryName;
    //   }); 
    //   this.state="need save"
    }
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
        this.$store.commit("loadPosts", value);
      }
    }
  }
};
</script>
<style lang="scss">
@import "./../scss/_siteMenuSetup.scss";
</style>