<template>
  <div class="form">
    <p v-if="id==0" class="title">Create Post</p>
    <p v-else class="title">Post edit</p>

    <label for="postName">Post Name</label>
    <input v-model="postName"  id="postName" type="text" placeholder="Enter PostName" />

    <label for="description">description</label>
    <textarea v-model="description" id="description" placeholder="Enter description" />

    <label for="postContent">post</label>
    <textarea v-model="postContent" id="postContent" placeholder="Enter post" />

    <div  :class="{disabled : id==0}" class="uploadImage " >
      <div>
        <p>
          Progress: {{uploadValue.toFixed()+"%"}}
          <progress :value="uploadValue" max="100"></progress>
        </p>
      </div>

      <div>
        
        <img class="preview" :src="picture" />
        <br />
      </div>
      <input type="file" @change="previewImage" accept="image/" />
      <button @click="uploadImg()">Upload</button>
    </div>

    <label for="contactChoice1">Draft</label>
    <input type="radio" id="contactChoice1" name="contact" value="email" checked />

    <label for="contactChoice2">Publish</label>
    <input type="radio" id="contactChoice2" name="contact" value="phone" />

    <select size="1" name="hero[]">
      <option selected disabled>Select category</option>
      <option value="Чебурашка">Health</option>
      <option value="Крокодил Гена">food</option>
      <option value="Шапокляк">sex</option>
      <option value="Крыса Лариса">psychology</option>
      <option value="Sports and beauty">Sports and beauty</option>
    </select>

    <button v-if="!loading" class="button" @click="submit()">save</button>
    <button v-else class="button disabled">Loading...</button>

    <span class="errorMsg">{{submitStatus}}</span>
  </div>
</template>

<script>
import firestore from "firebase/app";
export default {
  name: "MainContent",

  data() {
    return {
      postName: "",
      postContent: "",
      description: "",
      submitStatus: null,

      //upl img
      imageData: null,
      picture: null,
      uploadValue: 0,
    };
  },
  props: {
    id: String,
  },
  validations: {},
  methods: {
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },
    uploadImg() {
      if(this.id==0){
        return
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
        url: this.picture
      };
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
  mounted(){
          if (this.post && this.id != 0) {
        this.postName = this.post.postName;
        this.postContent = this.post.postContent;
        this.description = this.post.description;
        this.picture = this.post.url;
      } else {
        this.postName = "";
        this.postContent = "";
        this.description = "";
        this.picture = "";
      }
    },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    post() {
      console.log('computed');
      return this.$store.getters.post(this.id);
    },
  },
  watch: {
    id: function (val) {
      if (this.post && this.id != 0) {
        this.postName = this.post.postName;
        this.postContent = this.post.postContent;
        this.description = this.post.description;
        this.picture = this.post.url;
      } else {
        this.postName = "";
        this.postContent = "";
        this.description = "";
        this.picture = "";
      }
    },
    post: function (val) {
        if (this.post && this.id != 0) {
              this.postName = this.post.postName;
              this.postContent = this.post.postContent;
              this.description = this.post.description;
              this.picture = this.post.url;
            } else {
              this.postName = "";
              this.postContent = "";
              this.description = "";
              this.picture = "";
            }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
 