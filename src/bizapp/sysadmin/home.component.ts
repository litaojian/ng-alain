import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { NzModalService } from 'ng-zorro-antd';
import { BaseDialogComponent } from '../base/base-dialog.component';

@Component({
  selector: '',
  template: `
    <div>
      <h3>welcome you !</h3>
      <br>
      <button nz-button [nzType]="'primary'" (click)="createBasicMessage()">显示普通提醒</button>
      <br>
      <br>      
      <button nz-button (click)="openDialog('/dialog/loginDialog')">登录对话框</button>
      <br>
      <br>      
      <button nz-button (click)="openDialog('/dialog/userDialog')">打开弹框</button>
    </div>`,

  styles: [ `
  `
  ]
})
export class HomeComponent implements OnInit {

  
  constructor(private _message: NzMessageService, private modalService: NzModalService) {
  }

  ngOnInit() {
  }

  createBasicMessage(){
    let _id = this._message.loading('正在执行中', { nzDuration: 0 }).messageId;
    setTimeout(_ => {
      this._message.remove(_id);
    }, 2500)
  }
  openDialog(dialogUrl:string){
    this.showModalForComponent();    
  }

  showModalForComponent() {
    const subscription = this.modalService.open({
      title          : '对话框标题',
      content        : BaseDialogComponent,
      onOk() {
      },
      onCancel() {
        console.log('Click cancel');
      },
      footer         : false,
      componentParams: {
        name: '测试渲染Component'
      }
    });
    subscription.subscribe(result => {
      console.log(result);
    })
  }



}

