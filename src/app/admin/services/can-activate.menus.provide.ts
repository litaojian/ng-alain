import { Injectable, Injector } from '@angular/core';
import { CanActivate, CanLoad, Router, Route, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { tap, map, mergeMap, catchError } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { MenuService } from '@delon/theme';
import { MyDataService } from './my.data.service';

@Injectable()
export class CanActivateMenusProvide implements CanActivate {

    constructor(injector:Injector,private router: Router, private menuService:MenuService, private myDataService:MyDataService) {}


    checkLoginAndPermission(url: string): boolean | Observable<boolean> | Promise<boolean> {
        return false;
    }    

    canLoad(route: Route):  boolean | Observable<boolean> | Promise<boolean>  {
        let url = `/${route.path}`;
        return this.checkLoginAndPermission(url);
    }

    canActivate(        
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        
        console.log("canActivate:" + route.url);

        if (this.menuService.menus.length == 0){

            console.log("canActivate: 菜单数据未初始化.....");

            return this.myDataService.loadSysMenu().pipe(
                mergeMap((data: any) => {
                    // 若一切都正常，则后续操作
                    //console.log("得到http的请求数据.....");
                    this.menuService.add(data.menu);                    
                    return Observable.create(observer => {
                        observer.next(true);
                        observer.complete();
                    });
                }),
                catchError((err:any) => {
                    // 以错误的形式结束本次请求
                    //console.log("canActivate loadSysMenu error:" + err);
                    return ErrorObservable.create(false);
                })
            );

        }else{
            return new Observable((observer) => {
                //this.msg.error('请先登录');
                observer.next(true);
                observer.complete();
            });
                
        }  
    }

}
