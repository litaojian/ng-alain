import { Component,Input, Output,forwardRef,OnInit,ElementRef,EventEmitter} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR,NgControl} from '@angular/forms';
import {enableProdMode} from '@angular/core';
@Component({
     selector: 'my-timer',
     template: `
          <a id="lastWeek" class="timeWeek" (click)="showlastWeek()">上周</a>
	      <a id="nowWeek" class="timeWeek" (click)="shownowWeek()">本周</a>
	      <a id="nextWeek" class="timeWeek" (click)="shownextWeek()">下周</a>
        `,
    styles: [
        `
          .timeWeek{
              padding:0px 5px;
          }
            
        `
    ]
})
export class CounterComponent implements OnInit, ControlValueAccessor{
    _data: any=[];
    currentFirstDate: any; 
	// set data(val: any) {
	// 	this._data = val;
    //     console.log(this._data);
    //     this._updateValue(this._data);
	// }
	// get data(){
	// 	return this._data;
	// }
    @Output() initRows = new EventEmitter<any>();
    _onChange = (_: any) => { };
    constructor(
		private _element: ElementRef
	 ) {
	}
    writeValue(value: any) {
        if (value) {
        }
    }
    
	ngOnInit() {
    //    enableProdMode();
       this.setDate(new Date());
	}
  formatDate(date){
        var year = date.getFullYear()+'-';
        var month = (date.getMonth()+1)+'-';
        var day = date.getDate()+' ';
        var Hours=date.getHours(); //获取当前小时数(0-23)
        var Minutes=date.getMinutes(); //获取当前分钟数(0-59)
        var Seconds=date.getSeconds(); //获取当前秒数(0-59)
        if(Hours<10){
           Hours='0'+Hours;
        }
        if(Minutes<10){
           Minutes='0'+Minutes;
        }
        if(Seconds<0){
           Seconds='0'+Seconds; 
        }
        return year+month+day+Hours+':'+Minutes+':'+Seconds;
   }
   addDate(date,n){    
        date.setDate(date.getDate()+n);    
        return date;
   };
   setDate(date){       
        var week = date.getDay()-1;
        date = this.addDate(date,week*-1);
        this.currentFirstDate = new Date(date);
        this._data.push(this.formatDate(date));
        this._data.push(this.formatDate(this.addDate(date,6)));
        this._updateValue(this._data);
   };
   showlastWeek(){
      this._data=[];
      this.setDate(this.addDate(this.currentFirstDate,-7));     
   }
   shownextWeek(){
      this._data=[];
      this.setDate(this.addDate(this.currentFirstDate,7));
   }
   shownowWeek(){
      this._data=[];
      this.setDate(new Date()); 
   }
   registerOnChange(fn: any) {
        this._onChange = fn;
   }
    registerOnTouched(fn: any) { }
    private _updateValue(val: Array<any>) {
        // console.log(val);
		this.initRows.emit(val);  // 事件
	}

}