import { Sprite, FiniteSprite } from ".";
import { Frog } from "./frog";

export class Splat extends Sprite implements FiniteSprite {
    active: boolean = true;
    startTime: number;

    constructor(r:number, t:number, time: number) {
        super(r, t, 0);
        this.startTime = time;
    }

    update(time: number) {
        super.update(time);
        if (time - this.startTime > 960) {
            this.active = false;
        }
    }

    get facing(): number {
        return this.t;
    }

    renderFrame(i: number, unit: number): HTMLCanvasElement {
        return Frog.render(unit, '#333300');
    }
}
