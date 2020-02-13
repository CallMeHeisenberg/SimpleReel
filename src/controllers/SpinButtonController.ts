import { EventDispatcher } from "../observer/EventDispatcher";
import { ButtonView } from "../models/ButtonView";

export class SpinButtonController {
    protected view: ButtonView;
    protected action : string;

    constructor(view : ButtonView, action : string) {
        this.view = view;
        this.action = action;
    }

    public init() : void {
        EventDispatcher.instance.addEventListener('buttonClicked', (btn : ButtonView) => {
            if (btn == this.view) {
                console.log(this.action)
                EventDispatcher.instance.dispatchEvent(this.action);
            }
        })
        console.log('button initiated')
    }

    public getView() : ButtonView {
        return this.view;
    }
}