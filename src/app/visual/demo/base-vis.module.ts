import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClbkComponet } from "./clbk.component";
import { QszxlComponent } from "./qszxl.component";
import { ZdclsComponent} from "./zdcls.component";
import { QsyjsComponent } from "./qsyjs.component";
import { ZdclqsComponent } from "./zdclqs.component";
import { GchbComponent } from "./gchb.component";
import { HeadMapComponent } from "./head-map.component";

@NgModule({
    declarations: [
        ClbkComponet,
        QszxlComponent,
        ZdclsComponent,
        QsyjsComponent,
        ZdclqsComponent,
        GchbComponent,
        HeadMapComponent
    ],
    imports: [ CommonModule ],
    exports: [
        ClbkComponet,
        QszxlComponent,
        ZdclsComponent,
        QsyjsComponent,
        ZdclqsComponent,
        GchbComponent,
        HeadMapComponent
    ],
    providers: [],
})
export class BaseVisModule {}
