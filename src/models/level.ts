import { Model } from ".";
import { Lily } from "../sprites/lily";
import { Car } from "../sprites/car";

export class Level implements Model {
    lilies: Array<Lily>
    cars: Array<Car>
    homes: Boolean[];

    constructor(grid, difficulty) {
        this.lilies = [];
        this.cars = [];
        this.homes = [false, false, false, false];
        for (let r = 0; r < grid.length; ++r) {
            const type = grid[r].type
            const length = 2 * Math.PI * r;
            if (type === 'pond') {
                this.populateRow(
                    Math.floor(length),
                    0.7 - (0.1 * difficulty),
                    t => this.lilies.push(new Lily(r, t, grid[r].speed)))
            } else if (type === 'road') {
                this.populateRow(
                    Math.floor(length) / 2,
                    0.225 + (0.075 * difficulty),
                    t => this.cars.push(new Car(r, t, grid[r].speed)))
            }
        }
    }

    populateRow(spaces, density, addAtAngle: (number) => void) {
        const step = 2 * Math.PI / spaces;
        const offset = step * Math.random();

        for (let i = 0; i < spaces; ++i) {
            if (Math.random() < density) {
                addAtAngle(offset + (i * step));
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
