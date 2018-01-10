import { RouteReuseStrategy, ActivatedRouteSnapshot } from '@angular/router';
import { MyReuseTabService } from './my-reuse-tab.service';

export class ReuseTabStrategy implements RouteReuseStrategy {
    constructor(private srv: MyReuseTabService) {}

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return this.srv.shouldDetach(route);
    }
    store(route: ActivatedRouteSnapshot, handle: {}): void {
        this.srv.store(route, handle);
    }
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return this.srv.shouldAttach(route);
    }
    retrieve(route: ActivatedRouteSnapshot): {} {
        return this.srv.retrieve(route);
    }
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return this.srv.shouldReuseRoute(future, curr);
    }

}
