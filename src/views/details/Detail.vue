<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo"/>
    </scroll>
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

  import Scroll from "components/common/scroll/Scroll";

  import {getDetail, Goods, Shop, GoodsParam} from "network/detail";

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
      DetailCommentInfo
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
        commentInfo: {}
      }
    },
    created() {
      //1.保存iid并将他作为参数带入到详情页中
      this.iid = this.$route.params.iid

      //2.根据iid请求详情页面的所有数据
      getDetail(this.iid).then(res => {
        console.log(res);
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
          this.commentInfo = res.data.result.rate.list[0]}
        })
    },
    methods: {
      imageLoad() {
        this.$refs.scroll && this.$refs.scroll.refresh()
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
    bottom: 0;
  }
</style>
