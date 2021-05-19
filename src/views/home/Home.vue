<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <home-recommend-view :recommends="recommends"/>
    <feature-view/>
    <tab-controller class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick"/>
    <goods-list :goods="showGoods"/>

  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./childComponents/HomeSwiper";
  import HomeRecommendView from "./childComponents/HomeRecommendView";
  import FeatureView from "./childComponents/FeatureView";
  import TabController from "components/content/tabController/TabController";
  import GoodsList from "components/content/goods/GoodsList";

  import {getHomeMultidata,getHomeGoods} from "network/home";

  export default {
    name: "Home",
    data (){
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop'
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommendView,
      FeatureView,
      TabController,
      GoodsList,
    },
    created() {
      //  1.请求轮播图数据
      this.getHomeMultidata()
      //  2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      /*
      * 网络请求相关方法
      * */
      getHomeMultidata (){
        getHomeMultidata().then(res =>{
          this.banners = res.data.data.banner.list
          this.recommends = res.data.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page +1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page +=1;
        })
      },

      /*
      * 事件监听相关的方法
      * */
      tabClick(index) {
        switch (index) {
          case 0: {
            this.currentType = 'pop'
            break
          }
          case 1: {
            this.currentType = 'new'
            break
          }
          case 2: {
            this.currentType = 'sell'
            break
          }
          default : {
            this.currentType = 'pop'
          }
        }
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #ffffff;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 9;
  }

  .tab-control {
    /*还未到达指定位置时，position: fixed;  当到达指定位置时则会变成 position: static;*/
    /*ie浏览器目前不兼容该属性*/
    position: sticky;
    top: 44px;
    z-index: 8;
  }
</style>
