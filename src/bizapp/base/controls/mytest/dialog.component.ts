import { Component, Input, OnInit,Injector} from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';
import { NzModalCustomizeComponent } from './form-test.component';
import { NzModalService } from 'ng-zorro-antd';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
export class dialogComponent implements OnInit  {
  mzModalService:NzModalService;
  subject:NzModalSubject;
  fb:FormBuilder
  validateForm: FormGroup;
  constructor(injector: Injector) {  
     this.fb=injector.get(FormBuilder);  
     this.mzModalService = injector.get(NzModalService);
     this.subject = injector.get(NzModalSubject);
  }
  _submitForm() {
    console.log(this.validateForm.controls)
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      
    }
    alert(12);
  }
  emitDataOutside() {
    this.subject.next('1212');
  }
 
  handleCancel(e) {
    this.subject.destroy('onCancel');
  }
  ngOnInit() {
      this.validateForm = this.fb.group({
        userName: [ null, [ Validators.required ] ],
        password: [ null, [ Validators.required ] ],
        remember: [ true ],
    });
  }
  //表单的验证

}