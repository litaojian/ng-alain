import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { Router, NavigationExtras,ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { TrackSearchService } from '../trackSearch.service';
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
    datanums:any;
    type:any;
    showSearch= true;
    _value: any[] = null;
    loading = false;  
    data: any[] = [];
    dataOne: any[] = [];//点击列表接收弹出框数据
    list: any[] = [];//保存过车信息数据
    search: any;
    search2: any;
    searchL:any;
    searchtest:any;
    Url=false;
    putout: any;
    numOne:any;
    indexNum:any;
    countyList: any;
    kkList: any;
    currentModal;
    dcList:any=[{"dmz": "01", "dmsm1": "数据列表"},{"dmz": "26", "dmsm1": "过车图片"}];
    constructor(
        private modalService: NzModalService,
        private DatePipe: DatePipe,
        private TrackSearchService: TrackSearchService,
        public msg: NzMessageService,
        public activeRoute: ActivatedRoute,
        public router: Router
        ) {
        this.search = {
                clpp:'',
                hphm:'',
                csysmc:'',
                gcsj_gt:'',
                gcsj_lte:'',
                kkmc:'',
                hpzl:'',
                qx:'',
                types:'',
                _limit:5,
                _page:1
             };
          this.putout={
              dcnr:'',
              dcsl:''
          }
          this.search2={
               
             };
          this.searchtest={
                _limit:8,
                _page:1
          }
        
        }

  ngOnInit() {      
          //接收传递的值
          this.activeRoute.queryParams.subscribe(params => {
            //   this.searchtest.hphm = params['hphm'];
              if(params['hphm']!=undefined){
                // this.searchtest.hphm = params['hphm'];
                this.searchList();
              }else{
                // this.searchtest.hphm = '';
              }
            
          }); 
           var newDate = new Date();
           var newDate1=(newDate.getTime()-3*24*3600*1000);
           var oneweekdate = new Date(newDate1);
           this.search.gcsj_gt=this.DatePipe.transform(oneweekdate,'y-MM-dd HH:mm:ss');
           this.search.gcsj_lte=this.DatePipe.transform(new Date(),'y-MM-dd HH:mm:ss');
           this.seachCounty(this.search.xzqh);
           this.seachKK(this.search.qx);
    }
  isVisible = false;
  putOut = () => {
    this.isModalShow_put = true;
  }
  handleCancel = () => {
    this.isVisible = false;
  }
   //选择上周下周
  // showTimeData(e){
  //       this.search.gcsj_gt=e[0];
  //       this.search.gcsj_lte=e[1];
     
  // }
//接收子组件传回来的值,是否显示对话框
hasChange(e){
  this.isModalShow_put=e;
  this.isModalShow=e;
}
//接收表格组件返回来的数组
getTabelList(e){
    this.data=e[0];
    console.log(this.data);
    this.loading=false;
    this.Url=e[1];
}
addMessage(){
    this.searchL= {
                gcsj_gt:this.search.gcsj_gt,
                gcsj_lte:this.search.gcsj_lte,
                xzqh: this.search.xzqh,
                qx:this.search.qx,
                kkmc:this.search.kkmc,
                hphm:this.search.hphm,
                hpzl:this.search.hpzl,
                types:this.search.types
            };
    this.list.push(this.searchL);
    console.log(this.list);
    this.isModalShow=false;
 }
delete(num){
    this.list.splice(num,1);
}
searchList(){
        this.Url=true;
        this.loading=true;
        // console.log(this.searchtest);
    //     this.TrackSearchService.getTrackSearch({}).then(data => {  
    //        this.expandForm=true; 
    //        this.ifMoreSearch=true;
    //        this.loading=false;    
    //        this.data=data.rows;
    //        this.search._page=data.pagination.page;
    //        this.datanums=data.total;
    // });
}
onConcel(){
    this.isModalShow=false; 
}
onSave(){
      this.list[this.indexNum]=this.search2;
      this.isModalShow=false;
 }
//根据行政区划 查询区县
  seachCounty(xzqh){
        this.TrackSearchService.getCounty(xzqh).subscribe(res =>{
        this.countyList = res.rows;
    })
  }
 //根据区县 查询卡口
  seachKK(qx){
        this.TrackSearchService.getKkList(qx).subscribe(res =>{
          this.kkList = res.rows;
        });
  }
  showMoreSearch(){
     this.ifMoreSearch=false;
  }

 carDetail(num) {
      this.indexNum=num; 
      this.isModalShow=true;     
      if(num!=undefined){
          this.numOne=true;
          this.search2=this.list[num];
          this.seachCounty(this.search.xzqh);
          this.seachKK(this.search.qx);
      }else{        
         this.search.xzqh='440000';
         this.countyList='';
         this.kkList='';
         var newDate = new Date();
         var newDate1=(newDate.getTime()-3*24*3600*1000);
         var oneweekdate = new Date(newDate1);
         this.search.gcsj_gt=this.DatePipe.transform(oneweekdate,'y-MM-dd HH:mm:ss');
         this.search.gcsj_lte=this.DatePipe.transform(new Date(),'y-MM-dd HH:mm:ss');
         this.seachCounty(this.search.xzqh);
         this.seachKK(this.search.qx);
         this.numOne=false;
      }
  }
  carDetailMore(titleTpl, contentTpl, footerTpl,width,fxbh) {
      this.TrackSearchService.getTrackSearch({'fxbh':fxbh}).subscribe(data =>{
           this.dataOne=data.rows[0];
        });
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
