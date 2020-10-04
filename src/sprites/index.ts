import { Model } from "../models";
import { normaliseAngle } from "../models/helpers";

export abstract class Sprite implements Model {
    r: number;
    t: number;
    speed: number;
    private _renderUnit: number;
    private _frames: HTMLCanvasElement[];
    private lastUpdate: number = 0;

    constructor(r:number, t:number, speed:number) {
        this.r = r;
        this.t = t;
        this.speed = speed;
    }

    update(time: number) {
        this.t = normaliseAngle(this.t + (this.speed * (time - this.lastUpdate) / 1000));
        this.lastUpdate = time;
    }

    abstract get facing(): number;

    get frameIndex():number {
        return 0;
    }

    abstract renderFrame(frameIndex: number, unit: number): HTMLCanvasElement;

    getCurrentFrame(unit: number): HTMLCanvasElement {
        const frameIndex = this.frameIndex;

        if (unit !== this._renderUnit) {
            this._renderUnit = unit;
            this._frames = [];
        }

        if (!this._frames[frameIndex]) {
            this._frames[frameIndex] = this.renderFrame(frameIndex, unit);
        }

        return this._frames[frameIndex];
    }
}

export abstract class FiniteSprite extends Sprite {
    abstract active: boolean;
}