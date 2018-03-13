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
    isModalShow_peerDetail=false;
    isModalShow_detailOne=false;
    isModalShow_detail=false;
    isModalShow_frequent=false;
    private showLp:any=true;//列表与图表的转换
    ifErrorImg=false;
    pagination:any;
    paginationDetail:any;
    tabColor:any=true;//tab主题切换
    datanums:any;
    dataDetailnums:any;
    putoutAll:any;
    type:any;
    showSearch= true;
    _value: any[] = null;
    loading = false;  //加载
    myloading=false//详情加载
    data: any[] = [];
    dataDetail: any[] = [];
    dataOne: any[] = [];//点击列表接收弹出框数据
    list: any[] = [];//保存过车信息数据
    search: any;
    firstSearch:any;
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
    peerTimes:any=[
                {"dmz": "5", "dmsm1": "5"},
                {"dmz": "10", "dmsm1": "10"},
                {"dmz": "15", "dmsm1": "15"},
                {"dmz": "20", "dmsm1": "20"},
                {"dmz": "25", "dmsm1": "25"},
                {"dmz": "30", "dmsm1": "30"}
            ];
    exportType:any=[{"dmz": "1", "dmsm1": "数据列表"},{"dmz": "2", "dmsm1": "过车图片"}];
    ifhphm:any=[{"dmz": "1", "dmsm1": "无号牌"},{"dmz": "2", "dmsm1": "有号牌"}];
    // searchType:any=[{"dmz": "1", "dmsm1": "精确查询"},{"dmz": "2", "dmsm1": "模糊查询"},{"dmz": "3", "dmsm1": "无号牌"}];
    modalService: NzModalService;
    DatePipe: DatePipe;
    TrackSearchService: TrackSearchService;
    msg: NzMessageService;
    activeRoute: ActivatedRoute;
    router: Router;
    _dateRange = [new Date(),new Date(Date.now() + 3600 * 24 * 5 * 1000)]; 
    // _mydateRange = [null, null]; 
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
          this.paginationDetail={
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
    //   this._dateRange[0]=this.setTime(new Date());
    //   this._dateRange[1]=this.setTime(new Date(Date.now() + 3600 * 24 * 5 * 1000));
    //   this.tranLateTime(new Date(),new Date(Date.now() + 3600 * 24 * 5 * 1000))
        
  }
//   tranLateTime(firstTime,lastTime){
//      this.setTime(firstTime);
//      this.setTime(lastTime);
//   }
  setTime(mytime){
      var myFullYear=mytime.getFullYear();
      var myMonth=mytime.getMonth() + 1;
      var myDate=mytime.getDate();
      var myHours=mytime.getHours();
      var myMinutes=mytime.getMinutes();
      var mySeconds=mytime.getSeconds();
      if(myMonth<10){
          myMonth='0'+myMonth;
      }
      if(myDate<10){
          myDate='0'+myDate;
      }
      if(myHours<10){
          myHours='0'+myHours;
      }
      if(myMinutes<10){
          myMinutes='0'+myMinutes;
      }
      if(mySeconds<10){
          mySeconds='0'+mySeconds;
      }
    //   debugger;
      var myEndData=myFullYear+ '-' + myMonth + '-' + myDate + ' ' + myHours + ':' + myMinutes + ':' + mySeconds;
      return myEndData;
  }
  //详情页面
  carDetail(d,name){
      this.dataDetail=[];
      this.myloading=true;
      this.myNewSearch.param[0].hphm=d.hphm;
      this.myNewSearch.param[0].hpzl=d.hpzl;
      this.totalSearch={
              gckssj:this.myNewSearch.param[0].beginDate,
              gcjssj:this.myNewSearch.param[0].endDate,
              hphm:d.hphm,
              hpzl:d.hpzl,
              license:d.hphm,
              licenseType:d.hpzl,
              minutes:'5',
              times:'',
              fxkssj:'',
              fxjssj:'',
              cxcs:''
     }
     this.totalSearch=$.extend({},this.paginationDetail,this.totalSearch);
      if(name=='peer'){
         this.isModalShow_peerDetail=true;
         this.searchUrl='analysis/api/analysis/peer/detail';    
      }else if(name=='frequent'){
         this.searchUrl='analysis/api/analysis/regional/touch/detail';
         this.isModalShow_detail=true;
         this.isModalShow_frequent=true;
      }else if(name=='trackSearch'){
         this.isModalShow_detail=true;
         this.searchUrl='analysis/api/analysis/track/get';
         this.totalSearch=this.myNewSearch;
      }
      this.carName=d.hphm;
      this.carSearchDetail();
  }
  carSearchDetail(){
      this.TrackSearchService.newGetDetail(this.totalSearch,this.searchUrl).subscribe(data => { 
            if(data.resultCode!=0){
                this.msg.create('error', data.resultMsg);
                this.myloading=false;
                return;
            }else{
                this.dataDetail=data.rows;
                this.dataDetailnums=data.total;
                this.myloading=false;
            }
      });
  }
  //详情里面的查询
  detailSearch(){
        this.myloading=true;
        this.carSearchDetail();
  }
  //页面跳转
  detailIndexChange(e,type){
     this.totalSearch.pageIndex=e;
     this.carSearchDetail();
  }
  //单个详情
  showDetailOne(car){
      this.isModalShow_detailOne=true;
      this.TrackSearchService.detailByOne({"hphm":car.hphm,"hpzl":car.hpzl,"gcsj":car.gcsj}).subscribe(data => { 
            this.dataOne=data.rowData;
            this.errorImg();
     });
  }
  private ifAll(e){
      if(e==true){
          this.totalSearch.isAll='1';
      }else{
          this.totalSearch.isAll='0';
      }
      this.carSearchDetail();
  }
  detailCancel(){
      this.isModalShow_detail=false;
      this.isModalShow_peerDetail=false;
      this.isModalShow_detailOne=false;
  }
   //下面是最新版轨迹查询的数据
   myTime:any;
   searchUrl:any;
   typeNames:any;
   carName:any;
   totalSearch:any={
       
   }
   myNewSearch:any={
       param:[],
       pageSize:10,
       pageIndex:1
   }
    //   _dateRange = [new Date(), new Date(Date.now() + 3600 * 24 * 5 * 1000)];
