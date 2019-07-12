import * as PIXI from "pixi.js"
import { SlotModel } from "./models/SlotModel";
import { TweenMax, Linear } from "gsap";
import { ReelModel } from "./models/ReelModel";
import { ReelManager } from "./managers/ReelManager";

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
    var manager = new ReelManager();
    manager.init(app);
}