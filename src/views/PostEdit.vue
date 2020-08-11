<template>
  <div class="form">
    <modal v-if="modalOpen" :text="'Delete post?'" v-on:reply='removePost'></modal>
    <h6 v-if="id!=0" @click="modalOpen=true">remove post</h6>
    <p v-if="id==0" class="title">Create Post</p>
    <p v-else class="title">Post edit</p>
    <label for="postName">Post Name</label>
    <input v-model="postName"  id="postName" type="text" placeholder="Enter PostName" />

    <label for="description">description</label>
    <textarea v-model="description" id="description" placeholder="Enter description" />

    <label for="postContent">post</label>

    <vue-editor v-model="postContent" />

   

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
     
    </div>

    <label for="contactChoice1">Draft</label>
    <input v-model="publish" type="radio" id="contactChoice1" name="contact" :value='false' checked/>

    <label for="contactChoice2">Publish</label>
    <input v-model="publish" type="radio" id="contactChoice2" name="contact" :value='true' />
{{categories}}
    <select v-model="category" size="1" name="hero[]">
       <option :value="null" selected disabled>Select category</option>
      <option :value="category.id" v-for="category in categories" :key="category.id" >
        {{category.categoryName}}
      </option>
    </select>

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
      modalOpen:false,
      //upl img
      imageData: null,
      picture: null,
      uploadValue: 0,
      oldImgUrl:"",
      category:null,
      publish:false
    };
  },
  props: {
    id: String,
  },
components: { VueEditor, modal },
  validations: {},
  methods: {
    
    removePost(result){
      if(!result) {
        this.modalOpen=false;
        return
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
      this.uploadValue = 0;
      this.oldImgUrl = this.picture;
      this.picture = null;
      this.imageData = event.target.files[0];
      this.uploadImg();
    },
    uploadImg() {
      if(this.id==0){
        return
      }


      if(this.picture!= this.oldImgUrl){
        firestore.storage().ref('posts/').child(`${this.id}`).listAll().then(function(result){
     result.items.forEach(item=>{
       firestore.storage().ref(item.location.path_).delete();
     })
      })
      }



      this.picture = null;
      const storageRef = firestore.storage().ref(`posts/${this.id}/${this.imageData.name}`).put(this.imageData);
      storageRef.on("state_changed",(snapshot) => {
          this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
        url: this.picture ? this.picture : null,
        category: this.category,
        publish: this.publish
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
  mounted(){
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
    }
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
              this.category = null
              this.publish = false;
            }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
 