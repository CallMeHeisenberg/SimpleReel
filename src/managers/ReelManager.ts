import { SlotController } from "../controllers/SlotController";
import { EventDispatcher } from "../observer/EventDispatcher";
import { Shuffler } from "../utils/Shuffler";
import { SlotModel } from "../models/SlotModel";
import { ReelModel } from "../models/ReelModel";
import { ButtonModel } from "../models/ButtonModel";
import * as PIXI from "pixi.js"

export class ReelManager {

    private slotPositions : any[]

    private onReel : SlotController[]

    private reelModel : ReelModel;

    private attachedButton : ButtonModel;

    private application : PIXI.Application;

    private reelPositionIndex : number;

    constructor() {
        this.onReel = [];
    }

    public init(app : PIXI.Application) : void {
        this.application = app;
        //create onReel via the slots we have in slots array
        this.reelModel = new ReelModel();
        this.reelModel.position.set(200,100);
        EventDispatcher.instance.addEventListener('destroySlot', (slotController : SlotController) => {
            this.destroySlot(slotController.getSlotIndex())
        })

        EventDispatcher.instance.addEventListener('spinReel', () => {
            this.initSpin();
        })

        this.slotPositions = [
            {x: 0, y: 0},
            {x: 169, y: 0},
            {x: 338, y: 0},
            {x: 507, y: 0},
            {x: 676, y: 0},
            {x: 0, y: 172},
            {x: 169, y: 172},
            {x: 338, y: 172},
            {x: 507, y: 172},
            {x: 676, y: 172},
        ]

        app.stage.addChild(this.reelModel);

        this.createReelInitialSlots();
        for (let index = 0; index < 5; index++) {
            const element = this.onReel[index].getSlotModel();
            element.position.set(this.reelModel.x + 12, this.reelModel.y + (150 * index) - 120)
            app.stage.addChild(element);
        }

        this.attachedButton = new ButtonModel();
        app.stage.addChild(this.attachedButton);
        this.attachedButton.position.set(this.reelModel.x, this.reelModel.y + 100);
        this.reelPositionIndex = 0;
    }

    private createReelInitialSlots() : void {
        const positions = Shuffler.shuffleArray(this.slotPositions).slice(5);
        positions.forEach(element => {
            this.createObjectOnReel(element.x, element.y);
        });
    }

    private createObjectOnReel(textureX : number, textureY : number) : SlotController {
        const slot = new SlotController(new SlotModel(textureX, textureY));

        this.onReel.push(slot);
        return slot;
    }

    private initSpin() : void {
        this.application.ticker.add(() => {
            var add = true;
            var removedIndex = -1;
            for (let index = 0; index < this.onReel.length; index++) {
                const element = this.onReel[index];
                const model = element.getSlotModel();
                
                if (model.position.y < 100)
                {
                    add = false;
                }
                
                if (model.position.y > 600) {
                    removedIndex = index;
                }
                else {
                    model.y += 20;
                }
            }

            if (add) {
                var slotPositions = Shuffler.shuffleArray(this.slotPositions)[0]
                const slot = this.createObjectOnReel(slotPositions.x, slotPositions.y);
                const element = slot.getSlotModel();
                element.position.set(this.reelModel.x + 12, this.reelModel.y - 150)
                this.application.stage.addChild(element);
            }

            if (removedIndex !== -1) {
                this.destroySlot(removedIndex);
            }
        });
    }

    private onCompleteInitial() : void {
        //create new spin with ticker
    }

    private onSpinFinished() : void {
        //finish ticker spin
        //find closest slot, land on it
        //call spin land complete method
    }

    private pushSlot() : void {
        //generate and push
    }

    private destroySlot(slotIndex : number) : void {
        let slot = this.onReel[slotIndex];
        this.onReel.slice(slotIndex, slotIndex + 1);
        slot.getSlotModel().destroy();
    }

    private moveSlots() {
        // all move 1 down, and top slot is generated (pushSlot), bottom slot destroyed (pop)
        // steps = slots OR 1 slot = 1 step
    }
}