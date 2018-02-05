import { Component, Input,Output, OnInit,EventEmitter } from '@angular/core';
// import { NzModalSubject } from 'ng-zorro-antd';
import { NzModalService } from 'ng-zorro-antd';
import { CommonService } from '../commom.service';
@Component({
  selector: 'recent-car-modal',
  templateUrl: './recent-car-modal.component.html',
  providers:[CommonService]
})
export class RecentCarModalComponent implements OnInit {
  constructor(private modalService: NzModalService,private commonService:CommonService) {
  }
  private recentCar:any={};//点击列表中号牌号码弹出框数据
  private ifErrorImg:any;//错误图片
  @Input()
  private carDetailOne:any;
  ngOnInit() {
        this.commonService.recentCar(this.carDetailOne).subscribe(data => { 
            this.recentCar=data.rowData;
            this.errorImg();
         });
  }
  //错误图片
  private errorImg(){
    this.ifErrorImg=true;
  }
}