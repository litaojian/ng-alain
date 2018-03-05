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
    selector: 'searchInput',
    templateUrl: './trackSearchInput.component.html',
    styleUrls: ['./trackSearchInput.component.css'],
    providers:[DatePipe]
})
export class trackSearchInputComponent {
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
    searchInput2:any;
    searchInput:any;
    Url=false;//是否存在tabelurl
    putout: any;
    numOne:any;
    indexNum:any;
    currentModal;
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
              dcnr:'',
              num:''
          }
          this.putoutAll={};
          //接收保存对象的参数
          this.search2={
               
          };
          this.searchInput2={
               
          }
          this.searchInput=[];
        
          }

  ngOnInit() {      
          //接收传递的值
          this.activeRoute.queryParams.subscribe(params => {
            //   this.searchtest.hphm = params['hphm'];
              if(params['hphm']!=undefined){
                this.searchInput=[{
                    hphm:params['hphm'],
                    beginDate:params['kssj'],
                    endDate:params['jssj']
                }];
                // this.searchInput2.hphm = params['hphm'];
                // this.searchInput2.beginDate = params['kssj'];
                // this.searchInput2.endDate = params['jssj'];
                // this.searchInput.push(this.searchInput2);
                this.searchInput2=$.extend({},this.pagination);
                this.searchInput2.param=this.searchInput;
                this.loading=true;
                this.searchLists(this.searchInput2);
              }else{
                // this.searchtest.hphm = '';
              }
            
          }); 
          //  var newDate = new Date();
          //  var newDate1=(newDate.getTime()-3*24*3600*1000);
          //  var oneweekdate = new Date(newDate1);
          //  this.search.kssj=this.DatePipe.transform(oneweekdate,'y-MM-dd HH:mm:ss');
          //  this.search.jssj=this.DatePipe.transform(new Date(),'y-MM-dd HH:mm:ss');
    }
isVisible = false;
 //tabs切换
private showListTypes(type){
    if(type=='list'){
       this.showLp=true;
    }else{
       this.showLp=false;
    }
}
 //获取列表数据
  private getSearchList(parmes){
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
private indexChange(e){
    this.search.pageIndex=e;
    this.searchLists(this.search);
 }
}
