import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AppBaseModule } from '../VehicleCommon/controls/v2/my-base.module';
import { CommonModule } from '../VehicleCommon/commom.module';
import { FrequentComponent } from './frequent/frequent.component';
import { FrequentService } from './frequent.service';
import { RecentCarModalComponent} from '../VehicleCommon/commom/recent-car-modal.component';
// import { CardetailModalComponent} from '../VehicleCommon/commom/car-detail-modal.component';
const routes: Routes = [
    { path: 'list', component: FrequentComponent, pathMatch: 'full'}
];

@NgModule({
    imports: [
        SharedModule,
        AppBaseModule,
        CommonModule,
        RouterModule.forChild(routes)
    ],
    providers: [FrequentService],
    declarations: [
        FrequentComponent
    ],
    exports: [
        RouterModule
    ],
    entryComponents:[]
})
export class FrequentModule { }
