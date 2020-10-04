import GameModel from '../models/game';
import GameView from '../views/game';
import { Controller } from '.';

const getScale = (): number => Math.round(document.getElementById('root').offsetHeight * 12 / 13);

export default class implements Controller {
    keyHandler: (event: any) => void;
    canvas: HTMLCanvasElement;
    lives: HTMLElement;
    onExit: () => void;
    view: GameView;
    startTime: number;
    model: GameModel;
    initView: () => void;

    enter(exitCallback) {
        const root = document.getElementById('root');

        this.canvas = document.createElement('canvas');
        this.canvas.id = 'game';
    
        this.lives = document.createElement('div');

        this.model = new GameModel();
    
        this.initView();

        window.addEventListener('resize', this.initView);
        window.addEventListener('keydown', this.keyHandler);
        root.appendChild(this.lives);
        root.appendChild(this.canvas);

        this.onExit = exitCallback;
        this.startTime = Date.now();
    }

    update() {
        const gameTime = Date.now() - this.startTime;
        this.model.update(gameTime);
        this.view.render(this.model);
    }

    exit() {
        const root = document.getElementById('root');
        root.removeChild(this.canvas);
        root.removeChild(this.lives);
        window.removeEventListener('keydown', this.keyHandler);
        window.removeEventListener('resize', this.initView);
    }

    constructor() {
        this.initView = () => {
            this.canvas.width = getScale();
            this.canvas.height = getScale();
            this.view = new GameView(this.canvas, this.lives);
        }

        this.keyHandler = event => {
            switch (event.code) {
                case 'KeyW':
                case 'ArrowUp':
                    this.model.frog.moveOut();
                    break;
                case 'KeyA':
                case 'ArrowLeft':
                    this.model.frog.moveAntiClockwise();
                    break;
                case 'KeyS':
                case 'ArrowDown':
                    this.model.frog.moveIn();
                    break;
                case 'KeyD':
                case 'ArrowRight':
                    this.model.frog.moveClockwise();
                    break;
                case 'Delete':
                    if (event.ctrlKey) {
                        this.model.toggleDebug();
                    }
                    break;
                default:
                    break;
            }
        }
    }
}