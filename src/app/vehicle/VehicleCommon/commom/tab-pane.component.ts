import { Component, Input,Output, OnInit,EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { NzModalService } from 'ng-zorro-antd';
import { NzModalSubject } from 'ng-zorro-antd';
import { CommonService } from '../commom.service';
import { Http} from '@angular/http';
declare var $: any;
@Component({ 
    selector: 'my-tab',
    templateUrl: './tab-pane.component.html',
    styleUrls: ['./tab-pane.component.css'],
    providers:[DatePipe]
})
export class TabpaneComponent {
    private search: any;//保存添加数据
    private search2: any;//保存修改后的数据
    private searchValid: any;//验证数据
    private list: any[] = [];//保存查询条件的数组
    private isModalShow:any=false;//点击弹出条件填写框
    private indexNum:any;//判断修改list数组里面的第几个
    private numOne = false;//区分是添加还是修改
    private _num:any;
    private _hasSelectList:any;
    private searchL: any={};
    private areaList: any={};
    private pagination: any={};
    private paginationArea: any={};
    private peerTimes:any=[
                {"dmz": "5", "dmsm1": "5"},
                {"dmz": "10", "dmsm1": "10"},
                {"dmz": "15", "dmsm1": "15"},
                {"dmz": "20", "dmsm1": "20"},
                {"dmz": "25", "dmsm1": "25"},
                {"dmz": "30", "dmsm1": "30"}
            ];
    constructor(
        private modalService: NzModalService,
        private subject: NzModalSubject,
        private fequentService: CommonService,
        private DatePipe: DatePipe,
        public msg: NzMessageService
        ) {
            
             this.search = {
                kssj:'2016-08-01 14:42:24',
                jssj:'2016-08-10 14:42:30',
                hphm:'湘A5351N',
                hpzl:'',
                times:'',
                fxkssj:'05:00',
                fxjssj:'18:00',
                cxcs:'',
                kkmc:'',
                hssj:'',
                cxfs:''
             };
             this.areaList={
                regionalparam:''
             }
             this.search2={
               
             };
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

           //初始化数据，默认开始存在两个区域
        if(this.VehicleType=='area'){
            for(let i=0;i<2;i++){
                this.addMessage(2);
            }
        }      
    }
  @Output() selectListBack = new EventEmitter<any>();
  @Input()
    private VehicleType:any;
  @Input()
	private typeName:any;
  private carDetail(num) {
      this.indexNum=num; 
      this.isModalShow=true;              
      if(num!=undefined){
          this.numOne=true;
          //this.search2=this.list[num];//这里不可以使用赋值的方式，不然会造成覆盖原数组
          this.search2=$.extend({},this.list[num]);
      }else{  
         this.search = {
                kssj:'2016-08-01 14:42:24',
                jssj:'2016-08-10 14:42:30',
                hphm:'湘A5351N',
                hpzl:'',
                times:'',
                fxkssj:'05:00',
                fxjssj:'18:00',
                cxcs:'',
                kkmc:'',
                hssj:'',
                cxfs:''
             };      
        //  this.search.kkmc='';
        //  this.search.hpzl='';
        //  this.search.cxcs='';
        //  var newDate = new Date();
        //  var newDate1=(newDate.getTime()-3*24*3600*1000);
        //  var oneweekdate = new Date(newDate1);
        //  this.search.ksrq=this.DatePipe.transform(oneweekdate,'y-MM-dd HH:mm:ss');
        //  this.search.jsrq=this.DatePipe.transform(new Date(),'y-MM-dd HH:mm:ss');
         this.numOne=false;
      }
  }
  //保存修改信息
private onSave(){
      this.list[this.indexNum]=this.search2;
      if(this.typeName=='searchOne'){
           this.areaList=$.extend({},this.list[0]);
       }else{
           this.areaList.regionalparam=this.list; 
      }
    //   this.areaList=$.extend({},this.list[0]);
      this.selectListBack.emit(this.areaList);
      this.isModalShow=false;
 }
private handleCancel(e){
      this.isModalShow=false;
    //   console.log(this.list);
  }
 //删除条件
 private delete(num){
   this.list.splice(num,1);
 }
  //添加查询条件
 private addMessage(k){ 
    //  if(){

    //  }   
        this.searchValid={
             "开始时间":{
                         type:'search,area,peer,first,frequent',
                         name:this.search.kssj
                       },
             "结束时间":{
                         type:'search,area,peer,first,frequent',
                         name:this.search.jssj
                       },
             "号牌号码":{
                         type:'search,area,peer',
                         name:this.search.hphm
                       },
             "号牌种类":{
                         type:'search,area,peer,frequent',
                         name:this.search.hpzl
                       },
             "开始时段":{
                         type:'frequent',
                         name:this.search.fxkssj
                       },
             "结束时段":{
                         type:'frequent',
                         name:this.search.fxjssj
                       },
             "卡口名称":{
                         type:'search,area,peer,first,frequent',
                         name:this.search.kkmc
                       },
             "回溯天数":{
                         type:'first',
                         name:this.search.hssj
                       },
             "查询方式":{
                         type:'search',
                         name:this.search.cxfs
                       }
        }
        if(k!==2){
            for(let i in this.searchValid){
                // alert(this.searchValid[i].type);
                if(this.searchValid[i].type.indexOf(this.VehicleType)>0){
                    if(this.searchValid[i].name==''||this.searchValid[i].name==undefined){
                            this.msg.create('error', i+'不能为空');
                            return;
                    }
                };
            }
        }
        
        this.searchL=$.extend({},this.search);  
        this.list.push(this.searchL);
        if(this.typeName=='searchOne'){
           this.areaList=$.extend({},this.list[0]);
        }else{
           this.areaList.regionalparam=this.list; 
        }
        if(k!==2){
            this.selectListBack.emit(this.areaList);
            this.isModalShow=false;
         }
        
   }
//保存子组件返回的卡口数据
private getKkou(e){
        if(e.kkListBh!=undefined&&e.kkList!=undefined){
            console.log(e.kkListBh.join(","));
            this.search.fxfw=e.kkListBh.join(",");
            this.search.kkmc=e.kkList;
            this.search2.fxfw=e.kkListBh.join(",");
            this.search2.kkmc=e.kkList;
        }
        
    }
 }
