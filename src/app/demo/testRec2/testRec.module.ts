import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { YgSharedModule } from '../../shared/yg.shared.module';

import { TestRecService } from './testRec.service';
import { TestRecListComponent, TestRecDetailComponent } from './testRec.component';


const routes: Routes = [
  { path: 'index', component: TestRecListComponent},
  { path: 'create', component: TestRecDetailComponent},
  { path: 'edit', component: TestRecDetailComponent},
  { path: 'view', component: TestRecDetailComponent },
  { path: '/', redirectTo: 'index', pathMatch: 'full' },
  { path: '', redirectTo: 'index', pathMatch: 'full' }  
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    YgSharedModule
  ],
  declarations: [
    TestRecListComponent,
    TestRecDetailComponent
  ],
  providers: [TestRecService]
})

export class TestRecModule { }
