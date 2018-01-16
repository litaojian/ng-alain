import { NgModule, ModuleWithProviders }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { MySelectModule } from './myselect/myselect.module';

@NgModule({
    imports: [
        CommonModule,
        MySelectModule
    ],
     exports:[
        MySelectModule
    ],
}) 

export class MyAppBaseModule {
    constructor() {

    }
}
