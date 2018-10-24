// 温馨提示：该库只提供dom相关的方法，其他方法请移除到其他库！谢谢

function isPlainObject(value) {
  return Object.prototype.toString.call(value, null) === '[object Object]';
}

function isArray(value) {
  return Object.prototype.toString.call(value, value) === '[object Array]';
}

class Base {
  constructor(selector) {
    const allEments = document.querySelectorAll(selector);
    this.elements = Array.from(allEments.length ? allEments : [document.createElement['div']]);
  }

  css(...args) {
    if(args.length === 1) {
      if(typeof arg === 'string') {
        return this.elements[0].style[arg];
      } else if(isPlainObject(args)) {
        const styleKeys = Object.keys(args);
        this.elements.forEach(elem => {
          styleKeys.forEach(styleKey => {
            elem.style[styleKey]
          });
        });
      }
    } else if(args.length === 2) {
      if(typeof args[0] === 'string' && typeof args[1] === 'string') {
        
      }
    }
  }
  html() {

  }
  click() {

  }
}

export default (selector) => Base(selector);
