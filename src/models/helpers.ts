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

export const range = (length: number):number[] => {
    const arr = [];
    for (let i = 0; i < length; ++i) {
        arr.push(i);
    }
    return arr;
};

export function shuffle<T>(array: Array<T>) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
