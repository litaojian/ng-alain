import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AppBaseModule } from 'bizapp/base/app-base.module';
import { mySearchComponent } from './search.component';
import { myQueryDialogComponent } from './query.dialog.component';
import { detailComponent } from './detail.component';
const routes: Routes = [
    { path: 'index', component: mySearchComponent,data:{ title: '过车查询测试' }},
    { path: 'edit', component: detailComponent,data:{ title: '过车编辑测试' } },
    { path: '', redirectTo: 'index', pathMatch: 'full' }  
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    //AppBaseModule,
    SharedModule, 
    RouterModule.forChild(routes)
  ],
  declarations: [
    mySearchComponent,
    detailComponent,
    myQueryDialogComponent
  ],
  exports:[RouterModule],
  entryComponents:[
        myQueryDialogComponent
  ],
  providers: []
})
export class SearchModule { }
