import GameController from './controllers/game';
import TitleController from './controllers/title';
import { Controller } from './controllers';


export default () => {
    let currentController: Controller;
    let animate: () => void;

    let titleController = new TitleController();
    let gameController = new GameController();

    const enterTitle = () => {
        currentController = titleController;
        titleController.enter(enterGame);
    };

    const enterGame = () => {
        currentController = gameController;
        gameController.enter(enterTitle);
    }
    
    enterTitle();

    animate = () => {
        currentController.update();
        window.requestAnimationFrame(animate);
    }
    window.requestAnimationFrame(animate);
};