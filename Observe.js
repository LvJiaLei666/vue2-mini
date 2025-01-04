function Observer(data) {
  const dep = new Dep()
  // 遍历
  for (let key in data) {
    let val = data[key]
    observe(val)
    Object.defineProperty(data,key,{
      enumerable:true,
      get() {
        Dep.target && dep.addSub(Dep.target)
        return val
      },
      set(newVal){
        if(newVal === val) return
        val = newVal
        observe(newVal)
        dep.notify()
      }
    })
  }
}


function observe(data){
  if(typeof data !== 'object') return
  return new Observer(data)
}