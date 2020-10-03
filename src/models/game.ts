import { Model } from ".";
import { Level } from "./level";

export default class implements Model {
    debug: boolean = false;
    grid = [
        { tiles: 1, type: 'land', speed: -0.1 * Math.PI },
        { tiles: 6, type: 'pond', speed: -0.2 * Math.PI },
        { tiles: 12, type: 'pond', speed: -0.3 * Math.PI },
        { tiles: 24, type: 'pond', speed: 0.4 * Math.PI },
        { tiles: 24, type: 'pond', speed: 0.5 * Math.PI },
        { tiles: 24, type: 'pond', speed: 0.6 * Math.PI },
        { tiles: 48, type: 'land' },
        { tiles: 48, type: 'road' },
        { tiles: 48, type: 'road' },
        { tiles: 48, type: 'road' },
        { tiles: 48, type: 'road' },
        { tiles: 48, type: 'road' }
    ];
    level: Level;

    constructor() {
        this.level = new Level(this.grid, 0.5);
    }
    
    update(time: number) {
        this.level.update(time);
    }

    toggleDebug() {
        this.debug = !this.debug;
    }
}
