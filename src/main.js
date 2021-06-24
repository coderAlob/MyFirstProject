import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//vue-lazyload使用步骤
/*
* 1.通过npm install vue-lazyload --save 安装依赖
* 2.import导入
* 3.Vue.use(VueLazyLoad)安装
* 4.修改图片的src属性   v-lazy="img.src"*/
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  //设置加载时的图片
  loading: require('./assets/img/common/loading.gif')
})

import FastClick from 'fastclick'

import toast from "components/common/toast";
Vue.use(toast)

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue({})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//通过使用fastClick解决移动端300ms延迟的问题
//1.调用fastClick
FastClick.attach(document.body)
