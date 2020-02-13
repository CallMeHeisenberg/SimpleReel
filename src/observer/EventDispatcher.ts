import { equal, strictEqual, deepEqual, notEqual } from "assert";

/**
 * The Subject interface declares a set of methods for managing subscribers.
 */
export class EventDispatcher {
    private static _instance: EventDispatcher;
    
    private _listeners:any[];
	constructor() {
		this._listeners = [];
	}

    static get instance() {
        if (!EventDispatcher._instance) {
            EventDispatcher._instance = new EventDispatcher();
            // ... any one time initialization goes here ...
        }
        return EventDispatcher._instance;
    }


	public hasEventListener(type:string, listener:Function, context? : any):Boolean {
		var exists:Boolean = false;
		for (var i = 0; i < this._listeners.length; i++) {
			const rec = this._listeners[i];

			if (context) {
				if (rec.type === type && rec.listener === listener && rec.context === context) {
					exists = true;
				}
			}
			else {
				if (rec.type === type && rec.listener === listener) {
					exists = true;
				}
			}
		}

		return exists;
	}

	public addEventListener (typeStr:string, listenerFunc:Function, context? : any):void {
		if (this.hasEventListener(typeStr, listenerFunc, context)) {
			return;
		}

		this._listeners.push({type: typeStr, listener: listenerFunc, context: context});
	}

	public removeEventListener (typeStr:string, listenerFunc:Function):void {
		for (var i = 0; i < this._listeners.length; i++) {
			if (this._listeners[i].type === typeStr && this._listeners[i].listener === listenerFunc) {
				this._listeners.splice(i, 1);
			}
		}
	}

	public dispatchEvent (typeStr : string, ...additionalParams : any[]) {
		for (var i = 0; i < this._listeners.length; i++) {
			if (this._listeners[i].type === typeStr) {
				this._listeners[i].listener.call(this._listeners[i].context || this, ...additionalParams);
			}
		}
	}
}