<template>
  <div class="contentBlock">
    <div class="SiteMenuSetup">
      <div>
        <label for="newCategory">New Category</label>
        <input
          v-model="categoryName"
          id="newCategory"
          type="text"
          placeholder="Enter category name"
        />
        <button v-if="!loading" class="button" @click="addCategory()">Add Category</button>
        <button v-else class="button disabled">Loading...</button>
      </div>
      <ul>
      
           <list :items="categories" @deleteItem="deleteCatrgory"></list> 
      </ul>
    </div>
  </div>
</template>
<script>
import list from "./../components/list.vue"
export default {
  
  name: "SiteMenuSetup",
  data() {
    return {
      categoryName: ""
    };
  },
  props: {
    text: String
  },
  components:{
    list
  },
  methods: {
    addCategory() {
      this.$store
        .dispatch("saveCategories", { categoryName: this.categoryName })
        .then(() => {

          this.$store.dispatch("loadCategories");
        });
    },
    deleteCatrgory(id){
        this.$store.dispatch("removeCategory", {id:id})
          .then(() => {
            this.submitStatus = "OK";
            this.$store.dispatch("loadCategories");
          })
          .catch((err) => {
            console.log(err);
            this.submitStatus = err;
          });
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    categories() {
      return this.$store.getters.categories;
    }
  }
};
</script>
<style lang="scss">
@import "./../scss/_siteMenuSetup.scss";
</style>