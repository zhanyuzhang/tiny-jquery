// 温馨提示：该库只提供dom相关的方法，其他方法请移除到其他库！
class Base {
  constructor(selector) {
    this.length = 0;
    this.elements = Array.from(
      selector.nodeName ? [selector] : document.querySelectorAll(selector)
    );
    this.elements.forEach(elem => {
      [].push.call(this, elem);
    });
    // 如果没有匹配元素，为了防止操作出错，需要将一个空的div放进来
    if (this.length === 0) {
      this[0] = this.elements[0] = document.createElement('div');
      console.warn(`$(${selector}) doesn't match any elements！`);
    }
  }
  // 样式相关方法
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
  css(...args) {
    if (args.length === 1) {
      if (typeof args[0] === 'string') {
        return getComputedStyle(this.elements[0], null)[args[0]];
      } else if (typeof args[0] === 'object') {
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
  show() {
    this.elements.forEach(elem => {
      elem.style.display = 'block';
    });
    return this;
  }
  hide() {
    this.elements.forEach(elem => {
      elem.style.display = 'none';
    });
    return this;
  }

  // 内容相关的方法
  html(...args) {
    if (args.length === 0) {
      return this.elements[0].innerHTML;
    }
    this.elements.forEach(elem => {
      elem.innerHTML = args[0];
    });
    return this;
  }
  text(...args) {
    if (args.length === 0) {
      return this.elements[0].innerText;
    }
    this.elements.forEach(elem => {
      elem.innerText = args[0];
    });
    return this;
  }
  val(...args) {
    if (args.length === 0) {
      return this.elements[0].value || '';
    }
    this.elements.forEach(elem => {
      elem.value = args[0];
    });
    return this;
  }

  // 事件相关的方法
  on(eventType, handler) {
    if (typeof eventType === 'string' && typeof handler === 'function') {
      this.elements.forEach(elem => {
        elem.addEventListener(eventType, handler, false);
      });
    }
    return this;
  }
  off(eventType, handler) {
    if (typeof eventType === 'string' && typeof handler === 'function') {
      this.elements.forEach(elem => {
        elem.removeEventListener(eventType, handler, false);
      });
    }
    return this;
  }
  click(handler) {
    this.on('click', handler);
  }

  // 遍历方法
  eq(index) {
    if (index <= this.length) {
      return new Base(this.elements[index]);
    } else {
      console.error(`eq(${index})超出索引范围`); // eslint-disabed
    }
  }

  find(selector) {
    return new Base(this.elements[0].querySelector(selector));
  }

  // 文档操作方法
  append(elem) {}
}

function $(selector) {
  return new Base(selector);
}

$.version = '1.0.0';

export default $;
