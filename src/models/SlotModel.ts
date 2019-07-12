import * as PIXI from "pixi.js"

export class SlotModel extends PIXI.Sprite {
    constructor(x : number, y: number) {
        var baseTexture = PIXI.BaseTexture.from('./assets/slots.png');
        var texture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(x, y, 170, 170));
        super(texture);
    }
}