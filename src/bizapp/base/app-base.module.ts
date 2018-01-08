import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule,ReactiveFormsModule}    from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { MyTableComponent }  from './controls/mytable.component';
import { MyFormComponent }  from './controls/myform.component';
import { MySelectComponent }  from './controls/myselect.component';
import { MyUploaderComponent }  from './controls/myuploader.component';
import { MyLookupComponent }  from './controls/mylookup.component';
import { MyTextEditorComponent }  from './controls/mytexteditor.component';
import { MyInputComponent }  from './controls/myinput.component';
import { MyTreeComponent }  from './controls/mytree.component';
import { ZxTreeComponent }  from './controls/zxtree.component';
import { MyTreeSelectComponent }  from './controls/mytreeselect.component';
import { MyLabelComponent }  from './controls/mylabel.component';

import { ValuelistDirective }  from './directives/valuelist.directive';
import { ZxFormInputDirective }  from './directives/zx.forminput.directive';

import { ValueFilterPipe }  from './pipes/valuefilter.pipe';

import { PanelHeaderComponent }  from './panel-header.component';
import { PanelToolbarComponent }  from './panel-toolbar.component';
import { BaseDialogComponent }  from './base-dialog.component';

import { ValueListDataService } from './valuelist-data.service';
import { ZxTreeService } from './controls/zxtree.service';
import { MenuTreeService } from './menu-tree.service';
import { DialogService }  from './dialog.service';

@NgModule({
  imports: [
		CommonModule,
		HttpModule,
		JsonpModule,		
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		NgZorroAntdModule
  ],
  exports:[
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		MyUploaderComponent,
		MyTextEditorComponent,
		MySelectComponent,
		MyLabelComponent,
		MyTableComponent,
		MyFormComponent,
		MyLookupComponent,
		MyUploaderComponent,
		MyTextEditorComponent,
		MyInputComponent,
		MyTreeComponent,
		ZxTreeComponent,
		MyTreeSelectComponent,
		PanelToolbarComponent,
		PanelHeaderComponent,
		NgZorroAntdModule,
		ValuelistDirective,
		ZxFormInputDirective,
		ValueFilterPipe
  ],
  declarations: [
		BaseDialogComponent,
		MyUploaderComponent,
		MyTextEditorComponent,
		MySelectComponent,
		MyLabelComponent,
		MyLookupComponent,
		MyTableComponent,
		MyFormComponent,
		MyUploaderComponent,
		MyTextEditorComponent,
		MyInputComponent,
		MyTreeComponent,
		ZxTreeComponent,
		MyTreeSelectComponent,
		PanelToolbarComponent,
		PanelHeaderComponent,
		ValuelistDirective,
		ZxFormInputDirective,
		ValueFilterPipe
	],  
  entryComponents:[
	BaseDialogComponent
  ],
  providers: [
	ValueListDataService, 
	MenuTreeService,
	ZxTreeService,
    DialogService
  ]
})
export class AppBaseModule {
  constructor() {
   
  }  
}
