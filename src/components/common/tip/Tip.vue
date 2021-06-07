<template>
  <div class="tip">
    <div class="tip-content"><slot></slot></div>
  </div>
</template>

<script>
  export default {
    name: "Tip"
  }
</script>

<style scoped>
  .tip {
    background-color: #555;
    border-radius: 10px;
    width: 120px;
    height: 40px;
    font-size: 14px;
    font-weight: bolder;
    color: #cccccc;
  }
  .tip-content {
    line-height: 40px;
    text-align: center;
  }
</style>
