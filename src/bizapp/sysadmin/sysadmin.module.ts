import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppBaseModule } from '../base/app-base.module';
import { HomeComponent } from './home.component';

import { ExtrasPoiComponent } from './poi/poi.component';
import { ExtrasPoiEditComponent } from './poi/edit/edit.component';


const routes: Routes = [
    { path: 'home', component: HomeComponent },            
    { path: 'poi', component: ExtrasPoiComponent },        
    { path: '**', redirectTo: 'poi' }
];

@NgModule({
    imports: [
        CommonModule,
        AppBaseModule,
        HttpClientModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        HomeComponent,
        ExtrasPoiComponent,
        ExtrasPoiEditComponent
    ],
    exports: [
        RouterModule
    ],
    entryComponents: [
        ExtrasPoiEditComponent
    ]
})
export class SysAdminModule { }
