import { Sprite } from "./sprite";

export class Car extends Sprite {
    constructor(r:number, t:number, speed:number) {
        super(r, t, speed);
    }

    update(time: number) {
        super.update(time);
    }

    get facing(): any {
        return this.t + Math.PI / 2;
    }
}
