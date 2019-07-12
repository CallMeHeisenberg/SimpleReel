import * as PIXI from "pixi.js"

export class ReelModel extends PIXI.Container {
    public childrenGrid : PIXI.Container;

    constructor() {
        super();
        
        var grid = new PIXI.Graphics();
        grid.beginFill(0xffffff);
        // set the line style to have a width of 5 and set the color to red
        grid.lineStyle(15, 0xD3D3D3);

        // draw a rectangle
        grid.drawRect(this.x + 20, this.y + 20, 160, 500);

        this.addChild(grid);

        var invisibleGrid = new PIXI.Graphics();
        invisibleGrid.beginFill(0xff0000);
        invisibleGrid.drawRect(this.x + 20, this.y + 29, 160, 483);
        
        this.addChild(invisibleGrid)

        this.childrenGrid = new PIXI.Container();
        this.addChild(this.childrenGrid)

        // for (var index = 0; index < 5; index++) {
        //     var sprite = new SlotModel(index * 169, 0);
        //     if (childrenGrid.children.length > 0) {
        //         const lastChild = childrenGrid.getChildAt(childrenGrid.children.length - 1);
        //         if (lastChild instanceof SlotModel)
        //         {
        //             sprite.position.set(11, lastChild.y + lastChild.height) 
        //         }
        //         else {
        //             sprite.position.set(11, 0) 
        //         }
        //     }
        //     else {
        //         sprite.position.set(11, 0) 
        //     }
        //     childrenGrid.addChild(sprite);
        // }
    
        // for (var index = 0; index < 5; index++) {
        //     var sprite = new SlotModel(index * 169, 172);
        //     const lastChild = childrenGrid.getChildAt(childrenGrid.children.length - 1);
        //     if (lastChild instanceof SlotModel)
        //     {
        //         sprite.position.set(11, lastChild.y + lastChild.height) 
        //     }
        //     else {
        //         sprite.position.set(11, 0) 
        //     }
        //     childrenGrid.addChild(sprite);
        // }
        
        this.childrenGrid.mask = invisibleGrid;
        this.childrenGrid.y = -500;
    }
}