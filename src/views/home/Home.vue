<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <home-recommend-view :recommends="recommends"/>

  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./childComponents/HomeSwiper";
  import HomeRecommendView from "./childComponents/HomeRecommendView";

  import {getHomeMultidata} from "network/home";
  export default {
    name: "Home",
    data (){
      return {
        banners: [],
        recommends: [],
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommendView,
    },
    created() {
      //  1.请求多个数据
      getHomeMultidata().then(res =>{
        console.log(res);
        this.banners = res.data.data.banner.list
        this.recommends = res.data.data.recommend.list
      })
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #ffffff;
  }
</style>
