(function () {
  let options = {
    spliter: 'char'
  }
  function removeClass (obj, cN) {
    let strClassName = obj.className
    let arrClassName = strClassName.split(' ')
    for (let i = 0; i < arrClassName.length; i++) {
      if (arrClassName[i] === cN) {
        arrClassName.splice(i, 1)
        obj.className = arrClassName.join(' ')
        break
      }
    }
  }

  function addClass (obj, cN) {
    let strClassName = obj.className
    let arrClassName = strClassName.split(' ')
    let i = 0
    for (; i < arrClassName.length; i++) {
      if (arrClassName[i] === cN) {
        break
      }
    }
    if (i === arrClassName.length) {
      obj.className = arrClassName.join(' ') + ' ' + cN
    }
  }

  function toSwitch (t, splitter) {
    let tabList = t.getElementsByClassName('tab-menu')[0].getElementsByTagName('li')
    let tabBox = t.getElementsByClassName('tab-box')[0].getElementsByTagName('div')
    for (let i = 0; i < tabList.length; i++) {
      tabList[i].onclick = ((num) => {
        function foo () {
          for (let i = 0; i < tabList.length; i++) {
            removeClass(tabList[i], 'active')
            removeClass(tabBox[i], 'active')
          }
          addClass(this, 'active')
          addClass(tabBox[num], 'active')
        }
        return foo
      })(i)
    }
  }
  let api = {
    config (opts) {
      if (!opts) {
        return options
      }
      for (let key in opts) {
        options[key] = opts[key]
      }
      return this
    },
    listen (elem) {
      if (typeof elem === 'string') {
        let elems = document.querySelectorAll(elem)
        let i = elems.length
        while (i--) {
          this.listen(elems[i])
        }
        return
      }
      toSwitch(elem, options.splitter)

      return this
    }
  }
  this.switchTab = api
})()
