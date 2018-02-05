import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { NzModalService } from 'ng-zorro-antd';
import { FirstService } from '../first.service';
import { Http} from '@angular/http';
import { RecentCarModalComponent} from '../../VehicleCommon/commom/recent-car-modal.component';
import { CardetailModalComponent} from '../../VehicleCommon/commom/car-detail-modal.component';
declare var $: any;
@Component({ 
    selector: 'app-acl',
    templateUrl: './first.component.html',
    styleUrls: ['./first.component.css'],
    providers:[DatePipe]
})
export class FirstComponent {
    private myLoading = false; //加载
    private showLp:any=true;//列表与图表的转换
    private data: any[] = [];//保存查询列表的数据
    private areaDetails: any[] = [];//保存点击区域得到的数据
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
    private carDetailOne: any;
    private carmodalDetail: any;
    constructor(
        private modalService: NzModalService,
        private frstService: FirstService,
        private DatePipe: DatePipe,
        public msg: NzMessageService
        ) {
           
            this.search = {
                ksfxsj:'',
                jsfxsj:'',
                fxfw:'',
                hssj:'5'
             };
             this.areaList={
                regionalparam:''
             }
             this.pagination={
                pageSize:10,
                pageIndex:1
             }
             this.paginationArea={
                pageSize:10,
                pageIndex:1
             }
        }   
    ngOnInit() {
    }
 //获取列表数据
 private getFirstList(parmes){
     this.search = {
                ksfxsj:parmes.kssj,
                jsfxsj:parmes.jssj,
                hssj:parmes.hssj,
                fxfw:parmes.fxfw              
    };
    this.search=$.extend({},this.search,this.pagination);
    this.myLoading=true;
    this.firstList(this.search);
  }
//获取列表数据
private firstList(parmes){
     this.frstService.getList(parmes).subscribe(data => { 
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
    this.getFirstList(this.search);
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
          minTime:this.search.ksfxsj
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
  }
//获取区域单个号牌数据
 private showFrequentOne(car){
     this.carmodalDetail={
          hphm:car.hphm,
          hpzl:car.hpzl,
          gcsj:car.gcsj
      }
     const subscription = this.modalService.open({
       title          : '详情页面',
       content        : CardetailModalComponent,
       footer         : false,
       width          :800,
       componentParams: {
         carDetailOne: this.carmodalDetail
       }
    });
    //  this.isCarByOneDetailShow=true;
    //   this.frstService.areaByOneDel({"hphm":car.hphm,"hpzl":car.hpzl,"gcsj":car.gcsj}).subscribe(data => { 
    //         this.dataOne=data.rowData;
    //         this.errorImg();
    //  });
  }
//区域单个号牌数据查询条件
private showFrequentDetail(index,car){
      this.isAreaDetailShow=true; 
      this.areaDetail=$.extend({},this.paginationArea);
      this.areaDetail.gckssj=this.search.ksfxsj;
      this.areaDetail.gcjssj=this.search.jsfxsj;
      this.areaDetail.kdbh=this.search.fxfw;
      this.areaDetail.hphm=car.hphm;
      this.areaDetail.hpzl=car.hpzl;
      this.getAreaDetail(this.areaDetail);
      
  }
  //区域详情
 private getAreaDetail(parmes){
     this.myLoading=true;
     this.frstService.areaDel(parmes).subscribe(data => { 
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
