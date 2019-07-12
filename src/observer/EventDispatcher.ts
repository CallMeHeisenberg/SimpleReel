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


	public hasEventListener(type:string, listener:Function):Boolean {
		var exists:Boolean = false;
		for (var i = 0; i < this._listeners.length; i++) {
			if (this._listeners[i].type === type && this._listeners[i].listener === listener) {
				exists = true;
			}
		}

		return exists;
	}

	public addEventListener (typeStr:string, listenerFunc:Function):void {
		if (this.hasEventListener(typeStr, listenerFunc)) {
			return;
		}

		this._listeners.push({type: typeStr, listener: listenerFunc});
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
				this._listeners[i].listener.call(this, ...additionalParams);
			}
		}
	}
}