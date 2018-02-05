import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AppBaseModule } from '../../../bizapp/base/controls/v2/my-base.module';
import { RegionalComponent } from './regional/regional.component';
import { RegionalService } from './regional.service';
import { CommonModule } from '../VehicleCommon/commom.module';
const routes: Routes = [
    { path: 'list', component: RegionalComponent}
];

@NgModule({
    imports: [
        SharedModule,
        AppBaseModule,
        CommonModule,
        RouterModule.forChild(routes)
    ],
    providers: [RegionalService],
    declarations: [
        RegionalComponent
    ],
    exports: [
        RouterModule
    ]
})
export class RegionalModule { }
