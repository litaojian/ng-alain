import { Directive,EventEmitter,ElementRef,AfterViewInit, Input, Output } from '@angular/core';

@Directive({
  selector: '[appMydatepicker]',
  host:{
      '(click)':'OnClick($event.target)'
  }
})
export class MydatepickerDirective {

  _el:any;

  @Input()
  name: string;

  @Input()
  options:Object={};

  @Output() getTime = new EventEmitter<any>();

  @Input('ngModel')
	value: string;

  defaultOption:Object = {
    language:  "zh-CN",
        weekStart: 1,
        todayBtn:  0,
        autoclose: 1,
        todayHighlight: 1,
        startView: 1,
        minView: 1,
        maxView:4,
        forceParse: 0,
        format: 'yyyy-mm-dd'
  };

  constructor(private _element:ElementRef) {
    this._el = _element.nativeElement;
  }

  ngAfterViewInit(){
    var c = $("#"+this.name); //根据name 获取dom
    let _this = this;
    let option = $.extend({}, this.defaultOption, this.options);
    c.datetimepicker(option).on('changeYear', function(ev){ //修改年份份触发方法
        // this.time = ev.date.valueOf();
        // _this.value = ev.date.valueOf();
        _this.setTime(ev.date.valueOf());

    }).on('changeMonth', function(ev){ //修改月份触发方法
        // this.time = ev.date.valueOf();
        // _this.value = ev.date.valueOf();
        _this.setTime(ev.date.valueOf());

    });
  }

  private setTime = function(value:any){
     this.getTime.emit(value);
  }

  OnClick(el:any){
    $("#"+this.name).datetimepicker("show");
  }

}
