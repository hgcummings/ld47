import { Sprite } from "./sprite";

export class Lily extends Sprite {
    private _facing: number;

    constructor(r:number, t:number, speed:number) {
        super(r, t, speed);
        this._facing = Math.random() * 2 * Math.PI;
    }

    update(time: number) {
        super.update(time);
    }

    get facing(): any {
        return this._facing;
    }
}
