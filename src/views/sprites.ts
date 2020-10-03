
const renderLily = (unit: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = unit;
    canvas.height = unit;

    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#ff00ff';
    ctx.beginPath();
    ctx.arc(unit / 2, unit / 2, unit * 21 / 48, 0, 2 * Math.PI);
    ctx.fill();

    return canvas;
}

const renderFrog = (unit: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = unit;
    canvas.height = unit;

    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#669933';
    ctx.beginPath();
    ctx.ellipse(unit / 2, unit / 2, unit / 2, unit / 3, 0, 0, 2 * Math.PI);
    ctx.fill();

    return canvas;
}

export class Sprites {
    lily: HTMLCanvasElement;
    frog: HTMLCanvasElement;

    constructor(unit) {
        this.lily = renderLily(unit);
        this.frog = renderFrog(unit);
    }
}