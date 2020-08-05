<template>
  <div class="modal"  @click="$emit('reply',result=false)">
      <div class="popap">
      <p>{{text}}</p>
      <div class="buttons">
      <button class="button" @click="$emit('reply',result=true)">Remove</button>
      <button class="button" @click="$emit('reply',result=false)">Cancel</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "modal",
  data() {
    return {};
  },
  props:{
    text:String
  },
  methods: {
 
  },
  computed: {

  },
};
</script>
<style lang="scss">

    @import "./../scss/_modal.scss";

</style>