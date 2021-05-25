<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <div slot="left" class="back">
        <img src="~assets/img/common/back.svg" alt="" @click="backClick">
      </div>
      <div slot="center" class="title">
        <div v-for="(title, index) in titles"
             class="title-item"
             :class="{active: index == currentIndex}"
             @click="titleClick(index)">
          {{title}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品','参数','评论','推荐'],
        currentIndex: 0
      }
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index
      },
      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .back img{
    margin: 11px 0 0 12px;
  }
  .title {
    display: flex;
  }
  .title-item {
    flex: 1;
    font-size: 12px;
  }
  .active {
    color: var(--color-high-text);
  }
</style>
