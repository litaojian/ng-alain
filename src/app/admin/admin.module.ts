import { NgModule,ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '@shared/shared.module';

import { SimpleTableComponent } from './simple-table/simple-table.component';
import { UserLoginComponent } from './passport/login/login.component';
import { DashboardMonitorComponent } from './dashboard/monitor/monitor.component';
import { Exception403Component } from './exception/403.component';
import { Exception404Component } from './exception/404.component';
import { Exception500Component } from './exception/500.component';

import { CanActivateMenusProvide } from './services/can-activate.menus.provide';
import { UserDataService } from './services/user.data.service';
import { UserLoginService } from './services/user.login.service';


@NgModule({
  imports: [
    SharedModule, 
    AdminRoutingModule
  ],
  declarations: [
    SimpleTableComponent,
    UserLoginComponent,
    DashboardMonitorComponent,
    Exception403Component,
    Exception404Component,
    Exception500Component
  ],
  exports:[

  ],
  providers:[
    UserLoginService,
    UserDataService,
    CanActivateMenusProvide
  ]
})
export class AdminModule {
  
}
