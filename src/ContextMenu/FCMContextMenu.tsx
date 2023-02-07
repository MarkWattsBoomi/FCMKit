import * as React from 'react';
import './FCMContextMenu.css';

export class FCMContextMenu extends React.Component<any, any> {
    context: any;
    displayStyle: React.CSSProperties = {};

    menuItems: any[] = [];
    menu: HTMLDivElement;

    constructor(props: any) {
        super(props);
        this.showContextMenu = this.showContextMenu.bind(this);
        this.hideContextMenu = this.hideContextMenu.bind(this);
        this.positionContextMenu = this.positionContextMenu.bind(this);
    }

    setMenu(menu: HTMLDivElement) {
        this.menu = menu;
    }

    positionContextMenu(mouseX: number, mouseY: number) {

        let menuPostion: any = {};
        
        if(mouseX < (window.innerWidth / 2)) {
            this.displayStyle.left = (mouseX - 10); // + "px"; 
            this.displayStyle.right = undefined;
        }
        else {
            this.displayStyle.left = undefined;
            this.displayStyle.right = (window.innerWidth - (mouseX + 10)); // + "px"; 
        }

        if(mouseY < (window.innerHeight / 2)) {
            this.displayStyle.top = (mouseY - 10); // + "px"; 
            this.displayStyle.bottom = undefined;
        }
        else {
            this.displayStyle.top = undefined;
            this.displayStyle.bottom = (window.innerHeight-(mouseY + 10)) + "px"; 
        }
        this.displayStyle.display = "block";
    }

    showContextMenu(mouseX: number, mouseY: number, menuItems: Map<string, any>) {
        if(menuItems.size > 0) {
            const menuItemArray: any[] = [];
            menuItems.forEach((item: any) => {
                menuItemArray.push(item); 
            });
            this.menuItems = menuItemArray;
            this.positionContextMenu(mouseX, mouseY);
            this.forceUpdate();
        }
    }

    hideContextMenu() {
        this.displayStyle.display="none";
        this.menuItems=[];
        this.forceUpdate();
    }

    render() {
        return (
            <div
                className="fcmcm"
                onMouseLeave={this.hideContextMenu}
                style={{
                    left: this.displayStyle.left, 
                    right: this.displayStyle.right,
                    top: this.displayStyle.top,
                    bottom: this.displayStyle.bottom,
                    display: this.displayStyle.display
                }}
                ref={(element: HTMLDivElement) => (this.setMenu(element))}
            >
                <ul
                    className="fcmcm-list"
                >
                    {this.menuItems}
                </ul>
            </div>
        )
    }
}

export class KwestContextMenuItem extends React.Component<any, any> {
    render() {
        return(
            <li
                className="fcmcm-item"
                onClick={this.props.onClick}
                title={this.props.title}
            >
                {this.props.icon}
                <span
                    className="fcmcm-item-label"
                >
                    {this.props.label}
                </span>
            </li>
        );
    }
}

export class KwestContextMenuSeparator extends React.Component<any, any> {
    render() {
        return(
            <li
                className="fcmcm-sep"
            >
            </li>
        );
    }
}