<template>
  <div class="list" >

    <li v-for="item in items" :key="item.id">
          up down {{item.categoryName}}

           <span @click="$emit('deleteItem', item.id)">X</span> 
           </li>
  </div>
</template>
<script>
export default {
  name: "list",
 
  data() {
    return {};
  },
 props:{
    items: Array
  },
  methods:{
    deleteCatrgory(id){

    }
  }
};
</script>
<style lang="scss">

</style>