import { Sprite } from "./sprite";

export class Frog extends Sprite {

    moveOut() {
        this.r += 1;
    }

    moveIn() {
        this.r = Math.max(this.r - 1, 0);
    }
}