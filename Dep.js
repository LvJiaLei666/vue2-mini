// 定义存放订阅者的数组
// export function Dep(){
//   this.subs = [];
// }
//
// // 定义存放订阅者的方法
// Dep.prototype.addSub = function (sub) {
//   this.subs.push(sub)
// }
//
//
// // 定义发布的方法
// Dep.prototype.notify = function (sub) {
//   this.subs.forEach(item=>{
//     // 依次通知
//     item.update()
//   })
// }

class Dep {
  // 存储所有的订阅者（Watcher实例）
  subs = []

  constructor() {
    // 初始化订阅者列表
  }

  // 添加订阅者到订阅列表
  addSub(sub) {
    this.subs.push(sub)
  }

  // 通知所有订阅者更新
  notify() {
    this.subs.forEach(item => {
      item.update()
    })
  }
}

// 静态属性，用于临时存放当前正在收集依赖的Watcher实例
Dep.target = null