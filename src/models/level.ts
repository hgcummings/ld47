import { Turtle } from "./turtle";
import { Model } from ".";
import { Lily } from "./lily";

export class Level implements Model {
    lilies: Array<Lily>

    constructor(grid, density) {
        this.lilies = [];
        for (let r = 0; r < grid.length; ++r) {
            if (grid[r].type === 'pond') {
                const length = 2 * Math.PI * r;
                const spaces = Math.floor(length);
                const step = 2 * Math.PI / spaces;
                const offset = step * Math.random();

                for (let i = 0; i < spaces; ++i) {
                    if (Math.random() < density) {
                        this.lilies.push(new Lily(r, offset + (i * step), grid[r].speed));
                    }
                }
            }
        }
    }

    update(time: number) {
        for (let lilies of this.lilies) {
            lilies.update(time);
        }
    }
}
