import { Component, EventEmitter, OnInit, AfterViewInit, ElementRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

declare var $: any;

@Component({
	selector: 'my-datepicker',
	template: '<input [name]="name" [disabled]="disabled" class="ant-input" [value]="value">'
})

export class MyDatePickerComponent implements OnInit, AfterViewInit, ControlValueAccessor {
	constructor(
		private _element: ElementRef,
		public _control: NgControl
	) {
		if (this._control) {
			this._control.valueAccessor = this;
		}
	}

	@Input()
	name:string;

	@Input()
	disabled:string;

	@Input()
	options:Object = {};

	@Input('ngModel')
	value: string;

	@Output() onChoose = new EventEmitter<any>();
	
	defaults: Object;

	_onChange = (value: any) => {};

	writeValue(value: string) {
		if (value) {
			this.value = value;
		}
	}

	registerOnChange(fn: (value: any) => void) {
		this._onChange = fn;
	}

	registerOnTouched(fn: any) {

	}

	ngOnInit() {
		if (this.value == undefined) {
			this.value = '';
		}

		let _this = this;
		this.defaults = {
							format: 'YYYY-MM-DD',
							isToday:true,
							choosefun: function(ele, data){
					  			_this._choose(data);
					  		},
					  		clearfun: function(){
					  			_this._clear();
					  		},
					  		closefun: function() {
					  			_this._close();
					  		}
						};
	}

	ngAfterViewInit() {
		let options = $.extend({}, this.defaults, this.options);

		$(this._element.nativeElement).find('input').jeDate(options)
			.on('click', function(e) {
				e.stopPropagation();

				$(this).addClass('focus').blur();
			});
	}

	private _choose(value: string) {
		this._onChange(value);

		this.onChoose.emit(value);  // 选中事件
	}

	private _clear() {
		this._onChange('');

		this.onChoose.emit('');  // 选中事件
	}

	private _close() {
		$(this._element.nativeElement).find('input').removeClass('focus');
	}
}