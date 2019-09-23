export default class LayzLoadImage {
  constructor (options) {
    this.options = options || {
      preload: false
    }
    this._layzload()

    document.addEventListener('scroll', this._layzload.bind(this))
  }

  _layzload () {
    let imgs = document.querySelectorAll('img')
    console.log(imgs);

    // 获取可视区宽高
    let clientWidth = document.documentElement.clientWidth
    let clientHeight = document.documentElement.clientHeight

    imgs.forEach(img => {
      let rect = img.getBoundingClientRect()
      console.log(img, rect)
      // 可视区域图片加载
      if (this._isInClientRect(rect, clientHeight, clientWidth)) {
        console.log('可视区图片', img)
        this._loadImg(img)
      }

      // 预加载图片
      if (this.options.preload) {
        if (this._isInPreLoadRect(rect, clientHeight, clientWidth)) {
          this._loadImg(img)
        }
      }
    })
  }

  _loadImg (img) {
    if (img.dataset.src && !img.dataset.isLoad) {
      img.src = img.dataset.src // 加载图片
      img.dataset.isLoad = true // 防止重复加载
    }
  }

  _isInClientRect (rect, clientHeight, clientWidth) {
    if (rect.top <= clientHeight &&
      rect.left <= clientWidth &&
      rect.bottom <= clientHeight &&
      rect.right <= clientWidth) {
      return true
    }
    return false
  }

  _isInPreLoadRect (rect, clientHeight, clientWidth) {
    if (rect.top <= (clientHeight * 2) &&
      rect.left <= clientWidth &&
      rect.bottom <= (clientHeight * 2) &&
      rect.right <= clientWidth) {
      return true
    }
    return false
  }
}
