<template>
  <div class="contentBlock form">
    <modal v-if="modalOpen" :text="'Delete post?'" v-on:reply="removePost"></modal>
    <span v-if="id!=0" @click="modalOpen=true">
      <div class="editButton">
        <span class="removeIcon"></span>Remove post
      </div>
    </span>
    <h1 v-if="id==0">Create Post</h1>
    <h1 v-else>Post edit</h1>
    <div v-if="post">
      <label for="postName">Post Name</label>
      <input v-model="post.postName" id="postName" type="text" placeholder="Enter PostName" />
      <label for="description">Description</label>
      <textarea v-model="post.description" id="description" placeholder="Enter description"></textarea>
      <label for="postContent">Post Content</label>
      <vue-editor v-model="post.postContent" />

      <div :class="{disabled : id==0}" class="uploadImage">
        <div v-if="uploadImgValue">
          <p>
            Progress: {{uploadImgValue.toFixed()+"%"}}
            <progress :value="uploadImgValue" max="100"></progress>
          </p>
        </div>
        <div>
          <img class="preview" :src="post.url" />
        </div>
        <input type="file" ref="inputFile" class="inputFile" @change="previewImage" accept="image/" />
        <button class="button" @click="OpenFileSelect()">Upload picture</button>
      </div>

      <div class="choice">
        <input
          v-model="post.publish"
          type="radio"
          id="contactChoice1"
          name="contact"
          :value="false"
          checked
        />
        <label for="contactChoice1">Draft</label>
        <input v-model="post.publish" type="radio" id="contactChoice2" name="contact" :value="true" />
        <label for="contactChoice2">Publish</label>
      </div>
      <div class="select" v-if="categories">
        <select v-model="post.category" size="1" name="category[]">
          <option :value="null" selected disabled>Select category</option>
          <option
            :value="category.id"
            v-for="category in categories"
            :key="category.id"
          >{{category.categoryName}}</option>
        </select>
      </div>
    </div>
    <button v-if="!loading" class="button" @click="save()">save</button>
    <button v-else class="button disabled">Loading...</button>
    <span class="errorMsg">{{submitStatus}}</span>
  </div>
</template>
<script>
import modal from "./../components/Modal.vue";
import { VueEditor } from "vue2-editor";
export default {
  name: "MainContent",
  data() {
    return {
      modalOpen: false,
      submitStatus: null,
    };
  },
  props: {
    id: String,
  },
  components: { VueEditor, modal },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    categories() {
      return this.$store.getters.categories;
    },
    uploadImgValue() {
      return this.$store.getters.uploadImgValue;
    },
    post() {
      if (this.id == 0) {
        return {
          postName: "",
          postContent: "",
          description: "",
          id: null,
          url: null,
          category: null,
          publish: false,
        };
      }
      return this.$store.getters.post(this.id);
    },
  },
  methods: {
    save() {
      if (this.id == 0) {
        this.$store
          .dispatch("savePost", this.post)
          .then((id) => {
            this.submitStatus = "OK";
            this.$store.dispatch("getPosts");
            this.$router.push("/postEdit/" + id);
          })
          .catch((err) => {
            console.log(err);
            this.submitStatus = err;
          });
      } //for edit post
      else {
        this.$store
          .dispatch("updatePost", this.post)
          .then(() => {
            this.submitStatus = "OK";
            this.$store.dispatch("getPosts");
          })
          .catch((err) => {
            console.log(err);
            this.submitStatus = err;
          });
      }
    },

    OpenFileSelect() {
      if (this.id != 0) {
        this.$refs.inputFile.click();
      }
    },
    previewImage(event) {
      this.oldImgUrl = this.post.url;
      this.post.url = null;
      this.imageData = event.target.files[0];
      this.post.url = window.URL.createObjectURL(this.imageData);

      this.$store
        .dispatch("uploadImg", this.imageData)
        .then(() => {
          this.submitStatus = "OK";
        })
        .catch((err) => {
          console.log(err);
          this.submitStatus = err;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "./../scss/components/_editText.scss";
</style>
