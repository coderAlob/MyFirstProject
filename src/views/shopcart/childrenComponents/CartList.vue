<template>
  <div class="cart-list">
    <cart-list-item v-for="(item,index) in $store.state.cartList" :product="item" :key="index"/>
  </div>
</template>

<script>
  import BScroll from "components/common/scroll/Scroll";
  import CartListItem from "./CartListItem";
  export default {
    name: "CartList",
    components: {
      BScroll,
      CartListItem,
    },
  }
</script>

<style scoped>
</style>
