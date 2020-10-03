import GameModel from './models/game';
import GameView from './views/game';
import GameController from './controllers/game';

export default () => {
    const canvas = document.createElement('canvas');
    canvas.width = 384;
    canvas.height = 384;

    const model = new GameModel();
    const view = new GameView(canvas);
    const controller = new GameController(model);

    const animate = () => {
        const gameTime = Date.now() - startTime;
        model.update(gameTime);
        view.render(model);
        
        window.requestAnimationFrame(animate);
    }

    document.getElementById('root').appendChild(canvas);

    const startTime = Date.now();
    window.requestAnimationFrame(animate);
};