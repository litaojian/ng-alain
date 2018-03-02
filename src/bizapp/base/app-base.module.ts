import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule,ReactiveFormsModule}    from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';

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
		HttpModule
  ],
  declarations: [
	],
  entryComponents:[

  ],
  providers: [
  ]
})
export class AppBaseModule {
  constructor() {

  }
}
