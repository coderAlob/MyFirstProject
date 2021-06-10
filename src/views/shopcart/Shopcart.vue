<template>
  <div class="cart">
<!--    购物车导航-->
    <nav-bar class="cart-nav"><div slot="center">购物车({{$store.state.cartList.length}})</div></nav-bar>


<!--    购物车商品列表-->
    <div class="tips" v-if="isTipShow">快去选购喜欢的物品吧</div>
    <scroll
      class="content"
      ref="scroll"
      :pull-up-load="true"
      @pullingUp="refresh" v-else>
      <cart-list></cart-list>
    </scroll>


<!--    购物车底部-->
    <cart-buttom-bar class="cart-buttom-bar"></cart-buttom-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childrenComponents/CartList";
  import CartButtomBar from "./childrenComponents/CartButtomBar";

  import Scroll from "components/common/scroll/Scroll";

  export default {
    name: "Shopcart",
    components: {
      Scroll,
      NavBar,
      CartList,
      CartButtomBar,
    },
    methods: {
      refresh() {
        this.$refs.scroll.scroll.refresh()
        this.$refs.scroll.scroll.finishPullUp()
      },
    },
    computed: {
      isTipShow() {
        if(this.$store.state.cartList.length == 0) {
          return true
        }else {
          return false
        }
      }
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
    position: relative;
  }
  .content {
    width: 100%;
    height: calc(100vh - 44px - 49px - 40px);
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
  }
  .cart-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
  .cart-buttom-bar {
    position: absolute;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tips {
    line-height: calc(90vh - 300px);
    margin: 10px auto;
    text-align: center;
  }
</style>
