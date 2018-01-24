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

  carPassTotal:number; //当日过车数

  monitorList = []; //各省布控总数

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

   }

  ngOnInit() {
    $("<link>").attr({ rel: "stylesheet", type: "text/css", href: "assets/lib/zui/css/zui.css" }).appendTo("head");
    $("<script>").attr({ src: "assets/lib/zui/js/zui.js" }).appendTo("head");
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
      this.radarCharts = echarts.init(<HTMLCanvasElement>document.getElementById("radar"));
      //全省预警数柱状图
      this.warningCharts = echarts.init(<HTMLCanvasElement>document.getElementById("warningCar"));
      //全省卡口接入数
      this.otherProvinceCharts = echarts.init(<HTMLCanvasElement>document.getElementById("carRank"));
      //广东省各地市过车次数
      this.carPassCharts = echarts.init(<HTMLCanvasElement>document.getElementById("carPssList"));
      //中央地图
      this.gdMap = echarts.init(<HTMLCanvasElement>document.getElementById("map"));
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
            this.radarOption.series[0].data = bkList;
            this.radarCharts.setOption(this.radarOption);
            window.onresize = this.radarCharts.resize;
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
                  this.carPassOption.xAxis[0].data = city;  //地市
                  this.carPassOption.series[0].data = qt; //前天
                  this.carPassOption.series[1].data = dt; //当天
                  this.carPassCharts.setOption(this.carPassOption);
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
            this.userCarOption.series[0].data = data;
            this.userCarCharts.setOption(this.userCarOption);
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
            this.alarmCarOption.xAxis[0].data = date;
            this.alarmCarOption.series[0].data = sd;
            this.alarmCarOption.series[1].data = sj;
            this.alarmCarOption.series[2].data = sw;
            this.alarmCarOption.series[3].data = total;
            this.alarmCarCharts.setOption(this.alarmCarOption);
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
            this.warningOption.xAxis[0].data = date;
            this.warningOption.series[0].data = jtwfl;
            this.warningOption.series[1].data = gkl;
            this.warningOption.series[2].data = ljl;
            this.warningCharts.setOption(this.warningOption);
        });
        //全省卡口在线率
        this.visualService.getOnlinePercent(showDate).subscribe(res =>{
            if(res.resultCode == 1){
                alert(res.resultMsg);
                this.accessRate ={online:0,per:"0",total:0};
                return ;
            };
            this.accessRate = res.row;
            this.carRankOption.series[0].data =[+res.row.per];
            this.otherProvinceCharts.setOption(this.carRankOption);
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
      this.gdMap.showLoading(opt);
      this.visualService[mapDataType](showDate).subscribe(res =>{
          this.gdMap.hideLoading();
          //判断都不选显示数据时的操作
          if(!this.btn.first && !this.btn.second){
              this.mapOption.series[1].data = [];
          }else{
              res.rows[1].forEach(element => {
                res.rows[0].push(element);
              });
              res.rows[2].forEach(el =>{
                  res.rows[0].push(el);
              });
              if(res.rows[0].length > 2000){
                  this.mapOption.geo.itemStyle.emphasis.areaColor = 'rgba(0,0,0,0)';
              }else{
                  this.mapOption.geo.itemStyle.emphasis.areaColor ='#0b2687';
              }
              this.mapOption.series[1].data = res.rows[0]; //强
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
          this.mapOption.series[0].data = rows;
          this.gdMap.setOption(this.mapOption);
      });

  }

    //扇形图
    radarOption:any = {
            backgroundColor: 'rgba(18, 81,111 ,0.2)',
            tooltip: {
                trigger: 'item',
                formatter: "{c} ({d}%)"
            },
            color:['#61d6e4','#6191e4', '#3d53f7', '#2a8aff', '#5aa5ff','#76cdfd'],
            legend: {
                show:false,


            },
            series: [
                {

                    type:'pie',
                    selectedMode: 'single',
                    radius: [0, '80%'],

                    label: {
                        normal: {
                            color:'#fff',
                            position: 'inner'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false,
                            lineStyle:{
                            color:'#ffffff'
                        }

                        }
                    },
                    color:['#2abfd1','#ff7373','#61a0a8'],
                    data:[]
                }
            ]
          };

      warningOption:any = {
          backgroundColor: 'rgba(0,0,0,0)',
          title: {
              textStyle: {
                  fontWeight: 'normal',
                  fontSize: 16,
                  color: '#F1F1F3'
              },
              left: '6%'
          },
          tooltip: {
              trigger: 'axis', //触发类型。[ default: 'item' ] :数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用;'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
              axisPointer: {
                  lineStyle: {
                      color: '#57617B'
                  }
              }
          },
          legend: {
              icon: 'rect', //设置图例的图形形状，circle为圆，rect为矩形
              itemWidth: 14, //图例标记的图形宽度[ default: 25 ]
              itemHeight: 5, //图例标记的图形高度。[ default: 14 ]
              itemGap: 13, //图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。[ default: 10 ]
              data: ['交通违法类', '管控类', '拦截类'],
              right: '4%', //图例组件离容器右侧的距离
              textStyle: {
                  fontSize: 12,
                  color: '#F1F1F3'
              }
          },
          grid: {
              left: '3%', //grid 组件离容器左侧的距离。
              right: '4%', //grid 组件离容器右侧的距离。
              bottom: '3%', //grid 组件离容器下侧的距离。
              containLabel: true //grid 区域是否包含坐标轴的刻度标签[ default: false ]
          },
          xAxis: [{
              type: 'category',
              boundaryGap: false, //坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样
              axisLine: {
                  lineStyle: {
                      color: '#fff' //坐标轴线线的颜色。
                  }
              },
              axisLabel:{
                  formatter: function (value, index) {
                      var date = new Date(value).getDate();
                      return date;
                  }
              },
              data: ['28','29','30','1','2', '3','4']
          }],
          yAxis: [{
              type: 'value', //坐标轴类型。'value' 数值轴，适用于连续数据;'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据;'time' 时间轴;'log' 对数轴.
              name: '单位', //坐标轴名称。
              axisTick: {
                  show: false //是否显示坐标轴刻度
              },
              axisLine: {
                  lineStyle: {
                      color: '#fff' //坐标轴线线的颜色
                  }
              },
              axisLabel: {
                  margin: 10, //刻度标签与轴线之间的距离
                  textStyle: {
                      fontSize: 14 //文字的字体大小
                  }
              },
              splitLine: {
                  lineStyle: {
                      color: '#57617B' //分隔线颜色设置
                  }
              }
          }],
          series: [{
              name: '交通违法类', //系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列
              type: 'line',
              smooth: false, //是否平滑曲线显示
              symbol: 'circle', //标记的图形。ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
              symbolSize: 5, //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10[ default: 4 ]
              showSymbol: false, //是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示
              lineStyle: { //线条样式
                  normal: {
                      width: 1 //线宽。[ default: 2 ]
                  }
              },
              areaStyle: { //区域填充样式
                  normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ //填充的颜色。
                          offset: 0, // 0% 处的颜色
                          color: 'rgba(255, 255, 0, 0.8)'
                      }, {
                          offset: 0.8, // 80% 处的颜色
                          color: 'rgba(255, 255, 0, 0.2)'
                      }], false),
                      shadowColor: 'rgba(0, 0, 0, 0.1)', //阴影颜色。支持的格式同color
                      shadowBlur: 10 //图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果
                  }
              },
              itemStyle: { //折线拐点标志的样式
                  normal: {
                      color: '#ffff00',
                      borderColor: 'rgba(137,189,2,0.27)', //图形的描边颜色。支持的格式同 color
                      borderWidth: 12 //描边线宽。为 0 时无描边。[ default: 0 ]

                  }
              },
              data: [220, 182, 191, 134, 150, 120, 110]
          }, {
              name: '管控类',
              type: 'line',
              smooth: false,
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                  normal: {
                      width: 1
                  }
              },
              areaStyle: {
                  normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0,
                          color: 'rgba(96, 252, 232, 0.8)'
                      }, {
                          offset: 0.8,
                          color: 'rgba(96, 252, 232, 0.2)'
                      }], false),
                      shadowColor: 'rgba(0, 0, 0, 0.1)',
                      shadowBlur: 10
                  }
              },
              itemStyle: {
                  normal: {
                      color: '#60fce8',
                      borderColor: 'rgba(0,136,212,0.2)',
                      borderWidth: 12

                  }
              },
              data: [211, 231, 224, 201, 242, 212, 223]
          }, {
              name: '拦截类',
              type: 'line',
              smooth: false,
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                  normal: {
                      width: 1
                  }
              },
              areaStyle: {
                  normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0,
                          color: 'rgba(247, 35, 0, 0.8)'
                      }, {
                          offset: 0.8,
                          color: 'rgba(247, 35, 0, 0.2)'
                      }], false),
                      shadowColor: 'rgba(0, 0, 0, 0.1)',
                      shadowBlur: 10
                  }
              },
              itemStyle: {
                  normal: {

                      color: '#f72300',
                      borderColor: 'rgba(219,50,51,0.2)',
                      borderWidth: 12
                  }
              },
              data: [120, 110, 125, 145, 122, 165, 122]
          }, ]
      }
      //各地市柱状图结束

      alarmCarOption:any ={
                "tooltip": {
                    "axisPointer": {
                        "type": "shadow",
                        textStyle: {
                            color: "#fff"
                        }

                    },
                    "trigger": "axis"
                },
                "grid": {
                    "borderWidth": 0,
                    "top": '25%',
                    "left": 60,
                    "right": 10,
                    "bottom": '15%',
                    textStyle: {
                        color: "#fff"
                    }
                },
                "legend": {
                    top: '2%',
                    textStyle: {
                        color: '#fff',
                    },
                    "data": ['涉稳', '涉毒', '涉疆', '总数']
                },


                "calculable": true,
                "xAxis": [{
                    "type": "category",
                    "axisLine": {
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    "splitLine": {
                        "show": false
                    },
                    "axisTick": {
                        "show": false
                    },
                    "splitArea": {
                        "show": false
                    },
                    "axisLabel":{
                        "interval": 0,
                        formatter: function (value, index) {
                            var date = new Date(value).getDate();
                            return date;
                        }
                    },
                    "data": ['28','29','30','1','2','3','4'],
                }],
                "yAxis": [{
                    "type": "value",
                    "splitLine": {
                        "show": false
                    },
                    "axisLine": {
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    "axisTick": {
                        "show": false
                    },
                    "axisLabel": {
                        "interval": 0,

                    },
                    "splitArea": {
                        "show": false
                    },

                }],

                "series": [ {
                        "name": "涉毒",
                        "type": "bar",
                        "stack": "总数",
                        "itemStyle": {
                            "normal": {
                                "color": "#ff1744",
                                "barBorderRadius": 0,
                                "label": {
                                    "show": false,
                                    "position": "top",
                                    formatter: function(p) {
                                        return p.value > 0 ? (p.value) : '';
                                    }
                                }
                            }
                        },
                        "data": ['46232','53937','61643','58728','66495','57790','64108']
                    },{
                        "name": "涉疆",
                        "type": "bar",
                        "stack": "总数",
                        "itemStyle": {
                            "normal": {
                                "color": "#ff6d00",
                                "barBorderRadius": 0,
                                "label": {
                                    "show": false,
                                    "position": "inside",
                                    formatter: function(p) {
                                        return p.value > 0 ? (p.value) : '';
                                    }
                                }
                            }
                        },
                        "data": ['10402','12135','13869','11053','14736','13002','13337']
                    },{
                        "name": "涉稳",
                        "type": "bar",
                        "stack": "总数",
                        "barMaxWidth": 25,
                        "barGap": "20%",
                        "itemStyle": {
                            "normal": {
                                "color": "#ffff00",
                                "label": {
                                    "show": false,
                                    "textStyle": {
                                        "color": "#fff"
                                    },
                                    "position": "insideTop",
                                    formatter: function(p) {
                                        return p.value > 0 ? (p.value) : '';
                                    }
                                }
                            }
                        },
                        "data": ['2304','2688','3072','2540','3264','2880','3840'],
                    },{
                        "name": "总数",
                        "type": "line",
                        "stack": "总数",
                        symbolSize:8,
                        symbol:'circle',
                        "itemStyle": {
                            "normal": {
                                "color": "#49fdfe",
                                "barBorderRadius": 0,
                                "label": {
                                    "show": false,
                                    "position": "top",
                                    formatter: function(p) {
                                        return p.value > 0 ? (p.value) : '';
                                    }
                                }
                            }
                        },
                        "data": ['58938','68761','78584','72321','83496','73673','81285']
                    },
                ]
      };
        //频繁预警种类结束
        carRankOption:any = {
              series: [{
                  type: 'liquidFill',
                  data: [0.9],
                  color:['#0787d9'],
                  radius: '80%',
                  outline:{
                      show: true,
                      borderDistance: 8,
                      itemStyle: {
                          color: 'none',
                          borderColor: '#4de3ff',
                          borderWidth: 3,
                          shadowBlur: 20,
                          shadowColor: '#fff'
                      }
                  },
                  label: {
                    normal:{
                      fontSize:20
                    }
                  }
              }]
        };

        userCarOption:any = {
            backgroundColor: 'rgba(0,0,0,0)',
            grid: {
              top:"20"
            },
            yAxis: [{
                type: 'value',
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false,
                    inside: false,
                    length: 10 * 1,
                    lineStyle: {
                        color: '#0b5263'
                    }
                },
                axisLabel: {
                    show:false,
                    textStyle: {
                        color: '#0b5263',
                        fontSize: 14 * 1
                    }
                },
            }],
            xAxis: [{
                type: 'category',
                data: ['涉稳', '涉毒', '涉疆'],
                boundaryGap: ['20%', '20%'],
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    //   rotate: 45,
                    padding: [0, 0, 0, 0],
                    textStyle: {
                        fontSize: 16 * 1,
                        color: '#fff'
                    }
                }
            }],
            series: [{
                name: '100',
                type: 'bar',
                stack: '总量',
                z: 3,
                barWidth: '45%',
                data: [ {
                    name: '涉毒',
                    value: 74108
                }, {
                    name: '涉疆',
                    value: 17337
                },{
                    name: '涉稳',
                    value: 3840
                }],
                itemStyle: {
                    normal: {
                          color: {image: this.PatternImg,repeat: 'repeat'}
                    }
                },
                label:{
                    normal:{
                        show:true,
                        position: [15, -20],
                        color:'#fff',
                        fontSize:12,
                        align: 'center'
                    }
                }
            }]
        }

        carPassOption:any = {
              tooltip : {
                  trigger: 'item',
                  // formatter: '{a}<br/>{c}辆'
                  formatter: function(val){
                      return val.name +"<br/>"+val.seriesName+":"+ val.value;
                  }
              },
              grid:{
                left:15,
                right:0,
                bottom:40
              },
              legend: {
                  left:"right",
                  data:['前天过车数','今日过车数'],
                  textStyle:{
                      color:'#ffffff'
                  },
              },
              color:['#fee244','#fb9026'],
              calculable : true,
              xAxis : [
                  {
                      splitLine: {show:false},
                      lineStyle:{
                          show:false
                      },
                      axisTick:{
                          show:false
                      },
                      axisLabel:{
                          textStyle:{
                              color:'#ffffff',fontSize:'12'
                          },
                          interval: 0
                          // rotate: 30
                      },
                      axisLine:{
                          show:false
                      },
                      type : 'category',
                      data : ['广州市','深圳市','佛山市','东莞市','中山市','珠海市','江门市','肇庆市','惠州市','汕头市','潮州市','揭阳市','汕尾市','湛江市','茂名市','阳江市','韶关市','清远市','云浮市','梅州市','河源市']
                  }
              ],
              yAxis : [
                  {
                      show:false,
                      type : 'value',
                      splitLine: {show:false},
                      lineStyle:{
                          show:false
                      },
                      axisTick:{
                          show:false
                      },
                      axisLabel:{
                          textStyle:{
                              color:'#ffffff'
                          }
                      },
                      axisLine:{
                          show:false
                      },
                  }
              ],
              series : [
                  {
                      name:'前天过车数',
                      type:'bar',
                      data:[52.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6,2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6,2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6],

                  },
                  {
                      name:'今日过车数',
                      type:'bar',
                      data:[52.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6,2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6,2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6],

                  }
              ]
          };

          //过车热力图
          mapOption:any = {
                title : {
                    left: 'center',
                    top: 'top',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {
                  trigger: 'item',
                },
                geo: {
                    map: '广东',
                    show:true,
                    label:{
                        normal:{show:true,color:'#fff'},
                        emphasis:{show:false,color:'#fff'}
                    },
                    aspectScale:0.75,
                    top:'100px',
                    itemStyle: {
                        normal: {
                        show:true,
                          borderColor: '#58e2fd',
                          borderWidth:1,
                          areaColor:'#0b2687'
                          // areaColor:'rgba(0,0,0,0)'
                        },
                        emphasis: {
                            show:true,
                            // areaColor:'#0b2687',
                            areaColor:'rgba(0,0,0,0)',
                            color: '#fff'
                        }
                    }
                },
                series: [{
                      name: '广东省',
                      type: 'map',
                      map: '广东',
                      geoIndex: 0,
                      itemStyle: {
                          normal: {
                          show:true,
                            borderColor: '#58e2fd',
                            borderWidth:1,
                            areaColor:'#0b2687'
                          },
                          emphasis: {
                              show:false,
                              areaColor:'rgba(0,0,0,0)',
                              color: '#fff'
                          }
                      },
                      label:{
                        normal:{show:true,color:'#fff'},
                        emphasis:{show:false,color:'#fff'}
                      },
                      zlevel:1,
                      data:[],
                      tooltip : {
                        textStyle:{
                          //color: "#C7C7C8",
                          fontSize: 12,
                          //fontWeight: 'bold'
                        },
                        formatter: function (items){
                            var value = '卡口总数 : '+ items.value;
                            var item = items.data;
                            var str;
                            str = items.name +"<br>" + value + '  在线卡口数 : ' + item.zykks +'<br>过车总数 : ' + item.gczs +'  预警次数 : ' + item.yjcs;
                            return str;
                        }
                      }
                  },
                  {
                      name: '强',
                      type: 'scatter',
                      coordinateSystem: 'geo',
                      symbolSize: 5,
                      zlevel:12,
                      geoIndex: 0,
                      silent:true,
                      large: false,
                      // largeThreshold:7000,
                      label:{normal:{show:false},emphasis:{show:false}},
                      itemStyle: {
                          normal: {
                              color: '#fff',
                              show:false
                          },
                          emphasis:{
                            show:false
                          }
                      },
                      tooltip:{
                        formatter: function (items){
                          var str = '过车次数：'+items.data[2];
                          return str;
                        }
                      },
                      data: []
                  }]
            };


}
