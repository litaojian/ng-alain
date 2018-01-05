import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { NzModalService } from 'ng-zorro-antd';
import { RegionalService } from '../regional.service';
import { Http} from '@angular/http';
@Component({ 
    selector: 'app-acl',
    templateUrl: './regional.component.html',
    styleUrls: ['./regional.component.css'],
    providers:[DatePipe]
})
export class RegionalComponent {
    loading = false;  
    loadings = false; 
    ifMoreSearch=false; 
    numOne = false; 
    Url=false; 
    data: any[] = [];
    list: any[] = [];
    search: any;
    search1: any;
    search2: any;
    indexNum:any;
    data_total:any;
    searchL: any={};
    newDate: any;
    username: any=1;
    isModalShow:any=false;
    isModalShow1:any=false;
    oneweekdate: any;
    countyList: any;
    kkList: any;
    currentModal;
    constructor(
        private modalService: NzModalService,
        private RegionalService: RegionalService,
        private DatePipe: DatePipe,
        public msg: NzMessageService
        ) {
           
            this.search = {
                hphm:'粤H86F81',
                xzqh:'440000',
                qx:''
             };
             this.search2={
               
             };
             this.search1={
                _limit:8,
                _page:1
          }
        }
    ngOnInit() {
           var newDate = new Date();
           var newDate1=(newDate.getTime()-3*24*3600*1000);
           var oneweekdate = new Date(newDate1);
           this.search.gcsj_gt=this.DatePipe.transform(oneweekdate,'y-MM-dd HH:mm:ss');
           this.search.gcsj_lte=this.DatePipe.transform(new Date(),'y-MM-dd HH:mm:ss');
           this.seachCounty(this.search.xzqh);
           this.seachKK(this.search.qx);
    }
  isVisible = false;
  isVisibleSave = false;
  putOut = () => {
    this.isModalShow=true;
  }
  addMessage(){
        this.searchL= {
                    gcsj_gt:this.search.gcsj_gt,
                    gcsj_lte:this.search.gcsj_lte,
                    xzqh: this.search.xzqh,
                    hphm: this.search.hphm,
                    qx:this.search.qx,
                    kkmc:this.search.kkmc
                };
        this.seachCounty(this.search.xzqh);
        this.seachKK(this.search.qx);
        this.list.push(this.searchL);
        this.isModalShow=false;
        // console.log(this.list);
 }
 onConcel(){
      this.isModalShow=false; 
 }
 onSave(){
      this.list[this.indexNum]=this.search2;
      this.isModalShow=false;
 }
 delete(num){
    this.list.splice(num,1);
  }
 //接收表格组件返回来的数组
getTabelList(e){
    this.data=e[0];
    console.log(this.data);
    this.loadings=false;
    this.Url=e[1];
}
  getSearchData(num) {   
        this.loadings=true;
        this.Url=true;     
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
  hasChange(e){
    this.isModalShow=e;
  }
  //根据行政区划 查询区县
  seachCounty(xzqh){
    this.RegionalService.getCounty(xzqh).subscribe(res => {
             this.countyList = res.rows;
    });
  }
 //根据区县 查询卡口
  seachKK(qx){
        this.RegionalService.getKkList(qx).subscribe(res =>{
          this.kkList = res.rows;
        });
  }
  // showMoreSearch(){
  //    this.ifMoreSearch=false;
  // } 
 }
