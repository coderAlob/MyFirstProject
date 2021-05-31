import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addToCart(state, payload) {
      //新添加商品
      let oldProduct = null
      for (let item of state.cartList){
        if(item.iid == payload.iid){
          //如果新添加的商品在保存的购物车中存在，则让oldProduct指向该对象
          oldProduct = item
        }
      }
      if(oldProduct){
        //如果商品存在，使原有商品数量加1
        oldProduct.count += 1
      }else{
        //如果商品不存在，则将数量设为1，并将该商品添加到购物车对象数组中
        payload.count = 1
        state.cartList.push(payload)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
