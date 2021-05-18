<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-active-icon"></slot></div>
    <div :style="activeStyle"><slot name="item-name"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      link: String
    },
    data (){
      return {
        activeColor : 'red',
      }
    },
    computed: {
      isActive (){
        return this.$route.path.indexOf(this.link) != -1
      },
      activeStyle (){
        return this.isActive ? {color: this.activeColor } : {}
      }
    },
    methods: {
      itemClick (){
        this.$router.replace(this.link).catch(err=>{

        })
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img {
    width: 20px;
    height: 20px;
    margin: 5px 0 0 0;
  }
</style>
