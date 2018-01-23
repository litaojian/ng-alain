import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AppBaseModule } from '../../../bizapp/base/controls/v2/my-base.module';
import { PeerComponent } from './peer/peer.component';
import { PeerService } from './peer.service';
const routes: Routes = [
    { path: 'list', component: PeerComponent}
];

@NgModule({
    imports: [
        SharedModule,
        AppBaseModule,
        RouterModule.forChild(routes)
    ],
    providers: [PeerService],
    declarations: [
        PeerComponent
    ],
    exports: [
        RouterModule
    ]
})
export class PeerModule { }
