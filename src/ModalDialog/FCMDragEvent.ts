export enum eFCMDragEventType {
    unknown,
    canvas,
    table,
    link,
    dialog,
}
export class FCMDragEvent {

    public static start(type: eFCMDragEventType, sourceElement: any, mouseX: number, mouseY: number): FCMDragEvent {
        const evt: FCMDragEvent = new FCMDragEvent();
        evt.type = type;
        evt.sourceElement = sourceElement;
        evt.targetElement = null;
        evt.mouseX = mouseX;
        evt.mouseY = mouseY;
        evt.mouseOffsetX = mouseX;
        evt.mouseOffsetY = mouseY;
        return evt;
    }
    type: eFCMDragEventType;
    sourceElement: any;
    targetElement: any;
    mouseX: number;
    mouseY: number;
    mouseOffsetX: number;
    mouseOffsetY: number;

    constructor() {
        this.type = eFCMDragEventType.unknown;
        this.sourceElement = null;
        this.targetElement = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.mouseOffsetX = 0;
        this.mouseOffsetY = 0;
    }

    drag(mouseX: number, mouseY: number) {
        this.mouseX = mouseX;
        this.mouseY = mouseY;
    }

    end(target: any, mouseX: number, mouseY: number): any {

        this.targetElement = target;
        this.mouseX = mouseX;
        this.mouseY = mouseY;

        this.type = eFCMDragEventType.unknown;
    }
}