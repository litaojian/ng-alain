import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppBaseModule } from 'bizapp/base/app-base.module';

import { TestRecService } from './test-rec/testRec.service';
import { TestRecListComponent, TestRecDetailComponent } from './test-rec/testRec.component';



const routes: Routes = [{
  path: '',
  //component: PageComponent,
  children: [
    { path: 'testRec/index', component: TestRecListComponent },
    { path: 'testRec/create', component: TestRecDetailComponent },
    { path: 'testRec/edit/:id', component: TestRecDetailComponent },
    { path: 'testRec/view/:id', component: TestRecDetailComponent },
    { path: 'testRec', redirectTo: 'testRec/index', pathMatch: 'full' },
    { path: 'index', redirectTo: 'testRec/index', pathMatch: 'full' },
    { path: '', redirectTo: 'testRec/index', pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppBaseModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    TestRecListComponent,
    TestRecDetailComponent
  ],
  providers: [TestRecService]
})
export class DemoModule { }
