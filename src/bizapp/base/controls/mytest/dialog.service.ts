import { Injectable,Injector } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { NzModalCustomizeComponent } from './form-test.component';
import { NzModalService } from 'ng-zorro-antd';
@Injectable()
export class dialogService {
    currentModal;
    isConfirmLoading = false;
    mzModalService:NzModalService
    constructor(injector:Injector) {
       this.mzModalService=injector.get(NzModalService);
	}
    showModalForComponent1(title,params,Component) {
        const subscription = this.mzModalService.open({
            title          : title,
            content        : Component,
            onOk() {
            },
            onCancel() {
            },
            footer         : false,
            componentParams: {
                val: params
            }
            });
            subscription.subscribe(result => {
              console.log(result);
            })
        // alert(12);
    }
 handleOk(e) {
    this.isConfirmLoading = true;
    setTimeout(() => {
      /* destroy方法可以传入onOk或者onCancel。默认是onCancel */
      this.currentModal.destroy('onOk');
      this.isConfirmLoading = false;
      this.currentModal = null;
    }, 1000);
  }
}
