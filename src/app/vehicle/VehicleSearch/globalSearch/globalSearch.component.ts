import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { Router, NavigationExtras,ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { TrackSearchService } from '../trackSearch.service';
@Component({ 
    selector: 'app-acl',
    templateUrl: './globalSearch.component.html',
    styleUrls: ['./globalSearch.component.css'],
    providers:[DatePipe]
})
export class globalSearchComponent {
    expandForm = false;
    datanums:any;
    type:any;
    showSearch= true;
    _value: any[] = null;
    loading = false;  
    datas: any[] = [];
    dataOne: any[] = [];
    list: any[] = [];
    pagination: any;
    search: any;
    searchFormTop: any;
    searchOption: any;
    putout: any;
    // newDate: any;
    // oneweekdate: any;
    options: any;
    selectedOption: any;
    countyList: any;
    kkList: any;
    currentModal;
    dcList:any=[{"dmz": "01", "dmsm1": "数据列表"},{"dmz": "26", "dmsm1": "过车图片"}];
    constructor(
        private modalService: NzModalService,
        private DatePipe: DatePipe,
        private TrackSearchService: TrackSearchService,
        public msg: NzMessageService,
        public activeRoute: ActivatedRoute,
        public router: Router
        ) {
        this.searchFormTop={
             _limit:5,
             _page:1
        };
        this.search = {
                clpp:'',
                hphm:'',
                csysmc:'',
                gcsj_gt:'',
                gcsj_lte:'',
                kkmc:'',
                hpzl:'',
                qx:'',
                types:'',
                _limit:5,
                _page:1
             };
          this.putout={
              dcnr:'',
              dcsl:''
          }
        
        }

  ngOnInit() {
          //接收传递的值
          this.activeRoute.queryParams.subscribe(params => {
              this.search.hphm = params['hphm'];
              this.getSearchData(1);
          });
          // alert(this.search.hphm);
          // this.getSearchData(1);
          // this.seachCounty(this.search.xzqh);
          // this.seachKK(this.search.qx);
  }
  ngOnChanges(changes) {
        console.log('ngOnChanges');

    }
  isVisible = false;
  putOut = () => {
    this.isVisible = true;
  }
  handleCancel = () => {
    this.isVisible = false;
  }
  getSearchData(num) {

       if( this.search.gcsj_gt==''|| this.search.gcsj_lte==''){
           this.msg.create('error','开始时间和结束时间不能为空');
           return;
       }
       this.loading=true;
        // alert(num);
        this.search._page=num;
        this.TrackSearchService.getTrackSearch(this.search).subscribe(data => {  
           this.expandForm=true; 
           this.loading=false;    
           this.datas=data.rows;
           this.search._page=data.pagination.page;
           this.datanums=data.total;
        });
       
  }
 carDetail(titleTpl, contentTpl, footerTpl,fxbh,width) {
    this.TrackSearchService.getTrackSearchByOne({'fxbh':fxbh}).subscribe(data => {        
        this.dataOne=data.rows[0];
        // console.log(this.dataOne);
    });
    this.currentModal = this.modalService.open({
      title       : titleTpl,
      content     : contentTpl,
      footer      : footerTpl,
      width      : width,
      maskClosable: false,
      onOk() {
        console.log('Click ok');
      }
    });
  } 
 }
