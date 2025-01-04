class Watcher {
  constructor(vm, exp, fn) {
    // fn 是更新视图的回调函数
    this.fn = fn
    // vm 是 Vue 实例
    this.vm = vm
    // exp 是表达式，如 'a.a' 或 'b'
    this.exp = exp
    
    // 将当前 watcher 实例设置到 Dep.target，用于依赖收集
    // 当访问响应式数据时，会触发 getter，此时就能把 watcher 收集到 dep 中
    Dep.target = this

    // 获取一次值，触发 getter，进行依赖收集
    let val = this.getVal(vm, exp)
    // 依赖收集完成后清空 target
    Dep.target = null
  }

  // 更新方法，由 Dep 通知时调用
  update() {
    // 重新获取最新的值
    let val = this.getVal(this.vm, this.exp)
    // 执行回调函数，更新视图
    this.fn(val)
  }

  // 根据表达式获取值的方法
  getVal(vm, exp) {
    let val = vm
    // 将表达式按照 . 分割，如 'a.a' 会分割成 ['a', 'a']
    const arr = exp.split('.')
    // 逐层获取值，如 vm['a']['a']
    for (let key of arr) {
      val = val[key]
    }
    return val
  }
}