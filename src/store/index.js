import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    //mutations唯一的目的就是修改state中的状态
    //mutations中的每个方法尽可能完成的时间比较单一
    addCount(state, payload) {
      payload.count ++

    },
    addToCart(state, payload) {
      payload.checked = true
      state.cartList.push(payload)
    },
    pauseSelectAll(state) {
      state.cartList.forEach(item => item.checked = false)
    },
    selectAll(state) {
      state.cartList.forEach(item => item.checked = true)
    }
  },
  actions: {
    addCart(context, payload) {
      return new Promise((resolve, reject) => {
        //新添加商品
        let oldProduct = null
        for (let item of context.state.cartList){
          if(item.iid == payload.iid){
            //如果新添加的商品在保存的购物车中存在，则让oldProduct指向该对象
            oldProduct = item
          }
        }
        if(oldProduct){
          //如果商品存在，使原有商品数量加1
          // oldProduct.count += 1
          //回到mutations中进行对state中的数据进行修改
          context.commit('addCount', oldProduct)
          resolve('该商品已在购物车中')
        }else{
          //如果商品不存在，则将数量设为1，并将该商品添加到购物车对象数组中
          payload.count = 1
          // context.state.cartList.push(payload)
          context.commit('addToCart', payload)
          resolve('加入购物车成功');
        }
      })
    }
  },
  modules: {
  }
})
