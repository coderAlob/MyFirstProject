<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-controller :titles="['流行', '新款', '精选']"
                    @tabClick="tabClick"
                    ref="tabController1"
                    v-show="isTabFixed"
                    class="tabControl"/>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll" @pullingUp="loadMore" >
      <home-swiper :banners="banners"
                   @swiperImageLoad="swiperImageLoad"/>
      <home-recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-controller class="tab-control"
                      :titles="['流行', '新款', '精选']"
                      @tabClick="tabClick"
                      ref="tabController2"/>
      <goods-list :goods="showGoods"/>
    </scroll>
<!--    .native修饰符： 监听组件的原生事件-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
  import HomeSwiper from "./childComponents/HomeSwiper";
  import HomeRecommendView from "./childComponents/HomeRecommendView";
  import FeatureView from "./childComponents/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabController from "components/content/tabController/TabController";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backtop/BackTop";

  import {getHomeMultidata,getHomeGoods} from "network/home";
  import {debounce} from "common/utils";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommendView,
      FeatureView,
      TabController,
      GoodsList,
      Scroll,
      BackTop
    },
    data (){
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
        itemListener: null
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },

    created() {
      //  1.请求轮播图数据
      this.getHomeMultidata()
      //  2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    activated() {
      this.$refs.scroll.scroll.scrollTo(0, this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      //保存离开时的位置y
      this.saveY = this.$refs.scroll.scroll.y
      //离开时取消事件总线的监听
      this.$bus.$off('itemImageLoad', this.itemListener)
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
          //将获取到的商品信息保存到本地
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
        this.$refs.tabController1.currentIndex = index;
        this.$refs.tabController2.currentIndex = index;
        //点击相应的分类页，实现子内容回到顶部
        this.$refs.scroll.scroll.scrollTo(0, - this.tabOffsetTop,700)
      },
      backClick() {
        //通过this.$refs.ref值获取scroll组件对象
        //scrollTo(x,y,time)
        this.$refs.scroll.scroll.scrollTo(0,0,700)
      },
      contentScroll(position) {
        //1.判断BackTop图标是否显示
        this.isShowBackTop = (- position.y) >1000

        //2.决定tabController是否吸顶
        this.isTabFixed = ( - position.y) >= this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
        this.$refs.scroll && this.$refs.scroll.scroll.finishPullUp()
        this.$refs.scroll && this.$refs.scroll.refresh
      },
      swiperImageLoad() {
        //  获取tabController的tabOffsetTop
        this.tabOffsetTop =this.$refs.tabController2.$el.offsetTop
      }
    },

    mounted() {
      //监听图片加载，并实时刷新可滚动区域高度(scrollerHeight)
      //1.使用$bus事件总线，对图片刷新进行事件监听
      // this.$bus.$on('itemImageLoad', () => {
      //   this.$refs.scroll && this.$refs.scroll.refresh()
      // })

    //  2.使用防抖函数，避免refresh多次调用
      const refresh = debounce(this.$refs.scroll && this.$refs.scroll.refresh,500)
      this.itemListener = () => {
        refresh()
      }
      //对itemImageLoad进行监听，并执行itemListener回调函数
      this.$bus.$on('itemImageLoad', this.itemListener)


    }
  }
</script>

<style scoped>
  #home {
    /*vh: view point 视口高度*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #ffffff;
    /*position: fixed;*/
    /*left: 0;*/
    /*top: 0;*/
    /*right: 0;*/
    /*z-index: 9;*/
  }

  .tab-control {
    /*还未到达指定位置时，position: fixed;  当到达指定位置时则会变成 position: static;*/
    /*ie浏览器目前不兼容该属性*/
    /*position: sticky;*/
    /*top: 44px;*/
    z-index: 8;
  }

  .content {
    /*height: calc(100vh - 93px);*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
  }

  .tabControl {
    position: relative;
    z-index: 9;
  }
</style>
