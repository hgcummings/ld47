export const normaliseAngle = (t: number) => {
    return (t + (2 * Math.PI)) % (2 * Math.PI);
}