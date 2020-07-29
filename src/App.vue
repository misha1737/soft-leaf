<template>
  <div id="app">
    <div id="nav">
      <Header>
      </Header>

    </div>
    <router-view/>
  </div>
</template>
<script>
import Header from './components/Header.vue'
export default {
  name: 'app',
     data(){
            return{
  
            }
        },
  components: {
    Header,
  },
}

</script>
<style lang="scss">
  @import "./scss/_variables.scss";
  @import "./scss/_base.scss";

</style>
