<template>
  <div class="commentsBlock">
    <div class="line"></div>
    <div v-if="checkUser">
      <div class="form">
        <textarea v-model="newComment" id="description" placeholder="Enter description"></textarea>
        <button @click="saveComment()" class="button">send</button>
        {{submitStatus}}
      </div>
    </div>
    <div class="loginError" v-else>
      <h3>Please login to post a comment</h3>
      <autorizationBlock />
    </div>
    <div class="line"></div>
    <div v-if="comments" class="comments">
      <div class="comment" v-for="(comment,index) in comments" :key="index">
        <div>
        <span class="comment__name">{{comment.userName}}</span>
        <span class="comment__time">{{formatTime(comment.time)}}</span>
        </div>
        <p class="comment__text">{{comment.comment}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import autorizationBlock from "./../components/AutorizationBlock.vue"
export default {
  name: "commentsBlock",
  data() {
    return {
      newComment: "",
      submitStatus: "",
    };
  },
  props: {
    id: String,
  },
  components: {
    autorizationBlock,
  },
  methods: {
    saveComment() {
      const commentsObj = {
        comment: this.newComment,
        id: this.id,
      };

      this.$store
        .dispatch("saveComment", commentsObj)
        .then(() => {
          this.submitStatus = "OK";
          this.$store.dispatch("loadComments", { id: this.id });
        })
        .catch((err) => {
          console.log(err);
          this.submitStatus = err;
        });
    },
    formatTime(time) {
      let t = new Date(time);
      return t.toLocaleString();
    },
  },
  computed: {
    checkUser() {
      return this.$store.getters.checkUser;
    },
    comments() {
      return this.$store.getters.comments;
    },
  },
};
</script>
<style lang="scss">
</style>