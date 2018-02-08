import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClbkComponet } from "./clbk.component";
import { QszxlComponent } from "./qszxl.component";
import { ZdclsComponent} from "./zdcls.component";
import { QsyjsComponent } from "./qsyjs.component";
import { ZdclqsComponent } from "./zdclqs.component";
import { GchbComponent } from "./gchb.component";
import { HeatMapComponent } from "./heat-map.component";

@NgModule({
    declarations: [
        ClbkComponet,
        QszxlComponent,
        ZdclsComponent,
        QsyjsComponent,
        ZdclqsComponent,
        GchbComponent,
        HeatMapComponent
    ],
    imports: [ CommonModule ],
    exports: [
        ClbkComponet,
        QszxlComponent,
        ZdclsComponent,
        QsyjsComponent,
        ZdclqsComponent,
        GchbComponent,
        HeatMapComponent
    ],
    providers: [],
})
export class BaseVisModule {}
