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
    /**
     * Обработка чисел
     */
    private toNumber(value);
    /**
     * формируем значение по паттерну
     */
    private toPattern(opts);
}
