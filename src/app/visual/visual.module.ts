import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { BaseVisModule } from "./demo/base-vis.module";


import { PageComponent } from './page.component';
import { VisualIndexComponent } from './visual-index.component';
import { VisualSortComponent } from './visual-sort.component';

import { VisualService } from './visual.service';

import { MydatepickerDirective } from './mydatepicker.directive';



const routes: Routes = [
        { path: 'index', component: VisualIndexComponent },
        { path: 'sort', component: VisualSortComponent },
        { path: '', redirectTo: 'index', pathMatch: 'full' }
];


@NgModule({
    imports: [
        //BrowserModule,
        CommonModule,
        //BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        BaseVisModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        VisualIndexComponent,
        VisualSortComponent,
        MydatepickerDirective
    ],
    providers: [VisualService]

})


export class VisualModule { }
