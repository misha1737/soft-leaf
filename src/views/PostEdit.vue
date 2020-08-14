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
    <label for="postName">Post Name</label>
    <input v-model="postName" id="postName" type="text" placeholder="Enter PostName" />
    <label for="description">Description</label>
    <textarea v-model="description" id="description" placeholder="Enter description"></textarea>
    <label for="postContent">Post Content</label>
    <vue-editor v-model="postContent" />
    <div :class="{disabled : id==0}" class="uploadImage">
      <div v-if="progress">
        <p>
          Progress: {{uploadValue.toFixed()+"%"}}
          <progress :value="uploadValue" max="100"></progress>
        </p>
      </div>
      <div>
        <img class="preview" :src="picture" />
      </div>
      <input type="file" ref="inputFile" class="inputFile" @change="previewImage" accept="image/" />
      <button class="button" @click="OpenFileSelect()">Upload picture</button>
    </div>
    <div class="choice">
      <input
        v-model="publish"
        type="radio"
        id="contactChoice1"
        name="contact"
        :value="false"
        checked
      />
      <label for="contactChoice1">Draft</label>
      <input v-model="publish" type="radio" id="contactChoice2" name="contact" :value="true" />
      <label for="contactChoice2">Publish</label>
    </div>
    <div class="select">
    <select v-model="category" size="1" name="hero[]">
      <option :value="null" selected disabled>Select category</option>
      <option
        :value="category.id"
        v-for="category in categories"
        :key="category.id"
      >{{category.categoryName}}</option>
    </select>
    </div>
    <button v-if="!loading" class="button" @click="submit()">save</button>
    <button v-else class="button disabled">Loading...</button>

    <span class="errorMsg">{{submitStatus}}</span>
  </div>
</template>

<script>
import firestore from "firebase/app";
import { VueEditor } from "vue2-editor";
import modal from "./../components/Modal.vue";
export default {
  name: "MainContent",

  data() {
    return {
      postName: "",
      postContent: "",
      description: "",
      submitStatus: null,
      modalOpen: false,
      //upl img
      imageData: null,
      picture: null,
      uploadValue: 0,
      oldImgUrl: "",
      category: null,
      publish: false,
      inputFile: this.$refs.inputFile,
      progress: false,
    };
  },
  props: {
    id: String,
  },
  components: { VueEditor, modal },
  validations: {},
  methods: {
    removePost(result) {
      if (!result) {
        this.modalOpen = false;
        return;
      }
      this.$store
        .dispatch("removePost", this.id)
        .then(() => {
          this.submitStatus = "OK";
          this.$store.dispatch("loadPosts");
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
          this.submitStatus = err;
        });
    },
    previewImage(event) {
      this.progress = true;
      this.uploadValue = 0;
      this.oldImgUrl = this.picture;
      this.picture = null;
      this.imageData = event.target.files[0];
      this.uploadImg();
    },
    OpenFileSelect() {
       if (this.id != 0) {
      this.inputFile.click();
       }
    },
    uploadImg() {
      if (this.id == 0) {
        return;
      }

      if (this.picture != this.oldImgUrl) {
        firestore
          .storage()
          .ref("posts/")
          .child(`${this.id}`)
          .listAll()
          .then(function (result) {
            result.items.forEach((item) => {
              firestore.storage().ref(item.location.path_).delete();
            });
          });
      }

      this.picture = null;
      const storageRef = firestore
        .storage()
        .ref(`posts/${this.id}/${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        "state_changed",
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.picture = url;
            this.progress = false;
          });
        }
      );
    },
    submit() {
      const postObj = {
        postName: this.postName,
        postContent: this.postContent,
        description: this.description,
        id: this.id == 0 ? null : this.id,
        url: this.picture ? this.picture : null,
        category: this.category,
        publish: this.publish,
      };
      //delete old img

      //for create post
      if (this.id == 0) {
        this.$store
          .dispatch("savePost", postObj)
          .then(() => {
            this.submitStatus = "OK";
            this.$store.dispatch("loadPosts");
          })
          .catch((err) => {
            console.log(err);
            this.submitStatus = err;
          });
      } //for edit post
      else {
        this.$store
          .dispatch("updatePost", postObj)
          .then(() => {
            this.submitStatus = "OK";
            this.$store.dispatch("loadPosts");
          })
          .catch((err) => {
            console.log(err);
            this.submitStatus = err;
          });
      }
    },
  },
  mounted() {
    this.inputFile = this.$refs.inputFile;
    if (this.post && this.id != 0) {
      this.postName = this.post.postName;
      this.postContent = this.post.postContent;
      this.description = this.post.description;
      this.picture = this.post.url;
      this.category = this.post.category;
      this.publish = this.post.publish;
    } else {
      this.postName = "";
      this.postContent = "";
      this.description = "";
      this.picture = "";
      this.category = null;
      this.publish = false;
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    post() {
      return this.$store.getters.post(this.id);
    },
    categories() {
      return this.$store.getters.categories;
    },
  },
  watch: {
    id: function (val) {
      if (this.post && this.id != 0) {
        this.postName = this.post.postName;
        this.postContent = this.post.postContent;
        this.description = this.post.description;
        this.picture = this.post.url;
        this.category = this.post.category;
        this.publish = this.post.publish;
      } else {
        this.postName = "";
        this.postContent = "";
        this.description = "";
        this.picture = "";
        this.category = null;
        this.publish = false;
      }
    },
    post: function (val) {
      if (this.post && this.id != 0) {
        this.postName = this.post.postName;
        this.postContent = this.post.postContent;
        this.description = this.post.description;
        this.picture = this.post.url;
        this.category = this.post.category;
        this.publish = this.post.publish;
      } else {
        this.postName = "";
        this.postContent = "";
        this.description = "";
        this.picture = "";
        this.category = null;
        this.publish = false;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "./../scss/components/_editText.scss";
</style>
 