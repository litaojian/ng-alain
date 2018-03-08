import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { Test2Component } from './test2.component';
import { TestRecService } from '../testRec2/testRec.service';


const routes: Routes = [
    { path: '', redirectTo: 'test2', pathMatch: 'full' },
    { path: 'test2', component: Test2Component, pathMatch: 'full'}
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [TestRecService],
    declarations: [
        Test2Component
    ],
    exports: [
        RouterModule
    ]
})
export class Test2Module { }
