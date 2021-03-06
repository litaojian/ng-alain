import { NgModule, ModuleWithProviders }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ChooseIconComponent }  from './chooseIcon.component';
import { AreaComponent }  from './areachoose.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
// import { NzTreeModule } from 'ng-tree-antd';
import { TreeModule } from 'angular-tree-component';
import { MyLoadingModule } from 'ngx-widget/yg-loading/myloading.module';
import { MySelectModule } from 'ngx-widget/yg-select/myselect.module';
import { ChooseAreaService } from './areachoose.service';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgZorroAntdModule,
        // NzTreeModule,
        TreeModule,
        MySelectModule,
        MyLoadingModule,
        ReactiveFormsModule
    ],
    exports:[
        ChooseIconComponent,
        AreaComponent
    ],
    declarations: [
        ChooseIconComponent,
        AreaComponent
    ],
    providers: [
         ChooseAreaService
    ],
    entryComponents:[AreaComponent]
}) 

export class MyChooseIconModule {
    constructor() {

    }
}
