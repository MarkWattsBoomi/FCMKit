import { ReactNode } from "react";
import './FCMToast.css';
import * as React from "react";
import { FCMToastItem } from "./FCMToastItem";

export class FCMToast extends React.Component<any, any> {

    toasts: Map<string,any>;

    constructor(props: any) {
        super(props);
        this.toasts = new Map();
    }

    setToast() {

    }

    async showToast(icon: any, message: string) {
        let ti: any = (
            <FCMToastItem 
                icon={icon}
                message={message}
                duration={10}
            />
        );
        this.toasts.set
        this.forceUpdate();
    }

    toastExpired() {

    }

    render(): ReactNode {
        
        let content: any[] = [];

        this.toasts.forEach((element: FCMToastItem) => {
            content.push()
        });

        return(
            <div
                className="fcmtst"
            >
                {content}
            </div>
        );
    }
}