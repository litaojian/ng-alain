import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// delon
import { NgZorroAntdExtraModule } from 'ng-zorro-antd-extra';
import { AlainThemeModule } from '@delon/theme';
import { AlainACLModule } from '@delon/acl';
import { ZORROMODULES, ABCMODULES } from '../delon.module';
// i18n
import { TranslateModule } from '@ngx-translate/core';

// region: third libs
import { CountdownModule } from 'ngx-countdown';
import { AppBaseModule } from 'bizapp/base/app-base.module';
// import { MyAppBaseModule } from 'bizapp/base/components/myapp-base.module';
import { MySelectModule } from 'bizapp/base/components/myselect/myselect.module';
import { MyChooseIconModule } from 'bizapp/base/components/areachoose/chooseIcon.module';
import { MyLoadingModule } from 'bizapp/base/components/myloading/myloading.module';
import { MyReuseTabModule } from '../admin/reuse-tab/reuse-tab.module';

const THIRDMODULES = [ CountdownModule];
// endregion


// region: your componets & directives
const COMPONENTS = [];
const DIRECTIVES = [];
// endregion

@NgModule({  
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        ...ZORROMODULES,
        NgZorroAntdExtraModule,
        AlainThemeModule.forChild(),
        ...ABCMODULES,
        AlainACLModule,
        // third libs
        AppBaseModule,
        MyReuseTabModule.forRoot(),
        MySelectModule,
        MyLoadingModule,
        MyChooseIconModule,
        ...THIRDMODULES
    ],
    declarations: [
        // your components
        ...COMPONENTS,
        ...DIRECTIVES
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ...ZORROMODULES,
        NgZorroAntdExtraModule,
        AlainThemeModule,
        ...ABCMODULES,
        // i18n
        TranslateModule,
        // third libs
        AppBaseModule,
        MySelectModule,
        MyChooseIconModule,
        MyLoadingModule,
        MyReuseTabModule,
        ...THIRDMODULES,
        // your components
        ...COMPONENTS,
        ...DIRECTIVES
    ]
})
export class SharedModule { }
