import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { NzModalService } from 'ng-zorro-antd';
import { PeerService } from '../peer.service';
import { Http} from '@angular/http';
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
    private numOne = false;//区分是添加还是修改
    private data: any[] = [];//保存查询列表的数据
    private list: any[] = [];//保存查询条件的数组
    private areaDetails: any[] = [];//保存点击区域得到的数据
    // private areaNum: any[] = [];
    private areaDetail:any={};//保存查询区域的条件
    private dataOne:any={};//区域结果里面单个车辆详情
    private areaList: any;//传到后台的数据
    private search: any;//保存添加数据
    private pagination: any;//页数
    private paginationArea:any;//区域页数
    private search2: any;//保存修改后的数据
    private indexNum:any;//判断修改list数组里面的第几个
    private dataTotal:any;//总数
    private areaTotal:any;//区域总数
    private searchL: any={};//过度数组
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
                hpzl:'',
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
             this.search2={
               
             };
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
           //默认时间间隔3天
           var newDate = new Date();
           var newDate1=(newDate.getTime()-3*24*3600*1000);
           var oneweekdate = new Date(newDate1);
        //    this.search.beginDate=this.DatePipe.transform(oneweekdate,'y-MM-dd HH:mm:ss');
        //    this.search.endDate=this.DatePipe.transform(new Date(),'y-MM-dd HH:mm:ss');
           this.search.beginDate='2016-08-01 14:46:05';
           this.search.endDate='2016-08-31 14:46:05';
    }
 //保存子组件返回的卡口数据
 private getKkou(e){
     if(e.kkListBh!=undefined&&e.kkList!=undefined){
          console.log(e.kkListBh.join(","));
          this.search.gateIds=e.kkListBh.join(",");
          this.search.kkmc=e.kkList;
          this.search2.gateIds=e.kkListBh.join(",");
          this.search2.kkmc=e.kkList;
     }
    
  }
  private ifAll(e){
      if(e==true){
          this.areaDetail.isAll='1';
      }else{
          this.areaDetail.isAll='0';
      }
      this.getAreaDetail(this.areaDetail);
  }
  //添加查询条件
  private addMessage(){
        this.searchL= {
                    beginDate:this.search.beginDate,
                    endDate:this.search.endDate,
                    license:this.search.license,
                    licenseType:this.search.licenseType,
                    gateIds: this.search.gateIds,
                    kkmc: this.search.kkmc,
                    minutes: this.search.minutes,
                    times: this.search.times
                };
          
        this.list.push(this.searchL);
        this.isModalShow=false;
        this.areaList=$.extend({},this.pagination,this.list[0]);
        // this.areaList.regionalparam=this.list;
        // console.log(this.list);
        // console.log(this.areaList);
        this.getFrequentList(this.areaList);
 }
 //获取列表数据
 private getFrequentList(parmes){
    this.myLoading=true;
    this.peerService.getList(parmes).subscribe(data => { 
           if(data.resultCode!=0){
              this.msg.create('error', data.resultMsg);
              this.myLoading=false;
              alert(12);
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
    this.areaList.pageIndex=e;
    this.getFrequentList(this.areaList);
 }
//保存修改信息
private onSave(){
      console.log(this.indexNum);
      this.list[this.indexNum]=this.search2;
      console.log(this.list[this.indexNum]);
      console.log(this.list);
      this.isModalShow=false;
      this.areaList=$.extend({},this.pagination,this.list[0]);
      this.getFrequentList(this.areaList);
 }
 //输出区域
private delete(num){
   this.list.splice(num,1);
}
//错误图片
private errorImg(){
  this.ifErrorImg=true;
}
//获取列表单个号牌数据
private recentCarDetail(car){
     console.log(car);
     this.isCarDetailShow=true;
     this.peerService.recentCar({"hphm":car.hphm,"hpzl":car.hpzl,"minTime":this.list[0].beginDate}).subscribe(data => { 
            this.recentCar=data.rowData;
            this.errorImg();
     });
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
      this.areaDetail.gckssj=this.list[index].beginDate;
      this.areaDetail.gcjssj=this.list[index].endDate;
      this.areaDetail.kdbh=this.list[index].gateIds;
      this.areaDetail.minutes=this.list[index].minutes;
      this.areaDetail.licenseType=this.list[index].licenseType;
      this.areaDetail.license=this.list[index].license;
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
  //点击添加数据
  private carDetail(num) {
      this.indexNum=num; 
      this.isModalShow=true;              
      if(num!=undefined){
          this.numOne=true;
          this.search2=this.list[num];
      }else{ 
         this.search.kkmc='';
         this.search.licenseType='';
         this.search.times='';
         var newDate = new Date();
         var newDate1=(newDate.getTime()-3*24*3600*1000);
         var oneweekdate = new Date(newDate1);
        //  this.search.beginDate=this.DatePipe.transform(oneweekdate,'y-MM-dd HH:mm:ss');
        //  this.search.endDate=this.DatePipe.transform(new Date(),'y-MM-dd HH:mm:ss');
         this.numOne=false;
      }
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
