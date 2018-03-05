import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule, ModuleWithProviders }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent }  from '../v2/mytime.component';
import { MyDatePickerComponent }  from '../v2/mydatepicker.component';
import { ModalComponent }  from '../v2/mymodal.component';
// import { HeaderSearchComponent }  from '../v2/searchInput.component';
@NgModule({
    imports: [
        CommonModule, 
        FormsModule,
        RouterModule,
        NgZorroAntdModule,
        ReactiveFormsModule
    ],
    exports:[
        MyDatePickerComponent,
        CounterComponent,
        ModalComponent
        // HeaderSearchComponent
    ],
    declarations: [
        MyDatePickerComponent,
        CounterComponent,
        ModalComponent
        // HeaderSearchComponent
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
