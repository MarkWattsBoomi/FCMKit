

## Overview

This library contains implementations of several re-usable react components


### Modal Dialog
A simple React modal component.

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



### Context Menu


