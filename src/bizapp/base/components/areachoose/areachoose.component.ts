import { Component, Input, OnInit } from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';
import { ChooseAreaService } from './areachoose.service';
import { ITreeOptions } from 'angular-tree-component';
declare var $: any;
@Component({
  selector: 'nz-area2',
  templateUrl:'./areachoose.component.html',
  styleUrls: ['./areachoose.component.css']
})
export class AreaComponent implements OnInit {
  _cityUrl: string;
  _kkUrl: string;
  myLoading = false; 
  data: any[] = [];
  nodes: any[] = [];
  pagination:any;
  searchList:any;
  datanums:any
  indexList: any[] = [];
  kkLists:any={
     kkList:[],
     kkListBh:[]
  }
  @Input()
  set cityUrl(value: string) {
    this._cityUrl = value;
  }
  @Input()
  set searchkkUrl(value: string) {
    this._kkUrl = value;
  }
  constructor(private subject: NzModalSubject,private chooseAreaService: ChooseAreaService) {
    // this.subject.on('onDestory', () => {
    //   console.log('destroy');
    // });
    this.pagination={
         pageIndex:1,
         pageSize:10,
         kkmc:''
    }

  }
// node =[{
//       id: '1',
//       dmsm1: 'root1',
//       children: [{id: '2', dmsm1: '市辖区'}]
//     }]
options: ITreeOptions = {
    idField: 'dmz',
    displayField: 'dmsm1',
    childrenField: 'children'
};
ngOnInit() {
    // console.log(this.node);
    this.chooseAreaService.getCityList(this._cityUrl).subscribe(data => { 
                data = data.rows || data.data;           
                this.nodes=data;
    });
}
  _console(e,kkmc,kkbh) {
        if(e==true){
           this.kkLists.kkList.push(kkmc); 
           this.kkLists.kkListBh.push(kkbh); 
        }else{
           for(let i=0;i<this.kkLists.kkList.length;i++){
                    if(this.kkLists.kkList[i]==kkmc){
                    this.kkLists.kkList.splice(i,1);
                    }
                }
            for(let i=0;i<this.kkLists.kkListBh.length;i++){
                if(this.kkLists.kkListBh[i]==kkbh){
                   this.kkLists.kkListBh.splice(i,1);
                }
            }
        }
    console.log(this.kkLists);
  }
  emitDataOutside() {
     this.subject.next(this.kkLists);
     this.subject.destroy('onCancel');
  }

  handleCancel(e) {
     this.subject.destroy('onCancel');
  }
  indexChange(e){
     this.pagination.pageIndex=e;
     this.searchKK();
  }
  getKKou(citys){
      console.log(citys);
     this.pagination.xzqh=citys;
     this.searchKK();
  }
  searchKK(){
     this.myLoading=true;
     this.searchList=$.extend({},this.pagination);
     this.chooseAreaService.getCityValue(this._kkUrl,this.searchList).subscribe(data => { 
                  let res = data.rows || data.data;             
                  this.data=res;
                  this.datanums=data.total;
                  for(let i=0;i<this.data.length;i++){
                        this.data[i].checked=false;
                   }
                  this.myLoading=false;
                  console.log(this.data);
     });
  }
}