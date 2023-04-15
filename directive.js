import { addEvent } from "./dom";
// 根据鼠标中心点放大缩小该元素
export const scale = {
  inserted(el, binding, vnode) {
    let _this = {
      width: el.offsetWidth,
      height: el.offsetHeight,
      maxScale: 4,
      minScale: 1,
      scale: 1,
      x: 0,
      y: 0,
      el,
      scaleOffsetX: 0,
      scaleOffsetY: 0,
      moveOffsetX: 0,
      moveOffsetY: 0,
    };
    console.log(el.offsetWidth, binding, vnode);
    //滚轮事件
    addEvent(
      el,
      "mousewheel",
      function (e) {
        //同时按下ctrl+滚动
        if (!e.ctrlKey) return;
        e.preventDefault();
        let ratio = 1.1;
        // 缩小
        if (e.deltaY > 0) {
          ratio = 1 / 1.1;
        }
        // 限制缩放倍数
        const onscale = this.scale * ratio;
        if (onscale > this.maxScale) {
          ratio = this.maxScale / this.scale;
          this.scale = this.maxScale;
        } else if (onscale < this.minScale) {
          ratio = this.minScale / this.scale;
          this.scale = this.minScale;
        } else {
          this.scale = onscale;
        }
        const origin = {
          x: (ratio - 1) * this.width * 0.5,
          y: (ratio - 1) * this.height * 0.5,
        };
        // 计算偏移量
        this.x -=
          (ratio - 1) *
            (e.clientX - this.x - (window.innerWidth - this.width) * 0.5) -
          origin.x;
        this.y -= (ratio - 1) * (e.clientY - this.y) - origin.y;
        this.scaleOffsetX = Math.min(
          Math.max(this.x, this.width - (this.width * (this.scale + 1)) / 2),
          (this.width * (this.scale - 1)) / 2
        );
        this.scaleOffsetY = Math.min(
          Math.max(this.y, this.height - (this.height * (this.scale + 1)) / 2),
          (+this.height * (this.scale - 1)) / 2
        );
        this.x = this.scaleOffsetX;
        this.y = this.scaleOffsetY;
        el.style.transform = `matrix(${this.scale}, 0, 0, ${this.scale}, ${this.scaleOffsetX}, ${this.scaleOffsetY})`;
      }.bind(_this)
    );
    addEvent(
      el,
      "mousemove",
      function (e) {
        if (e.ctrlKey && e.buttons == 1) {
          if (this.moveOffsetX == 0 && this.moveOffsetY == 0) {
            this.moveOffsetX = e.x;
            this.moveOffsetY = e.y;
          } else {
            let offsetX = e.x - this.moveOffsetX;
            let offsetY = e.y - this.moveOffsetY;
            this.moveOffsetX = e.x;
            this.moveOffsetY = e.y;
            this.scaleOffsetX += offsetX;
            this.scaleOffsetY += offsetY;
            el.style.transform = `matrix(${this.scale}, 0, 0, ${this.scale}, ${this.scaleOffsetX}, ${this.scaleOffsetY})`;
          }
        }
      }.bind(_this)
    );
    addEvent(
      el,
      "mouseup",
      function (e) {
        if (e.ctrlKey && e.button == 0) {
          this.moveOffsetX = 0;
          this.moveOffsetY = 0;
        }
      }.bind(_this)
    );
  },
};
