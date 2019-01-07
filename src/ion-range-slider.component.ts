import {ElementRef, OnChanges, SimpleChanges, Input, EventEmitter, Output, Component} from "@angular/core";
import 'ion-rangeslider'

import * as jQuery from "jquery";

@Component({
    selector: 'ion-range-slider',
    template: `<input type="text" value="" />`
})
export class IonRangeSliderComponent implements OnChanges{

    @Input() public min: any;
    @Input() public max: any;
    @Input() public from: any;
    @Input() public to: any;
    @Input() public disable: any;

    @Input() public type: any;
    @Input() public step: any;
    @Input() public min_interval: any;
    @Input() public max_interval: any;
    @Input() public drag_interval: any;
    @Input() public values: any;
    @Input() public from_fixed: any;
    @Input() public from_min: any;
    @Input() public from_max: any;
    @Input() public from_shadow: any;
    @Input() public to_fixed: any;
    @Input() public to_min: any;
    @Input() public to_max: any;
    @Input() public to_shadow: any;
    @Input() public prettify_enabled: any;
    @Input() public prettify_separator: any;
    @Input() public force_edges: any;
    @Input() public keyboard: any;
    @Input() public keyboard_step: any;
    @Input() public grid: any;
    @Input() public grid_margin: any;
    @Input() public grid_num: any;
    @Input() public grid_snap: any;
    @Input() public hide_min_max: any;
    @Input() public hide_from_to: any;
    @Input() public prefix: any;
    @Input() public postfix: any;
    @Input() public max_postfix: any;
    @Input() public decorate_both: any;
    @Input() public values_separator: any;
    @Input() public input_values_separator: any;

    @Input() public prettify: Function;

    @Output() onStart: EventEmitter<IonRangeSliderCallback> = new EventEmitter<IonRangeSliderCallback>();
    @Output() onChange: EventEmitter<IonRangeSliderCallback> = new EventEmitter<IonRangeSliderCallback>();
    @Output() onFinish: EventEmitter<IonRangeSliderCallback> = new EventEmitter<IonRangeSliderCallback>();
    @Output() onUpdate: EventEmitter<IonRangeSliderCallback> = new EventEmitter<IonRangeSliderCallback>();

    private el: ElementRef;
	public inputElem: any;
    private initialized = false;

    public from_percent: number;
    public from_value: number;
    public to_percent: number;
    public to_value: number;

    constructor(el: ElementRef) {
        this.el = el;
    }

    ngOnInit() {
        this.inputElem = this.el.nativeElement.getElementsByTagName('input')[0];
        this.initSlider();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(this.initialized) {
            for (let propName in changes) {
                let update = {};
                update[propName] = changes[propName].currentValue;
                jQuery(this.inputElem).data("ionRangeSlider").update(update);
            }
        }
    }

    update(data) {
        jQuery(this.inputElem).data("ionRangeSlider").update(data);
    }

    reset() {
        jQuery(this.inputElem).data("ionRangeSlider").reset()
    }

    destroy() {
        jQuery(this.inputElem).data("ionRangeSlider").destroy()
    }

    private initSlider() {
        let that = this;
        (<any>jQuery(this.inputElem)).ionRangeSlider({
            min: that.min,
            max: that.max,
            from: that.from,
            to: that.to,
            disable: this.toBoolean(that.disable),

            type: that.type,
            step: that.step,
            min_interval: that.min_interval,
            max_interval: that.max_interval,
            drag_interval: that.drag_interval,
            values: that.values,
            from_fixed: this.toBoolean(that.from_fixed),
            from_min: that.from_min,
            from_max: that.from_max,
            from_shadow: this.toBoolean(that.from_shadow),
            to_fixed: this.toBoolean(that.to_fixed),
            to_min: that.to_min,
            to_max: that.to_max,
            to_shadow: this.toBoolean(that.to_shadow),
            prettify_enabled: this.toBoolean(that.prettify_enabled),
            prettify_separator: that.prettify_separator,
            force_edges: this.toBoolean(that.force_edges),
            keyboard: this.toBoolean(that.keyboard),
            keyboard_step: that.keyboard_step,
            grid: this.toBoolean(that.grid),
            grid_margin: this.toBoolean(that.grid_margin),
            grid_num: that.grid_num,
            grid_snap: this.toBoolean(that.grid_snap),
            hide_min_max: this.toBoolean(that.hide_min_max),
            hide_from_to: this.toBoolean(that.hide_from_to),
            prefix: that.prefix,
            postfix: that.postfix,
            max_postfix: that.max_postfix,
            decorate_both: this.toBoolean(that.decorate_both),
            values_separator: that.values_separator,
            input_values_separator: that.input_values_separator,

            prettify: that.prettify,

            onStart: function () {
                that.onStart.emit(that.buildCallback());
            },
            onChange: function (a) {
                that.updateInternalValues(a);
                that.onChange.emit(that.buildCallback());
            },
            onFinish: function () {
                that.onFinish.emit(that.buildCallback());
            },
            onUpdate: function () {
                that.onUpdate.emit(that.buildCallback());
            }
        });
        this.initialized = true;
    }

    private toBoolean(value) {
        if(value && typeof value === "string") {
            return value.toLowerCase() != "false";
        } else {
            return value;
        }
    }

    private updateInternalValues(data: IonRangeSliderCallback) {
        this.min = data.min;
        this.max = data.max;
        this.from = data.from;
        this.from_percent = data.from_percent;
        this.from_value = data.from_value;
        this.to = data.to;
        this.to_percent = data.to_percent;
        this.to_value = data.to_value;
    }

    private buildCallback(): IonRangeSliderCallback {
        let callback = new IonRangeSliderCallback();
        callback.min = this.min;
        callback.max = this.max;
        callback.from = this.from;
        callback.from_percent = this.from_percent;
        callback.from_value = this.from_value;
        callback.to = this.to;
        callback.to_percent = this.to_percent;
        callback.to_value = this.to_value;
        return callback;
    }
}

export class IonRangeSliderCallback {
        min: any;               // MIN value
        max: any;               // MAX value
        from: number;           // FROM value (left or single handle)
        from_percent: number;   // FROM value in percents
        from_value: number;     // FROM index in values array (if used)
        to: number;             // TO value (right handle in double type)
        to_percent: number;     // TO value in percents
        to_value: number;       // TO index in values array (if used)
}
