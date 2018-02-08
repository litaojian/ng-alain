import { Component, OnInit, AfterViewInit, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { Element } from '@angular/compiler';

declare let echarts:any;
declare let $:any;
@Component({
    selector: 'app-map',
    template: `<div class="map" #map></div>`,
    styles: [`
        .map{
            width:100%;
            height:100%;
        }
    `]
})
export class HeadMapComponent implements OnInit {
    constructor(private ElementRef:ElementRef) { }
    //存储传值list
    _data:any;

    //存储dom
    gdMap:any;

    @ViewChild('map')
    div:ElementRef;

    //数据读取状态
    @Input()
    set status(val:any){
        this._status = val;
        // this.initEcharts();
        this.loadding();
    }
    get status():any{
        return this._status;
    }
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
        if(!this.gdMap){
            this.gdMap = echarts.init(this.div.nativeElement);
        }
        this._option.series[0].data = this._data.city;  //设置地市数据
        this._option.series[1].data = this._data.data;  //设置卡口数据
        this._option.geo.itemStyle.emphasis.areaColor = this._data.color; //设置地图背景颜色
        this.gdMap.setOption(this._option);
    }

    _loadOpt:any = {
        text: '加载中....',
        color: '#fff',
        textColor: '#fff',
        maskColor: 'rgba(255, 255, 255, 0.0)',
        zlevel: 110
    };

    //是否读取数据状态
    _status:boolean = false;

    loadding(){
        if(!this.gdMap){
            this.gdMap = echarts.init(this.div.nativeElement);
        }
        if(this._status){
            this.gdMap.showLoading(this._loadOpt);
        }else{
            this.gdMap.hideLoading(this._loadOpt);
        }
    }

    _option:any ={
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
