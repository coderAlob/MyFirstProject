<template>
  <div class="tab-controller">
    <div v-for="(item,index) in titles"
         class="tab-controller-item" :class="{active: index == currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabController",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data (){
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick (index){
        this.currentIndex = index;
        this.$emit('tabClick',index)
      }
    }
  }
</script>

<style scoped>
  .tab-controller {
    display: flex;
    text-align: center;
    font-size: 15px;
    line-height: 40px;
    background-color: #fff;
  }
  .tab-controller-item {
    flex: 1;
    height: 40px;
  }
  .tab-controller-item span {
    padding-bottom: 5px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 2px solid var(--color-high-text);
  }
</style>
