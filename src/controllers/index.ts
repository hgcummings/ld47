export interface Controller<TData> {
    enter(exitCallback: (data: TData) => void, data: TData);
    update();
}