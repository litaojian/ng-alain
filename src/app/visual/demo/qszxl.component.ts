import { Component, OnInit, AfterViewInit, Input, Output, ViewChild, ElementRef } from '@angular/core';

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
                    <li><div id="carRank" #kks style="width:100%;height:178px;"></div></li>
                    <li>卡口在线数<span class="font-green">{{accessRate.online}}</span></li>
                    <li>卡口总数<span class="req">{{accessRate.total}}</span></li>
                </ul>
                </div>
            </div>
    `,
    styleUrls:['../visual-all.css','../visual-index.component.css']
})
export class QszxlComponent implements OnInit {
    constructor(private ElementRef:ElementRef) {
    }
    //
    otherProvinceCharts:any;


    @ViewChild('kks')
    div:ElementRef;

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

    ngOnInit() {
        // var a = this.ElementRef;
        // var b = this.div;
        // console.log(b.nativeElement);
        // console.log("------------------");
        // console.log($("#carRank")[0]);
        // console.log("js:-------------");
        // console.log(<HTMLCanvasElement>document.getElementById("carRank"));
    }

    initEcharts(){
        // this.otherProvinceCharts = echarts.init(<HTMLCanvasElement>document.getElementById("carRank"));
        if(!this.otherProvinceCharts){
            this.otherProvinceCharts = echarts.init(this.div.nativeElement);
        }
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

}
