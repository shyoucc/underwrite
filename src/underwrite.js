/**
 * @author
 * @name underwrite
 * @modified
 */

(function(root){
    'use strict'

    const Uw = function(options){
        let originalOptions = {
            dom: document.getElementsByTagName('canvas')[0],
            lineWidth: 2,
            strokeStyle: '#000',
            fillStyle: '#fff',
            lineCap: 'round'
        }
        this.options = options = Object.assign({}, originalOptions, options)
        // 设置大小随父级宽高
        let width = options.dom.parentNode.clientWidth
        let height = options.dom.parentNode.clientHeight

        let canvas = this.canvas = options.dom
        canvas.width = width
        canvas.height = height

        // 获取距离hack dom距离问题
        this.range = canvas.getBoundingClientRect();

        if (!canvas.nodeType || !canvas.getContext) {
            console.warn('node can not Uncaught')
            return
        }

        let that = this
        this.ctx = canvas.getContext('2d')
        // 储存连成线的点
        this.point = []

        let ctx = this.ctx

        // 设置画笔
        ctx.lineWidth = options.lineWidth
        ctx.strokeStyle = options.strokeStyle
        ctx.fillStyle = options.fillStyle
        ctx.lineCap = options.lineCap

        // 判断终端监听
        let isMobile = /phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone/i.test(navigator.userAgent);

        if (isMobile) {
            canvas.addEventListener('touchstart', this._handleStart.bind(that))
            canvas.addEventListener('touchmove', this._handleMove.bind(that))
            canvas.addEventListener('touchend', this._handleEnd.bind(that))
        } else {
            console.warn('请使用移动端')
        }

    }

    Uw.prototype._handleStart = function(e){
        e.preventDefault()
        let ctx = this.ctx
        let that = this
        // 获取新增加的触点
        let touches = e.changedTouches
        for (let i = 0; i < touches.length; i++) {
            this.point.push(touches[i])
            ctx.beginPath()
            ctx.lineTo(touches[i].pageX - that.range.left , touches[i].pageY - that.range.top)
            ctx.stroke()
        }
    }

    Uw.prototype._handleMove = function(e){
        e.preventDefault()
        // 获取发生变化的触点
        let touches = e.changedTouches
        let point = this.point
        let ctx = this.ctx
        let that = this

        for (let i = 0; i < touches.length; i++) {
            let id = this._getPointIndex(touches[i].identifier)
            ctx.beginPath()
            ctx.moveTo(point[id].pageX - that.range.left, point[id].pageY - that.range.top)
            ctx.lineTo(touches[i].pageX - that.range.left, touches[i].pageY - that.range.top)
            ctx.stroke()
            point.splice(id, 1, touches[i])
        }
    }

    Uw.prototype._handleEnd = function(e){
        e.preventDefault()
        // 列出离开触摸屏幕的触点
        let touches = e.changedTouches

        for (var i = 0; i < touches.length; i++) {
            // 删除
            this.point.splice(i, 1)
        }
    }

    Uw.prototype.clear = function(e){
        let h = this.canvas.clientHeight
        let w = this.canvas.clientWidth
        this.ctx.clearRect(0, 0, w, h)
    }

    // 获取画布图片
    Uw.prototype.getImgData = function(){
        return this.canvas.toDataURL()
    }

    // 上传图片, 转对象
    Uw.prototype.upLoad = function(){

    }

    // 获取触点index
    Uw.prototype._getPointIndex = function(idToFind) {
      for (let i=0; i<this.point.length; i++) {
        let id = this.point[i].identifier;

        if (id === idToFind) {
          return i;
        }
      }
      return -1;
    }

    root.Uw = Uw

})(this)
