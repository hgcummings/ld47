
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

    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.ellipse(unit * 7 / 8, unit * 3 / 8, unit / 16, unit / 16, 0, 0, 2 * Math.PI);
    ctx.ellipse(unit * 7 / 8, unit * 5 / 8, unit / 16, unit / 16, 0, 0, 2 * Math.PI);
    ctx.fill();

    return canvas;
}

const renderMask = (unit: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = unit * 64;
    canvas.height = unit * 64;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';

    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = 'xor';

    ctx.filter = `blur(${unit}px)`;


    ctx.beginPath();
    ctx.ellipse((unit * 3) + (canvas.width / 2), canvas.height / 2, unit * 9, unit * 6, 0, 0, 2 * Math.PI);
    ctx.fill();


    return canvas;
}

const renderCar = (unit: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = unit;
    canvas.height = unit;

    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#ccccff';
    ctx.fillRect(0, unit / 4, unit, unit / 2);

    ctx.fillStyle = '#333333';
    ctx.beginPath();
    ctx.moveTo(unit / 4, unit / 4);
    ctx.lineTo(unit / 4, unit * 3 / 4);
    ctx.lineTo(unit * 3 / 8, unit * 11/16);
    ctx.lineTo(unit * 3 / 8, unit * 5/16);
    ctx.lineTo(unit / 4, unit / 4);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(unit * 3 / 4, unit / 4);
    ctx.lineTo(unit * 3 / 4, unit * 3 / 4);
    ctx.lineTo(unit * 5 / 8, unit * 11/16);
    ctx.lineTo(unit * 5 / 8, unit * 5/16);
    ctx.lineTo(unit * 3 / 4, unit / 4);
    ctx.fill();

    ctx.fillStyle = '#ccff99';
    ctx.beginPath();
    ctx.moveTo(unit * 31 / 32, unit / 4);
    ctx.lineTo(unit * 31 / 32, unit * 11 / 32);
    ctx.lineTo(unit, unit * 3 / 8);
    ctx.lineTo(unit, unit / 4);
    ctx.lineTo(unit * 31 / 32, unit / 4);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(unit * 31 / 32, unit * 3 / 4);
    ctx.lineTo(unit * 31 / 32, unit * 21 / 32);
    ctx.lineTo(unit, unit * 5 / 8);
    ctx.lineTo(unit, unit * 3 / 4);
    ctx.lineTo(unit * 31 / 32, unit * 3 / 4);
    ctx.fill();

    ctx.fillStyle = '#ff6633';
    ctx.beginPath();
    ctx.moveTo(unit / 32, unit / 4);
    ctx.lineTo(unit / 32, unit * 11 / 32);
    ctx.lineTo(0, unit * 3 / 8);
    ctx.lineTo(0, unit / 4);
    ctx.lineTo(unit / 32, unit / 4);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(unit / 32, unit * 3 / 4);
    ctx.lineTo(unit / 32, unit * 21 / 32);
    ctx.lineTo(0, unit * 5 / 8);
    ctx.lineTo(0, unit * 3 / 4);
    ctx.lineTo(unit / 32, unit * 3 / 4);
    ctx.fill();

    return canvas;
}

export class Sprites {
    lily: HTMLCanvasElement;
    frog: HTMLCanvasElement;
    car: HTMLCanvasElement;
    mask: HTMLCanvasElement;

    constructor(unit) {
        this.lily = renderLily(unit);
        this.frog = renderFrog(unit);
        this.car = renderCar(unit);
        this.mask = renderMask(unit);
    }
}