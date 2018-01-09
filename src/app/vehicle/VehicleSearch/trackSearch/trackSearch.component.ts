import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { Router, NavigationExtras,ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { TrackSearchService } from '../trackSearch.service';
import { tap, map, mergeMap, catchError } from 'rxjs/operators';
declare var $:any;
@Component({ 
    selector: 'app-acl',
    templateUrl: './trackSearch.component.html',
    styleUrls: ['./trackSearch.component.css'],
    providers:[DatePipe]
})
export class trackSearchComponent {
    expandForm = false;
    ifMoreSearch = false;
    isModalShow= false;
    isModalShow_put=false;
    ifErrorImg=false;
    pagination:any;
    showLp:any=true;
    tabColor:any=true;//tab主题切换
    datanums:any;
    putoutAll:any;
    type:any;
    showSearch= true;
    _value: any[] = null;
    loading = false;  //加载
    data: any[] = [];
    dataOne: any[] = [];//点击列表接收弹出框数据
    list: any[] = [];//保存过车信息数据
    search: any;
    search2: any;
    searchL:any;
    searchtest:any;
    Url=false;//是否存在tabelurl
    putout: any;
    numOne:any;
    indexNum:any;
    countyList: any=[];//地市
    kkList: any;//卡口
    currentModal;
    dcList:any=[{"dmz": "1", "dmsm1": "数据列表"},{"dmz": "2", "dmsm1": "过车图片"}];
    searchType:any=[{"dmz": "1", "dmsm1": "精确查询"},{"dmz": "2", "dmsm1": "模糊查询"},{"dmz": "3", "dmsm1": "无号牌"}];
    constructor(
        private modalService: NzModalService,
        private DatePipe: DatePipe,
        private TrackSearchService: TrackSearchService,
        public msg: NzMessageService,
        public activeRoute: ActivatedRoute,
        public router: Router
        ) {
        //保存添加查询参数
        this.search = {
                hphm:'',
                kssj:'',
                jssj:'',
                kkbh:'',
                hpzl:'',
                xian:'',
                cxfs:'1',
                citys:''
             };
          this.pagination = {
            curPage: 1,
            rows: 10
         };
          //导出
          this.putout={
              dcnr:'',
              num:''
          }
          this.putoutAll={};
          //接收保存对象的参数
          this.search2={
               
          };
          //传到子组件的对象参数
          this.searchtest={
              hphm:'',
              kssj:'',
              jssj:''
           }
        
        }

  ngOnInit() {      
          //接收传递的值
          this.activeRoute.queryParams.subscribe(params => {
            //   this.searchtest.hphm = params['hphm'];
              if(params['hphm']!=undefined){
                this.searchtest.hphm = params['hphm'];
                this.searchtest.kssj = params['kssj'];
                this.searchtest.jssj = params['jssj'];
                this.searchListTotal();
              }else{
                // this.searchtest.hphm = '';
              }
            
          }); 
           var newDate = new Date();
           var newDate1=(newDate.getTime()-3*24*3600*1000);
           var oneweekdate = new Date(newDate1);
           this.search.kssj=this.DatePipe.transform(oneweekdate,'y-MM-dd HH:mm:ss');
           this.search.jssj=this.DatePipe.transform(new Date(),'y-MM-dd HH:mm:ss');
          //  this.seachCounty(this.search.citys);
           this.seachKK(this.search.xian);
    }
  isVisible = false;
  putOut = () => {
    this.putoutAll=$.extend({}, this.list[0], this.putout);
    this.TrackSearchService.putOuts(this.putoutAll).subscribe(res =>{
          var filename = res.filename.replace("\"","").replace("\"","");
          window.location.href="vehicle/api/data/rest/pass/downfinally?filename="+filename;
      });
    
  }
  putOutMask(){
     this.isModalShow_put = true;
  }
  handleCancel = () => {
    this.isVisible = false;
  }
//接收子组件传回来的值,是否显示对话框
hasChange(e){
  this.isModalShow_put=e;
  this.isModalShow=e;
}
//接收表格组件返回来的数组
// getTabelList(e){
//     this.data=e[0];
//     console.log(this.data);
//     this.loading=false;
//     this.Url=e[1];
// }
//tabs切换
showListTypes(type){
    if(type=='list'){
       this.tabColor=true;
       this.showLp=true;
    }else{
       this.tabColor=false;
       this.showLp=false;
    }
}
//添加查询条件
addMessage(){
    this.searchL= {
                kssj:this.search.kssj,
                jssj:this.search.jssj,
                citys: this.search.citys.substring(0,4),
                xian:this.search.xian.substring(0,4),
                kkbh:this.search.kkbh.substring(0,4),
                hphm:this.search.hphm,
                hpzl:this.search.hpzl,
                cxfs:this.search.cxfs
            };
    this.list.push(this.searchL);
    console.log(this.list);
    this.searchList(1);
    this.isModalShow=false;
 }
delete(num){
    this.list.splice(num,1);
    this.searchList(1);
}
//点击查询调用方法
searchList(page){     
        if(this.list[0]==undefined){
                this.msg.create('error','请选择查询条件');
                return;
          }else{
               this.searchtest = $.extend({}, this.list[0], this.pagination);
              //  this.searchtest = this.list[0];
          }
        this.loading=true;  
        this.pagination.curPage=page;  
		    this.TrackSearchService.getData(this.searchtest).subscribe(data => {
               this.data=data.data;
               this.datanums=data.count;
               this.loading=false;
               this.errorImg();
         })
        //  this.Url=true;
         
}
errorImg(){
  this.ifErrorImg=true;
}
indexChange(e){
    // this.pagination.curPage=e;
    this.searchList(e);
}
//当全局查询是调用该方法
searchListTotal(){
        this.loading=true; 
        this.TrackSearchService.getData(this.searchtest).subscribe(data => {
               this.data=data.data;
               this.datanums=data.count;
               this.loading=false;
         })
}
onConcel(){
    this.isModalShow=false; 
}
//保存查询条件
onSave(){
      this.list[this.indexNum]=this.search2;
      this.searchList(1);
      this.isModalShow=false;
 }
//根据行政区划 查询区县
  seachCounty(xzqh){
        var xzqhVal=xzqh.substring(0,4);
        
        this.TrackSearchService.getCounty(xzqhVal).subscribe(res =>{
              
              this.countyList=res.data;
        })
  }
 //根据区县 查询卡口
  seachKK(qx){
        var xzqhVal=qx.substring(0,4);
        this.TrackSearchService.getKkList(xzqhVal).subscribe(res =>{
           this.kkList = res.data;
        });
  }
  showMoreSearch(){
     this.ifMoreSearch=false;
  }
//显示查询条件
 carDetail(num) {
      this.indexNum=num; 
      this.isModalShow=true;     
      if(num!=undefined){
          this.numOne=true;
          this.search2=this.list[num];
          // this.seachCounty(this.search.citys);
          this.seachKK(this.search.xian);
      }else{        
        //  this.search.xzqh='440000000000';
        //  this.search={};
         this.countyList='';
         this.kkList='';
         this.search = {
                hphm:'',
                kssj:'',
                jssj:'',
                kkbh:'',
                hpzl:'',
                xian:'',
                cxfs:'1',
                citys:''
             };
         var newDate = new Date();
         var newDate1=(newDate.getTime()-3*24*3600*1000);
         var oneweekdate = new Date(newDate1);
         this.search.kssj=this.DatePipe.transform(oneweekdate,'y-MM-dd HH:mm:ss');
         this.search.jssj=this.DatePipe.transform(new Date(),'y-MM-dd HH:mm:ss');
        //  this.seachCounty(this.search.citys);
         this.seachKK(this.search.xian);
         this.numOne=false;
      }
  }
  //显示单个信息
  carDetailMore(titleTpl, contentTpl, footerTpl,width,dataOnes) {
    this.dataOne=dataOnes;
    this.currentModal = this.modalService.open({
      title       : titleTpl,
      content     : contentTpl,
      footer      : footerTpl,
      width      : width,
      maskClosable: false,
      onOk() {
        console.log('Click ok');
      }
    });
  }
 }
