import { Component,Injector } from '@angular/core';
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
    showSearchList:any=true;
    expandForm = false;
    ifMoreSearch = false;
    isModalShow= false;
    isModalShow_export=false;
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
    exportType:any=[{"dmz": "1", "dmsm1": "数据列表"},{"dmz": "2", "dmsm1": "过车图片"}];
    // searchType:any=[{"dmz": "1", "dmsm1": "精确查询"},{"dmz": "2", "dmsm1": "模糊查询"},{"dmz": "3", "dmsm1": "无号牌"}];
    modalService: NzModalService;
    DatePipe: DatePipe;
    TrackSearchService: TrackSearchService;
    msg: NzMessageService;
    activeRoute: ActivatedRoute;
    router: Router;
    constructor(
        injector:Injector
        // private modalService: NzModalService,
        // private DatePipe: DatePipe,
        // private TrackSearchService: TrackSearchService,
        // public msg: NzMessageService,
        // public activeRoute: ActivatedRoute,
        // public router: Router
        ) {
        this.modalService = injector.get(NzModalService);
        this.DatePipe = injector.get(DatePipe);
        this.TrackSearchService = injector.get(TrackSearchService);
        this.msg = injector.get(NzMessageService);
        this.activeRoute = injector.get(ActivatedRoute);
        this.router = injector.get(Router);
        //保存添加查询参数
        this.search = {
                hphm:'',
                beginDate:'',
                endDate:'',
                kkbh:'',
                hpzl:''
             };
          this.pagination={
                pageSize:10,
                pageIndex:1
          }
          //导出
          this.putout={
              type:'',
              num:''
          }
          this.putoutAll={};
          //接收保存对象的参数
          this.search2={
               
          };
        
        }

  ngOnInit() {     
        
    }
  export(num){
    if(num==1){
       if(this.data.length>0){
          this.isModalShow_export=true;
       }else{
           this.msg.create('error', '无数据导出');
           return;
       }
       
    }else{
       if(this.data==[]){
          this.msg.create('error','没有可以导出的数据');
          return;
       }
       this.isModalShow_export=false;
       this.putoutAll=$.extend({}, this.search, this.putout);
       this.search.param=JSON.stringify(this.search.param); 
       this.search.param=encodeURI(this.search.param); 
       window.location.href="analysis/api/analysis/track/export?param="+this.search.param+'&num='+this.putout.num+'&type='+this.putout.type;
    //    this.TrackSearchService.exports(this.putoutAll).subscribe(res =>{
    //         var filename = res.file.replace("\"","").replace("\"","");
    //     });
    }
    
    
    
  }
  handleCancel(e){
    this.isModalShow_export=false;
  }
 //tabs切换
showListTypes(type){
    if(type=='list'){
       this.showLp=true;
    }else{
       this.showLp=false;
    }
}
 //获取列表数据
getSearchList(parmes){
    console.log(parmes);
    this.search2=[];
    for(let i=0;i<parmes.regionalparam.length;i++){
           this.search = {
                beginDate:parmes.regionalparam[i].kssj,
                endDate:parmes.regionalparam[i].jssj,
                hphm:parmes.regionalparam[i].hphm,
                hpzl:parmes.regionalparam[i].hpzl,
                gateIds:parmes.regionalparam[i].fxfw              
            };
           this.search2.push(this.search);
     }
    console.log(this.search2);
    this.search=$.extend({},this.pagination);
    this.search.param=this.search2;
    console.log(this.search); 
    this.loading=true;
    this.searchLists(this.search);
    
  }
searchLists(parmes){
    this.TrackSearchService.getData(parmes).subscribe(data => { 
            if(data.resultCode!=0){
                this.msg.create('error', data.resultMsg);
                this.loading=false;
                return;
            }else{
                this.data=data.rows;
                this.datanums=data.total;
                this.loading=false;
            }
            console.log(data);    
        });
 }
errorImg(){
  this.ifErrorImg=true;
}
//列表页数改变
indexChange(e){
    this.search.pageIndex=e;
    this.searchLists(this.search);
 }
}
