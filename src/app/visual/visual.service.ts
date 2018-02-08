import { Injectable,Injector } from '@angular/core';
import { Headers, Http, URLSearchParams,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';


@Injectable()
export class VisualService {
  isTest:boolean = false;
  constructor(
    private http : Http,
  ) { }
  /* 汇总展示接口 */

  //卡口实时预警数据展示
   getAlarmRealtime(){
      let url = '/vm/api/visual/alarm/realtime/list';
		  return this.http.get(url).map(res => res.json());
  }
  //卡口预警热力图
  getAlarmHotMap(date:string){
      let url = '/remote/api/data/visual/rlt';
		  return this.http.get(url).map(res => res.json());
  }
  //卡口过车热力图
  getPassHotMap(date:string){
      let url = '/remote/api/data/visual/rlt';
		  return this.http.get(url).map(res => res.json());
  }
  //各地市过车环比
  getCarContrast(date:string){
      let url = '/remote/api/data/visual/gcdb';
		  return this.http.get(url).map(res => res.json());
  }
  //各地市预警情况展示
  getCollectAlarmCount(date:string){
      let url = '/vm/api/visual/alarm/city/count/list?showDate='+date;
		  return this.http.get(url).toPromise()
			.then(response => response.json());
  }
  //各省联动布控总数
  getCombineProvinceCount(date?:string){
      let url = '/vm/api/visual/susp/combine/province/count/list?showDate='+date;
		  return this.http.get(url).map(res => res.json());
  }
  //外地车辆排行展示
  getCarRank(date:string){
      let url = '/vm/api/visual/vehicle/pass/province/rank?showDate='+date;
		  return this.http.get(url).map(res => res.json());
  }
  //日过车统计
  getCarCount(date:string){
      let url = '/vm/api/visual/vehicle/pass/day/count?showDate='+date;
      return this.http.get(url).map(res => res.json());
  }
  //车辆布控情况展示
  getBkdlCount(date?:string){
      let url = '/remote/api/data/visual/bukong';
      return this.http.get(url).map(res => res.json());
  }
  //车辆档案统计
  getArchiveCount(){
      let url = '/vm/api/visual/vehicle/pass/archive/count';
      return this.http.get(url).map(res => res.json());
  }
  //当日各地市卡口在线统计
  getDeviceOnline(date){
      let url = '/vm/api/visual/vehicle/pass/device/online/day?showDate='+date;
      return this.http.get(url).map(res=>res.json());
  }
  //重点人群车辆数
  getImportantCar(date?:any){
      let url = '/remote/api/data/visual/zdcls';
      return this.http.get(url).map(res=>res.json());
  }
  //重点人群车辆预警趋势
  getImportantAlarm(date?:any){
      let url = '/remote/api/data/visual/zdryqs';
      return this.http.get(url).map(res=>res.json());
  }
  //全省布控预警情况展示
  getAlarmVehicle(date?:any){
      let url = '/remote/api/data/visual/bkyjs';
      return this.http.get(url).map(res=>res.json());
  }
  //全省卡口在线率
  getOnlinePercent(date){
      let url = '/remote/api/data/visual/kkOnline';
      return this.http.get(url).map(res=>res.json());
  }

  /* 分类展示接口 */

  //当月各地市卡口过车统计
  getVehiclePass(){
      let url = '/vm/api/visual/vehicle/pass/city/count';
		  return this.http.get(url).map(res => res.json());
  }
  //当月布控细类信息
  getSuspCount(){
      let url = '/vm/api/visual/susp/month/count/list';
		  return this.http.get(url).map(res => res.json());
  }
  //各地机动车预警情况
  getAlarmCount(){
		  return this.http.get('/vm/api/visual/alarm/month/list').map(res => res.json());
  }
  //当月外地车辆在粤情况展示
  getProvincePass(){
		  return this.http.get('/vm/api/visual/vehicle/pass/province/count').map(res => res.json());
  }
  //当月跨省联动布控统计
  getCombineCount(date?:string){
      let url = "";
      if(date){
          url = "/vm/api/visual/susp/combine/province/count/month/list?showMonth="+date;
      }else{
          url = "/vm/api/visual/susp/combine/province/count/month/list";
      }
		  return this.http.get(url).map(res => res.json());
  }
  //当月卡口在线统计
  getDeviceCount(){
      let url = "/vm/api/visual/vehicle/pass/device/online/count";
       return this.http.get(url).map(res => res.json());
  }

}
