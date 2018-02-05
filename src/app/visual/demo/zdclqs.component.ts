import { Component, OnInit, AfterViewInit, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { Element } from '@angular/compiler';

declare let echarts:any;
declare let $:any;
@Component({
    selector: 'app-zdclqs',
    template:  `
        <span class="line-l"></span>
        <span class="line-r"></span>
        <span class="line-b"></span>
        <span class="line-t"></span>
        <div class="unit-title">
            <div class="unit-title-text">{{title}}</div>
        </div>
        <div class="unit-body">
            <div class="chart-bar-car" #carQs id="alarmCar" style="height: 305px;">
            </div>
        </div>
    `,
    styleUrls: ['../visual-all.css','../visual-index.component.css']
})
export class ZdclqsComponent implements OnInit {
    constructor(private ElementRef:ElementRef) { }
    //存储传值list
    _data:any;

    //存储dom
    alarmCarCharts:any;

    @ViewChild('carQs')
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
        if(!this.alarmCarCharts){
            this.alarmCarCharts = echarts.init(this.div.nativeElement);
        }
        this._option.xAxis[0].data = this._data.date;
        this._option.series[0].data = this._data.sd;
        this._option.series[1].data = this._data.sj;
        this._option.series[2].data = this._data.sw;
        this._option.series[3].data = this._data.total;
        this.alarmCarCharts.setOption(this._option);
    }

    _option:any ={
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
}
