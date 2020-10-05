import { Model } from ".";
import { Level } from "./level";
import { Frog } from "../sprites/frog";
import { angularDistance } from "./helpers";
import { Splosh } from "../sprites/splosh";
import { FiniteSprite } from "../sprites";
import { Splat } from "../sprites/splat";
import { Home } from "../sprites/home";
import * as sounds from '../sounds';

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
    fate: FiniteSprite;
    maxR: number;
    lives: number = 3;
    score: number = 0;

    constructor() {
        this.level = new Level(this.grid, 1);
        this.maxR = 0;
        this.frog = new Frog(0, 0, 0);
    }

    checkScore() {
        if (this.frog.active && this.frog.r > this.maxR) {
            this.maxR = this.frog.r;
            return 10;
        }
        return 0;
    }
    
    update(time: number) {
        let sound = this.frog.lastSound;
        this.frog.lastSound = null;

        if (this.frog.active) {
            if (this.grid[this.frog.r].type === 'home') {
                let home = null;
                for (let i = 0; i < 4; ++i) {
                    if (angularDistance(Home.angle(i), this.frog.t) < Math.PI * 3 / 16) {
                        home = i;
                        break;
                    }
                }

                if (home === null || this.level.homes[home]) {
                    this.frog.r -= 1;
                    sound = sounds.block;
                } else {
                    const newHome = new Home(home, time)
                    this.fate = newHome;
                    this.level.homes[home] = newHome;
                    this.score += 400;
                    this.maxR = 0;
                    this.frog.end();
                    sound = sounds.home;
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
                        this.fate = new Splosh(this.frog.r, this.frog.t, time);
                        this.frog.end();
                        sound = sounds.splosh;
                    }

                    this.score += this.checkScore();
                    break;
                case 'road':
                    this.frog.speed = 0;
                    for (let car of this.level.cars) {
                        if (this.frogCollidesWith(car)) {
                            this.lives -= 1;
                            this.fate = new Splat(this.frog.r, this.frog.t, time);
                            this.frog.end();
                            sound = sounds.splat;
                            break;
                        }
                    }

                    this.score += this.checkScore();
                    break;
            }
        } else {
            this.frog.speed = 0;
        }

        if (this.fate) {
            this.fate.update(time);
            if (!this.fate.active) {
                this.fate = null;
                this.frog = new Frog(0, 0, 0);
            }
        }

        this.level.update(time);
        this.frog.update(time);

        if (sound) {
            sound.getAudio().play();
        }
    }

    toggleDebug() {
        this.debug = !this.debug;
    }

    private frogCollidesWith(sprite) {
        return this.frog.r === sprite.r &&
            angularDistance(sprite.t, this.frog.t) < 0.45 / sprite.r;
    }
}
