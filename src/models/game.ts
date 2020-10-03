import { Model } from ".";

export default class implements Model {
    debug: boolean = false;

    constructor() {
    }
    
    update(time: number) {
        
    }

    toggleDebug() {
        this.debug = !this.debug;
    }
}