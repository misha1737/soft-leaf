<template>
  <div class="contentBlock">
    <div class="SiteMenuSetup ">
      <div class="form">
        <label for="newCategory">New Category</label>
        <input
          v-model="categoryName"
          id="newCategory"
          type="text"
          placeholder="Enter category name"
        />
        <button :class="{disabled: categoryName.length<1}" class="button" @click="addCategory()">Add Category</button>
      </div>
      <ul class="dragList">
        <draggable v-model="categories" group="people" @start="drag=true" @end="drag=false">
          <div class="dragElement" v-for="(category, index) in categories" :key="category.id">
    
            <input v-model="categories[index].categoryName" type="text">
            <span @click=" deleteCatrgory(category.categoryName)"><span class="removeIcon"></span></span>
          </div>
        </draggable>
      </ul>
      <button v-if="!loading" class="button" @click="saveCategories()">Save categories</button>
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
    };
  },
  props: {
    text: String
  },
  components: {
    draggable
  },
  methods: {
    addCategory() {
      if(this.categoryName.length<1){
        return
      }
       this.categories.push({categoryName: this.categoryName, id:null}) 
       this.categoryName=''
        this.state="need save"
    },
    saveCategories() {
      this.$store
        .dispatch("saveCategories")
        .then(() => {
        this.$store.dispatch("loadCategories");
          this.state="categoriesSaved"
        });
    },
    deleteCatrgory(categoryName) {
       this.categories= this.categories.filter(elememt=> {
        return elememt.categoryName != categoryName;
      }); 
      this.state="need save"
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    categories: {
      get() {
        return this.$store.getters.categories;
      },
      set(value) {
        this.$store.commit("loadCategories", value);
      }
    }
  }
};
</script>
<style lang="scss">
@import "./../scss/_siteMenuSetup.scss";
</style>