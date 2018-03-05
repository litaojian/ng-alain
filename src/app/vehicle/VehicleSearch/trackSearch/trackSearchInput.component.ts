import { Component,Injector } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { Router, NavigationExtras,ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { trackSearchComponent } from './trackSearch.component';
import { TrackSearchService } from '../trackSearch.service';
import { tap, map, mergeMap, catchError } from 'rxjs/operators';
declare var $:any;
@Component({ 
    selector: 'searchInput',
    templateUrl: './trackSearch.component.html',
    styleUrls: ['./trackSearch.component.css'],
    providers:[DatePipe]
})
export class trackSearchInputComponent extends trackSearchComponent {
    searchInput2:any;
    searchInput:any;
    constructor(
          injector:Injector
        ) {
        super(injector);
          this.searchInput2={
               
          }
          this.searchInput=[];
        
          }

  ngOnInit() {      
          //接收传递的值
          this.activeRoute.queryParams.subscribe(params => {
            //   this.searchtest.hphm = params['hphm'];
              if(params['hphm']!=undefined){
                this.showSearchList=false;
                this.searchInput=[{
                    hphm:params['hphm'],
                    beginDate:params['kssj'],
                    endDate:params['jssj']
                }];
                this.searchInput2=$.extend({},this.pagination);
                this.searchInput2.param=this.searchInput;
                this.loading=true;
                this.searchLists(this.searchInput2);
              }else{
                // this.searchtest.hphm = '';
              }
            
          }); 
    }
}
