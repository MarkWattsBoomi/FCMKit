

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



### Context Menu