//    _dateRange = ['2017-11-02 14:42:24', '2017-11-22 14:42:30'];
   newSearch:any={
         hphm:'',
         beginDate:'2017-11-02 14:42:24',
         endDate:'2017-11-22 14:42:30',
         kkbh:'',
         hpzl:''
   }
   selectDay(num){
        this._dateRange = [new Date(),new Date(Date.now() + 3600 * 24  * 1000* num)]; 
   }
    //保存子组件返回的卡口数据
    private getKkou(e){
        if(e.kkListBh!=undefined&&e.kkList!=undefined){
            console.log(e.kkListBh.join(","));
            this.newSearch.gateIds=e.kkListBh.join(",");
            this.newSearch.kkmc=e.kkList;
        }
        
    }
    carType(typeName){
       if(typeName!=undefined){
           this.firstTime(typeName);
       }      
    }
    //首次出现
    firstTime(typeName){
         this.firstSearch = {
                ksfxsj:this.newSearch.beginDate,
                jsfxsj:this.newSearch.endDate,
                fxfw:this.newSearch.gateIds,
                hssj:'5'
          };
         this.loading=true;
         this.TrackSearchService.getFirstList(this.firstSearch).subscribe(data => { 
            if(data.resultCode!=0){
                this.msg.create('error', data.resultMsg);
                this.loading=false;
                return;
            }else{
                this.data=data.rows;
                this.datanums=data.total;
                this.typeNames=typeName;
                this.loading=false;
            }
            console.log(data);    
        });
    }
    //过车查询
    searchList(){
        this.loading=true;
        this.myNewSearch.param=[];
        console.log(this._dateRange);
        // this.newSearch.beginDate=this.setTime(this._dateRange[0]);
        // this.newSearch.endDate=this.setTime(this._dateRange[1]);
        this.newSearch.beginDate="2017-11-02 14:42:24";
        this.newSearch.endDate='2017-11-22 14:42:30';
        // this.myNewSearch=$.extend({},this.pagination);  
        this.myNewSearch.param.push(this.newSearch);
        this.TrackSearchService.newGetData(this.myNewSearch).subscribe(data => { 
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
  // region: cateogry
  categories = [
        { id: 0, text: '全部', value: false },
        { id: 1, text: '长沙', value: false },
        { id: 2, text: '株州', value: false },
        { id: 3, text: '衡阳', value: false },
        { id: 4, text: '张家界', value: false },
        { id: 5, text: '郴州', value: false },
        { id: 6, text: '怀化', value: false },
        { id: 7, text: '湘西州', value: false }
    ];
    changeCategory(status: boolean, idx: number) {
        if (idx === 0) {
            this.categories.map(i => i.value = status);
        } else {
            this.categories[idx].value = status;
        }
        // this.getData();
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
    this.myNewSearch.pageIndex=e;
    this.searchList();
    // this.search.pageIndex=e;
    // this.searchLists(this.search);
 }

}
