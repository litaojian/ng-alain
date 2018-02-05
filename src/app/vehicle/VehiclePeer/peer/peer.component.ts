import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { NzModalService } from 'ng-zorro-antd';
import { PeerService } from '../peer.service';
import { Http} from '@angular/http';
import { RecentCarModalComponent} from '../../VehicleCommon/commom/recent-car-modal.component';
declare var $: any;
@Component({ 
    selector: 'app-acl',
    templateUrl: './peer.component.html',
    styleUrls: ['./peer.component.css'],
    providers:[DatePipe]
})
export class PeerComponent {
    private myLoading = false; //加载
    private showLp:any=true;//列表与图表的转换
    private data: any[] = [];//保存查询列表的数据
    private areaDetails: any[] = [];//保存点击区域得到的数据
    private carDetailOne: any;
    private areaDetail:any={};//保存查询区域的条件
    private dataOne:any={};//区域结果里面单个车辆详情
    private areaList: any;//传到后台的数据
    private search: any;//保存添加数据
    private pagination: any;//页数
    private paginationArea:any;//区域页数
    private dataTotal:any;//总数
    private areaTotal:any;//区域总数
    private isModalShow:any=false;//点击弹出条件填写框
    private isCarDetailShow:any=false;//点击列表中号牌号码弹出框
    private isAreaDetailShow:any=false;//点击区域显示详情
    private isCarByOneDetailShow:any=false;//点击区域详情中的号牌号码弹出框
    private recentCar:any={};//点击列表中号牌号码弹出框数据
    private ifErrorImg:any;//错误图片
    private _checked:any=false;
    peerTimes:any=[
                {"dmz": "5", "dmsm1": "5"},
                {"dmz": "10", "dmsm1": "10"},
                {"dmz": "15", "dmsm1": "15"},
                {"dmz": "20", "dmsm1": "20"},
                {"dmz": "25", "dmsm1": "25"},
                {"dmz": "30", "dmsm1": "30"}
            ];
    constructor(
        private modalService: NzModalService,
        private peerService: PeerService,
        private DatePipe: DatePipe,
        public msg: NzMessageService
        ) {
           
            this.search = {
                beginDate:'',
                endDate:'',
                license:'湘A5351N',
                licenseType:'',
                gateIds:'',
                minutes:'5',
                times:''
             };
             this.areaList={
                regionalparam:''
             }
             this.pagination={
                pageSize:'10',
                pageIndex:'1'
             }
             this.paginationArea={
                pageSize:10,
                pageIndex:1
             }
        }   
    ngOnInit() {
    }

 private ifAll(e){
      if(e==true){
          this.areaDetail.isAll='1';
      }else{
          this.areaDetail.isAll='0';
      }
      this.getAreaDetail(this.areaDetail);
  }

 //获取列表数据
 private getPeerList(parmes){
   this.search = {
                beginDate:parmes.kssj,
                endDate:parmes.jssj,
                license:parmes.hphm,
                licenseType:parmes.hpzl,
                minutes:parmes.minutes,
                times:parmes.times,
                gateIds:parmes.fxfw              
    };
    this.search=$.extend({},this.search,this.pagination);
    this.myLoading=true;
    this.peerList(this.search);
    
  }
 private peerList(parmes){
    this.peerService.getList(parmes).subscribe(data => { 
           if(data.resultCode!=0){
              this.msg.create('error', data.resultMsg);
              this.myLoading=false;
              return;
           }else{
              this.data=data.rows;
              this.dataTotal=data.total;
              this.myLoading=false;
           }
           console.log(data);    
     });
 }
 //tabs切换
private showListTypes(type){
    if(type=='list'){
       this.showLp=true;
    }else{
       this.showLp=false;
    }
}
//列表页数改变
private indexChange(e){
    this.search.pageIndex=e;
    this.getPeerList(this.search);
 }

//错误图片
private errorImg(){
  this.ifErrorImg=true;
}
//获取列表单个号牌数据
private recentCarDetail(car){
     this.carDetailOne={
          hphm:car.hphm,
          hpzl:car.hpzl,
          minTime:this.search.beginDate
     }
     const subscription = this.modalService.open({
       title          : '最近一次过车记录',
       content        : RecentCarModalComponent,
       footer         : false,
       componentParams: {
         carDetailOne: this.carDetailOne
       }
    });
    subscription.subscribe(result => {
       console.log(result);
    })
    //  console.log(car);
    //  this.isCarDetailShow=true;
    //  this.peerService.recentCar({"hphm":car.hphm,"hpzl":car.hpzl,"minTime":this.search.beginDate}).subscribe(data => { 
    //         this.recentCar=data.rowData;
    //         this.errorImg();
    //  });
  }
//获取区域单个号牌数据
private showFrequentOne(car){
    //  this.isCarByOneDetailShow=true;
    //   this.peerService.areaByOneDel({"hphm":car.hphm,"hpzl":car.hpzl,"gcsj":car.gcsj}).subscribe(data => { 
    //         this.dataOne=data.rowData;
    //         this.errorImg();
    //  });
  }
//区域单个号牌数据查询条件
private showFrequentDetail(index,car){
      this.isAreaDetailShow=true; 
      this.areaDetail=$.extend({},this.paginationArea);
      this.areaDetail.gckssj=this.search.beginDate;
      this.areaDetail.gcjssj=this.search.endDate;
      this.areaDetail.kdbh=this.search.gateIds;
      this.areaDetail.minutes=this.search.minutes;
      this.areaDetail.licenseType=this.search.licenseType;
      this.areaDetail.license=this.search.license;
      this.areaDetail.hphm=car.hphm;
      this.areaDetail.hpzl=car.hpzl;
      this.areaDetail.isAll='0';
      this.getAreaDetail(this.areaDetail);
      
  }
  //区域详情
 private getAreaDetail(parmes){
     this.myLoading=true;
     this.peerService.areaDel(parmes).subscribe(data => { 
            this.areaDetails=data.rows;
            this.areaTotal=data.total;
            this.myLoading=false;
            this.errorImg();
     });
  }
  //区域页数变化
  private areaIndexChange(e){
      this.areaDetail.pageIndex=e;
      this.getAreaDetail(this.areaDetail);
  }
  //关闭弹窗
  private hasChange(e){
    this.isModalShow=e;
    this.isCarDetailShow=e;
    this.isAreaDetailShow=e;
  }
  //因存在较多弹窗，此方法是为了避免弹框中出现的弹框造成关闭错误单独新建的关闭
  private hasChange2(e){
      this.isCarByOneDetailShow=e;
  }
 }
