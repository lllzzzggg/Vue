import { disableScroll } from './index'
const win = window
export default win.flex = (normal) => {
  let _baseFontSize
  const doc = win.document
  const isWcr = navigator.userAgent.indexOf('VIPX') > -1
  const dpr = window.devicePixelRatio
  if (isWcr) {
    _baseFontSize = 6500 / 81
  } else {
    disableScroll()
    _baseFontSize = (dpr * 50) * (doc.documentElement.clientHeight / 768)
  }

  let metaEl = doc.querySelector('meta[name="viewport"]')
  if (!metaEl) {
    metaEl = doc.createElement('meta')
    metaEl.setAttribute('name', 'viewport')
    doc.head.appendChild(metaEl)
  }
  metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1')
  doc.documentElement.style.fontSize = `${_baseFontSize}px`
}
