import { SlotView } from "../models/SlotView";
import * as PIXI from "pixi.js"

export class SlotController {

    private slotModel : SlotView;

    constructor(slotModel : SlotView) {
        this.slotModel = slotModel;
    }

    public onSlotLanded() : void {
        console.log("You just fell on this slot!")
    }

    public onSlotMoved() : void {
        //when slot is moved, method called
    }

    public getSlotModel(): SlotView {
        return this.slotModel;
    }
}