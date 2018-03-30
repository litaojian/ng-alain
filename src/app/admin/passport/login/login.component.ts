import { Component, OnDestroy, Inject, Injector} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { SettingsService } from '@delon/theme';
import { SocialService, SocialOpenType, ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { BaseDetailComponent } from 'ngx-widget/my-app';
import { UserLoginService } from '../../services/user.login.service';


@Component({
    selector: 'passport-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.less' ],
    providers: [ SocialService ]
})
export class UserLoginComponent extends BaseDetailComponent implements OnDestroy {

    form: FormGroup;
    error = '';
    type = 0;
    loading = false;

    constructor(
        _injector: Injector,
        private userLoginService:UserLoginService,
        fb: FormBuilder,
        public msg: NzMessageService,
        private settingsService: SettingsService,
        private socialService: SocialService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
                     
            super(_injector, userLoginService)
            //
            this.form = fb.group({
                userName: ["user1", [Validators.required, Validators.minLength(5)]],
                password: ["123456", Validators.required],
                mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
                captcha: [null, [Validators.required]],
                remember: [true]
            });
            //
            this.activatedRoute.snapshot.data.title = "用户登录";
    }

    // region: fields

    get userName() { return this.form.controls.userName; }
    get password() { return this.form.controls.password; }
    get mobile() { return this.form.controls.mobile; }
    get captcha() { return this.form.controls.captcha; }

    // endregion

    switch(ret: any) {
        this.type = ret.index;
    }

    // region: get captcha

    count = 0;
    interval$: any;

    getCaptcha() {
        this.count = 59;
        this.interval$ = setInterval(() => {
            this.count -= 1;
            if (this.count <= 0)
                clearInterval(this.interval$);
        }, 1000);
    }

    // endregion

    submit() {
        this.error = '';
        if (this.type === 0) {
            this.userName.markAsDirty();
            this.password.markAsDirty();
            if (this.userName.invalid || this.password.invalid) return;
        } else {
            this.mobile.markAsDirty();
            this.captcha.markAsDirty();
            if (this.mobile.invalid || this.captcha.invalid) return;
        }

        // login action
        this.loading = true;        
        this.doLoginAction();

        // mock http
        // this.loading = true;  

        // mock http
        // this.loading = true;
        // setTimeout(() => {
        //     this.loading = false;
        //     if (this.type === 0) {
        //         if (this.userName.value !== 'admin' || this.password.value !== '888888') {
        //             this.error = `账户或密码错误`;
        //             return;
        //         }
        //     }

        //     this.tokenService.set({
        //         token: '123456789',
        //         name: this.userName.value,
        //         email: `cipchk@qq.com`,
        //         id: 10000,
        //         time: +new Date
        //     });
        //     this.router.navigate(['/']);
        // }, 1000);

    }

    doLoginAction(){
        let redirectUrl = this.activatedRoute.snapshot.queryParams['redirectUrl'];
        if (redirectUrl == null){
            redirectUrl = "/";
        }
        let params = {"loginId": this.userName.value, "password":this.password.value};
        let message = "";
        let options = {};
        
        
        this.userLoginService.doLoginAction(params)
            .subscribe((result: any) => {
                console.log("login result:" + JSON.stringify(result));

                if (result == null){
                    this.error  = "something is wrong.";
                    return;
                }                
                let errmsg = result["errmsg"];
                if (errmsg == null){
                    errmsg = result["resultMsg"];
                }
                if (result["userToken"] != null && result["resultCode"] == 0){                    
                    this.router.navigate([redirectUrl]);
                }else{
                    this.error = errmsg;
                }               
            });
        
    }
    // region: social

    open(type: string, openType: SocialOpenType = 'href') {
        let url = ``;
        let callback = ``;
        if (this.userLoginService.getIsTest())
            callback = 'https://cipchk.github.io/ng-alain/callback/' + type;
        else
            callback = 'http://localhost:4200/callback/' + type;

        switch (type) {
            case 'auth0':
                url = `//cipchk.auth0.com/login?client=8gcNydIDzGBYxzqV0Vm1CX_RXH-wsWo5&redirect_uri=${decodeURIComponent(callback)}`;
                break;
            case 'github':
                url = `//github.com/login/oauth/authorize?client_id=9d6baae4b04a23fcafa2&response_type=code&redirect_uri=${decodeURIComponent(callback)}`;
                break;
            case 'weibo':
                url = `https://api.weibo.com/oauth2/authorize?client_id=1239507802&response_type=code&redirect_uri=${decodeURIComponent(callback)}`;
                break;
        }
        if (openType === 'window') {
            this.socialService.login(url, '/', {
                type: 'window'
            }).subscribe(res => {
                if (res) {
                    this.settingsService.setUser(res);
                    this.router.navigateByUrl('/');
                }
            });
        } else {
            this.socialService.login(url, '/', {
                type: 'href'
            });
        }
    }

    // endregion

    ngOnDestroy(): void {
        if (this.interval$) clearInterval(this.interval$);
    }
}
