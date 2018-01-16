import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule, ModuleWithProviders }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MySelect2Component }  from '../v2/myselect2.component';
import { CounterComponent }  from '../v2/mytime.component';
import { MyDatePickerComponent }  from '../v2/mydatepicker.component';
import { ModalComponent }  from '../v2/mymodal.component';
import { PanelComponent }  from '../v2/mypanel.component';
import { TabelComponent }  from '../v2/mytabel.component';
import { HeaderSearchComponent }  from '../v2/searchInput.component';
@NgModule({
    imports: [
        CommonModule, 
        FormsModule,
        RouterModule,
        NgZorroAntdModule,
        ReactiveFormsModule
    ],
    exports:[
        MySelect2Component,
        MyDatePickerComponent,
        CounterComponent,
        ModalComponent,
        PanelComponent,
        TabelComponent,
        HeaderSearchComponent
    ],
    declarations: [
        MySelect2Component,
        MyDatePickerComponent,
        CounterComponent,
        ModalComponent,
        PanelComponent,
        TabelComponent,
        HeaderSearchComponent
    ],
    // entryComponents: [
    //     NzModalCustomizeComponent
    // ],
    providers: [],
}) 

export class AppBaseModule {
    constructor() {

    }
}