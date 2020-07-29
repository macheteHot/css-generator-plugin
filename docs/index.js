let cssStr = ''

function showCss(str) {
  str = str.replace(/^(\/\*[\s\S]+?\*\/)/gm, '<span style="color:#009926;font-size:14px;">$1</span></br>')
  str = str.replace(/\.([a-z0-9-:\s]+)/gm, '<span style="color:#990073">.$1</span>')
  str = str.replace(/\{/g, '&nbsp;{</br>')
  str = str.replace(/\}/g, '}</br></br>')
  str = str.replace(/;\s/g, ';</br>')
  str = str.replace(/(?<=<\/br>)\s*(?=[a-z])/gm, '&nbsp;&nbsp;')
  str = str.replace(/^\n/gm, '')
  str = str.replace(/(!important;)/g, '<span style="color:rgba(255,0,0,.45);">$1</span>')
  document.querySelectorAll('[data-html]').forEach(node => {
    node.innerHTML = str
  })
}


const obj = {
  fclassName: '',
  cOneclassName: '',
  cTwolassName: ''
}

const watchInputObj = {}
const watchObj = {}

// 简单版 proxy 只支持基础类型
const handlerProxy = {
  set(target, key, value) {
    console.log('set')
    Reflect.set(target, key, value)
    watchObj[key].forEach(node => {
      node.className = value
    })
    watchInputObj[key].forEach(node => node.value = value)
    showCss(window.getCssStr())
  },
  get(target, key) {
    return Reflect.get(target, key)
  }
}

const state = new Proxy(obj, handlerProxy)


const inputNodeList = document.querySelectorAll('[data-value]')
inputNodeList.forEach(node => {
  const name = node.getAttribute('data-value')
  if (watchInputObj[name]) {
    watchInputObj[name].push(node)
  } else {
    watchInputObj[name] = [node]
  }
  node.addEventListener('keyup', ({
    target
  }) => {
    state[name] = target.value
  })
})


const wathNodeList = document.querySelectorAll('[data-showClass]')
wathNodeList.forEach(node => {
  const name = node.getAttribute('data-showClass')
  if (watchObj[name]) {
    watchObj[name].push(node)
  } else {
    watchObj[name] = [node]
  }
})

function setState(obj) {
  console.log(71)
  for (const key in obj) {
    state[key] = obj[key]
  }
}

setState({
  fclassName: 'w-100p h-218 flex-around-center border-1 br-4 border-c-active-transparent select-none',
  cOneclassName: 'w-200 bg-red-55 flex-center-center h-64 br-8 bg-hover-009926 c-hover-fff cursor-pointer',
  cTwolassName: 'w-200 bg-red flex-center-center h-64 br-8 bg-hover-f2f3f7 cursor-pointer'
})

window.onload = () => {
  const gc = new Gcss()
  gc.start()
}