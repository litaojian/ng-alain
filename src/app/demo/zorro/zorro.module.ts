import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { Test1Component } from './test1.component';



const routes: Routes = [{
  path: '',
  children: [
    { path: 'index', component: Test1Component },
    { path: '', redirectTo: 'index', pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    Test1Component
  ],
  providers: []
})
export class ZorroModule { }
