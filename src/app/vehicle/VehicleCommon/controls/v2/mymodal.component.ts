import { Component,Input, Output,forwardRef,OnInit,ElementRef,EventEmitter} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR,NgControl} from '@angular/forms';
import {enableProdMode} from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
@Component({
     selector: 'my-modal',
     templateUrl: './mymodal.component.html',
     styles: []
})
export class ModalComponent implements OnInit, ControlValueAccessor{
    _data: any=[];
    mywidth:any=520;
    currentModal:any;
    @Input()
    isModal:any;
    @Input()
    myWidth:any;
    @Output() initRows = new EventEmitter<any>();
    _onChange = (_: any) => { };
    constructor(
		private _element: ElementRef,
		private modalService: NzModalService
	 ) {
	}
    writeValue(value: any) {
        if (value) {
        }
    }
    
   ngOnInit() {
       if(this.myWidth){
          this.mywidth=this.myWidth;
       }
       console.log(this.isModal);
	}
    handleCancel = (e) => {
      this.isModal = false;
      this._updateValue(this.isModal);
    }
   registerOnChange(fn: any) {
        this._onChange = fn;
   }
    registerOnTouched(fn: any) { }
    private _updateValue(val: any) {
		this.initRows.emit(val);  // 事件
	}
    
}