/**
 * @author
 * @name underwrite
 * @modified
 */

(function(root){
    'use strict'

    const Uw = function(dom){

        this.canvas = dom && dom.nodeType ? dom : document.getElementsByTagName('canvas')[0]

        if (!this.canvas.getContext) {
            console.warn('node can not Uncaught')
            return
        }
        this.ctx = this.canvas.getContext('2d')

        let that = this
        let ctx = this.ctx

        const CTX_COLOR = '#41AFF2'
        const CTX_SHADOW_COLOR = '#41AFF2'
        const CTX_LINECAP = 'round'

        // 设置画笔
        ctx.lineWidth = 10
        ctx.strokeStyle = CTX_COLOR
        ctx.shadowColor = CTX_SHADOW_COLOR
        ctx.lineCap = CTX_LINECAP

        this.canvas.addEventListener('touchstart', this._handleStart.bind(that))
        this.canvas.addEventListener('touchmove', this._handleMove.bind(that))
    }

    Uw.prototype._handleStart = function(e){
        window.requestAnimationFrame(() => {
            this._move(e)
        })
    }

    Uw.prototype._handleMove = function(e){
        window.requestAnimationFrame(() => {
            this._move(e)
        })
    }

    Uw.prototype._move = function(e){

        console.log(e.changedTouches)
        let that = this

        let x = e.clentX || e.touches[0].clientX
        let y = e.clentY || e.touches[0].clientY

        console.log(x, y)

        that.ctx.beginPath()
        that.ctx.moveTo(x, y)
        that.ctx.lineTo(x, y)
        that.ctx.stroke()
    }

    root.Uw = Uw

})(this)
