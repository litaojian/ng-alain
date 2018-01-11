import { Component, Input, OnInit,Injector} from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';
import { dialogComponent } from './dialog.component';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
@Component({
  selector: 'nz-demo-component',
  template:`<div>
       <form nz-form [formGroup]="validateForm" class="login-form">
      <div nz-form-item>
        <div nz-form-control>
          <nz-input formControlName="userName" [nzPlaceHolder]="'Username'" [nzSize]="'large'" [(ngModel)]="searchDta.userName">
            <ng-template #prefix>
              <i class="anticon anticon-user"></i>
            </ng-template>
          </nz-input>
          <div nz-form-explain *ngIf="validateForm.controls.userName.dirty&&validateForm.controls.userName.hasError('required')">Please input your username!</div>
        </div>
      </div>
      <div nz-form-item>
        <div nz-form-control>
          <nz-input formControlName="password" [nzType]="'password'" [nzPlaceHolder]="'Password'" [nzSize]="'large'" [(ngModel)]="searchDta.password">
            <ng-template #prefix>
              <i class="anticon anticon-lock"></i>
            </ng-template>
          </nz-input>
          <div nz-form-explain *ngIf="validateForm.controls.password.dirty&&validateForm.controls.password.hasError('required')">Please input your Password!</div>
        </div>
      </div>
      <div nz-form-item>
        <div nz-form-control>
          <button nz-button class="login-form-button" [nzType]="'primary'" [nzSize]="'large'" (click)="_submitForm()">Log in</button>
        </div>
      </div>
    </form>
      <div class="customize-footer">
        <button nz-button [nzType]="'primary'" [nzSize]="'large'" (click)="emitDataOutside($event)">
          传递数据到上层
        </button>
        <button nz-button [nzType]="'default'" [nzSize]="'large'" (click)="handleCancel($event)">
          返 回
        </button>
      </div>
</div>`,
  styles  : [
      `
      :host ::ng-deep .customize-footer {
        border-top: 1px solid #e9e9e9;
        padding: 10px 18px 0 10px;
        text-align: right;
        border-radius: 0 0 0px 0px;
        margin: 15px -16px -5px -16px;
      }
    .login-form {
      max-width: 300px;
    }

    .login-form-forgot {
      float: right;
    }

    .login-form-button {
      width: 100%;
    }
    `
  ]
})
export class NzModalCustomizeComponent extends dialogComponent implements OnInit {
   _val: any;
   searchDta:any={
      userName:'',
      password:''
   }
  @Input()
  set val(value: any) {
    this._val = value;
  }
  // private subject: NzModalSubject
  constructor(injector:Injector) {
    super(injector);
    //  this.fb=injector.get(FormBuilder);
    //  this.subject = injector.get(NzModalSubject);
    //  this.subject.on('onDestory', () => {
    //     console.log('destroy');
    //  });
   }
  // mobileValidator(){
  //     // 获取到输入框的值
  //     const val = '';
  //     // 手机号码正则
  //     const mobieReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
  //     const result = mobieReg.test(val);
  //     return result ? null : { mobile: { info: '手机号码格式不正确' } };
  // }
  //提交验证
  // _submitForm() {
  //   alert(this.validateForm.status);
  //   if(this.validateForm.errors){
  //     alert('格式正确');
  //   }
  //   for (const i in this.validateForm.controls) {
  //     this.validateForm.controls[ i ].markAsDirty();
  //   }
  // }
  // emitDataOutside() {
  //   this.subject.next(this.searchDta);
  // }
  // handleCancel(e) {
  //   this.subject.destroy('onCancel');
  // }
  ngOnInit() {
   super.ngOnInit();
  }
}