import { Injectable } from "@angular/core";

enum NotificationPosition {
    BOTTOM_END = "bottom-end",
    BOTTOM_START = "bottom-start"

}

export interface  NotificationOptions {
    position?: NotificationPosition ,
    showConfirmButton? : boolean,
    timer?: number,
    padding?: number,
    toast? : boolean,
    animation?: boolean
}

@Injectable({
    providedIn: "root"
})
export class NotificationService {
    
    defaultOptions: NotificationOptions = {
        position: NotificationPosition.BOTTOM_END,
        showConfirmButton: false,
        timer: 8000,
        padding: 0,
        toast: true,
        animation: false
    }
    success(msg: string, title?: string, options?: Partial<NotificationOptions>): void {
        const notificationOptions = {
            ...this.defaultOptions,
            ...options
        };
        abp.notify.success(msg,title, notificationOptions);
    }

    error(msg: string, title?: string,  options?: Partial<NotificationOptions>): void {
        const notificationOptions = {
            ...this.defaultOptions,
            ...options
        };
        abp.notify.error(msg, title, notificationOptions);
    }

    warn(msg: string, title?: string , options?: Partial<NotificationOptions>): void {
        const notificationOptions = {
            ...this.defaultOptions,
            ...options
        };
        abp.notify.warn(msg, title, notificationOptions);
    }

}