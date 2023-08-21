import * as React from "react";

export class FCMToastItem extends React.Component<any,any> {
    id: string;
    expires: Date;

    constructor(props: any) {
        super(props);
        this.id = crypto.randomUUID();
        this.expires = new Date();
        this.expires.setSeconds(this.expires.getSeconds() + (this.props.durationSeconds || 5));
    }

    render() {

        return(
            <div>
                {this.props.title}
            </div>
        );
    }
}