import { Component, OnInit, AfterViewInit, AfterViewChecked, HostBinding} from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras, ActivatedRoute, Params} from '@angular/router';

@Component({
  template: `
    <div class="panel" style="margin:25px;padding:15px;">
      <h1>Error with [{{url}}]</h1>
      <p>{{errorCode}}</p>
      <p>{{errorMsg}}</p>
      <p><a [hidden]="!showLoginButton" href='/#/sso/login'>重新登录</a> | <a (click)="goHome()">返回主页</a></p>
      <p></p>
    </div>
  `
})
export class ErrorPageComponent implements OnInit, AfterViewInit {

  errorCode:number;
  errorMsg:string;  
  url:string;

  showLoginButton:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {

  }
  
  ngOnInit() {
    //debugger;

    //this.errorMsg = "[" + errorCode + "]   " + errorMsg;
  }

  ngAfterContentChecked(){

    this.url = this.route.snapshot.queryParams["url"];
    this.errorCode = this.route.snapshot.queryParams["errorCode"];
    this.errorMsg = this.route.snapshot.queryParams["errorMsg"];

    if (this.errorMsg == null){
      this.errorMsg = "数据获取失败";
    }else if (this.errorMsg == "此TOKEN值不存在" || this.errorMsg == "此TOKEN已过期了,请重新获取" || this.errorMsg == "未找到有效的用户ID信息" || this.errorMsg == "此TOKEN值无效"){
      this.errorMsg = this.errorMsg +",请重新登录" ;
      this.showLoginButton = true;
    }
    //
    if (this.errorCode == null){
      this.errorCode = 400;
      this.showLoginButton = true;
    }else if (this.errorCode == 405){
      this.errorMsg = "拒绝访问-" + this.errorMsg ;
    }
    //
    console.log(this.errorMsg);

  }

  ngAfterViewInit(){

    
      
  }

  goHome(){
    if (window.parent != null){
        //console.log("It's iframe.....")
        window.parent.location.href = "#/";
        return;
    }
    //
    window.location.href = "#/";    
  }

}
