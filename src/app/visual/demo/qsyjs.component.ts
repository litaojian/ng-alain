import { Component, OnInit, AfterViewInit, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { Element } from '@angular/compiler';

declare let echarts:any;
declare let $:any;
@Component({
    selector: 'app-qsyjs',
    template: `
        <span class="line-l"></span>
        <span class="line-r"></span>
        <span class="line-b"></span>
        <span class="line-t"></span>
        <div class="unit-title">
            <div class="unit-title-text">{{title}}</div>
        </div>
        <div class="unit-body">
            <div class="chart-bar-car" #wCar id="warningCar" style="height: 306px;">
            </div>
        </div>
    `,
    styleUrls:['../visual-all.css','../visual-index.component.css']
})
export class QsyjsComponent implements OnInit {
    constructor(private ElementRef:ElementRef) { }

    //存储传值list
    _data:any;

    //存储dom
    warningCharts:any;

    @ViewChild('wCar')
    div:ElementRef;

      //标题
    @Input()
    title:string;

    //接收数据
    @Input()
    set data(val:object){
        this._data = val;
        this.initEcharts();
    }
    get data():object{
        return this._data;
    }
    //重写初始化配置
    @Input()
    set option(val:object){
        this._option = $.extend({},this._option,val);
    }
    get option(){
        return this._option;
    }

    ngOnInit() { }

    initEcharts(){
        if(!this.warningCharts){
            this.warningCharts = echarts.init(this.div.nativeElement);
        }
        this._option.xAxis[0].data = this._data.date;
        this._option.series[0].data = this._data.jtwfl;
        this._option.series[1].data = this._data.gkl;
        this._option.series[2].data = this._data.ljl;
        this.warningCharts.setOption(this._option);
    }

    //配置
    _option:any ={
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
}
