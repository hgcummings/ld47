import { Model } from ".";
import { Lily } from "../sprites/lily";
import { Car } from "../sprites/car";

export class Level implements Model {
    lilies: Array<Lily>
    cars: Array<Car>

    constructor(grid, density) {
        this.lilies = [];
        this.cars = [];
        for (let r = 0; r < grid.length; ++r) {
            const type = grid[r].type
            if (type === 'pond' || type === 'road') {
                const length = 2 * Math.PI * r;
                const spaces = Math.floor(length) / (type === 'road' ? 2 : 1);
                const step = 2 * Math.PI / spaces;
                const offset = step * Math.random();

                for (let i = 0; i < spaces; ++i) {
                    if (type === 'pond' && Math.random() < density) {
                        this.lilies.push(new Lily(r, offset + (i * step), grid[r].speed));
                    } else if (type === 'road' && Math.random() < density) {
                        this.cars.push(new Car(r, offset + (i * step), grid[r].speed));
                    }
                }
            }
        }
    }

    update(time: number) {
        for (let lilies of this.lilies) {
            lilies.update(time);
        }
        for (let car of this.cars) {
            car.update(time);
        }
    }
}
