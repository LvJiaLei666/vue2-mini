// 观察者构造函数，用于给对象添加响应式特性
function Observer(data) {
  // 创建依赖收集器实例
  const dep = new Dep()
  
  // 遍历对象的所有属性
  for (let key in data) {
    let val = data[key]
    // 递归观察子属性
    observe(val)
    
    // 使用Object.defineProperty给属性添加getter和setter
    Object.defineProperty(data, key, {
      enumerable: true,
      get() {
        // 如果有正在收集依赖的Watcher，则添加到订阅列表
        Dep.target && dep.addSub(Dep.target)
        return val
      },
      set(newVal) {
        // 如果值没有变化，不做处理
        if(newVal === val) return
        // 更新值
        val = newVal
        // 对新值进行观察
        observe(newVal)
        // 通知所有订阅者更新
        dep.notify()
      }
    })
  }
}

// 观察数据的入口函数
function observe(data) {
  // 只对对象类型进行观察
  if(typeof data !== 'object') return
  return new Observer(data)
} 