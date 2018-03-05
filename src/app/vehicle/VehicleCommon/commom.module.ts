import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TabpaneComponent } from './commom/tab-pane.component';
import { TabPaneoneComponent } from './commom/tab-pane-one.component';
import { CommonService } from './commom.service';
import { AppBaseModule } from '../VehicleCommon/controls/v2/my-base.module';
import { MyChooseIconModule }  from './controls/v2/areachoose/chooseIcon.module';
import { RecentCarModalComponent} from '../VehicleCommon/commom/recent-car-modal.component';
import { CardetailModalComponent} from '../VehicleCommon/commom/car-detail-modal.component';
@NgModule({
    imports: [
        SharedModule,
        AppBaseModule,
        MyChooseIconModule
    ],
    providers: [CommonService],
    declarations: [
        TabpaneComponent,
        TabPaneoneComponent,
        RecentCarModalComponent,
        CardetailModalComponent
    ],
    exports: [
        TabpaneComponent,
        TabPaneoneComponent,
        RecentCarModalComponent,
        CardetailModalComponent
    ],
    entryComponents:[RecentCarModalComponent,CardetailModalComponent]
})
export class CommonModule { }
