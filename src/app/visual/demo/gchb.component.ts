import { Component, OnInit, AfterViewInit, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { Element } from '@angular/compiler';

declare let echarts:any;
declare let $:any;
@Component({
    selector: 'app-gchb',
    template: `
        <div class="chartsStyle" #gchb></div>
    `,
    styles: [`
        .chartsStyle{
            width:100%;
            height:100%;
        }
    `]
})
export class GchbComponent implements OnInit {
    constructor(private ElementRef:ElementRef) { }
    //存储传值list
    _data:any;

    //存储dom
    carPassCharts:any;

    @ViewChild('gchb')
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
        if(!this.carPassCharts){
            this.carPassCharts = echarts.init(this.div.nativeElement);
        }
        this._option.xAxis[0].data = this._data.city;  //地市
        this._option.series[0].data = this._data.qt; //前天
        this._option.series[1].data = this._data.dt; //当天
        this.carPassCharts.setOption(this._option);
    }

    _option:any ={
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
}
