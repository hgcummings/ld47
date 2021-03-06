import { Model } from ".";
import { Lily } from "../sprites/lily";
import { Car } from "../sprites/car";
import { range, shuffle } from "./helpers";
import { Home } from "../sprites/home";

export class Level implements Model {
    lilies: Array<Lily>
    cars: Array<Car>
    homes: Array<Home>
    difficulty: number;

    constructor(difficulty) {
        this.homes = [];
        this.difficulty = difficulty;
    }

    populate(grid) {
        this.lilies = [];
        this.cars = [];
        for (let r = 0; r < grid.length; ++r) {
            const type = grid[r].type
            const length = 2 * Math.PI * r;
            if (type === 'pond') {
                this.populateRow(
                    Math.floor(length),
                    0.7 - (0.1 * this.difficulty),
                    t => this.lilies.push(new Lily(r, t, grid[r].speed)))
            } else if (type === 'road') {
                this.populateRow(
                    Math.floor(length) / 2,
                    0.225 + (0.075 * this.difficulty),
                    t => this.cars.push(new Car(r, t, grid[r].speed)))
            }
        }
    }

    populateRow(spaces, density, addAtAngle: (number) => void) {
        const step = 2 * Math.PI / spaces;
        const offset = step * Math.random();

        const allSpaces = range(spaces);
        shuffle(allSpaces);
        for (let i = 0; i < Math.max(1, Math.round(density * spaces)); ++i) {
            addAtAngle(offset + (allSpaces[i] * step));
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

    completed() {
        for (let i = 0; i < 4; ++i) {
            if (!this.homes[i]) {
                return false;
            }
        }
        return true;
    }
}
