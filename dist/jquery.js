(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.$ = factory());
}(this, (function () { 'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  // 温馨提示：该库只提供dom相关的方法，其他方法请移除到其他库！
  var Base = function () {
    function Base(selector) {
      var _this = this;

      classCallCheck(this, Base);

      this.length = 0;
      this.elements = Array.from(selector.nodeName ? [selector] : document.querySelectorAll(selector));
      this.elements.forEach(function (elem) {
        [].push.call(_this, elem);
      });
      // 如果没有匹配元素，为了防止操作出错，需要将一个空的div放进来
      if (this.length === 0) {
        this[0] = this.elements[0] = document.createElement('div');
        console.warn('$(' + selector + ') doesn\'t match any elements\uFF01');
      }
    }
    // 样式相关方法


    Base.prototype.hasClass = function hasClass(className) {
      return this.elements[0].classList.contains(className);
    };

    Base.prototype.addClass = function addClass(className) {
      this.elements.forEach(function (elem) {
        elem.classList.add(className);
      });
      return this;
    };

    Base.prototype.removeClass = function removeClass(className) {
      this.elements.forEach(function (elem) {
        elem.classList.remove(className);
      });
      return this;
    };

    Base.prototype.css = function css() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (args.length === 1) {
        if (typeof args[0] === 'string') {
          return getComputedStyle(this.elements[0], null)[args[0]];
        } else if (_typeof(args[0]) === 'object') {
          var styleKeys = Object.keys(args[0]);
          this.elements.forEach(function (elem) {
            styleKeys.forEach(function (styleKey) {
              elem.style[styleKey] = args[0][styleKey];
            });
          });
        }
      } else if (args.length === 2) {
        var styleKey = args[0],
            styleValue = args[1];

        [].forEach.call(this, function (elem) {
          elem.style[styleKey] = styleValue;
        });
      }
      return this;
    };

    Base.prototype.show = function show() {
      this.elements.forEach(function (elem) {
        elem.style.display = 'block';
      });
      return this;
    };

    Base.prototype.hide = function hide() {
      this.elements.forEach(function (elem) {
        elem.style.display = 'none';
      });
      return this;
    };

    // 内容相关的方法


    Base.prototype.html = function html() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      if (args.length === 0) {
        return this.elements[0].innerHTML;
      }
      this.elements.forEach(function (elem) {
        elem.innerHTML = args[0];
      });
      return this;
    };

    Base.prototype.text = function text() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      if (args.length === 0) {
        return this.elements[0].innerText;
      }
      this.elements.forEach(function (elem) {
        elem.innerText = args[0];
      });
      return this;
    };

    Base.prototype.val = function val() {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      if (args.length === 0) {
        return this.elements[0].value || '';
      }
      this.elements.forEach(function (elem) {
        elem.value = args[0];
      });
      return this;
    };

    // 事件相关的方法


    Base.prototype.on = function on(eventType, handler) {
      if (typeof eventType === 'string' && typeof handler === 'function') {
        this.elements.forEach(function (elem) {
          elem.addEventListener(eventType, handler, false);
        });
      }
      return this;
    };

    Base.prototype.off = function off(eventType, handler) {
      if (typeof eventType === 'string' && typeof handler === 'function') {
        this.elements.forEach(function (elem) {
          elem.removeEventListener(eventType, handler, false);
        });
      }
      return this;
    };

    Base.prototype.click = function click(handler) {
      this.on('click', handler);
    };

    // 遍历方法


    Base.prototype.eq = function eq(index) {
      if (index <= this.length) {
        return new Base(this.elements[index]);
      } else {
        console.error('eq(' + index + ')\u8D85\u51FA\u7D22\u5F15\u8303\u56F4'); // eslint-disabed
      }
    };

    Base.prototype.find = function find(selector) {
      return new Base(this.elements[0].querySelector(selector));
    };

    // 文档操作方法


    Base.prototype.append = function append(elem) {};

    return Base;
  }();

  function $(selector) {
    return new Base(selector);
  }

  $.version = '1.0.0';

  return $;

})));
