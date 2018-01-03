import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { environment } from '../../environments/environment';

import { AuthService } from '../base/acl/auth.service';
import { SsoClientService } from '../base/acl/ssoclient.service';

import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout.component';
import { SsoClientComponent } from './ssoclient.component';
import { ErrorPageComponent } from './error.component';

const routes: Routes = [{
        path: '',
        //component: PageComponent,
        children: [
            { path: 'error', component: ErrorPageComponent },                        
            { path: 'login',  component: LoginComponent },
            { path: 'logout', component: LogoutComponent },
            { path: 'oauth/login/checkcode', component: SsoClientComponent },
            { path: 'oauth/logout', component: SsoClientComponent },
            { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]}  
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
	HttpModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
      ErrorPageComponent,
      LoginComponent,
      LogoutComponent,
      SsoClientComponent
  ],
  providers: [ AuthService ]
})


export class LoginModule {}
