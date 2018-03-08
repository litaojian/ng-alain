import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { SearchComponent } from './search.component';
import { QueryDialogComponent } from './query.dialog.component';

const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: SearchComponent, pathMatch: 'full'}
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        SearchComponent,
        QueryDialogComponent
    ],
    entryComponents:[
        QueryDialogComponent
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class VehicleSearchModule { }
