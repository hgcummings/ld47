import { Model } from ".";
import { Level } from "./level";
import { Frog } from "../sprites/frog";
import { angularDistance } from "./helpers";
import { Splosh } from "../sprites/splosh";
import { FiniteSprite } from "../sprites";
import { Splat } from "../sprites/splat";

export default class implements Model {
    debug: boolean = false;
    grid = [
        { tiles: 1, type: 'land', speed: 0.1 * Math.PI },
        { tiles: 6, type: 'pond', speed: 0.15 * Math.PI },
        { tiles: 12, type: 'pond', speed: 0.2 * Math.PI },
        { tiles: 24, type: 'pond', speed: -0.3 * Math.PI },
        { tiles: 24, type: 'pond', speed: -0.4 * Math.PI },
        { tiles: 24, type: 'pond', speed: -0.3 * Math.PI },
        { tiles: 48, type: 'land' },
        { tiles: 48, type: 'road', speed: 0.15 * Math.PI },
        { tiles: 48, type: 'road', speed: 0.2 * Math.PI },
        { tiles: 48, type: 'road', speed: 0.25 * Math.PI },
        { tiles: 48, type: 'road', speed: 0.2 * Math.PI },
        { tiles: 48, type: 'road', speed: 0.15 * Math.PI },
        { tiles: 1, type: 'home' }
    ];
    level: Level;
    frog: Frog;
    death: FiniteSprite;
    lives: number = 3;

    constructor() {
        this.level = new Level(this.grid, 0.5);
        this.frog = new Frog(0, 0, 0);
    }
    
    update(time: number) {
        if (this.frog.alive) {
            if (this.grid[this.frog.r].type === 'home') {
                let home = null;
                for (let i = 0; i < 4; ++i) {
                    if (angularDistance(this.homeT(i), this.frog.t) < Math.PI * 3 / 16) {
                        home = i;
                        break;
                    }
                }

                if (home === null || this.level.homes[home]) {
                    this.frog.moveIn();
                } else {
                    this.level.homes[home] = true;
                    this.frog = new Frog(0, 0, 0);
                }
            }

            switch (this.grid[this.frog.r].type) {
                case 'land':
                    this.frog.speed = 0;
                    break;
                case 'pond':
                    let onLily = false;
                    for (let lily of this.level.lilies) {
                        if (this.frogCollidesWith(lily)) {
                            this.frog.t = lily.t;
                            this.frog.speed = lily.speed;
                            onLily = true;
                            break;
                        }
                    }
                    if (!onLily) {
                        this.lives -= 1;
                        this.death = new Splosh(this.frog.r, this.frog.t, time);
                        this.frog.die();
                    }
                    break;
                case 'road':
                    this.frog.speed = 0;
                    for (let car of this.level.cars) {
                        if (this.frogCollidesWith(car)) {
                            this.lives -= 1;
                            this.death = new Splat(this.frog.r, this.frog.t, time);
                            this.frog.die();
                            break;
                        }
                    }
                    break;
            }
        } else {
            this.frog.speed = 0;
        }

        if (this.death) {
            this.death.update(time);
            if (!this.death.active) {
                this.death = null;
                this.frog = new Frog(0, 0, 0);
            }
        }

        this.level.update(time);
        this.frog.update(time);
    }

    homeT(i):number {
        return Math.PI * ((1/4) + (i / 2));
    }

    toggleDebug() {
        this.debug = !this.debug;
    }

    private frogCollidesWith(sprite) {
        return this.frog.r === sprite.r &&
            angularDistance(sprite.t, this.frog.t) < 0.45 / sprite.r;
    }
}
