import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AppBaseModule } from '../../../bizapp/base/controls/v2/my-base.module';
import { TabpaneComponent } from './commom/tab-pane.component';
import { CommonService } from './commom.service';
import { RecentCarModalComponent} from '../VehicleCommon/commom/recent-car-modal.component';
import { CardetailModalComponent} from '../VehicleCommon/commom/car-detail-modal.component';
@NgModule({
    imports: [
        SharedModule,
        AppBaseModule
    ],
    providers: [CommonService],
    declarations: [
        TabpaneComponent,
        RecentCarModalComponent,
        CardetailModalComponent
    ],
    exports: [
        TabpaneComponent,
        RecentCarModalComponent,
        CardetailModalComponent
    ],
    entryComponents:[RecentCarModalComponent,CardetailModalComponent]
})
export class CommonModule { }
