import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppBaseModule } from '../base/app-base.module';

import { BizQueryComponent } from './bizquery.component';
import { BizQueryService } from './bizquery.service';
import { BizFormComponent } from './bizform.component';
import { BizFormService } from './bizform.service';
import { ValueListDataService } from '../base/valuelist-data.service';
import { PageContainerComponent } from './page.container.component';

import { BizDialogForQueryComponent } from './bizdialog.query.component';
import { BizDialogService } from './bizdialog.service';

const routes: Routes = [{
  path: '',
  //component: PageContainerComponent,
  children: [
    { path: 'test/dialog/:id', component: BizQueryComponent },        
    { path: ':dir/:pageName/list', component: BizQueryComponent },    
    { path: ':dir/:pageName/list/:pid', component: BizQueryComponent },        
    { path: ':dir/:pageName/create', component: BizFormComponent },     
    { path: ':dir/:pageName/edit/:id', component: BizFormComponent },     
    { path: ':dir/:pageName/view/:id', component: BizFormComponent }, 
    { path: ':dir/:pageName', redirectTo: ':dir/:pageName/list', pathMatch: 'full' },  
    { path: '', redirectTo: 'bizquery/index', pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [
    CommonModule,
    AppBaseModule,
    RouterModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    BizDialogForQueryComponent,
    BizQueryComponent,
    BizFormComponent,
    PageContainerComponent
  ],
  entryComponents:[
    BizDialogForQueryComponent
  ],
  providers: [BizQueryService, BizFormService, BizDialogService, ValueListDataService]
})

export class PageModule { }
