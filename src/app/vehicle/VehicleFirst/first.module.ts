import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AppBaseModule } from '../VehicleCommon/controls/v2/my-base.module';
import { FirstComponent } from './first/first.component';
import { FirstService } from './first.service';
import { CommonModule } from '../VehicleCommon/commom.module';
// import { MySelectModule } from 'yg-widget/yg-select/myselect.module';
const routes: Routes = [
    { path: 'list', component: FirstComponent, pathMatch: 'full'}
];

@NgModule({
    imports: [
        SharedModule,
        AppBaseModule,
        CommonModule,
        RouterModule.forChild(routes)
    ],
    providers: [FirstService],
    declarations: [
        FirstComponent
    ],
    exports: [
        RouterModule
    ],
    entryComponents:[]
})
export class FirstModule { }
