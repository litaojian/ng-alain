import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { AppBaseModule } from 'bizapp/base/app-base.module';

import { TestRecService } from './test-rec/testRec.service';
import { TestRecListComponent, TestRecDetailComponent } from './test-rec/testRec.component';



const routes: Routes = [
    { path: 'testRec/index', component: TestRecListComponent },
    { path: 'testRec/create', component: TestRecDetailComponent },
    { path: 'testRec/edit', component: TestRecDetailComponent },
    { path: 'testRec/view', component: TestRecDetailComponent },
    { path: 'testRec', redirectTo: 'testRec/index', pathMatch: 'full' },
    { path: 'index', redirectTo: 'testRec/index', pathMatch: 'full' },
    { path: '', redirectTo: 'testRec/index', pathMatch: 'full' }  
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
    TestRecListComponent,
    TestRecDetailComponent
  ],
  providers: [TestRecService]
})
export class DemoModule { }
