import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '@shared/shared.module';

import { TestRecService } from './test-rec/testRec.service';
import { TestRecListComponent, TestRecDetailComponent } from './test-rec/testRec.component';
import { PageContainerComponent } from '../admin/page.container.component';


const routes: Routes = [
  {
    path: 'testRec',
    component: PageContainerComponent,
    children: [
      { path: 'index', component: TestRecListComponent},
      { path: 'create', component: TestRecDetailComponent},
      { path: 'edit', component: TestRecDetailComponent },
      { path: 'view', component: TestRecDetailComponent },
      { path: '/', redirectTo: 'index', pathMatch: 'full' },
      { path: '', redirectTo: 'index', pathMatch: 'full' }  
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule, 
    RouterModule.forChild(routes)
  ],
  declarations: [
    PageContainerComponent,
    TestRecListComponent,
    TestRecDetailComponent
  ],
  providers: [TestRecService]
})
export class DemoModule { }
