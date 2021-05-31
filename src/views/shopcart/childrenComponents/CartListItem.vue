<template>
  <div id="shop-item">
    <div class="item-selector">
      <check-button :is-active="product.checked" @click.native="checkClick"/>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{product.title}}</div>
      <div class="item-desc">商品描述: {{product.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{product.price}}</div>
        <div class="item-count right">x{{product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  export default {
    name: "CartListItem",
    components: {
      CheckButton
    },
    props: {
      product : {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      checkClick() {
        this.product.checked = !this.product.checked
      }
    }

  }
</script>

<style scoped>
  #shop-item {
    width: 100%;
    border-bottom: 1px solid #ccc;
    display: flex;
    font-size: 0;
    padding: 5px;
  }
  .item-selector {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-img {
    padding: 5px;
  }
  .item-img img{
    height: 100px;
    width: 75px;
    border-radius: 5px;
    margin: 10px;
  }
  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }
  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }
  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }
  .info-bottom .item-price {
    color: orangered;
  }
  .item-title, .item-desc {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
</style>
