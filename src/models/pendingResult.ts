import { Model } from ".";

export class PendingResult<TResult> implements Model {
    startTime: number;
    duration: number;
    data: TResult;
    progress: number;

    constructor(data: TResult, duration: number) {
        this.duration = duration;
        this.data = data;
        this.progress = 0;
    }

    update(time: number) {
        if (!this.startTime) {
            this.startTime = time;
        } else {
            this.progress = Math.min(1, (time - this.startTime) / this.duration);
        }
    }
}