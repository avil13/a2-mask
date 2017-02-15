"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var A2MaskDirective = (function () {
    function A2MaskDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.patternVal = {
            DIGIT: '9',
            ALPHA: 'A',
            ALPHANUM: 'S',
            BY_PASS_KEYS: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91, 92, 93]
        };
    }
    A2MaskDirective.setOptions = function (opt) {
        A2MaskDirective.options = Object.assign({}, A2MaskDirective.options, opt);
    };
    A2MaskDirective.prototype.ngAfterViewInit = function () {
        if (!this.a2Mask) {
            return console.warn('for Directive "a2Mask" need parameter');
        }
        this._element = this.el.nativeElement;
        var check = this.checkValue.bind(this);
        // this._element.addEventListener('keydown', check, false);
        this._element.addEventListener('input', check, false);
        this._element.addEventListener('cut', check, false);
        this._element.addEventListener('copy', check, false);
        this._element.addEventListener('paste', check, false);
    };
    Object.defineProperty(A2MaskDirective.prototype, "getAction", {
        /**
         * получение нужного действия в зависимости от параметров
         */
        get: function () {
            var type = (typeof this.a2Mask === 'string') ? this.a2Mask : this.a2Mask.type;
            if (!type && this.a2Mask && !!this.a2Mask.pattern) {
                type = 'pattern';
            }
            var opt = {
                pattern: ''
            };
            switch (type) {
                case 'number':
                    return this.toNumber;
                case 'pattern':
                    if (typeof this.a2Mask === 'object') {
                        opt.pattern = this.a2Mask.pattern;
                        return this.toPattern(opt);
                    }
                case 'phone':
                    opt.pattern = A2MaskDirective.options.phone;
                    return this.toPattern(opt);
                case 'date':
                    opt.pattern = A2MaskDirective.options.date;
                    return this.toPattern(opt);
                default:
                    return function (val) {
                        console.warn(val, 'no action, pleas set parameter');
                        return val;
                    };
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Обработка значения в зависимости от параметров
     */
    A2MaskDirective.prototype.checkValue = function (ev) {
        var val = ev.target.value;
        ev.target.value = this.getAction(val);
    };
    //
    // = actions =
    //
    A2MaskDirective.prototype._formatNumber = function (string_src, reverse) {
        if (reverse === void 0) { reverse = false; }
        var _src = string_src.split('');
        var res = [];
        if (reverse) {
            _src = _src.reverse();
        }
        for (var i = _src.length; i--;) {
            res.push(_src[i]);
            if ((res.length + 1) % 4 === 0) {
                res.push(A2MaskDirective.options.number_delimiter);
            }
        }
        if (res[res.length - 1] === A2MaskDirective.options.number_delimiter) {
            res.splice(-1);
        }
        if (reverse) {
            return res.join('');
        }
        return res.reverse().join('');
    };
    /**
     * Обработка чисел
     */
    A2MaskDirective.prototype.toNumber = function (value) {
        var src = value.toString().replace(/[^\d\.]/g, '').split('.'); // цифры в виде массива
        var hasDot = src[1] !== undefined;
        if (src.lenght === 0) {
            return '';
        }
        return this._formatNumber(src[0]) + (hasDot ? '.' + this._formatNumber(src[1], true) : '');
    };
    /**
     * формируем значение по паттерну
     */
    A2MaskDirective.prototype.toPattern = function (opts) {
        var _this = this;
        return function (value) {
            var res = [];
            value = value.toString().split('');
            var maxLen = value.length;
            for (var i = 0, j = 0; i < value.length; ++i, ++j) {
                var val = value[i];
                var pt = opts.pattern[j];
                if (pt === undefined) {
                    break;
                }
                if ((pt === _this.patternVal.DIGIT && (/[0-9]/).test(val)) ||
                    (pt === _this.patternVal.ALPHA && (/[a-zA-Z]/).test(val)) ||
                    (pt === _this.patternVal.ALPHANUM && (/[0-9a-zA-Z]/).test(val))) {
                    res.push(val);
                }
                else if (pt === val) {
                    res.push(pt);
                }
                else {
                    if (!((pt === _this.patternVal.DIGIT) ||
                        (pt === _this.patternVal.ALPHA) ||
                        (pt === _this.patternVal.ALPHANUM))) {
                        res.push(pt);
                        --i;
                    }
                }
                if (i >= maxLen) {
                    break;
                }
            }
            return res.join('');
        };
    };
    /**
     * TODO:
     * Проверка по регулярному выражению
     *
     * @private
     * @param {any} opts
     *
     * @memberOf A2MaskDirective
     */
    A2MaskDirective.prototype.toRegularExp = function (opts) {
        // t.constructor == RegExp
        return function (value) {
            var res = value.split('');
            if (opts.pattern.test(value)) {
                return value;
            }
            res.splice(-1);
            return res.join('');
        };
    };
    A2MaskDirective.options = {
        number_delimiter: '\'',
        phone: '+7 (999) 999-99-99',
        date: '9999-99-99'
    };
    __decorate([
        core_1.Input('a2-mask'), 
        __metadata('design:type', Object)
    ], A2MaskDirective.prototype, "a2Mask", void 0);
    A2MaskDirective = __decorate([
        core_1.Directive({
            selector: '[a2-mask]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], A2MaskDirective);
    return A2MaskDirective;
}());
exports.A2MaskDirective = A2MaskDirective;
//# sourceMappingURL=/Users/aleksej/git/a2/a2-mask/src/a2/a2-mask/a2-mask.directive.js.map