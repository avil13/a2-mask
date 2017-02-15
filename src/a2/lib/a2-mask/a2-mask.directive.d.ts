import { AfterViewInit, ElementRef, Renderer } from '@angular/core';
export declare class A2MaskDirective implements AfterViewInit {
    private el;
    private renderer;
    static options: {
        number_delimiter: string;
        phone: string;
        date: string;
    };
    static setOptions(opt: any): void;
    a2Mask: any;
    private _element;
    private patternVal;
    constructor(el: ElementRef, renderer: Renderer);
    ngAfterViewInit(): void;
    /**
     * получение нужного действия в зависимости от параметров
     */
    private readonly getAction;
    /**
     * Обработка значения в зависимости от параметров
     */
    private checkValue(ev);
    private _formatNumber(string_src, reverse?);
    /**
     * Обработка чисел
     */
    private toNumber(value);
    /**
     * формируем значение по паттерну
     */
    private toPattern(opts);
    /**
     * TODO:
     * Проверка по регулярному выражению
     *
     * @private
     * @param {any} opts
     *
     * @memberOf A2MaskDirective
     */
    private toRegularExp(opts);
}
