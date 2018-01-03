import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MenuTreeService, MenuInfo } from './menu-tree.service';

@Component({
  selector: 'panel-toolbar',
  template: `
  <nav id="menu">
      <ul class="nav">
          <li *ngFor="let menu of shortcutMenus" [ngClass]="{'active':menu.menuUrl == currentMenuUrl}">
              <a [routerLink]="menu.menuUrl" [attr.data-id]="menu.menuUrl" class="app-btn open">{{menu.label}}</a>
          </li>
      </ul>
  </nav>
  <div id="querybox" class="hidden"></div>
  `
})
export class PanelToolbarComponent implements OnInit, AfterViewInit {

  // 工具栏菜单
  @Input('shortcutMenus')
  shortcutMenus: MenuInfo[] = [];

  selectedMenuId: string;

  currentMenuUrl: string;

  constructor(private menuTreeService: MenuTreeService, private router: Router) {

  }

  ngOnInit() {
    let url = this.router.url;
    $("#menu ul li").removeClass("active");
    $("[data-id='" + this.router.url + "']").parent().addClass("active");
    this.currentMenuUrl = url;

    this.menuTreeService.getShortcutListByPath(url).then(result => {
      //debugger;
      //console.log("ajax result:" + JSON.stringify(result));
      this.shortcutMenus = this.menuTreeService.convertMenuInfo(result);
      $("#menu ul li").removeClass("active");
      //$("[data-id='" + url + "']").parent().addClass("active");

    });
  }

  ngAfterViewInit() {

  }

}
