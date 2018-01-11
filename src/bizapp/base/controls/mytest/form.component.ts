
import { NzModalService } from 'ng-zorro-antd';
import { NzModalCustomizeComponent } from './form-test.component';
import { dialogComponent } from './dialog.component';
import { Observable } from 'rxjs/Observable';
import { Component, ViewChild, OnInit, HostBinding, AfterViewInit, Injector, OnDestroy } from '@angular/core';
// import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Location } from '@angular/common';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { NzModalSubject } from 'ng-zorro-antd';
import 'rxjs/add/operator/switchMap';
import { dialogService } from './dialog.service';
@Component({
  selector: 'nz-demo-modal-service',
  template: `<button nz-button [nzType]="'primary'" (click)="showModalForComponent('我的对话框')">
                 <span>使用Component</span>
            </button>
			<button nz-button [nzType]="'primary'" (click)="showModalForComponent('我的对话框12')">
                 <span>使用Component</span>
            </button>
           <button (click)="myclick()">12</button>`
})
export class NzDemoModalServiceComponent implements OnInit  {
  constructor(private dialogService:dialogService) {
	// super(injector); // injector的注入在父类的构造函数constructor也必须存在参数injectorprivate modalService: NzModalService,
  }
  ngOnInit() {
	//   super.ngOnInit();
	// this.mobileValidator();
  }
  showModalForComponent(title){
	   this.dialogService.showModalForComponent1(title,NzModalCustomizeComponent);
  }
}