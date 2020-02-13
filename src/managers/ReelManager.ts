import { SlotController } from "../controllers/SlotController";
import { EventDispatcher } from "../observer/EventDispatcher";
import { Shuffler } from "../utils/Shuffler";
import { SlotView } from "../models/SlotView";
import { ReelView } from "../models/ReelView";
import * as PIXI from "pixi.js"
import { TweenMax, Linear } from "gsap";
import { ReelController } from "../controllers/ReelController";
import { SpinButtonController } from "../controllers/SpinButtonController";

export class ReelManager {
    private attachedButton : SpinButtonController;

    /** Reel controlls */
    private reelControllers : ReelController[];

    private _reelsPrepared : ReelController[];
    
    private _reelsFinishedSpinning : ReelController[];

    constructor(){
        this.reelControllers = [];
        this._reelsPrepared = [];
        this._reelsFinishedSpinning = [];
    }

    private get reelsFinishedSpinning() : boolean {
        return this._reelsFinishedSpinning.length === this.reelControllers.length;
    }

    private get reelsPrepared() : boolean {
        return this._reelsPrepared.length === this.reelControllers.length;
    }

    public init(reelModels : ReelView[], buttonControl : SpinButtonController) : void {
        reelModels.forEach(element => {
            let controller = new ReelController(element); 
            this.reelControllers.push(controller);
            this._reelsFinishedSpinning.push(controller);

            controller.init();
        });
        
        this.attachedButton = buttonControl;

        EventDispatcher.instance.addEventListener('initSpin', this.initSpin, this)
        EventDispatcher.instance.addEventListener('initDoubleSpin', this.initDoubleSpin, this);
    }

    public tick() : void {
        this.reelControllers.forEach(element => {
            element.update();
        });
    }

    private initSpin() : void {
        console.log(this.reelControllers)
        if (!this.reelsFinishedSpinning) {
            return;
        }

        this._reelsFinishedSpinning = [];
        console.log(this._reelsFinishedSpinning)

        EventDispatcher.instance.dispatchEvent('prepareReels');

        EventDispatcher.instance.addEventListener('completePreparation', this.onCompleteInitial, this)
        
        EventDispatcher.instance.addEventListener('spinFinish', this.onSpinFinished, this)
    }

    private initDoubleSpin() : void {
        this.initPromiseSpin().then(this.initPromiseSpin.bind(this)).then(() => new Promise((resolve) => {
            setTimeout(resolve, 2000);
        }).then(() => {
            console.log('almost finished sequence')
        })).then(this.initPromiseSpin.bind(this));
    }

    private initPromiseSpin() {
        return new Promise((resolve) => {
            this.initSpin();
            EventDispatcher.instance.addEventListener('fullFinish', () => {
                resolve(this);
            });
        });
    }

    private onCompleteInitial(reelController : ReelController) : void {
        this._reelsPrepared.push(reelController);
        if (this.reelsPrepared) {
            EventDispatcher.instance.dispatchEvent('spinReels');
            this._reelsPrepared = [];
        }
    }

    private onSpinFinished(reelController : ReelController) : void {
        console.log('spinFinished[push ' + reelController + "]")
        this._reelsFinishedSpinning.push(reelController);
        if (this.reelsFinishedSpinning) {
            TweenMax.to(this.attachedButton.getView(), 0.5, {alpha: 1, ease: Linear.easeIn})
            EventDispatcher.instance.dispatchEvent('fullFinish');
        }
    }
}