import { Model } from ".";
import { Level } from "./level";
import { Frog } from "./frog";
import { angularDistance } from "./helpers";

export default class implements Model {
    debug: boolean = false;
    grid = [
        { tiles: 1, type: 'land', speed: -0.1 * Math.PI },
        { tiles: 6, type: 'pond', speed: -0.15 * Math.PI },
        { tiles: 12, type: 'pond', speed: -0.2 * Math.PI },
        { tiles: 24, type: 'pond', speed: 0.25 * Math.PI },
        { tiles: 24, type: 'pond', speed: 0.3 * Math.PI },
        { tiles: 24, type: 'pond', speed: 0.35 * Math.PI },
        { tiles: 48, type: 'land' },
        { tiles: 48, type: 'road' },
        { tiles: 48, type: 'road' },
        { tiles: 48, type: 'road' },
        { tiles: 48, type: 'road' },
        { tiles: 48, type: 'road' }
    ];
    level: Level;
    frog: Frog;
    lives: number = 3;

    constructor() {
        this.level = new Level(this.grid, 0.5);
        this.frog = new Frog(0, 0, 0);
    }
    
    update(time: number) {
        switch (this.grid[this.frog.r].type) {
            case 'land':
                this.frog.speed = 0;
                break;
            case 'pond':
                let onLily = false;
                for (let lily of this.level.lilies) {
                    if (this.frog.r === lily.r &&
                            angularDistance(lily.t, this.frog.t) < 0.45 / lily.r) {
                        this.frog.t = lily.t;
                        this.frog.speed = lily.speed;
                        onLily = true;
                        break;
                    }
                }
                if (!onLily) {
                    this.lives -= 1;
                    this.frog = new Frog(0, 0, 0);
                }
                break;
            case 'road':
                this.frog.speed = 0;
                break;
        }
        this.level.update(time);
        this.frog.update(time);
    }

    toggleDebug() {
        this.debug = !this.debug;
    }
}
