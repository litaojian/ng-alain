import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { IndexComponent } from '../bizapp/index.component';

const routes: Routes = [           
    { path: 'index', component: IndexComponent },    
    { path: '', redirectTo: 'index', pathMatch: 'full' }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        HttpClientModule,        
        NgZorroAntdModule.forRoot(),
        RouterModule.forRoot(routes, { useHash: true })
    ],
    declarations: [
        IndexComponent 
    ],
    exports: [
        RouterModule
    ],
    entryComponents:[
    ],
    providers:[
    ]
})

export class BizAppModule {}
