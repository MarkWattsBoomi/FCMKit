

## Overview

This library contains implementations of several re-usable react components


### Modal Dialog
A simple React modal component.

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
        [new FCMModalButton("Save",this.doSomething),new FCMModalButton("Cancel",this.modalDialog.hideDialog)]
    );

    doSomething(e: any) {
        this.modalDialog.hideDialog();
    }
````
The first argument is an icon to show top left, here i'm using a Phosphor-Icon.
The second argument is the dialog box title bar content.
The thisd argument is the dialog box content, this can be anything renderable.  Maybe another react component implementing the form.
The 4th arg is an array of buttons to show in the footer, each one takes a label and handler function.

You can call this.fcmmodal.centerDialog() to have the dialog re-center itself, maybe after the content redraws itself.



### Context Menu


