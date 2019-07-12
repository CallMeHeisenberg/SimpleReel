import * as PIXI from "pixi.js"
import { Linear, TweenMax } from "gsap";
import { EventDispatcher } from "../observer/EventDispatcher";

export class ButtonModel extends PIXI.Container {
    private buttonBg : PIXI.Graphics;

    constructor() {
        super();
        this.buttonBg = new PIXI.Graphics();
        this.addChild(this.buttonBg);

        this.buttonBg.lineStyle(5, 0x000, 0.8);

        this.buttonBg.beginFill(0xffffff);
        this.buttonBg.drawRect(15, 550, 175.5, 50);
        this.buttonBg.alpha = 0.1;

        var sprite = PIXI.Sprite.from('./assets/arrows.png');
        this.addChild(sprite);
        sprite.position.set(75, 550);
        sprite.scale.set(0.25, 0.25);

        var arrowsMask = new PIXI.Graphics();
        this.addChild(arrowsMask);
        arrowsMask.beginFill(0xff0000)
        arrowsMask.drawRect(50, 500, 100, 100);
        sprite.mask = arrowsMask;

        this.interactive = true;
        this.cursor = 'pointer';

        this.addListener('pointerover', (e) => {
            TweenMax.to(this.buttonBg, 0.25, { alpha: 1, ease: Linear.easeIn})
        });

        this.addListener('pointerout', (e) => {
            TweenMax.to(this.buttonBg, 0.25, { alpha: 0.2, ease: Linear.easeOut})
        })

        this.addListener('click', (e) => {
            TweenMax.to(this.buttonBg, 0.1, { alpha: 0, ease: Linear.easeIn})
            EventDispatcher.instance.dispatchEvent('spinReel');
        });
    }
}