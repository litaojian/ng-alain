import { Component, OnInit, AfterViewInit, Input, Output } from '@angular/core';

declare let echarts:any;
declare let $:any;
@Component({
    selector: 'app-zxl',
    template: `
            <span class="line-l"></span>
            <span class="line-r"></span>
            <span class="line-b"></span>
            <span class="line-t"></span>
            <div class="unit-title">
                <div class="unit-title-text">{{title}}</div>
            </div>
            <div class="unit-body">
                <div class="chart-bar-car" >
                <ul>
                    <li><div id="carRank" style="width:100%;height:178px;"></div></li>
                    <li>卡口在线数<span class="font-green">{{accessRate.online}}</span></li>
                    <li>卡口总数<span class="req">{{accessRate.total}}</span></li>
                </ul>
                </div>
            </div>
    `,
    styleUrls:['../visual-all.css','../visual-index.component.css']
})
export class QszxlComponent implements OnInit {
    constructor() {
        this.PatternImg.src = 'data:image/png;base64,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';
    }
    //
    otherProvinceCharts:any;

    PatternImg:any = new Image(); //柱形图图片

    @Input()
    title:string;

    @Input()
    set data(val:Array<any>){
        this.accessRate = val;
        this.initEcharts();
    }
    get data(){
        return this.accessRate;
    }

    @Input()
    set option(val:object){
        this._option = val;
    }
    get option(){
        return this._option;
    }

    accessRate:any = {};

    ngOnInit() { }

    initEcharts(){
        this.otherProvinceCharts = echarts.init(<HTMLCanvasElement>document.getElementById("carRank"));
        this._option.series[0].data =[+this.accessRate.per];
        this.otherProvinceCharts.setOption(this._option);
    }

    //默认配置
    _option:any = {
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
    };
}
