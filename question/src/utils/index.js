export const dateFormat = () => {}

export const timeFormat = () => {}

export const entry = () => {
  return window.questionEnv.toLowerCase()
}

export const titleCase = str => {
  return str.substring(0, 1).toUpperCase() + str.substring(1)
}

export const disableScroll = () => {
  let disableScrollMsg = {
    operateType: 'disableWebScroll',
    body: {
      disableScroll: 1 // 1: 代表禁止
    }
  }
  window.webkit &&
  window.webkit.messageHandlers &&
  window.webkit.messageHandlers.VIPXJSSDK &&
  window.webkit.messageHandlers.VIPXJSSDK.postMessage(disableScrollMsg)
}

export const mapArrProperty = (arr, property) => { // 返回新数组newArr，每个值为数组arr每个对象的property属性
  const newArr = arr.map((item) => {
    return item[property]
  })
  return newArr
}

export const hiddenBtn = () => {
  if (window.navigator.userAgent.indexOf('OS X') >= 0) {
    let messageHidden = {
      'operateType': 'hideBackView',
      'body': {
        'isHidden': 1
      }
    }
    window.webkit &&
    window.webkit.messageHandlers &&
    window.webkit.messageHandlers.VIPXJSSDK &&
    window.webkit.messageHandlers.VIPXJSSDK.postMessage(messageHidden)
  } else {
    window.parent.postMessage({
      type: 'hiddenBtn'
    }, '*')
  }
}

export const goBack = () => {
  if (window.navigator.userAgent.indexOf('OS X') >= 0) {
    let close = {
      'operateType': 'closeWebPage',
      'body': {}
    }
    window.webkit &&
    window.webkit.messageHandlers &&
    window.webkit.messageHandlers.VIPXJSSDK &&
    window.webkit.messageHandlers.VIPXJSSDK.postMessage(close)
    return false
  } else {
    window.parent.postMessage({
      action: 'goback'
    }, '*')
    return false
  }
}
