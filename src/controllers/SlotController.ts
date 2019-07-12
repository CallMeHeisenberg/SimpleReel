import { SlotModel } from "../models/SlotModel";

export class SlotController {

    private slotModel : SlotModel;

    constructor(slotModel : SlotModel) {
        this.slotModel = slotModel;
    }

    public onSlotLanded() : void {
        //display you win / you lose message
    }

    public onSlotMoved(movePosition : number) : void {
        // if movePosition is under the minimum destroy slot
        // invoke destroy
    }

    public getSlotIndex() : number {
        return 0;
    }

    public getSlotModel(): SlotModel {
        return this.slotModel;
    }
}