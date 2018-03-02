import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { NzModalService } from 'ng-zorro-antd';
import { RegionalService } from '../regional.service';
import { Http} from '@angular/http';
declare var $: any;
@Component({ 
    selector: 'app-acl',
    templateUrl: './regional.component.html',
    styleUrls: ['./regional.component.css'],
    providers:[DatePipe]
})
export class RegionalComponent {
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
    private search2: any[] = [];//中间数组
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
    constructor(
        private modalService: NzModalService,
        private RegionalService: RegionalService,
        private DatePipe: DatePipe,
        public msg: NzMessageService
        ) {
           
            this.search = {
                hphm:'',
                beginDate:'',
                endDate:'',
                kkbh:'',
                hpzl:''
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
           //默认时间间隔3天
        //    var newDate = new Date();
        //    var newDate1=(newDate.getTime()-3*24*3600*1000);
        //    var oneweekdate = new Date(newDate1);
        //    this.search.beginDate=this.DatePipe.transform(oneweekdate,'y-MM-dd HH:mm:ss');
        //    this.search.endDate=this.DatePipe.transform(new Date(),'y-MM-dd HH:mm:ss');
           //初始化数据，默认开始存在两个区域
        //    for(let i=0;i<2;i++){
        //        this.addMessage(2);
        //    }
    }
 //保存子组件返回的卡口数据
//  private getKkou(e){
//      if(e.kkListBh!=undefined&&e.kkList!=undefined){
//           console.log(e.kkListBh.join(","));
//           this.search.kkbh=e.kkListBh.join(",");
//           this.search.kkmc=e.kkList;
//           this.search2.kkbh=e.kkListBh.join(",");
//           this.search2.kkmc=e.kkList;
//      }
    
//   }
  //添加查询条件
//   private addMessage(i){
//         this.searchL= {
//                     beginDate:this.search.beginDate,
//                     endDate:this.search.endDate,
//                     kkbh: this.search.kkbh,
//                     kkmc: this.search.kkmc,
//                     hphm: this.search.hphm
//                 };
          
//         this.list.push(this.searchL);
//         this.isModalShow=false;
//         this.areaList=$.extend({},this.pagination);
//         this.areaList.regionalparam=this.list;
//         if(i==1){
//            this.getAreaList(this.areaList);
//         }
//  }
 //获取列表数据
 private getAreaList(parmes){
    console.log(parmes);
    this.search2=[];
    for(let i=0;i<parmes.regionalparam.length;i++){
           this.search = {
                beginDate:parmes.regionalparam[i].kssj,
                endDate:parmes.regionalparam[i].jssj,
                hphm:parmes.regionalparam[i].hphm,
                hpzl:parmes.regionalparam[i].hpzl,
                kkbh:parmes.regionalparam[i].fxfw              
            };
           this.search2.push(this.search);
     }
    console.log(this.search2);
    this.search=$.extend({},this.pagination);
    this.search.regionalparam=this.search2;
    console.log(this.search); 
    this.myLoading=true;
    this.areaLists(this.search);
    
  }
areaLists(parmes){
    this.RegionalService.getList(parmes).subscribe(data => { 
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
    this.areaLists(this.search);
 }
//保存修改信息
// private onSave(){
//       console.log(this.indexNum);
//       this.list[this.indexNum]=this.search2;
//       console.log(this.list[this.indexNum]);
//       console.log(this.list);
//       this.isModalShow=false;
//       this.getAreaList(this.areaList);
//  }
 //输出区域
// private delete(num){
//    this.list.splice(num,1);
// }
//错误图片
private errorImg(){
  this.ifErrorImg=true;
}
//获取列表单个号牌数据
private recentCarDetail(car){
     this.isCarDetailShow=true;
     this.RegionalService.recentCar({"hphm":car.hphm,"hpzl":car.hpzl,"minTime":this.search2[0].beginDate}).subscribe(data => { 
            this.recentCar=data.rowData;
            this.errorImg();
     });
  }
//获取区域单个号牌数据
private showAreaOne(car){
     this.isCarByOneDetailShow=true;
      this.RegionalService.areaByOneDel({"hphm":car.hphm,"hpzl":car.hpzl,"gcsj":car.gcsj}).subscribe(data => { 
            this.dataOne=data.rowData;
            this.errorImg();
     });
  }
//区域单个号牌数据查询条件
private showAreaDetail(index,car){
      this.isAreaDetailShow=true; 
      this.areaDetail=$.extend({},this.paginationArea);
      this.areaDetail.gckssj=this.search2[index].beginDate;
      this.areaDetail.gcjssj=this.search2[index].endDate;
      this.areaDetail.kdbh=this.search2[index].kkbh;
      this.areaDetail.hphm=car.hphm;
      this.areaDetail.hpzl=car.hpzl;
      this.getAreaDetail(this.areaDetail);
      
  }
  //区域详情
 private getAreaDetail(parmes){
     this.myLoading=true;
     this.RegionalService.areaDel(parmes).subscribe(data => { 
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
//   private carDetail(num) {
//       this.indexNum=num; 
//       this.isModalShow=true;              
//       if(num!=undefined){
//           this.numOne=true;
//           this.search2=this.list[num];
//       }else{        
//          this.search.kkmc='';
//          this.search.hphm='';
//          var newDate = new Date();
//          var newDate1=(newDate.getTime()-3*24*3600*1000);
//          var oneweekdate = new Date(newDate1);
//          this.search.beginDate=this.DatePipe.transform(oneweekdate,'y-MM-dd HH:mm:ss');
//          this.search.endDate=this.DatePipe.transform(new Date(),'y-MM-dd HH:mm:ss');
//          this.numOne=false;
//       }
//   }
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
