import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AppBaseModule } from '../VehicleCommon/controls/v2/my-base.module';
import { trackSearchComponent } from './trackSearch/trackSearch.component';
import { trackSearchInputComponent } from './trackSearch/trackSearchInput.component';
import { TrackSearchService } from './trackSearch.service';
import { CommonModule } from '../VehicleCommon/commom.module';
const routes: Routes = [
    { path: 'list', component: trackSearchComponent,data: { title: '轨迹查询' }, pathMatch: 'full'},
    { path: 'input', component: trackSearchInputComponent,data: { title: '全局查询' }, pathMatch: 'full'}
];

@NgModule({
    imports: [
        SharedModule,
        AppBaseModule,
        CommonModule,
        RouterModule.forChild(routes)
    ],
    providers: [TrackSearchService],
    declarations: [
        trackSearchComponent,
        trackSearchInputComponent
    ],
    exports: [
        RouterModule
    ]
})
export class TrackModule { }
