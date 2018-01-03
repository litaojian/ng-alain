import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuTreeService, MenuInfo } from './menu-tree.service';

@Component({
  selector: 'panel-header',
  template: `
  <nav class="navbar navbar-main navbar-fixed-top" role="navigation" id="mainNavbar">
      <div class="navbar-header">
          <a [routerLink]="moduleUrl" class="navbar-brand">{{moduleLabel}}</a>
      </div>
      <ul class="nav navbar-nav">
          <li *ngFor="let menu of navMenuList" [ngClass]="{'active':menu.menuUrl == currentMenuUrl}">
              <a [routerLink]="menu.menuUrl" [attr.data-id]="menu.menuUrl" class="app-btn open">{{menu.label}}</a>
              <!--
              <a [attr.data-id]="menu.menuUrl" (click)="onMenuItemClick(menu)" class="app-btn open">{{menu.label}}</a>
              -->
              
          </li>
      </ul>
  </nav>
  `
})
export class PanelHeaderComponent implements OnInit, AfterViewInit {
  // 当前模块名称
  moduleUrl: string;

  @Input("title")
  moduleLabel: string;

  @Input("module")
  moduleId: string;

  // 导航菜单
  navMenuList: MenuInfo[] = [];

  selectModuleId: string;
  currentMenuUrl: string;

  constructor(private menuTreeService: MenuTreeService, private sanitizer: DomSanitizer, private router: Router) {
    //console.log(router.url);
  }

  ngOnInit() {

    let url = this.router.url;
    let index = url.indexOf("/", 1);
    let hasPrefix = false;

    if (index > 0) {
      this.moduleUrl = url.substring(0, index);
      if (this.moduleUrl == "/page"){
        hasPrefix = true;
        let start = this.moduleUrl.length;
        let index = url.indexOf("/", (start + 1));
        this.moduleUrl = url.substring(start, index);
      }
    }

    let index2 = url.lastIndexOf("/");
    let count = this.getCount(url, "/");

    if (count > 2 && index2 > 0) {
      this.currentMenuUrl = url.substring(0, index2); 
    }else{
      this.currentMenuUrl = url;
    }

    this.getMenuListByPath(this.moduleUrl + "/index", this.moduleId);
    if (hasPrefix){
      this.moduleUrl = "/page" + this.moduleUrl;      
    }
  }

  getMenuListByPath(_url:string, moduleId:string){
    //console.log("currentMenuUrl=" + this.currentMenuUrl + ",count=" + count);
    this.menuTreeService.getMenuListByPath(_url, moduleId).then(result => {
      //debugger;
      //console.log("ajax result:" + JSON.stringify(result));
      this.navMenuList = this.menuTreeService.convertMenuInfo(result);
      // if (this.navMenuList == null && _url != this.router.url){
      //   this.getMenuListByPath(this.router.url);
      // }
      $("#mainNavbar ul li").removeClass("active");
      $("[data-id='" + this.currentMenuUrl + "']").parent().addClass("active");
      
      //console.log($("[data-id='" + this.currentMenuUrl + "']").html());
    });    
    
  }
  ngAfterViewInit() {
  }


  //统计字符串中特定字符串的个数
  getCount(scrstr, armstr):number { //scrstr 源字符串 armstr 特殊字符
    var count = 0;
    while (scrstr.indexOf(armstr) >= 0) {
      scrstr = scrstr.replace(armstr, "")
      count++;
    }
    return count;
  }

  onMenuItemClick(menu:Object){
    console.log("click menuItem, url=" + menu["menuUrl"]);
    //alert("a:" + menu["menuUrl"]);
    let url = menu["menuUrl"];
    this.router.navigate([url]).then(result =>{
      //console.log("result:" + result);
    });
  }

}
