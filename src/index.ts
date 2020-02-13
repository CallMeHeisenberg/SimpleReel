import * as PIXI from "pixi.js"
import { ReelManager } from "./managers/ReelManager";
import { SpinButtonController } from "./controllers/SpinButtonController";
import { ReelView } from "./models/ReelView";
import { ButtonView } from "./models/ButtonView";

const app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight, backgroundColor: 0, autoResize: true,
    resolution: devicePixelRatio 
});

document.body.appendChild(app.view);

/** Auto screen resizer tick */
window.addEventListener('resize', resize);

// Resize function window
function resize() {
	// Resize the renderer
    app.renderer.resize(window.innerWidth, window.innerHeight);
    // app.stage.children[0].position.set((window.innerWidth / 2) - 100, 20);
    // app.stage.children[1].position.set((window.innerWidth / 2) - 105, 10);
}

init();

function init() : void {
    const reelModel = new ReelView();
    reelModel.position.set(500,100)
    app.stage.addChild(reelModel);

    const reelModel2 = new ReelView();
    reelModel2.position.set(800,100)
    app.stage.addChild(reelModel2);


    const buttonModel = new ButtonView();
    buttonModel.position.set(500, 100)
    app.stage.addChild(buttonModel);

    const buttonController = new SpinButtonController(buttonModel, 'initSpin')
    buttonController.init();

    const buttonModel2 = new ButtonView();
    buttonModel2.position.set(800, 100)
    app.stage.addChild(buttonModel2);

    const buttonController2 = new SpinButtonController(buttonModel2, 'initDoubleSpin')
    buttonController2.init();

    var manager = new ReelManager();
    manager.init([reelModel, reelModel2], buttonController);
    app.ticker.add(() => {
        manager.tick();
    });
        // app.stage.children[0].position.set((window.innerWidth / 2) - 100, 20);
    // app.stage.children[1].position.set((window.innerWidth / 2) - 105, 10);
}