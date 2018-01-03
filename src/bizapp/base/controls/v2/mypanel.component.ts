import { Component,Input, Output,forwardRef,OnInit,ElementRef,EventEmitter} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR,NgControl} from '@angular/forms';
import {enableProdMode} from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
@Component({
     selector: 'my-panel',
     template: `
        <div class="widget" nz-col class="mb-md">
            <div class="widget-header"> 
                <i class="anticon anticon-{{myClass}}"></i>
                <h3>{{myTitle}}</h3>
                <ng-content select=".panel-title"></ng-content> 
            </div>
            <div class="widget-content"> 
                <ng-content select=".panel-content"></ng-content> 
            </div>
        </div>
        `,
     styles: [`
         .widget {
            position: relative;
            clear: both;
            width: auto;
            margin-bottom: 2em;
            overflow: hidden;
        }
        .widget-header {
            position: relative;
            height: 40px;
            line-height: 40px;
            background:#CBE7FA;
            border: 1px solid #d6d6d6;
            border-bottom: 0px;
        }
        .widget-content {
            background: #FFF;
            border: 1px solid #D5D5D5;
            -moz-border-radius: 5px;
            -webkit-border-radius: 5px;
            border-radius: 5px;
            border-radius:0px;
            padding-left:10px;
        }
        .widget-header h3 {
            position: relative;
            top: 0px;
            left: 5px;
            display: inline-block;
            margin-right: 3em;
            font-size: 14px;
            font-weight: 800;
            color: #525252;
            line-height: 18px;
            text-shadow: 1px 1px 2px rgba(255,255,255,.5);
        }
        .widget-header i{
            margin-left: 10px;
        }
     `],
     providers: []
})
export class PanelComponent implements OnInit{
    @Input()
    myTitle:any;
    @Input()
    myClass:any;
    constructor(
		private _element: ElementRef,
		private modalService: NzModalService
	 ) {
	}   
   ngOnInit() {

	}
    
}