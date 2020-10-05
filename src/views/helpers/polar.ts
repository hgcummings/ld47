export class CanvasRenderingContextPolar2D {
    context: CanvasRenderingContext2D;

    private constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    static create(canvas: HTMLCanvasElement) {
        const cartesianContext = canvas.getContext('2d');
        cartesianContext.translate(canvas.width / 2, canvas.height / 2);
        cartesianContext.rotate(-Math.PI / 2);
        return new CanvasRenderingContextPolar2D(cartesianContext);
    }

    set fillStyle(value) {
        this.context.fillStyle = value;
    }

    set strokeStyle(value) {
        this.context.strokeStyle = value;
    }

    set lineWidth(value: number) {
        this.context.lineWidth = value;
    }

    setLineDash(segments: number[]) {
        this.context.setLineDash(segments);
    }

    save() {
        this.context.save();
    }
    restore() {
        this.context.restore();
    }

    beginPath() {
        this.context.beginPath();
    }

    lineTo(r: number, t: number) {
        const {x, y} = this.convert(r, t);
        this.context.lineTo(x, y);
    }

    moveTo(r: number, t: number) {
        const {x, y} = this.convert(r, t);
        this.context.moveTo(x, y);
    }

    stroke() {
        this.context.stroke();
    }

    circle(radius: number) {
        this.context.beginPath();
        this.context.arc(0, 0, radius, 0, 2 * Math.PI);
        this.context.stroke();
    }
    
    fillCircle(radius: number) {
        this.context.beginPath();
        this.context.arc(0, 0, radius, 0, 2 * Math.PI);
        this.context.fill();
    };

    drawSprite(sprite: HTMLCanvasElement, r: number, t: number, rotation: number, scale: number) {
        const {x, y} = this.convert(r, t);
        this.context.save();
        this.context.translate(x, y);
        this.context.scale(scale, scale);
        this.context.rotate(rotation);
        this.context.drawImage(sprite, -sprite.width / 2, -sprite.height / 2);
        this.context.restore();
    }

    private convert(r: number, t: number) {
        return {
            x: r * Math.cos(t),
            y: r * Math.sin(t)
        }
    }
}