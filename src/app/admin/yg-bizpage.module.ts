
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BizQueryComponent, BizQueryService,BizFormComponent, BizFormService, BizTreeTableComponent, BizPageGuardService } from 'ngx-widget/biz-app';

const routes: Routes = [{
  path: '',
  children: [    
    { path: ':dir/:pageName/tree', component: BizTreeTableComponent, canActivate:[BizPageGuardService] },    
    { path: ':dir/:pageName/list', component: BizQueryComponent, canActivate:[BizPageGuardService] },    
    { path: ':dir/:pageName/list/:pid', component: BizQueryComponent, canActivate:[BizPageGuardService] },        
    { path: ':dir/:pageName/create', component: BizFormComponent },     
    { path: ':dir/:pageName/edit', component: BizFormComponent },     
    { path: ':dir/:pageName/view', component: BizFormComponent }, 
    { path: ':dir/:pageName', redirectTo: ':dir/:pageName/list', pathMatch: 'full' },  
    { path: 'test/dialog/:id', component: BizQueryComponent },        
    { path: '', redirectTo: 'admin/organization/tree', pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
  ],
  entryComponents:[
  ],
  providers: []
})
export class MyBizPageModule {
  
}
