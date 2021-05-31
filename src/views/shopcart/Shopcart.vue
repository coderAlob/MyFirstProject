<template>
  <div class="cart">
<!--    购物车导航-->
    <nav-bar class="cart-nav"><div slot="center">购物车({{$store.state.cartList.length}})</div></nav-bar>
    <scroll class="content">
      <cart-list></cart-list>
    </scroll>
<!--    购物车商品列表-->
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childrenComponents/CartList";

  import Scroll from "../../components/common/scroll/Scroll";

  export default {
    name: "Shopcart",
    components: {
      Scroll,
      NavBar,
      CartList
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
    position: relative;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
  }
  .cart-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
