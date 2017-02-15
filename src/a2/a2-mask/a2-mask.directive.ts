import { Directive, Input, AfterViewInit, ElementRef, Renderer } from '@angular/core';

@Directive({
    selector: '[a2-mask]'
})
export class A2MaskDirective implements AfterViewInit {

    static options = {
        number_delimiter: '\'',
        phone: '+7 (999) 999-99-99',
        date: '9999-99-99'
    };

    static setOptions(opt) {
        A2MaskDirective.options = Object.assign({}, A2MaskDirective.options, opt);
    }

    @Input('a2-mask') a2Mask;

    private _element: HTMLElement;

    private patternVal = {
        DIGIT: '9',
        ALPHA: 'A',
        ALPHANUM: 'S',
        BY_PASS_KEYS: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91, 92, 93]
    };


    constructor(private el: ElementRef, private renderer: Renderer) { }


    ngAfterViewInit() {
        if (!this.a2Mask) {
            return console.warn('for Directive "a2Mask" need parameter');
        }

        this._element = this.el.nativeElement;

        let check = this.checkValue.bind(this);

        // this._element.addEventListener('keydown', check, false);
        this._element.addEventListener('input', check, false);
        this._element.addEventListener('cut', check, false);
        this._element.addEventListener('copy', check, false);
        this._element.addEventListener('paste', check, false);
    }


    /**
     * получение нужного действия в зависимости от параметров
     */
    private get getAction(): Function {
        let type = (typeof this.a2Mask === 'string') ? this.a2Mask : this.a2Mask.type;

        if (!type && this.a2Mask && !!this.a2Mask.pattern) {
            type = 'pattern';
        }

        let opt = {
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
                return (val) => {
                    console.warn(val, 'no action, pleas set parameter');
                    return val;
                };
        }
    }


    /**
     * Обработка значения в зависимости от параметров
     */
    private checkValue(ev) {
        let val = ev.target.value;
        ev.target.value = this.getAction(val);
    }

    //
    // = actions =
    //

    private _formatNumber(string_src: string, reverse = false): string {
        let _src = string_src.split('');
        let res = [];

        if (reverse) {
            _src = _src.reverse();
        }

        for (let i = _src.length; i--; /**/) {
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
    }

    /**
     * Обработка чисел
     */
    private toNumber(value): string {
        let src = value.toString().replace(/[^\d\.]/g, '').split('.'); // цифры в виде массива
        let hasDot: boolean = src[1] !== undefined;

        if (src.lenght === 0) {
            return '';
        }

        return this._formatNumber(src[0]) + (hasDot ? '.' + this._formatNumber(src[1], true) : '');
    }


    /**
     * формируем значение по паттерну
     */
    private toPattern(opts) {
        return (value) => {
            let res = [];
            value = value.toString().split('');
            let maxLen = value.length;

            for (let i = 0, j = 0; i < value.length; ++i, ++j) {
                let val = value[i];
                let pt = opts.pattern[j];

                if (pt === undefined) {
                    break;
                }

                if (
                    (pt === this.patternVal.DIGIT && (/[0-9]/).test(val)) ||
                    (pt === this.patternVal.ALPHA && (/[a-zA-Z]/).test(val)) ||
                    (pt === this.patternVal.ALPHANUM && (/[0-9a-zA-Z]/).test(val))
                ) {

                    res.push(val);

                } else if (pt === val) {

                    res.push(pt);

                } else {

                    if (
                        !(
                            (pt === this.patternVal.DIGIT) ||
                            (pt === this.patternVal.ALPHA) ||
                            (pt === this.patternVal.ALPHANUM)
                        )
                    ) {
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
    }

    /**
     * TODO:
     * Проверка по регулярному выражению
     * 
     * @private
     * @param {any} opts
     * 
     * @memberOf A2MaskDirective
     */
    private toRegularExp(opts) {
        // t.constructor == RegExp
        return (value: string): string => {
            let res = value.split('');
            if (opts.pattern.test(value)) {
                return value;
            }
            res.splice(-1);
            return res.join('');
        }
    }

}
