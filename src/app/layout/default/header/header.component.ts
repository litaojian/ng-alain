import { Component, ViewChild } from '@angular/core';
import { SettingsService } from '@delon/theme';
import { HeaderService } from './header.service';
import { FileUploader } from 'ng2-file-upload';
import { NzMessageService } from 'ng-zorro-antd';
import { DomSanitizer } from '@angular/platform-browser' 
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers:[HeaderService]
})
export class HeaderComponent {
    searchToggleStatus: boolean;
    showImg:any=false;
    imgUrl:any;
    searchImg:any={
      "images": [], 
      "calc_param": 
       "{\"Detect\": {\"IsDet\": true,\n\"Mode\": 0\n},\n\"Recognize\" : {\n\"Color\" : {\n\"IsRec\" : true,\n        \"Mode\" : 0\n      },\n      \"Type\" : {\n        \"IsRec\" : true,\n        \"Mode\" : 0\n      },\n      \"Brand\" : {\n        \"IsRec\" : true,\n        \"Mode\" : 0\n      },\n      \"Belt\": {\n        \"IsRec\" : true\n      },\n      \"Call\": {\n        \"IsRec\" : true\n      },\n      \"Crash\": {\n        \"IsRec\" : true,\n        \"Mode\" : 0\n      },\n      \"Danger\": {\n        \"IsRec\" : true,\n        \"Mode\" : 0\n      },\n      \"Plate\": {\n        \"IsRec\" : true,\n        \"Mode\" : 0\n      },\n      \"Similar\": {\n        \"IsRec\" : true,\n        \"Mode\" : 0\n      },\n      \"Marker\": {\n        \"IsRec\" : true,\n        \"Mode\" : 0\n      },\n      \"Passenger\": {\n        \"IsRec\" : true,\n        \"Mode\" : 0\n      }\n    }\n}\n"
    }
    constructor(
        public settings: SettingsService,
        public header: HeaderService,
        private sanitizer: DomSanitizer,
        public msg: NzMessageService
        ) { }
    uploader:FileUploader = new FileUploader({    
        url: "analysis/api/service/img/upload/get",   
        method: "POST",    
        itemAlias: "uploadFile"
   });
   selectedFileOnChanged(event) {
      // 这里是文件选择完成后的操作处理
        this.showImg=true;
        let file = event.target.files[0];
        let imgUrl = window.URL.createObjectURL(file);
        let sanitizerUrl = this.sanitizer.bypassSecurityTrustUrl(imgUrl); 
        this.imgUrl = sanitizerUrl;
        // this.uploader.onAfterAddingFile = (fileItem)=>{
        //     console.log(fileItem);
        // }
   }
handleOk(e){
        if(this.uploader.queue[0]){
            this.uploader.queue[0].upload(); // 开始上传
            this.uploader.queue[0].onSuccess = (response, status, headers) => {
                // 上传文件成功
                this.uploader.queue[0].remove(); //移除上传文件
                if (status == 200) {
                    // 上传文件后获取服务器返回的数据
                    let tempRes = JSON.parse(response);
                    this.searchImg.images.push(tempRes.rowData.base64);
                    if(tempRes.resultCode!=0){
                        this.msg.create('error', tempRes.resultMsg);
                        return;
                    }else{
                         this.header.showImages(this.searchImg).subscribe(data => { 
                                    console.log(data);
                         }); 
                    }
                    // this.dialogService.msg("上传成功");                  
                }else {
                    // 上传文件后获取服务器返回的数据错误
                    // this.dialogService.msg("上传失败");
                }
            }
        }
}
    toggleCollapsedSideabar() {
        this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
    }
    showImgModal(){
        this.showImg=true;
    }
    handleCancel(){
        this.showImg=false;
    }
    searchToggleChange() {
        this.searchToggleStatus = !this.searchToggleStatus;
    }

}
