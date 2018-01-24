import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras,ActivatedRoute }  from '@angular/router';
import { Title } from '@angular/platform-browser';

import { VisualService } from './visual.service';

declare let echarts:any;
declare let $:any;

@Component({
  selector: 'app-visual-sort',
  templateUrl: './visual-sort.component.html',
  styleUrls: ['./visual-sort.component.css','./visual-all.css']
})
export class VisualSortComponent implements OnInit {

    myChart1: any;
    myChart2: any;
    myChart3: any;
    myChart4: any;
    myChart5: any;
    myChart6: any;
    num: any;
    name: any;
  constructor(
    private actionRouter:ActivatedRoute,
    private router:Router,
    private title:Title,
    private visualService:VisualService
  ) { }

  skipPage(){
     this.router.navigate(['/visual/index']);
  }

  ngOnInit() {
    this.title.setTitle("分类展示");
    this.myChart1 = echarts.init(<HTMLCanvasElement>document.getElementById("first"));

    var option = {
            grid: {
                left: '3%',
                right: '4%',
                bottom: '1%',
                top:'4%',
                containLabel:true
            },
            xAxis: {
                type : 'value',
                show:false
            },
            barCategoryGap:'20%',
            backgroundColor: 'rgba(18, 81,111 ,0.2)',
            yAxis: {
                 type : 'category',
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
                data : ['广州市','深圳市','佛山市','东莞市','中山市','珠海市','江门市','肇庆市','惠州市','汕头市','潮州市','揭阳市','汕尾市','湛江市','茂名市','阳江市','韶关市','清远市','云浮市','梅州市','河源市']

            },
            series: [
                {
                    type: 'bar',

                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                                offset: 1,
                                color: '#4de4ff'
                            }, {
                                offset: 0,
                                color: '#2a8aff'
                            }])

                        },
                        emphasis: {
                            color: '#2378f7'
                        }
                    },
                    label: {
                        normal: {
                            color:'#fff',
                            show: true,
                            position: 'insideLeft'
                        }
                    },
                    data:[2900, 1200, 300, 200, 900, 300,2900, 1200, 300, 200, 900, 300,2900, 1200, 300, 200, 900, 300, 200, 900, 300]
                }
            ]
        };
    //获取当月各地市过车次数
    this.visualService.getVehiclePass().subscribe(res =>{
        let cityList = [];
        let csList = [];
        res.rows.forEach(el => {
          cityList.push(el.citymc);
          csList.push(el.gccs);
        });
        option.yAxis.data = cityList;
        option.series[0].data = csList;
        this.myChart1.setOption(option);
        window.onresize = this.myChart1.resize;
    });


    //布控细类信息
    // this.myChart2 = echarts.init(<HTMLCanvasElement>document.getElementById("second"));
    var option2 =  {
            backgroundColor: 'rgba(18, 81,111 ,0.2)',
            tooltip: {
                trigger: 'item',
                formatter: "{b}: {c} ({d}%)"
            },
            color:['#61d6e4','#6191e4', '#3d53f7', '#2a8aff', '#5aa5ff','#76cdfd'],
            legend: {
                show:false,


            },
            series: [
                {

                    type:'pie',
                    selectedMode: 'single',
                    radius: [0, '30%'],

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
                    color:['#ff7373','#2abfd1','#61a0a8'],
                    data:[
                        {value:336, name:'违法犯罪类', selected:true},
                        {value:679, name:'管控类'},
                        {value:1548, name:'交通违法类'}
                    ]
                },
                {

                    type:'pie',
                    radius: ['40%', '55%'],
                    labelLine: {
                        normal: {
                            show: true,
                            lineStyle:{
                            color:'#ffffff'
                        }

                        }
                    },
                    label: {
                        normal: {
                            color:'#ffffff',
                            show:true,
                            length:40,
                            length2:40,
                            lineStyle:{
                                color:'#ffffff'
                            },
                            formatter: '{b}'



                        }
                    },
                    data:[
                        {value:335, name:'涉毒'},
                        {value:310, name:'涉军'},
                        {value:234, name:'涉案'},
                        {value:135, name:'在逃车辆'},
                        {value:1048, name:'假牌'},
                        {value:251, name:'套牌'},
                        {value:147, name:'涉车'}
                    ]
                }
            ]
        };
    // this.visualService.getSuspCount().subscribe(res =>{
    //   let bkdl = [];
    //   let bklb = [];
    //   res.bkdlList.forEach(el => {
    //       bkdl.push({name:el.bkdlmc,value:el.bkcs});
    //   });
    //   res.bklbList.forEach(el => {
    //       bklb.push({name:el.bklbmc,value:el.bkcs});
    //   });
    //   if(bkdl.length >0){
    //     bkdl[0].selected = true;
    //   }
    //   option2.series[0].data = bkdl;
    //   option2.series[1].data = bklb;
    //   this.myChart2.setOption(option2);
    //   window.onresize = this.myChart2.resize;
    // });

    //联动布控情况
    // this.myChart3 = echarts.init(<HTMLCanvasElement>document.getElementById("third"));
    this.visualService.getCombineCount().subscribe(res =>{
          let data = [{
                  name: '布控我省',
                  // value: [1, 2, 5, 7, 6,21]
                  value:[]
              }, {
                  name: '预警我省',
                  // value: [3, 4, 5, 8, 2,22]
                  value:[]
              }, {
                  name: '布控对方',
                  // value: [2, 4, 5, 7, 3,21]
                  value:[]
              },{
                  name: '预警对方',
                  // value: [4, 3, 2, 4, 3,16]
                  value:[]
              }];

            let city = [];
            res.rows.forEach(el => {
              if(data[0].value.length<5){
                data[0].value.push(el.bkcs_me);
                data[1].value.push(el.yjcs_me);
                data[2].value.push(el.bkcs_other);
                data[3].value.push(el.yjcs_other);
                city.push(el.xzqhmcmc);
              }
            });
            //放入总计数
                data[0].value.push(res.totalList[0].bkcs_me || 0);
                data[1].value.push(res.totalList[0].yjcs_me || 0);
                data[2].value.push(res.totalList[0].bkcs_other || 0);
                data[3].value.push(res.totalList[0].yjcs_other || 0);

            var option3:any = {
                backgroundColor: 'rgba(18, 81,111 ,0.2)',
                  tooltip: {
                      trigger: 'item',
                      padding: 10,
                      backgroundColor: '#222',
                      borderColor: '#777',
                      borderWidth: 1,
                      formatter: tooltipFormatter,

                  },
                  color:['#61a0a8','#ff7373','#17d4ea', '#3d53f7'],
                  angleAxis: {
                      type: 'category',
                      axisPointer:{
                      inside:false,//
                          label:{

                          }
                      },
                      show:false,
                      data:city,
                      z: 10
                  },
                  polar: {
                      center: ['-50%', '50%'],
                      radius: 130,
                  },
                  radiusAxis: {},
                  series: [{
                      type: 'bar',
                      data: [
                          data["0"].value["0"],
                          data["0"].value["1"],
                          data["0"].value["2"],
                          data["0"].value["3"],
                          data["0"].value["4"]


                      ],
                      coordinateSystem: 'polar',
                      name: data["0"].name,
                      stack: 'a',
                      labelLine:{
                          normal:{
                              show:true
                          }
                      },
                      itemStyle: {
                          normal: {
                              borderWidth: 0,
                              borderColor: '#ffffff',
                          },
                          emphasis: {
                              borderWidth: 0,
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                      }
                  }, {
                      type: 'bar',
                      labelLine:'outside',
                      data: [
                          data["1"].value["0"],
                          data["1"].value["1"],
                          data["1"].value["2"],
                          data["1"].value["3"],
                          data["1"].value["4"]
                      ],
                      coordinateSystem: 'polar',
                      name: data["1"].name,
                      stack: 'a',
                      itemStyle: {
                          normal: {
                              borderWidth: 0,
                              borderColor: '#ffffff',
                          },
                          emphasis: {
                              borderWidth: 0,
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                      }
                  }, {//3
                      type: 'bar',
                      labelLine:{
                          normal:{
                              show:true
                          }
                      },
                      data: [
                          data["2"].value["0"],
                          data["2"].value["1"],
                          data["2"].value["2"],
                          data["2"].value["3"],
                          data["2"].value["4"]
                      ],
                      coordinateSystem: 'polar',
                      name: data["2"].name,
                      stack: 'a',
                      itemStyle: {
                          normal: {
                              borderWidth: 0,
                              borderColor: '#ffffff',
                          },
                          emphasis: {
                              borderWidth: 0,
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                      }
                  }, {
                      type: 'bar',
                      data: [
                          data["3"].value["0"],
                          data["3"].value["1"],
                          data["3"].value["2"],
                          data["3"].value["3"],
                          data["3"].value["4"]
                      ],
                      coordinateSystem: 'polar',
                      name: data["3"].name,
                      stack: 'a',
                      labelLine:{
                          normal:{
                              show:true
                          }
                      },
                      itemStyle: {
                          normal: {
                              borderWidth: 0,
                              borderColor: '#ffffff',
                          },
                          emphasis: {
                              borderWidth: 0,
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                      }
                  }, {
                      name: '每天销量',
                      type: 'pie',
                      radius: ['80%', '85%'],
                      avoidLabelOverlap: false,
                      labelLine:{
                          normal:{
                              show:true,
                              length:0,
                              length2:0,
                              lineStyle:{
                                  color:'#ffffff'
                              }
                          }
                      },
                      label: {
                          normal: {
                              show: false,
                              color:'#ffffff',
                              formatter: '{b}: ({d}%)',
                          }
                      },

                      data: [{
                          value: data["0"].value["5"],
                          name: data["0"].name
                      }, {
                          value: data["1"].value["5"],
                          name: data["1"].name
                      }, {
                          value: data["2"].value["5"],
                          name: data["2"].name
                      }, {
                          value: data["3"].value["5"],
                          name: data["3"].name
                      }],
                      legend: {
                          show: false,
                          orient: 'vertical',
                          x: 'right',
                          y: 'top',
                          data: [data["0"].name, data["1"].name, data["2"].name,data["3"].name ]
                      },
                      itemStyle: {
                          normal: {
                              borderWidth: 0,
                              borderColor: '#ffffff',
                          },
                          emphasis: {
                              borderWidth: 0,
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                      }
                  }]
              }

              function tooltipFormatter(params) {
                  var valuesFormatter = [];

                  if (params.componentSubType == 'pie') {
                      valuesFormatter.push(
                          '<span style="color:' + params.color + '">' + params.name + '</span>: ' + params.value
                      );
                  } else {
                      valuesFormatter.push(
                          '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
                          params.seriesName +
                          '</div>' +
                          '<span style="color:' + params.color + '">' + params.name + '</span>: ' + params.value + '<br>');
                  }

                  return valuesFormatter;
              }

            // this.myChart3.on('click', function(params) {
            //     if (params.componentSubType != 'pie') {
            //         var weekDay = params.dataIndex;
            //         option3.series[4].data[0].value = data[0].value[weekDay];
            //         option3.series[4].data[1].value = data[1].value[weekDay];
            //         option3.series[4].data[2].value = data[2].value[weekDay];
            //         option3.series[4].data[3].value = data[3].value[weekDay];
            //         this.myChart3 = echarts.init(<HTMLCanvasElement>document.getElementById("third"));
            //         this.myChart3.setOption(option3);
            //     }
            // });
            // this.myChart3.setOption(option3);
    });


    //在线卡口统计
    var canvas4 = <HTMLCanvasElement>document.getElementById("fourth");
    this.myChart4 = echarts.init(<HTMLCanvasElement>document.getElementById("fourth"));
    var option4 =  {
        backgroundColor: 'rgba(18, 81,111 ,0.2)',
        tooltip : {
            trigger: 'item',
            formatter: "{b} : {c} "
        },
        color:['#2a8aff','#17d4ea', '#3d53f7', '#76effd', '#5aa5ff','#6191e4', '#91c7ae', '#61a0a8'],
        series : [

            {
                name:'面积模式',
                type:'pie',
                radius : [10, 100],
                center : ['50%', '50%'],
                roseType : 'area',
                 labelLine: {
                      normal: {

                          length:0,
                          length2:8,
                          show: true,
                          lineStyle:{
                          color:'#ffffff'
                      }
                    }
                },
                itemStyle:{
                    normal: {

                    }
                },
                label: {
                    normal: {
                        color:'#ffffff',
                        show:true,

                        lineStyle:{
                            color:'#ffffff'
                        }

                    }
                },
                data:[
                    {value:80, name:'深圳市'},
                    {value:65, name:'广州市'},
                    {value:69, name:'佛山市'},
                    {value:65, name:'中山市'},
                    {value:60, name:'东莞市'},
                    {value:65, name:'珠海市'},
                    {value:60, name:'江门市'},
                    {value:68, name:'汕头市'},
                    {value:60, name:'肇庆市'},
                    {value:65, name:'惠州市'},
                    {value:65, name:'汕尾市'},
                    {value:65, name:'湛江市'},
                    {value:60, name:'茂名市'},
                    {value:65, name:'阳江市'},
                    {value:60, name:'韶关市'},
                    {value:68, name:'清远市'},
                    {value:60, name:'梅州市'},
                    {value:68, name:'河源市'},
                    {value:60, name:'云浮市'}
                ]
            }
        ]
    };
    this.visualService.getDeviceCount().subscribe(res =>{
        let data = [];
        res.rows.forEach(el => {
            data.push({value:el.total,name:el.citymc});
        });
        option4.series[0].data = data;
        this.myChart4.setOption(option4);
        window.onresize = this.myChart4.resize;
    });


    //各地机动车预警情况
    var canvas5 = <HTMLCanvasElement>document.getElementById("fifth");
    this.myChart5 = echarts.init(<HTMLCanvasElement>document.getElementById("fifth"));
    var Warningdata ={
      city:['广州市','深圳市','佛山市','东莞市','中山市','珠海市','江门市','肇庆市','惠州市','汕头市','潮州市','揭阳市','汕尾市','湛江市','茂名市','阳江市','韶关市','清远市','云浮市','梅州市','河源市'],
      gkl:[20, 32, 50, 34, 90, 30,20,20,20, 32, 50, 34, 90, 30,20, 32, 50, 34, 90, 30,  20],
      jtwfl:[20, 32, 10,20, 32, 50, 34,20, 90, 30,20 ,34, 90, 30,20, 32, 50, 34, 90, 30,  10],
      ljl:[20, 82, 91, 34, 90,20, 32,20, 50, 34, 90, 30,20, 30,20, 32, 50, 34, 90, 30,  10]
    };
    var option5 =  {
        color:['#2a89ff','#48fbfe','#ff4d4d'],

        legend: {
            right:'30',
            textStyle:{
                color:'#ffffff'
            },

            data:['管控类','交通违法类','拦截类']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis :{
                splitLine: {
                    lineStyle: {
                        // 使用深浅的间隔色
                        color: 'rgba(68,79,89,0.5)'
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#ffffff'

                    }

                },
                type : 'category',
                data : Warningdata.city
            }
        ,
        yAxis : [
            {
                axisLine:{
                    lineStyle:{
                        color:'#ffffff'

                    }

                },
                splitNumber:'12',
                type : 'value'
            }
        ],
        series : [
            {
                name:'管控类',
                type:'bar',
                stack: '广告',
                data:Warningdata.gkl
            },
            {
                name:'交通违法类',
                type:'bar',
                stack: '广告',
                data:Warningdata.jtwfl
            },
            {
                name:'拦截类',
                type:'bar',
                stack: '广告',
                data:Warningdata.ljl
            }
        ]
    };
    this.visualService.getAlarmCount().subscribe(res =>{
        let gkl =[];
        let city =[];
        let ljl = [];
        let jtwf = [];
        for(let i=0;i<res.gkl.length;i++){
            city.push(res.gkl[i].citymc);
            gkl.push(res.gkl[i].yjcs);
            ljl.push(res.ljl[i].yjcs);
            jtwf.push(res.jtwf[i].yjcs);
        }
        option5.xAxis.data = city;
        option5.series[0].data = gkl;
        option5.series[1].data = jtwf;
        option5.series[2].data = ljl;
        this.myChart5.setOption(option5);
        window.onresize = this.myChart5.resize;
    });

        this.myChart6 = echarts.init(<HTMLCanvasElement>document.getElementById("sixth"));
        // var data = [
        //     {name:'北京市',value:[116.39737,39.939502,123]},
        //     {name:'天津市',value:[117.133262,39.256321,321]},
        //     {name:'上海市',value:[121.36464	,31.303465,512]},
        //     {name:'重庆市',value:[106.32485	,29.895013,123]},
        //     {name:'河北省',value:[114.336873,38.21885,123]},
        //     {name:'山西省',value:[112.349964,38.044464,	658	]},
        //     {name:'辽宁省',value:[123.241164,41.948112,	123	]},
        //     {name:'吉林省',value:[125.228072,43.894927,	324	]},
        //     {name:'黑龙江省',value:[126.479088,45.985284	,	765	]},
        //     {name:'江苏省',value:[118.715429,32.246466	,	654	]},
        //     {name:'浙江省',value:[120.040035,30.350837	,	234	]},
        //     {name:'安徽省',value:[117.170056,31.99595	,	234	]},
        //     {name:'福建省',value:[119.156964,26.182279	,	345	]},
        //     {name:'江西省',value:[115.808656,28.774611	,	53	]},
        //     {name:'山东省',value:[116.912494,36.812038	,	543	]},
        //     {name:'河南省',value:[113.453802,34.895028	,	234	]},
        //     {name:'湖北省',value:[114.116105,30.764814	,	543	]},
        //     {name:'湖南省',value:[112.800698,28.474291	,	254	]},
        //     {name:'广东省',value:[113.233035,23.224606	,	34	]},
        //     {name:'海南省',value:[110.179083,19.921006	,	234	]},
        //     {name:'四川省',value:[103.924003,30.796585	,	543	]},
        //     {name:'贵州省',value:[106.499624,26.844365	,	236	]},
        //     {name:'云南省',value:[102.599397,25.248948	,	767	]},
        //     {name:'陕西省',value:[108.780889,34.408508	,	565	]},
        //     {name:'甘肃省',value:[103.66644	,36.218003	,	456	]},
        //     {name:'青海省',value:[101.605943	,	36.752842	,	324	]},
        //     {name:'西藏自治区',value:[90.972306	,	29.838888	,	543	]},
        //     {name:'广西壮族自治区',value:[108.265765	,	23.020403	,	234	]},
        //     {name:'内蒙古自治区' ,value:[111.614073	,	40.951504	,	765	]},
        //     {name:'宁夏回族自治区',value:[106.094884	,	38.624116	,	725	]},
        //     {name:'新疆维吾尔自治区'	,value:[87.476819	,	43.894927	,	746	]},
        //     {name:'香港特别行政区' ,value:[114.1529	,	22.542716	,	234	]},
        //     {name:'澳门地区',value:[113.417008	,	22.337477	,	632	]},
        //     {name:'台湾省',value:[121.36464	,	25.248948	,	346	]}
        // ];
        // var option6 =  {
        //     tooltip : {
        //         trigger: 'item',
        //         formatter: function(params) {

        //             return '<div class="boxplot"> 车辆总数<br/>'

        //              + params.data.name +':'+params.data.value[2]+
        //              '</div>'
        //         }
        //     },
        //     legend: {
        //         show:false,
        //         orient: 'vertical',
        //         y: 'bottom',
        //         x:'right',
        //         data:['pm2.5'],
        //         textStyle: {
        //             color: '#fff'
        //         }
        //     },
        //     geo: {
        //         map: 'china',
        //         label: {
        //             emphasis: {
        //                 show: false
        //             }
        //         },
        //         roam: true,
        //         itemStyle: {
        //             normal: {
        //                 areaColor: 'none',
        //                 borderColor: '#65a3b3',
        //                 shadowColor: 'rgba(51, 120, 128, 0.8)',
        //                 shadowBlur: 5


        //             },
        //             emphasis: {
        //                  //areaColor: 'none'
        //             }
        //         }
        //     },
        //     series : [
        //         {
        //             name: '车辆总数',
        //             type: 'effectScatter',
        //             coordinateSystem: 'geo',
        //             data: data,
        //             symbolSize: function (val) {
        //                 return val[2] / 1;
        //             },
        //             showEffectOn: 'render',
        //             rippleEffect: {
        //                 scale:'3.5',
        //                 brushType: 'fill'
        //             },
        //             hoverAnimation: true,
        //             label: {

        //                 normal: {
        //                     formatter: '{b}',
        //                     position: 'right',
        //                     textStyle: {
        //                             color: "#ffffff",
        //                             fontStyle: "normal",
        //                             fontWeight: "500",
        //                             textShadowColor:"#071519",
        //                             textShadowBlur :"10",
        //                             fontFamily: "Microsoft YaHei",
        //                             fontSize: "16",
        //                         },
        //                     show: false
        //                 },
        //                  emphasis: {
        //                     formatter: '{b}',
        //                     position: 'right',
        //                     show: true
        //                 }
        //             },

        //             itemStyle: {
        //                 normal: {
        //                     color: '#3ccdd6',
        //                     shadowBlur: 10,
        //                     shadowColor: '#333'
        //                 }
        //             },
        //             zlevel: 1
        //         }
        //     ]
        // };
        // this.myChart6.on('click', function(params) {
        //     if(params.data){
        //        var b = params.data.name +':'+params.data.value[2]
        //         $("#top-tips").html(b);
        //     }
        // })
        var option6 ={
                tooltip : {
                  trigger: 'item'
                },
                title:{
                  show:false
                },
                backgroundColor:'rgba(0,0,0,0)',
                geo: {
                  map: 'china',
                  show:true,
                  label: {
                    normal:{
                      show:true,
                      textStyle:{
                          //color: "#FFF",
                          fontSize: 12,
                          fontWeight: 'bold'
                      }
                    },
                    emphasis: {
                      show: true,
                      textStyle:{
                          //color: "#000",
                          fontSize: 12,
                          fontWeight: 'bold'
                      }
                    }
                  },
                  roam: false,
                  zoom: 1,
                  itemStyle: {
                    normal: {
                      areaColor: '#e3dfbb',
                      borderColor: '#474143',
                      borderWidth: '1'
                    },
                    emphasis: {
                      show:false,
                      areaColor: '#00748e',
                    }
                  },
                },
                visualMap: {
                    min: 0,
                    max: 500,
                    left: 'left',
                    top: 'bottom',
                    text: ['高','低'],           // 文本，默认为数值文本
                    calculable: true,
                    inRange: {
                        color: [ '#e3dfbb','#f4ba4d','#e3753c','#da3b3a']
                    },
                    textStyle:{
                      color:'#fff'
                    }
                },
                series : [{
                        name: '',
                        type: 'map',
                        geoIndex: 0,
                        itemStyle:{
                            normal:{label:{show:true}},
                            emphasis:{label:{show:true}}
                        },
                        data:[],
                        tooltip : {
                          textStyle:{
                            //color: "#C7C7C8",
                            fontSize: 12,
                            //fontWeight: 'bold'
                          },
                          formatter:function(el){
                              let value = el.value;
                              if(isNaN(value)){
                                  value = "-";
                              }
                              return el.name +':'+value;
                          }
                        }
                    }]
                };
        this.visualService.getProvincePass().subscribe(res =>{
         res = {
              "resultCode": 0,
              "resultMsg": "ok",
              "rows": [
                  {
                      "hdcls": 784,
                      "province": "350000",
                      "province_zw": "福建省"
                  },
                  {
                      "hdcls": 554,
                      "province": "360000",
                      "province_zw": "江西省"
                  },
                  {
                      "hdcls": 234,
                      "province": "420000",
                      "province_zw": "湖北省"
                  },
                  {
                      "hdcls": 1010,
                      "province": "430000",
                      "province_zw": "湖南省"
                  },
                  {
                      "hdcls": 533,
                      "province": "450000",
                      "province_zw": "广西壮族自治区"
                  },
                  {
                      "hdcls": 1501,
                      "province": "460000",
                      "province_zw": "海南省"
                  },
                  {
                      "hdcls": 568,
                      "province": "500000",
                      "province_zw": "重庆市"
                  },
                  {
                      "hdcls": 634,
                      "province": "510000",
                      "province_zw": "四川省"
                  },
                  {
                      "hdcls": 412,
                      "province": "520000",
                      "province_zw": "贵州省"
                  },
                  {
                      "hdcls": 452,
                      "province": "640000",
                      "province_zw": ""
                  }
              ]
          }
          let rows = [];
          if(res.resultCode != 0){
              alert(res.resultMsg);
              return;
          }
          let gcs = [];
          res.rows.forEach(el => {
            el.name = el.province_zw.substr(0,2);
            el.value = el.hdcls;
            rows.push(el);
            gcs.push(el.hdcls);
          });
          let max = 100;
          if(gcs.length != 0){
              max = Math.max.apply(null, gcs);
          }
          option6.series[0].data = rows;
          option6.visualMap.max = max;
          option6.visualMap.min = 0;
          // let ratio = Math.floor(total/res.rows.length) - 1;
          option6.series[0].data = rows;
          this.myChart6.setOption(option6);
           window.onresize = this.myChart6.resize;
        });
    }


}
