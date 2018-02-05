import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router, NavigationExtras,ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { VisualService } from './visual.service';

declare let echarts:any;
declare let $:any;
declare let CountUp:any;
@Component({
  selector: 'app-visual-index',
  templateUrl: './visual-index.component.html',
  styleUrls: ['./visual-index.component.css','./visual-all.css'],
  providers:[DatePipe]
})
export class VisualIndexComponent implements OnInit {

  radarCharts: any; //车辆布控情况
  warningCharts: any;//全省预警数
  otherProvinceCharts: any;//全省卡口接入数
  carPassCharts:any; //广东省各地市过车次数
  gdMap:any;//过车热力图
  userCarCharts:any; //重点人员车辆数
  alarmCarCharts:any; //重点人员车辆预警趋势

  radarList:Array<any> = [];

  days = []; //选中月的天数
  year :any; //选中的年份
  mon :any; //选择的月份
  day : any; //选中第几天

  showBkdl:boolean = false; //显示布控类别开关
  switch:any =
  {
    showBkdl : false,
    showCover :false,
    carDetail : false
  };
  //车辆档案总数
  vehicleList:any = {
    total:0,
    province:0,
    outside: 0
  }
  //布控大类统计数
  bkdlDetail:any = {
    total: 0,
    gkl: 0,
    jtwf: 0,
    ljl: 0
  }

  countObj:any; //存储滚动数字对象

  alarmCarList:any = [];   //预警车辆信息list
  alarmCarDetial:any = {}; //点击预警信息存储的预警详情

  alarmCarTrend:any = {};//重点人员预警趋势数据

  importantCarNum = [];   //重点人群车辆数

  warningList:any = {}; //全省布控预警数
  carPassList:any = {}; //当日前日过车环比数据

  carPassTotal:number; //当日过车数

  monitorList = []; //各省布控总数
  mapData:object = {}; //中间热力图数据

  headMapLoadding = false;  //热力图加载数据状态

  PatternImg:any = new Image(); //柱形图图片

  accessRate:any = {online:0,per:"0",total:0}; //全省接入率

  constructor(
    private visualService:VisualService,
    private DatePipe:DatePipe,
    private actionRouter:ActivatedRoute,
    private router:Router,
    private title:Title
    ) {
      // this.PatternImg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAF+CAMAAADz+WkdAAAAY1BMVEUAAAA00Lw92bE41LdD36lJ5aJV8JRb9Y1N6Z1R7ZhY85BZ9I8207kyz75b9o000bw51bZX8pJV8JRA3K1N6Z1Q7JlL56BT7pdC3qs717NE4Kg82LI+2rBG4aZI46RJ5aJP6pvNrsJWAAAAC3RSTlMA5+fn5+fn5+fn5wyCdZUAAAFNSURBVHja7dLrboJQEEXhkZuKqK2giNe+/1O2L9BkVtJjD+P++L1CBrYtd4ztAgT4aHHQlrSlP7PcMLYJEOCjxaPN70+nD1pt6cf/b+kTyjFoaSAeTX5/On3QaEspNAfGDgECfLRksqWRPS94QzMyJh7rkbExQLDWllJYHxk7Bgjw0TLTLX1BPFjRQDxWA2NDgAAfLTPd0gmy08AeW9E3RFDjzxogqN/xT6dXPxl7Bgjw0eJRPxh7BAjw0eJR3xm7BwgqGohHdWHsEiDAR0uSLZ2hHIOKBuJRJf9xPWTnnj38DRUNxKPoGesDBIW2lEJxY+wWIMBHi0dxZewaIMBHi0cxMTYFCPDR4lFOjH1AOQYlDcSjzO9Pa0szVXaMdQECfLRoS78EC20phcWesT0OOvYYfwPEj5ZMtpRfoC0lsdgytg0Q4KNFW9KWXugb9rK+ibjhjhMAAAAASUVORK5CYII=';
      this.PatternImg.src = 'data:image/png;base64,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';
      // this.PatternImg.src = './assets/images/bar.png';
    }

  skipPage(){
    this.router.navigate(['/visual/sort']);
  }

  //修改年份触发方法
   changeYear(val){
        this.year = new Date(val).getFullYear();
   }
   //修改月份触发方法
   changeMonth(val){
        this.mon = new Date(val).getMonth()+1;
        var date:number = new Date(this.year,this.mon,0).getDate();
        if(this.mon<10){
            this.mon = "0"+this.mon;
        }
        this.days = [];
        for(var i:number=0;i<date;i++){
          this.days.push(i);
        }
   }

   //选择日期触发方法
   search(day){
      let date = new Date(this.year+"-"+this.mon+"-"+day);
      let now = new Date();
      if(date>now){
          alert("选择日期不能大于当前日期");
          return ;
      }
      this.day = day;
      if(this.day<10){
          this.day = "0" + day;
      }
      var params = {time:this.year+"-"+this.mon+"-"+day};
      this.changeData(params.time); //替换数据
      // alert(params.time)
   }

