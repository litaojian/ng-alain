import { Component, OnInit, AfterViewInit, Input, Output } from '@angular/core';

declare let echarts:any;
declare let $:any;
@Component({
    selector: 'app-clbk',
    template: `
            <span class="line-l"></span>
            <span class="line-r"></span>
            <span class="line-b"></span>
            <span class="line-t"></span>
            <div class="unit-title">
                <div class="unit-title-text">
                {{title}}
                <span class="totalCount">总数:
                    <span class="req">{{bkdlDetail.ljl + bkdlDetail.jtwf + bkdlDetail.gkl}}</span>
                </span>
                </div>
            </div>
            <div class="unit-body" style="background:none">
                <div class="unit-chart">
                <div style="width:100%;height:100%;" id="radar">

                </div>
                </div>
                <div class="radar-data">
                    <ul class="">
                    <li><label>拦截类</label><span style="color:#ff7373">{{bkdlDetail.ljl}}</span>辆</li>
                    <li><label>交通违法类</label><span class="font-blue">{{bkdlDetail.jtwf}}</span>辆</li>
                    <li><label>管控类</label><span class="font-yellow">{{bkdlDetail.gkl}}</span>辆</li>
                    </ul>
                </div>
            </div>
    `,
    styleUrls:['../visual-all.css','../visual-index.component.css']
})
export class ClbkComponet implements OnInit {
    constructor() { }

    //显示参数
    @Input()
    bkdlDetail:any = {
        ljl:0,
        jtwf:0,
        gkl:0
    };

    //标题
    @Input()
    title:string;

    //接收数据
    @Input()
    set data(val:Array<any>){
        this._data = val;
        this.initEcharts();
    }
    get data():Array<any>{
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

    //echarts初始化
    _option:any = {
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

    //存储dom
    radarCharts: any;

    //存储数据
    _data:Array<any> = [];


    ngOnInit() {

     }

    ngAfterViewInit() {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        // this.radarCharts = echarts.init(<HTMLCanvasElement>document.getElementById("radar"));
        var a = this.bkdlDetail;
        this.initEcharts();
    }

    initEcharts(){
        this.radarCharts = echarts.init(<HTMLCanvasElement>document.getElementById("radar"));
        this._option.series[0].data = this._data;
        this.radarCharts.setOption(this._option);
        window.onresize = this.radarCharts.resize;
    }
}
