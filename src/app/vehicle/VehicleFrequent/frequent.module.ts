import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AppBaseModule } from '../../../bizapp/base/controls/v2/my-base.module';
import { FrequentComponent } from './frequent/frequent.component';
import { FrequentService } from './frequent.service';
const routes: Routes = [
    { path: 'list', component: FrequentComponent}
];

@NgModule({
    imports: [
        SharedModule,
        AppBaseModule,
        RouterModule.forChild(routes)
    ],
    providers: [FrequentService],
    declarations: [
        FrequentComponent
    ],
    exports: [
        RouterModule
    ]
})
export class FrequentModule { }
