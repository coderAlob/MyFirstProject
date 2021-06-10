<template>
  <div class="cart-buttom-bar">
    <div class="check-all">
      <check-button :is-active="isSelectAll" class="check-button" @click.native="ifSelectAll"/>
      <span>全选</span>
    </div>

    <div class="totalPrice">合计：{{totalPrice}}</div>

    <div class="calculate" @click="calcClick">
      结算({{checkItem}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  export default {
    name: "CartButtomBar",
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        return "￥" + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + (item.price * item.count)
        },0).toFixed(2)
      },
      checkItem() {
        return this.$store.state.cartList.filter(item => {
          return item.checked
        }).length
      },
      isSelectAll() {
        if(this.$store.state.cartList.length==0){return false}
        return !(this.$store.state.cartList.filter(item => !item.checked).length)
        // 使用array.find()方法，可以做到性能优化，找到一个未选中时就会停止；而filter方法则会对数组完成遍历后才会停止
        // return !(this.$store.state.cartList.find(item => !item.checked))
      }
    },
    methods: {
      ifSelectAll() {
        if(this.isSelectAll) {
        // if(this.$store.state.cartList.filter(item => !item.checked).length == 0) {
          this.$store.commit('pauseSelectAll')
        }else {
          this.$store.commit('selectAll')
        }
      },
      calcClick() {
        if(!this.isSelectAll) {
          this.$toast.show('请选择要购买的商品')
        }else {
          this.$toast.show('跳转至结算页面')
        }
      }
    }
  }
</script>

<style scoped>
  .cart-buttom-bar {
    background-color: #eee;
    height: 40px;
    line-height: 40px;
    font-size: 14px;

    display: flex;
  }

  .check-all {
    display: flex;
    align-items: center;
    margin-left: 5px;
    width: 60px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
  }

  .totalPrice {
    margin-left: 30px;
    flex: 1;
  }
  .calculate {
    width: 90px;
    background-color: orangered;
    text-align: center;
    color: white;
  }
</style>
