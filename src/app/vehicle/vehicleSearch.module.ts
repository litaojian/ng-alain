import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { SearchComponent } from './search/search.component';
import { QueryDialogComponent } from './search/query.dialog.component';
import { mySearchComponent } from './mySearch/search.component';
import { myQueryDialogComponent } from './mySearch/query.dialog.component';
const routes: Routes = [
    { path: 'search', component: SearchComponent,data: { title: '过车查询' } },
    { path: 'mySearch', component: mySearchComponent,data: { title: '过车查询' } }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [],
    declarations: [
        SearchComponent,
        QueryDialogComponent,
        mySearchComponent,
        myQueryDialogComponent
    ],
    entryComponents:[
        QueryDialogComponent,
        myQueryDialogComponent
    ],
    exports: [
        RouterModule
    ]
})
export class VehicleSearchModule { }
