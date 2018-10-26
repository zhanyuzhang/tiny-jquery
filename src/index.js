// 温馨提示：该库只提供dom相关的方法，其他方法请移除到其他库！谢谢
function isPlainObject(value) {
  return Object.prototype.toString.call(value, null) === '[object Object]';
}

class Base {
  constructor(selector) {
    this.length = 0;
    this.elements = Array.from(document.querySelectorAll(selector));
    this.elements.forEach(elem => {
      [].push.call(this, elem);
    });
    // 如果没有匹配元素，为了防止操作出错，需要将一个空的div放进来
    if (this.length === 0) {
      this[0] = this.elements[0] = document.createElement('div');
      console.warn(`$(${selector}) doesn't match any elements！`);
    }
  }
  hasClass(className) {
    return this.elements[0].classList.contains(className);
  }
  addClass(className) {
    this.elements.forEach(elem => {
      elem.classList.add(className);
    });
    return this;
  }
  removeClass(className) {
    this.elements.forEach(elem => {
      elem.classList.remove(className);
    });
    return this;
  }
  html(args) {
    if (args.length === 0) {
      return this.elements[0].innerHTML;
    }
    this.elements.forEach(elem => {
      elem.innerHTML = args[0];
    });
    return this;
  }
  text(args) {
    if (args.length === 0) {
      return this.elements[0].innerText;
    }
    this.elements.forEach(elem => {
      elem.innerText = args[0];
    });
    return this;
  }
  css(...args) {
    if (args.length === 1) {
      if (typeof args[0] === 'string') {
        return getComputedStyle(this.elements[0], null)[args[0]];
      } else if (isPlainObject(args[0])) {
        const styleKeys = Object.keys(args[0]);
        this.elements.forEach(elem => {
          styleKeys.forEach(styleKey => {
            elem.style[styleKey] = args[0][styleKey];
          });
        });
      }
    } else if (args.length === 2) {
      const [styleKey, styleValue] = args;
      [].forEach.call(this, elem => {
        elem.style[styleKey] = styleValue;
      });
    }
    return this;
  }

  click() {}
}

export default selector => new Base(selector);
