import { Model } from ".";

const depthFrames = [1,1,1,1,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0];
const FRAME_DURATION = 500;

export class Turtle implements Model {
    frameOffset: number;
    r: number;
    t: number;
    depth: number;

    constructor(r:number, t:number) {
        this.frameOffset = Math.floor(Math.random() * depthFrames.length);
        this.r = r;
        this.t = t;
        this.depth = depthFrames[this.frameOffset];
    }

    update(time: number) {
        this.depth = depthFrames[(Math.floor(time / FRAME_DURATION) + this.frameOffset) % depthFrames.length];
    }
}