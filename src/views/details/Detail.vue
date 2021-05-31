<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="navBar"/>
    <div>{{$store.state.cartList.length}}</div>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="param"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommendInfo" @imageLoad="imageLoad" ref="recommend"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isBackShow"/>
    <detail-bottom-bar @addToCart="addToCart"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComponents/DetailNavBar";
  import DetailSwiper from "./childComponents/DetailSwiper";
  import DetailBaseInfo from "./childComponents/DetailBaseInfo";
  import DetailShopInfo from "./childComponents/DetailShopInfo";
  import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
  import DetailParamInfo from "./childComponents/DetailParamInfo";
  import DetailCommentInfo from "./childComponents/DetailCommentInfo";
  import GoodsList from "components/content/goods/GoodsList";
  import DetailBottomBar from "./childComponents/DetailBottomBar";
  import BackTop from "components/content/backtop/BackTop";

  import Scroll from "components/common/scroll/Scroll";

  import {getDetail, Goods, Shop, GoodsParam, getRecommends} from "network/detail";
  import {debounce} from "common/utils";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      BackTop
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommendInfo: [],
        isBackShow: false,
        themeTopYs: [0,0,0,0],
        getThemeTopYs: null,
        currentIndex: 0
      }
    },
    created() {
      //1.保存iid并将他作为参数带入到详情页中
      this.iid = this.$route.params.iid

      //2.根据iid请求详情页面的所有数据
      getDetail(this.iid).then(res => {
        //获取轮播图图片
        this.topImages = res.data.result.itemInfo.topImages

        //获取商品的更多信息
        this.goods = new Goods(res.data.result.itemInfo, res.data.result.columns, res.data.result.shopInfo.services)
        //获取店铺信息
        this.shop = new Shop(res.data.result.shopInfo)
        //获取详细图片
        this.detailInfo = res.data.result.detailInfo
        //获取商品的参数
        this.paramInfo = new GoodsParam(res.data.result.itemParams.info,res.data.result.itemParams.rule)
        //获取评论信息
        if(res.data.result.rate.cRate !=0 ){
          this.commentInfo = res.data.result.rate.list[0]
        }
      })

      // 获取评论信息
      getRecommends().then(res => {
        this.recommendInfo = res.data.data.list
      })


       this.getThemeTopYs = debounce(() => {
        this.themeTopYs.splice(0,1,0)
        this.themeTopYs.splice(1,1,this.$refs.param.$el.offsetTop)
        this.themeTopYs.splice(2,1,this.$refs.comment.$el.offsetTop)
        this.themeTopYs.splice(3,1,this.$refs.recommend.$el.offsetTop)
      },500)
      //获取各部分的offsetTop值
      //第一种方法
      //失败原因：所选中的对象还未渲染到DOM中，获取不到数据，会出现undefined
      // this.themeTopYs.push(0)
      // this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

      //第二种方法
      //失败原因：this.$nextTick(回调函数)会在DOM渲染完成后再对内部的回调函数进行执行，但是如图片等，图片不一定加载完成，导致跳转位置不正确
      // this.$nextTick(() => {
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.themeTopYs);
      // })
    },
    //第三种方法
    //使用生命周期函数updated，在页面数据发生更新时，就对保存位置信息的数组进行一次更新
    //但是更新次数过于频繁，浪费大量性能，不建议使用（因此使用防抖函数对该步骤进行处理）
    updated() {
      // this.themeTopYs.splice(0,1,0)
      // this.themeTopYs.splice(1,1,this.$refs.param.$el.offsetTop)
      // this.themeTopYs.splice(2,1,this.$refs.comment.$el.offsetTop)
      // this.themeTopYs.splice(3,1,this.$refs.recommend.$el.offsetTop)
      // console.log(this.themeTopYs);

      //第四种方法：使用防抖函数
      this.getThemeTopYs()
    },
    methods: {
      imageLoad() {
        this.$refs.scroll && this.$refs.scroll.refresh()
      },
      backClick() {
        this.$refs.scroll.scroll.scrollTo(0,0,500)
      },
      contentScroll(position) {
        this.isBackShow = (-position.y) >1000
        //可以往数组里添加一个js能表示的最大数（Number.MAX_Value），省去多写出来的大于数组最后一个元素的比较步骤
        for(let i =0; i < this.themeTopYs.length; i ++){
          if(this.currentIndex != i && (i < this.themeTopYs.length -1 && -position.y >= this.themeTopYs[i] && -position.y <= this.themeTopYs[i+1])
            || (i == this.themeTopYs.length -1 && -position.y >= this.themeTopYs[i])){
            this.currentIndex = i
            this.$refs.navBar.currentIndex = this.currentIndex
          }
        }
      },
      //点击顶部标签，跳转到响应的位置
      titleClick(index){
        this.$refs.scroll.scroll.scrollTo(0, -this.themeTopYs[index],500)
      },

      //点击添加到购物车，将当前商品添加到购物车中
      addToCart() {
        const product = {}
        //1.获取购物车需要展示的信息
        product.image = this.topImages[0]
        product.desc = this.goods.desc
        product.title = this.goods.title
        product.price = this.goods.nowPrice
        product.iid = this.goods.iid

        //2.将商品添加到购物车中
        this.$store.commit('addToCart',product)
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  #detail img {
    background-color: #fff;
  }

  .detail-nav-bar{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    /*overflow: hidden;*/
    position: absolute;
    top: 44px;
    bottom: 49px;
  }
</style>
