import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
// import { AppBaseModule } from "../../../bizapp/base/app-base.module";

import { ControlListComponent } from "./controlList.component";
import { ControlModifyComponent} from "./controlModify.component";

import { ControlListService } from "./controlList.service";

const routes = [
    { path:'index', component:ControlListComponent, data:{ title: '布控列表' }},
    { path:'create', component:ControlModifyComponent,data:{ title:'布控新增'}},
    { path:'edit', component:ControlModifyComponent,data:{ title:'布控编辑'}}
];

@NgModule({
    imports: [
        SharedModule, //框架
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
    declarations: [ControlListComponent,ControlModifyComponent],
    providers: [ControlListService]
})
export class VehicleControlModule {}
