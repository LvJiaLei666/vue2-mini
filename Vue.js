function Vue(options = {}) {
  // 保存配置选项
  this.$options = options
  // 保存data数据，并做代理
  const data = this._data = this.$options.data
  
  // 对数据进行观察，添加响应式特性
  observe(data)

  // 将data数据代理到Vue实例上
  proxyData.call(this, data)

  // 编译模板，处理指令和插值表达式
  new Compile(options.el, this)
}

// 代理函数，将data中的属性代理到Vue实例上
function proxyData(data) {
  const vm = this

  for (let key in data) {
    Object.defineProperty(vm, key, {
      enumerable: true,
      // 访问vm.xxx时返回vm._data.xxx
      get() {
        return vm._data[key]
      },
      // 设置vm.xxx时设置vm._data.xxx
      set(newVal) {
        vm._data[key] = newVal
      }
    })
  }
}