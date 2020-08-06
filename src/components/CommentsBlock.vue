<template>
  <div class="commentsBlock" >
    <div class="line"></div>
    <div v-if="checkUser">
      <textarea v-model="newComment" id="description" placeholder="Enter description"></textarea>
      <button @click="saveComment()" class="button">send</button>
      {{submitStatus}}
    </div>
    <autorizationBlock v-else />
    <div class="line"></div>
    <div v-if="comments">
<div  v-for="(comment,index) in comments" :key="index">
    
      <span>{{comment.userId}}</span>
      <span>time</span>
      <p>
        {{comment.comment}}
      </p>
    </div>
  </div>
   </div>
</template>
<script>
import autorizationBlock from "./../components/autorizationBlock.vue";
export default {
  name: "commentsBlock",
  data() {
    return {
      newComment: "",
      submitStatus: ""
    };
  },
  props: {
    id: String
  },
  components: {
    autorizationBlock
  },
  methods: {
    saveComment() {
      const commentsObj = {
        comment: this.newComment,
        id: this.id
      };

      this.$store
        .dispatch("saveComment", commentsObj)
        .then(() => {
          this.submitStatus = "OK";
            this.$store.dispatch('loadComments', {id:this.id});
        })
        .catch(err => {
          console.log(err);
          this.submitStatus = err;
        });
    }
  },
  computed: {
    checkUser() {
      return this.$store.getters.checkUser;
    },
    comments() {
      return this.$store.getters.comments;
    },
  }
};
</script>
<style lang="scss">
</style>