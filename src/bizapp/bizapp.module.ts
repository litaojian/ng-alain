import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { LocalStorageService } from 'angular-web-storage';
import { SettingsService } from './base/settings.service';
import { SecurityGuardService } from '../bizapp/base/acl/security-guard.service';
import { UserPermissionService } from '../bizapp/base/acl/user-permission.service';
import { SsoClientService } from '../bizapp/base/acl/ssoclient.service';

import { IndexComponent } from '../bizapp/index.component';

const routes: Routes = [
    { path: 'sso',  loadChildren: '../bizapp/login/login.module#LoginModule'},            
    { path: 'admin', loadChildren: '../bizapp/sysadmin/sysadmin.module#SysAdminModule', canActivateChild: [ SecurityGuardService ]},    
    { path: 'page', loadChildren: '../bizapp/bizpage/page.module#PageModule', canActivateChild: [ SecurityGuardService ]},    
    { path: 'index', component: IndexComponent },    
    { path: '', redirectTo: 'index', pathMatch: 'full' }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        HttpClientModule,        
        NgZorroAntdModule.forRoot(),
        RouterModule.forRoot(routes, { useHash: true })
    ],
    declarations: [
        IndexComponent
    ],
    exports: [
        RouterModule
    ],
    entryComponents:[
    ],
    providers:[
        SettingsService, LocalStorageService, SecurityGuardService, SsoClientService, UserPermissionService
    ]
})

export class BizAppModule {}
