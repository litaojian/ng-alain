import {
	Component,
	EventEmitter,
	OnInit,
	ElementRef,
	Input,
	Output,
	ViewChild
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

import { MySelect2Service } from './myselect2.service';

declare var $: any;

@Component({
	selector: 'my-select2',
	template: '<select #select [name]="name" class="form-control" [disabled]="disabled" [value]="value" style="width:100%"></select>',
	providers: [MySelect2Service]
})

export class MySelect2Component implements OnInit, ControlValueAccessor {
	@ViewChild('select') selectEle: ElementRef;

	@Input()
	name:string;

	@Input()
	disabled:string;

	_data: Array<any>;
	@Input()
	set data(val: Array<any>) {
		this._data = val;
       
		if (this._data) {
			setTimeout(() => this._initSelect(this._data));
		}
	}
	get data(): Array<any> {
		return this._data;
	}

	@Input()
	url: string;

	@Input()
	fieldKey:any = {
		text: 'text',
		value: 'value',
		children: 'children'
	};
    @Input()
	initData:string;
	@Input()
	options:any = {
		data: []
	};

	@Input()
	firstOption: any;

	@Output() onChange = new EventEmitter<any>();

	value: string;
	defaults: any;

	constructor(
		private _element: ElementRef,
		public _control: NgControl,
		private mySelect2Service: MySelect2Service
	) {
		if (this._control) {
    		this._control.valueAccessor = this;
    	}
	}

	writeValue(value: string) {
		if (value) {
			this.value = value;
			//  console.log(this.value);
		}
		// if(this.initData){
        //    this.value=this.initData;
		//    console.log(this.value);
		// }

		$(this.selectEle.nativeElement).val(value).trigger('change.select2');
	}

	registerOnChange(fn: (value: any) => void) {
		this._onChange = fn;
	}

	registerOnTouched(fn: any) {}

	ngOnInit() {
		let that = this;
		this.defaults = {
                            placeholder: '请选择',
                            allowClear: true,
                            language: {
                                noResults: function (params) {
                                return '无匹配';
                                }
                            },
                            escapeMarkup: function (markup) {
                                return markup;
                            }
						};
		if (this.url) {
			this.mySelect2Service.getData(this.url)
				.subscribe(data => {
					this.data = data;
				});
		}
		
		// this._dataTransform(data);
		// if(this.initData){
        //    this.value=this.initData;
		// }
	}

	private _initSelect(data: any) {
		if (!$.isArray(data)) {
			data = data.rows || data.data;
		}

		this.options.data = this._dataTransform(data);

		let _this = this;
		let options = $.extend(true, {}, this.defaults, this.options);

		$(this.selectEle.nativeElement).empty().select2(options)
			.on('select2:select', function (event) {
				_this._updateValue(event.target.value);
			})
			.on('select2:unselect', function () {
				_this._updateValue(null);
			})
			.val(this.value)
			.trigger('change.select2');
	}

	private _dataTransform(data: Array<any>) {
		let _data = [];
		for (let i = 0; i < data.length; i++) {
			_data[i] = {};
			_data[i].text = data[i][this.fieldKey.text];
			_data[i].id = data[i][this.fieldKey.value];
			if(this.initData){
                if(this.initData==_data[i].text){
                   this.value=_data[i].id;
				   this._onChange(this.value);
				}
			}
			let children = data[i][this.fieldKey.children];
			if (children) {
				for (let j = 0; j < children.length; j++) {
					_data[i].children[j] = {};
					_data[i].children[j].text = children[j][this.fieldKey.text];
					_data[i].children[j].id = children[j][this.fieldKey.value];
				}
			}
		}

		return _data;
	}

	private _updateValue(value: string) {
		this.value = value;
		this._onChange(value);

		this.onChange.emit(value);  // 事件
	}

	_onChange = (value: any) => {};
}
