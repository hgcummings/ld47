import GameModel from './models/game';
import GameView from './views/game';
import GameController from './controllers/game';

export default () => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 800;

    const lives = document.createElement('div');

    const model = new GameModel();
    const view = new GameView(canvas, lives);
    const controller = new GameController(model);

    const animate = () => {
        const gameTime = Date.now() - startTime;
        model.update(gameTime);
        view.render(model);
        
        window.requestAnimationFrame(animate);
    }

    const root = document.getElementById('root');
    root.appendChild(canvas);
    root.appendChild(lives);

    const startTime = Date.now();
    window.requestAnimationFrame(animate);
};