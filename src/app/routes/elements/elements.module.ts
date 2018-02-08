import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DndModule } from 'ng2-dnd';

import { ElementsRoutingModule } from './elements-routing.module';

import { ButtonsComponent } from './buttons/buttons.component';
import { NotificationComponent } from './notification/notification.component';
import { ModalComponent } from './modal/modal.component';
import { ModelCustomComponent } from './modal/custom.component';
import { SpinComponent } from './spin/spin.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { GridComponent } from './grid/grid.component';
import { GridMasonryComponent } from './gridmasonry/gridmasonry.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsFontComponent } from './iconsfont/iconsfont.component';
import { ColorsComponent } from './colors/colors.component';
import { DemoSortableComponent } from './sortable/sortable.component';
import { SweetAlertComponent } from './sweetalert/sweetalert.component';

const TreeAntdDemoComponentes = [
    // TreeAntdBasicComponent,
    // TreeAntdAsyncComponent,
    // TreeAntdDraggableComponent,
    // TreeAntdSearchableComponent,
    // TreeAntdLineComponent
];

@NgModule({
    imports: [
        SharedModule,
        ElementsRoutingModule,
        DndModule.forRoot()
    ],
    declarations: [
        ButtonsComponent,
        NotificationComponent,
        ModalComponent,
        ModelCustomComponent,
        SpinComponent,
        DropdownComponent,
        GridComponent,
        GridMasonryComponent,
        TypographyComponent,
        IconsFontComponent,
        ColorsComponent,
        ...TreeAntdDemoComponentes,
        DemoSortableComponent,
        SweetAlertComponent
    ],
    entryComponents: [
        ModelCustomComponent
    ]
})
export class ElementsModule { }
