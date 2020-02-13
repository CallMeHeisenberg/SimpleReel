import * as PIXI from "pixi.js"

export class ReelView extends PIXI.Container {
    public childrenGrid : PIXI.Container;

    private invisibleGrid : PIXI.Graphics;

    constructor() {
        super();
        
        var grid = new PIXI.Graphics();
        grid.beginFill(0xffffff);
        // set the line style to have a width of 5 and set the color to red
        grid.lineStyle(15, 0xD3D3D3);

        // draw a rectangle
        grid.drawRect(this.x + 20, this.y + 20, 160, 500);

        this.addChild(grid);


        this.invisibleGrid = new PIXI.Graphics();
        this.invisibleGrid.beginFill(0xff0000);
        this.invisibleGrid.drawRect(this.x + 27.5, this.y + 27.5, 145, 485);
        
        this.addChild(this.invisibleGrid)

        this.childrenGrid = new PIXI.Container();
        this.addChild(this.childrenGrid)

        this.childrenGrid.mask = this.invisibleGrid;
    }
}