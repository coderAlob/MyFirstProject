<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props: {
    },
    data() {
      return {
        message: '',
        isShow: false,
        timer: null,
      }
    },
    methods: {
      show(message, duration = 1500) {

        clearTimeout(this.timer)
        this.isShow = true
        this.message = message
        this.timer = setTimeout(() => {
          this.isShow = false
        },duration)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    /*使整体居中*/
    transform: translate(-50%,-50%);

    padding: 10px 8px;
    font-size: 14px;
    border-radius: 10px;
    color: white;
    background-color: rgba(0,0,0,0.6);
    z-index: 999;
  }
</style>
