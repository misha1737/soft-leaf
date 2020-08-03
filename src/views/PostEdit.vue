<template>
  <div class="form">
    <p v-if="id==0" class="title">Create Post</p>
    <p v-else class="title">Post edit</p>
    {{post}}
    <label for="postName">Post Name</label>
    <input v-model="postName" id="postName" type="text" placeholder="Enter PostName" />

    <label for="description">description</label>
    <textarea v-model="description" id="description" placeholder="Enter description" />

    <label for="postContent">post</label>
    <textarea v-model="postContent" id="postContent" placeholder="Enter post" />

    <input type="file" />

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
export default {
  name: "MainContent",

  data() {
    return {
      postName: "",
      postContent: "",
      description: "",
      submitStatus: null
    };
  },
  props: {
    id: String
  },
  validations: {},
  methods: {
    submit() {
      const post = {
        postName: this.postName,
        postContent: this.postContent,
        description: this.description
      };
      this.$store
        .dispatch("savePost", post)
        .then(() => {
          this.submitStatus = "OK";
          // this.$router.push("/user");
        })
        .catch(err => {
          console.log(err);
          this.submitStatus = err;
        });
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    post() {
      if(this.id==0){

      }else{
        let post = this.$store.getters.post(this.id);
        console.log( this.$store.getters.post(this.id));
        this.postName=post.postName ;
         this.postContent= post.postContent;
         this.description=post.descriptio;
       // return this.$store.getters.post(this.id);
      }
        
    }
  },
  // mounted() {
  //   this.postName = this.post.postName;
  //   this.postContent = this.post.postContent;
  //   this.description = this.post.description;
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
 