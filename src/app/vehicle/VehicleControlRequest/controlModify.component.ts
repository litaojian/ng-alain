import { Component, OnInit, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BaseDetailComponent } from "../../../bizapp/base/base-detail.component";
import { ControlListService } from "./controlList.service";

@Component({
    selector: 'app-modify',
    templateUrl: './controlModify.component.html',
    providers:[DatePipe],
    styles:[`
        .req{
            color:red;
        }
    `]
})
export class ControlModifyComponent extends BaseDetailComponent implements OnInit {
    editIndex = -1;
    editObj = {};
    car:any = {};

    form: FormGroup;
    users: any[] = [
        { value: 'xiao', label: '付晓晓' },
        { value: 'mao', label: '周毛毛' }
    ];

    selectList:object = {};

    constructor(
        private fb: FormBuilder,
        private datePipe:DatePipe,
        controlListService:ControlListService,
        private cl:ControlListService,
        injector:Injector
    ) {
        super(injector,controlListService);
        this.selectList = controlListService.getSelectList();
    };
    ngOnInit() {
        this.form = this.fb.group({
            hphm: [null,[Validators.required]],
            hpzl: [null,[Validators.required]],
            bklb: [null,[Validators.required]],
            bkdl: [null,[Validators.required]],
            bkxz: [null,[Validators.required]],
            bkjb: [null,[Validators.required]],
            bkqssj: [null,[Validators.required]],
            bkjzsj: [null,[Validators.required]],
            bjya: [null,[Validators.required]],
            name3 : [null, [Validators.required]],
            owner2 : [null, [Validators.required]],
            city : [null, [Validators.required]],
            sqsb : [false,[]],
            sqrq : [null,[]],
            sqdw : [null,[]],
            sqr : [null,[]]
            // items: this.fb.array([])
        });

        // this.formData['sqsb'] = true;
        this.cl.getUserInfo().then(res=>{
            this.formData['sqr'] = res['yhmc']
            this.formData['sqdw'] = res['glbm'];
            this.formData['sqrq'] = this.datePipe.transform(new Date(), 'y-MM-dd');
        });
    }


    //#region get form fields
    // get name() { return this.form.controls.name; }
    // get url() { return this.form.controls.url; }
    get hphm() { return this.form.controls.hphm}
    get hpzl() { return this.form.controls.hpzl}
    get bklb() { return this.form.controls.bklb; }
    get bkdl() { return this.form.controls.bkdl; }
    get bkxz() { return this.form.controls.bkxz; }
    get bkjb() { return this.form.controls.bkjb; }
    get bkqssj() { return this.form.controls.bkqssj; }
    get bkjzsj() { return this.form.controls.bkjzsj; }
    get bjya() { return this.form.controls.bjya; }
    get sqsb() { return this.form.controls.sqsb; }
    get sqry() { return this.form.controls.sqry; }
    get sqdw() { return this.form.controls.sqdw; }
    get sqrj() { return this.form.controls.sqrj; }
    get city() { return this.form.controls.city; }
    // get owner() { return this.form.controls.owner; }
    // get approver() { return this.form.controls.approver; }
    // get time_start() { return this.form.controls.time_start; }
    // get time_end() { return this.form.controls.time_end; }
    // get type() { return this.form.controls.type; }
    // get name2() { return this.form.controls.name2; }
    get name3() { return this.form.controls.name3; }
    // get summary() { return this.form.controls.summary; }
    get owner2() { return this.form.controls.owner2; }
    // get approver2() { return this.form.controls.approver2; }
    // get time() { return this.form.controls.time; }
    // get type2() { return this.form.controls.type2; }
    // get items() { return this.form.controls.items as FormArray; }
    //#endregion

    // add() {
    //     this.items.push(this.createUser());
    //     this.edit(this.items.length - 1);
    // }

    // del(index: number) {
    //     this.items.removeAt(index);
    // }

    // edit(index: number) {
    //     if (this.editIndex !== -1 && this.editObj) {
    //         this.items.at(this.editIndex).patchValue(this.editObj);
    //     }
    //     this.editObj = { ...this.items.at(index).value };
    //     this.editIndex = index;
    // }

    // save(index: number) {
    //     this.items.at(index).markAsDirty();
    //     if (this.items.at(index).invalid) return ;
    //     this.editIndex = -1;
    // }

    // cancel(index: number) {
    //     if (!this.items.at(index).value.key) {
    //         this.del(index);
    //     } else {
    //         this.items.at(index).patchValue(this.editObj);
    //     }
    //     this.editIndex = -1;
    // }

    _submitForm() {
        // debugger;
        // let a = this.datePipe.transform(this.form.value.owner2, 'y-MM-dd');
        for (const i in this.form.controls) {
            this.form.controls[ i ].markAsDirty();
        }
        if (this.form.invalid) return ;
        if(!this.formData['id']){//模仿自生成布控单编号
            this.formData['id'] = Math.round(Math.random()*100000);
        }
        this.formGroup = this.form;
        this.onSubmitBtnClick();
    }
}
