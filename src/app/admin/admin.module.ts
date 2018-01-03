import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';

import { SharedModule } from '@shared/shared.module';
import { SimpleTableComponent } from './simple-table/simple-table.component';
import { UserLoginComponent } from './passport/login/login.component';
import { TestRecComponent } from './test-rec/test-rec.component';
import { DashboardMonitorComponent } from './dashboard/monitor/monitor.component';
import { Exception403Component } from './exception/403.component';
import { Exception404Component } from './exception/404.component';
import { Exception500Component } from './exception/500.component';

import { MyDataService } from './service/my.data.service';
import { CanActivateMenusProvide } from './service/can-activate.menus.provide';

@NgModule({
  imports: [
    SharedModule, 
    AdminRoutingModule
  ],
  declarations: [
    SimpleTableComponent,
    UserLoginComponent,
    TestRecComponent,
    DashboardMonitorComponent,
    Exception403Component,
    Exception404Component,
    Exception500Component
  ],
  exports:[

  ],
  providers:[
    MyDataService,
    CanActivateMenusProvide
  ]
})
export class AdminModule { }
