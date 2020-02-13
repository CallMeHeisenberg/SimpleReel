import { SlotController } from "./SlotController";
import { Shuffler } from "../utils/Shuffler";
import { EventDispatcher } from "../observer/EventDispatcher";
import { SlotView } from "../models/SlotView";
import { ReelView } from "../models/ReelView";
import * as PIXI from "pixi.js"
import { TweenLite, TweenMax, Linear, Bounce, Ease, RoughEase, Back } from "gsap";

export class ReelController {
    private slotPositions : any[] = [
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
    ];

    private reelModel : ReelView;

    private slotsOnReel : SlotController[];

    private ready : boolean;

    private timeLeft : number;

    private bouncedOff : boolean;

    constructor(reelModel : ReelView) {
        this.reelModel = reelModel;
        this.slotsOnReel = [];
        this.ready = false;
    }

    public init() : void {
        this.addReelSlots();

        EventDispatcher.instance.addEventListener('prepareReels', this.prepareReel, this);

        EventDispatcher.instance.addEventListener('spinReels', this.moveSlots, this);
    
        for (let index = 0; index < 5; index++) {
            const element = this.slotsOnReel[index].getSlotModel();
            element.position.set(this.reelModel.childrenGrid.x + 12, this.reelModel.childrenGrid.y + (150 * index) - 120)
            this.reelModel.childrenGrid.addChild(element);
        }
    }

    public update() : void {
        if (this.ready) {
            if (this.timeLeft > Date.now()) {
                this.moveSlots();
            }
            else {
                if (!this.bouncedOff) {
                    this.moveSlots();
                    this.bounceOff();
                }
            }
        }
    }

    private createReelInitialSlots() {
        const positions = Shuffler.shuffleArray(this.slotPositions).slice(5);
        positions.forEach(element => {
            this.createObjectOnReel(element.x, element.y);
        });
    }

    private createObjectOnReel(textureX : number, textureY : number) : SlotController {
        const slot = new SlotController(new SlotView(textureX, textureY));
        this.slotsOnReel.push(slot);
        return slot;
    }

    private addReelSlots() {
        this.createReelInitialSlots();
    }

    private prepareReel() {
        console.log('prepareReel')
        // bounce in with tween
        const slotModel = this.reelModel.childrenGrid;
        TweenMax.to(slotModel, 0.5, {y: -300, ease: Back.easeIn.config(4), onComplete: () => {
            var t = new Date();
            t.setSeconds(t.getSeconds() + 3);
            this.timeLeft = t.getTime();
            this.ready = true;
            this.bouncedOff = false;
        }})
    }

    private moveSlots() {
        var add = true;
        var removedIndex = -1;
        for (let index = 0; index < this.slotsOnReel.length; index++) {
            const element = this.slotsOnReel[index];
            const model = element.getSlotModel();
            model.filters = [ new PIXI.filters.BlurFilter(0.8, 0.5)]
            
            if (model.position.y < 60)
            {
                add = false;
            }
            
            if (model.position.y > 800) {
                removedIndex = index;
            }
            else {
                model.y += 50;
                element.onSlotMoved();
            }
        }

        if (add) {
            this.pushSlot();
        }

        if (removedIndex !== -1) {
            this.destroySlot(removedIndex)
        }
    }

    private pushSlot() : void {
        var slotPositions = Shuffler.shuffleArray(this.slotPositions)[0]
        const slot = this.createObjectOnReel(slotPositions.x, slotPositions.y);
        const element = slot.getSlotModel();
        element.position.set(this.reelModel.childrenGrid.x + 12, this.reelModel.childrenGrid.y + 300)
        this.reelModel.childrenGrid.addChild(element);
    }

    private destroySlot(slotIndex : number) : void {
        let slot = this.slotsOnReel[slotIndex];
        this.slotsOnReel.splice(slotIndex,1);
        slot.getSlotModel().destroy();
    }

    private bounceOff() : void {
        this.bouncedOff = true;

        this.slotsOnReel.forEach(element => {
            element.getSlotModel().filters = [];
        });

        const slotModel = this.reelModel.childrenGrid;
        TweenMax.to(slotModel, 1, {y: -180, ease: Back.easeOut.config(4), onComplete: () => {
                this.ready = false;
                var winnerSlot = this.slotsOnReel[this.slotsOnReel.length - 2];
                winnerSlot.onSlotLanded();
                EventDispatcher.instance.dispatchEvent('spinFinish', this);
        }})
    }
}