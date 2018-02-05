import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClbkComponet } from "./clbk.component";
import { QszxlComponent } from "./qszxl.component";
import { ZdclsComponent} from "./zdcls.component";
import { QsyjsComponent } from "./qsyjs.component";

@NgModule({
    declarations: [
        ClbkComponet,
        QszxlComponent,
        ZdclsComponent,
        QsyjsComponent
    ],
    imports: [ CommonModule ],
    exports: [
        ClbkComponet,
        QszxlComponent,
        ZdclsComponent,
        QsyjsComponent
    ],
    providers: [],
})
export class BaseVisModule {}
