import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouteReuseStrategy } from '@angular/router';

import { MyReuseTabComponent } from './reuse-tab.component';
import { MyReuseTabService } from './my-reuse-tab.service';
import { ReuseTabStrategy } from './reuse-tab.strategy';

const COMPONENTS = [MyReuseTabComponent];

// region: zorro modules

import { NzTabsModule, NzButtonModule, NzPopconfirmModule } from 'ng-zorro-antd';

const ZORROMODULES = [ NzTabsModule, NzButtonModule, NzPopconfirmModule ];

// endregion

@NgModule({
    imports:        [CommonModule, RouterModule, ...ZORROMODULES],
    declarations:   [...COMPONENTS],
    exports:        [...COMPONENTS]
})
export class MyReuseTabModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MyReuseTabModule,
            providers: [
                MyReuseTabService,
                { provide: RouteReuseStrategy, useClass: ReuseTabStrategy, deps: [ MyReuseTabService ] }
            ]
        };
    }
}
