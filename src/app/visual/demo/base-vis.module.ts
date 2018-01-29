import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClbkComponet } from "./clbk.component";
import { QszxlComponent } from "./qszxl.component";

@NgModule({
    declarations: [
        ClbkComponet,
        QszxlComponent
    ],
    imports: [ CommonModule ],
    exports: [
        ClbkComponet,
        QszxlComponent
    ],
    providers: [],
})
export class BaseVisModule {}
