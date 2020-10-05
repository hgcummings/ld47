import GameController from './controllers/game';
import TitleController from './controllers/title';
import { Controller } from './controllers';
import { GameData } from './models/gameData';

export default () => {
    let currentController: Controller<GameData>;
    let animate: () => void;

    let titleController = new TitleController();
    let gameController = new GameController();

    const enterTitle = (gameData) => {
        currentController = titleController;
        titleController.enter(enterGame, gameData);
    };

    const enterGame = (gameData) => {
        currentController = gameController;
        gameController.enter(enterTitle, gameData);
    }
    
    enterTitle({ nextLevel: 1, score: 0 });

    animate = () => {
        currentController.update();
        window.requestAnimationFrame(animate);
    }
    window.requestAnimationFrame(animate);
};