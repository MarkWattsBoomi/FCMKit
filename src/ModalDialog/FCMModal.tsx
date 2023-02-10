import React = require("react");
import { eFCMDragEventType, FCMDragEvent } from './FCMDragEvent';
import './FCMModal.css';
import { FCMModalButton } from './FCMModalButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons/faCircleXmark";


// Declaration of the component as React Class Component
export class FCMModal extends React.Component<any, any> {
    dragEvent: FCMDragEvent = new FCMDragEvent();
    kwmb: any;
    dialog: any;

    dialogVisible: boolean = false;
    dialogIcon: any;
    dialogTitle: string = '';
    dialogButtons: any = [];
    dialogContent: any;
    dialogOnClose: any = this.hideDialog;

    top: number = 0;
    left: number = 0;
  // Init of the component before it is mounted.
    constructor(props: any) {
        super(props);

        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.showDialog = this.showDialog.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.centerDialog = this.centerDialog.bind(this);
    }

    positionDialog() {
        if(this.dialog) {
            this.dialog.style.left = this.left + "px";
            this.dialog.style.top = this.top + "px";
        }
    }

    centerDialog() {
      if(this.dialog) {
        const parentXCenter = this.dialog.offsetParent.clientWidth / 2;
        const parentYCenter = this.dialog.offsetParent.clientHeight / 2;
        const dialogXOffset = this.dialog.clientWidth / 2;
        const dialogYOffset = this.dialog.clientHeight / 2;

        this.left = parentXCenter - dialogXOffset;
        this.top = parentYCenter - dialogYOffset;
        this.dialog.classList.add('fcmmod-shown');
        this.positionDialog();
      }
  }

    setDialog(dialog: HTMLDivElement) {
        this.dialog = dialog;
        if(this.dialog) {
          this.centerDialog();
        }
    }

    stopEventBubble(e:  any) {
        if(e.stopPropagation) e.stopPropagation();
        if(e.preventDefault) e.preventDefault();
        e.cancelBubble=true;
        e.returnValue=false;
        return false;
    }

    // Add listeners immediately after the component is mounted.
    componentDidMount(){
      this.forceUpdate();
    }

    async showDialog(icon: any, title: string, content: any, buttons: FCMModalButton[], onClose?: any) {
        this.dialogVisible = true;
        this.dialogIcon = icon; 
        this.dialogTitle = title;
        this.dialogContent = content;
        this.dialogOnClose = onClose || this.hideDialog;
        this.dialogButtons = buttons;
        this.forceUpdate();
    }
  
    async hideDialog(e? : any) {
        this.dialogVisible = false;
        this.dialogIcon = undefined; 
        this.dialogTitle = '';
        this.dialogContent = undefined;
        this.dialogOnClose = undefined;
        this.dialogButtons = [];
        this.forceUpdate();
    }

  // Handle the key press event.
  handleKeyUp(e: any) {
    const keys: any = {
      27: () => {
        e.preventDefault();
        this.hideDialog();
      },
    };

    if (keys[e.keyCode]) { 
      keys[e.keyCode](); 
    }
  }



  // Handle the mouse click on browser window.
  handleOutsideClick(e: any) {
    if (!this.dialog) {
        if (!this.dialog.contains(e.target)) {
          this.hideDialog();
        }
    }
  }

  // Render the component passing onCloseRequest and children as props.
  render() {
    let content: any;
    if(this.dialogVisible === false) {
      content = (
          <div/>
      );
    }
    else {
      const buttons: Array<JSX.Element> = [];
      for(const button of this.dialogButtons) {
          buttons.push(
              <button 
                  className="fcmmod-dialog-button-bar-button" 
                  title={button.label} 
                  onMouseDown={(e) => {e.stopPropagation();button.handler()}}
              >
                  {button.label}
              </button>
          );
      }
      content = (
        <div 
          className="fcmmod-redaction"
          onMouseMove={(e) => {this.onMouseMove(e)}}
          onMouseUp={(e) => {this.onMouseUp(e)}}
          onMouseDown={(e) => {this.handleOutsideClick(e)}}
          onContextMenu={e => {e.preventDefault(); e.stopPropagation();if(this.props.onContextMenu){this.props.onContextMenu()}}}
        >
          <div 
            className="fcmmod-content"
            ref={(element: HTMLDivElement) => (this.setDialog(element))}
            >
              <div className="fcmmod-dialog">
                <div 
                  className="fcmmod-dialog-header"
                  onMouseDown={(e) => {this.onMouseDown(e)}}
                >
                    <span className="fcmmod-dialog-header-icon">{this.dialogIcon}</span>
                    <span className="fcmmod-dialog-header-title">{this.dialogTitle}</span>
                    <div style={{display: 'flex', flexDirection: "row", marginLeft: 'auto', flexGrow: 0}}>
                        <span
                            style={{cursor: 'pointer' , marginRight: '5px', display: "flex"}}
                            title="Close"
                            onMouseDown={(e) => {this.stopEventBubble(e); this.dialogOnClose() }}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} className="fcmmod-icon" />
                        </span>
                    </div>
                </div>
                <div className="fcmmod-dialog-body">
                    <div className="fcmmod-dialog-body-client">
                        {this.dialogContent}                               
                    </div>
                </div >
                  <div className="fcmmod-dialog-button-bar">
                      {buttons}   
                  </div>
              </div >
          </div>
        </div>
      );
    }
    return content;
  }

  moveMe(left: number, top: number) {
      this.left = left;
      this.top = top; // - this.box.getBoundingClientRect().top;
      this.positionDialog();
  }

  onMouseDown(e: any) {
    //this.stopEventBubble(e);
    //include component bounding rect to allow for mouse offset into component
    let clientRect = e.target.getBoundingClientRect();
    let mouseOffsetY: number = e.clientY - clientRect.top;
    this.dragEvent = FCMDragEvent.start(eFCMDragEventType.dialog, this, e.clientX - clientRect.left, mouseOffsetY);
  }

  onMouseMove(e: any) {
    //this.stopEventBubble(e);
    if(this.dragEvent.type === eFCMDragEventType.dialog)
    {
      this.moveMe(e.clientX - this.dragEvent.mouseOffsetX, e.clientY - this.dragEvent.mouseOffsetY);
    }
  }

  onMouseUp(e: any) {
    //this.stopEventBubble(e);
    if(this.dragEvent.type === eFCMDragEventType.dialog)
    {
      this.dragEvent.end(null,e.clientX, e.clientY);
    }
  }
}