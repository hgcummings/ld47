export interface Controller {
    enter(exitCallback: () => void);
    update();
}