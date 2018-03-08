import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { NzModalService } from 'ng-zorro-antd';
import { FirstService } from '../first.service';
import { Http} from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser' 
import { FileUploader } from 'ng2-file-upload';
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
        public msg: NzMessageService,
        private sanitizer: DomSanitizer
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
         this.getImgBase64();
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
  uploader:FileUploader = new FileUploader({    
        url: "http://www.download.com:80/uploadFile",   
        method: "POST",    
        itemAlias: "uploadedfile"
   });
   selectedFileOnChanged(e) {
    // 这里是文件选择完成后的操作处理
    alert(12);
   }
  fileChange(event){
    let file = event.target.files[0];
    let imgUrl = window.URL.createObjectURL(file);
    let sanitizerUrl = this.sanitizer.bypassSecurityTrustUrl(imgUrl); 
    this.imgUrl = sanitizerUrl;
 }
  imgUrl:any="";
/**
 * 获取图片Base64编码
 */
getImgBase64(){
    var base64="";
    var dataURL='12';
    var img = new Image();
    img.src="https://t11.baidu.com/it/u=3239547808,3466296954&fm=76";
    img.crossOrigin = "*";
    img.onload=function(){
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        dataURL = canvas.toDataURL("image/png");
        // var index=dataURL.lastIndexOf("\-");
        //     obj=obj.substring(index+1,obj.length);
        localStorage.setItem("base64Url", dataURL);
        
    }
    // alert(dataURL);
}
  searchImg:any={
      "images": [], 
      "calc_param": 
       "{\"Detect\": {\"IsDet\": true,\n        \"Mode\": 0\n    },\n    \"Recognize\" : {\n      \"Color\" : {\n        \"IsRec\" : true,\n        \"Mode\" : 0\n      },\n      \"Type\" : {\n        \"IsRec\" : true,\n        \"Mode\" : 0\n      },\n      \"Brand\" : {\n        \"IsRec\" : true,\n        \"Mode\" : 0\n      },\n      \"Belt\": {\n        \"IsRec\" : true\n      },\n      \"Call\": {\n        \"IsRec\" : true\n      },\n      \"Crash\": {\n        \"IsRec\" : true,\n        \"Mode\" : 0\n      },\n      \"Danger\": {\n        \"IsRec\" : true,\n        \"Mode\" : 0\n      },\n      \"Plate\": {\n        \"IsRec\" : true,\n        \"Mode\" : 0\n      },\n      \"Similar\": {\n        \"IsRec\" : true,\n        \"Mode\" : 0\n      },\n      \"Marker\": {\n        \"IsRec\" : true,\n        \"Mode\" : 0\n      },\n      \"Passenger\": {\n        \"IsRec\" : true,\n        \"Mode\" : 0\n      }\n    }\n}\n"}
  showImg(){
    //  alert(localStorage.getItem("base64Url"));
     this.imgUrl=localStorage.getItem("base64Url");
    //  console.log(this.imgUrl);
     this.searchImg.images=["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w8ODBgwcPptPpw4cPz6pjfX195RVkDQ0NpVIplUp1dHTMvJc6PD7jm0R3vkaOjY298847xWIxk8kcOnSovr6+v79/165d77//fnt7ezab3bx58/379xf4R5I7pGedew4hTE1NnT59uq6u7quvvlr848a6u7uTe88AoGyZ8jw+Pn7r1q2bN28ODg42NjbW1tZ+8MEHLS0tGzZs6Ozs7OvrGxgYaG9v/+WXXxZzqfMff/wRQiiVSrOuuurt7U0G2fO1OflY0NHR8fbbb9fU1Lz33nuvvvpqOp3eu3fv/fv3C4XChQsXkjXLZ7srJdevnTx5ctZHh0KhcPr06cnJyeSyNQB4alXP89mzZ0MIU1NT69ev37dvX1LfZG753LlzV65caWho6O/v7+zsHB4eXr9+fTab7ezsnHlb83zu378/6/LvyhHtLK2trTMvLsvlcrt3725vby8Wi0eOHGlqakqKu2PHjvm2UP5qjTVr1sy3zhMnt42YAVhYFfM8Pj5evjs5hHD37t27d+8m55vLHR0eHi6vPzU19eabb05OTuZyuYWf3vX777+HEBobGytPMy/86K6XXnopObB79+6tWbOmoaGhra1t1apVi/+nkoeDptPpxXyAmFN3d/fTvRGAf48q5rm+vr6trW18fHzmaDKXy7W3t2cymRBCsVgcGhqaeX31Ih/i8fDhw//zwP76668LFy7kcrnVq1c3NjZu2rRp1apVCzywrOybb74JIRw+fPjpdl1uc/kXw2gAKi3fjVXhcZsvXrz48OHDwcHB5HurduzYscBDvhbwFJPbZTt37ty5c+epU6eGh4ePHTuWz+dPnz79888/L3wYpVIpOeynvsC7q6srCbMqA7CA/yzbnnp7e7PZ7MxnktTX1ydD55dffrm3t7d8WneRksntmZqbm5e0hfr6+gMHDvz222+ZTKauru6J6/f19SXP/lzSXmYRZgCeaDmu3E7uZaqvrx8dHZ11yjYp9NmzZ48dO5bciNzc3Lx169YQwmKmmpfqwoULsx4ymti4cePGjRuTB3qHEOa8sery5cvJw7qfYqA/i0IDsLDq5rlUKvX19U1MTHz22WcL5PbAgQN79uy5evXqp59+evTo0XQ6vaTrp5K9rF27dmhoKITQ2to635ozv9dyAdeuXZt1Y9XY2Nj777+/8BdqAcA/pYp5Th6ZeerUqcobjWpqajKZzO7du8tLkuvI2traSqVSTU1N5VtaWlqS766ofJncmtXb2zs5OXnmzJkDBw5UHkwqldq+ffsCd0PNtGnTptbW1m3btpWX3Lt379atW0+8YyqdTm/fvn0xuwCABayYnp5+1scAAPzN8l0aBgAskjwDQHTkGQCiI88AEB15BoDoyDMAREeeASA68gwA0ZFnAIiOPANAdOQZAKIjzwAQHXkGgOjIMwBER54BIDryDADRkWcAiI48A0B05BkAoiPPABAdeQaA6MgzAETnGeS5u7t7+XcKAM8Ro2cAiM4y5dmIGQAWbznyrM0AsCQrpqenq7qDyjZ3dXVVdY8A8Lyrep7D40KrMgAs0nJMbgszACzJcoyeAYAlcWMVAERHngEgOvIMANGRZwCIjjwDQHTkGQCiI88AEB15BoDoyDMAREeeASA68gwA0ZFnAIiOPANAdOQZAKIjzwAQHXkGgOjIMwBER54BIDryDADRkWcAiI48A0B05BkAoiPPABAdeQaA6MgzAETnGeS5u7t7+XcKAM8Ro2cAiM4y5dmIGQAWbznyrM0AsCQrpqenq7qDyjZ3dXVVdY8A8Lyrep7D40KrMgAs0nJMbgszACzJcoyeAYAlcWMVAERHngEgOvIMANGRZwCIjjwDQHTkGQCiI88AEB15BoDoyDMAREeeASA68gwA0ZFnAIiOPANAdOQZAKIjzwAQHXkGgOjIMwBER54BIDryDADRkWcAiI48A0B05BkAoiPPABAdeQaA6MgzAETnGeS5u7t7+XcKAM8Ro2cAiM4y5dmIGQAWbznyrM0AsCQrpqenq7qDyjZ3dXVVdY8A8Lyrep7D40KrMgAs0nJMbgszACzJcoyeAYAlcWMVAERHngEgOvIMANGRZwCIjjwDQHTkGQCiI88AEB15BoDoyDMAREeeASA68gwA0fkfyJUSVLKQlf4AAAAASUVORK5CYII="];
    //  this.searchImg.images.push(this.imgUrl);
     this.frstService.showImages(this.searchImg).subscribe(data => { 
            console.log(data);
     }); 
  }
 }