   //查询布控车辆详情
   showCarDetail(data){
      this.alarmCarDetial = data;
      this.switch.carDetail = true;
      this.switch.showCover = true;
   }

   ngAfterViewInit() {
      setInterval(() => {
        var showDate = this.year + '-' + this.mon + '-' + this.day;
        //获取当日过车次数
        this.visualService.getCarCount(showDate).subscribe(res =>{
            if(res.resultCode == 1){
                alert(res.resultMsg);
                return;
            }
            this.countObj.update(res.total);
        })
      }, 5000);
      $("<script>").attr({ src: "assets/lib/zui/js/zui.js" }).appendTo("head");
   }

  ngOnInit() {
    // $("<link>").attr({ rel: "stylesheet", type: "text/css", href: "assets/lib/zui/css/zui.css" }).appendTo("head");
      //获取车档信息
      this.visualService.getArchiveCount().subscribe(data => {
          this.vehicleList.total = data.rowData.total;
          this.vehicleList.province = data.rowData.province;
          this.vehicleList.outside = data.rowData.outside;
      });
      this.title.setTitle("汇总展示");
      this.mon = new Date().getMonth()+1; //获取当前月
      this.year = new Date().getFullYear();  //获取当前年
      if(new Date().getDate()<10){
        this.day = "0"+new Date().getDate();
      }else{
        this.day = new Date().getDate();
      }
      var date:number = new Date(this.year,this.mon,0).getDate(); //获取当月天数
      if(this.mon<10){
          this.mon = "0"+this.mon;
      }
      for(var i:number=0;i<date;i++){
        this.days.push(i);
      }
      var showDate = this.year + '-' + this.mon + '-' + this.day;
      this.getDoms(); //获取dom，存储于全局属性
      this.changeData(showDate); //根据时间 获取各图表数据
      // this.changeData('2017-11-20');
    }

    //获取各需要展示图标的dom
    getDoms(){
      //雷达图(车辆布控情况)
    //   this.radarCharts = echarts.init(<HTMLCanvasElement>document.getElementById("radar"));
      //全省预警数柱状图
      this.warningCharts = echarts.init(<HTMLCanvasElement>document.getElementById("warningCar"));
      //全省卡口接入数
      this.otherProvinceCharts = echarts.init(<HTMLCanvasElement>document.getElementById("carRank"));
      //广东省各地市过车次数
    //   this.carPassCharts = echarts.init(<HTMLCanvasElement>document.getElementById("carPssList"));
      //中央地图
    //   this.gdMap = echarts.init(<HTMLCanvasElement>document.getElementById("map"));
      //重点人员车辆数
      this.userCarCharts = echarts.init(<HTMLCanvasElement>document.getElementById("userCar"));
      //重点人员车辆趋势
      this.alarmCarCharts = echarts.init(<HTMLCanvasElement>document.getElementById("alarmCar"));
    }

    btn:any = {first:true,second:false};
    changeBtn(num,check){
      let mapDataType = "getPassHotMap";
      let showDate = this.year+"-"+this.mon+"-"+this.day;
      if(num == 1){
          if(check){
            this.btn.second = false;
            mapDataType = "getPassHotMap";
          }
      }else{
          if(check){
            this.btn.first = false;
            mapDataType = "getAlarmHotMap";
          }
      }
      this.getHotMap(mapDataType,showDate);
    }

