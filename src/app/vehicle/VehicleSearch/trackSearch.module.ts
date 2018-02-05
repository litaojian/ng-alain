import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AppBaseModule } from '../../../bizapp/base/controls/v2/my-base.module';
import { trackSearchComponent } from './trackSearch/trackSearch.component';
import { TrackSearchService } from './trackSearch.service';
const routes: Routes = [
    { path: 'list', component: trackSearchComponent,data: { title: '轨迹查询' }, pathMatch: 'full'}
];

@NgModule({
    imports: [
        SharedModule,
        AppBaseModule,
        RouterModule.forChild(routes)
    ],
    providers: [TrackSearchService],
    declarations: [
        trackSearchComponent
    ],
    exports: [
        RouterModule
    ]
})
export class TrackModule { }
