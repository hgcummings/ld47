
const renderLily = (unit: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = unit;
    canvas.height = unit;

    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#ff00ff';
    ctx.beginPath();
    ctx.arc(unit / 2, unit / 2, unit * 23 / 48, 0, 2 * Math.PI);
    ctx.fill();

    return canvas;
}

export class Sprites {
    lily: HTMLCanvasElement;

    constructor(unit) {
        this.lily = renderLily(unit);
    }
}