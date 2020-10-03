import { Model } from ".";
import { normaliseAngle } from "./helpers";

export class Lily implements Model {
    r: number;
    t: number;
    speed: number;
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
}