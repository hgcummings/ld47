export const normaliseAngle = (t: number) => {
    return (t + (2 * Math.PI)) % (2 * Math.PI);
}

export const angularDistance = (t1: number, t2: number) => {
    if (t1 < t2) {
        return Math.min(t2 - t1, t1 + (2 * Math.PI) - t2);
    } else {
        return Math.min(t1 - t2, t2 + (2 * Math.PI) - t1);
    }
}
