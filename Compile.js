function Compile(el, vm) {
  // 获取挂载元素
  vm.$el = document.querySelector(el)
  // 创建文档碎片，提高性能
  const fragment = document.createDocumentFragment()
  
  // 将el中的所有子节点移入文档碎片
  while (child = vm.$el.firstChild) {
    fragment.appendChild(child)
  }
  
  // 解析文档碎片
  replace(fragment)

  // 解析节点函数
  function replace(fragment) {
    Array.from(fragment.childNodes).forEach(node => {
      const text = node.textContent
      // 匹配{{}}插值表达式
      const reg = /\{\{(.*?)\}\}/g
      
      // 处理文本节点中的插值表达式
      if (node.nodeType === Node.TEXT_NODE && reg.test(text)) {
        const rawText = text
        
        // 替换文本的函数
        function replaceText() {
          let newText = rawText
          let match
          reg.lastIndex = 0
          
          // 替换所有的插值表达式
          while ((match = reg.exec(rawText)) !== null) {
            const exp = match[1].trim()
            const val = getVal(vm, exp)
            newText = newText.replace(match[0], val)
          }
          node.textContent = newText
        }
        
        // 初始化文本
        replaceText()
        
        // 创建watcher进行依赖收集
        const exp = RegExp.$1.trim()
        new Watcher(vm, exp, replaceText)
      }

      // 处理v-model指令
      if (node.nodeType === 1 && node.hasAttribute('v-model')) {
        const exp = node.getAttribute('v-model')
        // 创建watcher监听数据变化
        new Watcher(vm, exp, (val) => {
          node.value = val
        })
        
        // 监听输入事件实现双向绑定
        node.addEventListener('input', (e) => {
          vm[exp] = e.target.value
        })
      }

      // 递归处理子节点
      if (node.childNodes && node.childNodes.length) {
        replace(node)
      }
    })
  }

  // 将处理完的文档碎片放回页面
  vm.$el.appendChild(fragment)
}

// 获取表达式的值
function getVal(vm, exp) {
  let val = vm
  const arr = exp.split('.')
  for (let key of arr) {
    val = val[key]
  }
  return val || ''
}