    //根据日期修改显示数据 格式:yyyy-MM-dd
    changeData(showDate){
         //获取预警信息
        this.visualService.getAlarmRealtime().subscribe(res =>{
              this.alarmCarList = res.rows;
        });
        //获取当日过车次数
        this.visualService.getCarCount(showDate).subscribe(res =>{
            if(res.resultCode == 1){
                alert(res.resultMsg);
                return;
            }
            if(this.carPassTotal){
                  this.countObj.update(res.total);
            }else{
              this.countObj = new CountUp("count", 0, res.total);
              if (!this.countObj.error) {
                  this.countObj.start();
              } else {
                console.error(this.countObj.error);
              }
            }
            this.carPassTotal = res.total;
        })
        //雷达图(车辆布控情况)
        this.visualService.getBkdlCount(showDate).subscribe(res =>{
            let bkList = [];
            this.bkdlDetail = {
              total: 0,
              gkl: 0,
              jtwf: 0,
              ljl: 0
            };
            this.bkdlDetail.total = res.total;
            res.rows.forEach(el => {
                if(el.bkdl == 1){
                    this.bkdlDetail.ljl = el.bkcs;
                }else if(el.bkdl == 2){
                    this.bkdlDetail.jtwf = el.bkcs;
                }else{
                    this.bkdlDetail.gkl = el.bkcs;
                }
                bkList.push({name:el.bkdlmc,value:el.bkcs});
            });
            this.radarList = bkList;
            // this.radarOption.series[0].data = bkList;
            // this.radarCharts.setOption(this.radarOption);
            // window.onresize = this.radarCharts.resize;
        });

        //各地市过车次数
        this.visualService.getCarContrast(showDate).subscribe(res=>{
              if(res.rows.length>0){
                  let city =[];
                  let qt =[]; //前天过车数
                  let dt = []; //当天过车数
                  res.rows.forEach(el => {
                    city.push(el.citymc.substr(0,2));
                    qt.push(el.qtgcs);
                    dt.push(el.dtgcs);
                  });
                  this.carPassList ={
                      'city':city,
                      'qt':qt,
                      'dt':dt
                  };
                //   this.carPassOption.xAxis[0].data = city;  //地市
                //   this.carPassOption.series[0].data = qt; //前天
                //   this.carPassOption.series[1].data = dt; //当天
                //   this.carPassCharts.setOption(this.carPassOption);
              }
        });

        //中央地图
        let mapDataType  = "";
        if(this.btn.first){
          mapDataType = "getPassHotMap";
        }else{
          mapDataType = "getAlarmHotMap";
        }
        this.getHotMap(mapDataType,showDate);
        //重点人群车辆数
        this.visualService.getImportantCar(showDate).subscribe(res=>{
            let data = [];
            res.rows.forEach(el => {
              data.push({name:el.bklbmc,value:el.total});
            });
            this.importantCarNum = data;
            // this.userCarOption.series[0].data = data;
            // this.userCarCharts.setOption(this.userCarOption);
        });
        //重点人群车辆预警趋势
        this.visualService.getImportantAlarm(showDate).subscribe(res =>{
            let sd = [];
            let sw = [];
            let sj = [];
            let total = [];
            let date = [];
            for(let i=0;i<res.totallist.length;i++){
                sd.push(res.sd[i].total);
                sw.push(res.sw[i].total);
                sj.push(res.sj[i].total);
                total.push(res.totallist[i].total);
                date.push(res.datelist[i].anly_date);
            };
            this.alarmCarTrend = {
                    'date':date,
                    'sd':sd,
                    'sj':sj,
                    'sw':sw,
                    'total':total
            };
            // this.alarmCarCharts.setOption(this.alarmCarOption);
        });
        //全省布控预警数(最近7天)
        this.visualService.getAlarmVehicle(showDate).subscribe(res =>{
            let gkl = [];
            let jtwfl = [];
            let ljl = [];
            let date = [];
            for(let i=0;i<res.datelist.length;i++){
               gkl.push(res.gkl[i].total);
               jtwfl.push(res.jtwfl[i].total);
               ljl.push(res.ljl[i].total);
               date.push(res.datelist[i].anly_date);
            };
            this.warningList= {
                'date' : date,
                'jtwfl' : jtwfl,
                'gkl' : gkl,
                'ljl' : ljl
            };
            // this.warningCharts.setOption(this.warningOption);
        });
        //全省卡口在线率
        this.visualService.getOnlinePercent(showDate).subscribe(res =>{
            if(res.resultCode == 1){
                alert(res.resultMsg);
                this.accessRate ={online:0,per:"0",total:0};
                return ;
            };
            this.accessRate = res.row;
            // this.carRankOption.series[0].data =[+res.row.per];
            // this.otherProvinceCharts.setOption(this.carRankOption);
        });
    }

    //获取中间热力图数据，mapDataType是请求接口的name，showDate是查询时间
    getHotMap(mapDataType,showDate){
      let opt = {
        text: '加载中....',
        color: '#fff',
        textColor: '#fff',
        maskColor: 'rgba(255, 255, 255, 0.0)',
        zlevel: 110
      };
    //   this.gdMap.showLoading(opt);
      this.headMapLoadding = true;
      this.visualService[mapDataType](showDate).subscribe(res =>{
				  // this.gdMap.hideLoading();
					this.headMapLoadding = false;
          let mapData:any = {color:'#0b2687'};
          //判断都不选显示数据时的操作
          if(!this.btn.first && !this.btn.second){
            //   this.mapOption.series[1].data = [];
              mapData.data = [];
          }else{
              res.rows[1].forEach(element => {
                res.rows[0].push(element);
              });
              res.rows[2].forEach(el =>{
                  res.rows[0].push(el);
              });
            //   if(res.rows[0].length > 2000){
            //       this.mapOption.geo.itemStyle.emphasis.areaColor = 'rgba(0,0,0,0)';
            //   }else{
            //       this.mapOption.geo.itemStyle.emphasis.areaColor ='#0b2687';
            //   }
                // if(res.rows[0].length > 2000){
                //     mapData.color = 'rgba(0,0,0,0)';
                // }
            //   this.mapOption.series[1].data = res.rows[0]; //强
              mapData.data = res.rows[0];
              // this.mapOption.series[1].data = []; //中
              // this.mapOption.series[2].data = []; //弱
          }
          //替换地市数据
          let rows = []; //存储地市过车数据等
          res.totals.forEach(el => {
            el.name = el.citymc.substr(0,2);
            el.value = el.kkzs;
            rows.push(el);
          });
          mapData.city = rows;
          this.mapData = mapData;
        //   this.mapOption.series[0].data = rows;
        //   this.gdMap.setOption(this.mapOption);
      });

  }

}
