import { Controller } from ".";
import { GameData } from "../models/gameData";

export default class implements Controller<GameData> {
    handler: (event: any) => void;
    onExit: (data: GameData) => void;
    currentData: GameData;
    startTime: number;
    listening: boolean;

    enter(exitCallback: (data: GameData) => void, data: GameData) {
        const title = document.getElementById('title');
        title.style.display = 'block';

        const heading = title.firstElementChild as HTMLElement;

        if (data.nextLevel === -1){
            heading.innerText = 'Game Over';
            const score = document.createElement('p');
            score.innerText = `Score: ${data.score}`;
            title.appendChild(score);
        } else {
            heading.innerText = data.nextLevel === 1 ? 'LoopFrog' : `Level ${data.nextLevel}`

            const controls = document.createElement('p');
            controls.innerText = 'Controls: arrow keys or W/A/S/D';
            title.appendChild(controls);
        }

        this.currentData = data;
        this.onExit = exitCallback;

        this.startTime = Date.now();
        this.listening = false;
    }

    update() {
        if (!this.listening && Date.now() > this.startTime + 750) {
            const title = document.getElementById('title');
            const instruction = document.createElement('p');

            let verb = 'continue';
            if (this.currentData.nextLevel === 1) {
                verb = 'start';
            } else if (this.currentData.nextLevel === -1) {
                verb = 'play again';
            }

            instruction.innerText = `Press any key to ${verb}`;
                
            title.appendChild(instruction);
            window.addEventListener('keydown', this.handler);
            this.listening = true;
        }
    }

    exit() {
        const title = document.getElementById('title');
        
        while (title.lastElementChild.tagName.toLowerCase() === 'p') {
            title.removeChild(title.lastElementChild);
        }

        title.style.display = 'none';

        window.removeEventListener('keydown', this.handler);
        this.onExit(this.currentData);
    }

    constructor() {
        this.handler = () => {
            this.exit();
        }
    }
}