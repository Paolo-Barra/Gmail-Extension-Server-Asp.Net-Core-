import { PermissionCheckerService } from '@abp/auth/permission-checker.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Router, RouterStateSnapshot } from '@angular/router';
import { AppSessionService } from '@shared/common/session/app-session.service';
import { UrlHelper } from '@shared/helpers/UrlHelper';
import { Data, Route } from '@node_modules/@angular/router/src/config';
import { Observable } from '@node_modules/rxjs/internal/Observable';

@Injectable()
export class RefindRouteGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(
        private _permissionChecker: PermissionCheckerService,
        private _router: Router,
        private _sessionService: AppSessionService
    ) { }

    canActivateInternal(data: Data, state: RouterStateSnapshot): boolean {
        var postfix = location.href.indexOf('mobile') > 0 ? "-mobile" : "-gmail";

        if (!this._sessionService.user) {
            console.log("RRG:canActivateInternal:User is null");
           
           this._router.navigate(['/app/refind/login' + postfix]);           
        }

        if (!data || !data['permission']) {
            return true;
        }

        if (this._permissionChecker.isGranted(data['permission'])) {
            return true;
        }

        this._router.navigate([this.selectBestRoute()]);
        return false;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivateInternal(route.data, state);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivateInternal(route.data, null);
    }

    selectBestRoute(): string {

        var postfix = location.href.indexOf('mobile') > 0 ? "-mobile" : "-gmail";

        if (!this._sessionService.user) {
            console.log("RRG:canActivateInternal:User is null");
            
            return '/app/refind/login' + postfix;            
        }
        
        if (this._permissionChecker.isGranted('Pages.Refind.Dashboard')) {
            return '/app/refind/dashboard' + postfix;
        }

        return '/app/notifications';
    }
}
