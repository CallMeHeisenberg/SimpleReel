import * as PIXI from "pixi.js"
import { Linear, TweenMax } from "gsap";
import { EventDispatcher } from "../observer/EventDispatcher";


export class ButtonView extends PIXI.Sprite {
    constructor(texture?: PIXI.Texture) {
        super(PIXI.Texture.from('./assets/arrows.png'));
        this.on('added', this.onAdded.bind(this));
    }

    protected onAdded() {
        this.interactive = true;
        this.addListener('pointerover', this.onOver.bind(this));
        this.addListener('pointerout', this.onOut.bind(this))
        this.addListener('click', this.onClick.bind(this));
    }

    protected onOver() {
        TweenMax.to(this, 0.25, { alpha: 1, ease: Linear.easeIn})
    }

    protected onOut() {
        TweenMax.to(this, 0.25, { alpha: 0.2, ease: Linear.easeOut})
    }

    protected onClick() {
        TweenMax.to(this, 0.1, { alpha: 0, ease: Linear.easeIn})
        EventDispatcher.instance.dispatchEvent('buttonClicked', this);
    }
}