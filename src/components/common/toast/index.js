import Toast from "./Toast";

const obj = {
}

obj.install = function (Vue) {
  // Vue.probeType.$toast
  //1. 创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  //2. 根据组件构造器创建出一个组件对象
  //因为在安装阶段，toast组件还没有被挂载，因此无法直接使用Toast.vue组件
  const toast = new toastContrustor()

  //3. 将创建的组件对象手动挂载到自己创建的对象中
  toast.$mount(document.createElement('div'))

  //4. toast.$el就是对应创建的div
  document.body.appendChild(toast.$el)

  //5.使用Vue.prototype 原型  进行自定义
  Vue.prototype.$toast = toast
}

export default obj
