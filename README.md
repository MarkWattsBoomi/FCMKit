

## Overview

This library contains implementations of several re-usable react components.

Install with "npm install --s fcmkit"


### Modal Dialog
A simple React modal component.

![alt text](https://github.com/MarkWattsBoomi/FCMKit/blob/main/ModalDialog.png)

Auto centering and draggable to reposition.

Declare a referenece variable in your class to access the modal

````
export class myClass extends React.Component<any,any> {
    fcmmodal: FCMModal;

    ....
}
````
Add the component in your render() function
````
return(
    <div>
        <FCMModal 
            ref={(modal: FCMModal) => {this.fcmmodal = modal}}
        />
    </div>
);
````
To show the modal with any content do this: -
````
    let frm = (
        ...some react content ... maybe implement a form in another component
    );

    this.fcmmodal.showDialog(
        <Pencil size={16} weight="duotone" />,
        "App Version Properties",
        frm,
        [new FCMModalButton("Save",this.doSomething),new FCMModalButton("Cancel",this.fcmmodal.hideDialog)]
    );

    doSomething(e: any) {
        this.fcmmodal.hideDialog();
    }
````
- The first argument is an icon to show top left, here i'm using a Phosphor-Icon.
- The second argument is the dialog box title bar content.
- The third argument is the dialog box content, this can be anything renderable.  Maybe another react component implementing the form.
- The 4th arg is an array of buttons to show in the footer, each one takes a label and handler function.

You can call 
````
this.fcmmodal.centerDialog();
````
to have the dialog re-center itself, maybe after the content redraws itself.



### Context Menu

A flexible React context menu component.

![alt text](https://github.com/MarkWattsBoomi/FCMKit/blob/main/ContextMenu.png)

Declare a referenece variable in your class to access the modal

````
export class myClass extends React.Component<any,any> {
    fcmmenu: FCMContextMenu;

    ....
}
````
Add the component in your render() function
````
return(
    <div
        onContextMenu={this.showContextMenu}
    >
        <FCMContextMenu 
            ref={(menu: FCMContextMenu) => {this.fcmmenu = menu}}
        />
    </div>
);
````
Implement a handler for the onContextMenu
````
    showContextMenu(e: any) {

        const listItems: Map<string , any> = new Map();
        e.preventDefault();
        e.stopPropagation();

        if (this.fcmmenu) {
            // here we can add whatever items we want
            listItems.set('paste', (
                <FCMContextMenuItem 
                    key='paste'
                    onClick={this.pasteElement}
                    title="Paste page element"
                    icon={<Clipboard 
                        size={16}
                        weight="duotone"
                    />}
                    label="Paste page element"
                />
            ));
            if(listItems.size > 0) {   
                this.contextMenu.showContextMenu(e.clientX, e.clientY, listItems);
                this.forceUpdate();
            }
        }
    }
````
We could add a context menu separator like this
````
    listItems.set('mvsep', (
        <FCMContextMenuSeparator />
    ));
````

