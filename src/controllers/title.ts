import { Controller } from ".";
import { GameData } from "../models/gameData";

export default class implements Controller<GameData> {
    handler: (event: any) => void;
    onExit: (data: GameData) => void;
    currentData: GameData;
    startTime: number;
    listening: boolean;
    messageHolder: HTMLElement;
    messages: string[] = [];

    enter(exitCallback: (data: GameData) => void, data: GameData) {
        this.messages = [];

        const title = document.getElementById('title');
        title.style.display = 'block';

        const heading = title.firstElementChild as HTMLElement;
        this.messageHolder = document.createElement('p');
        title.appendChild(this.messageHolder);

        if (data.nextLevel === -1){
            heading.innerText = 'Game Over';
            const previousHighScore = parseInt(localStorage.getItem('highScore') || '0', 10);
            if (data.score > previousHighScore) {
                localStorage.setItem('highScore', data.score.toString(10));
            }
            this.messages.push(`Score: ${data.score}`);
        } else if (data.nextLevel === 1) {
            heading.innerText = 'Loop Frog';
            this.messages.push('Controls: arrow keys or W/A/S/D');
        } else {
            heading.innerText = `Level ${data.nextLevel}`
            this.messages.push(`Score: ${data.score}`);
        }

        if (data.nextLevel < 2) {
            const highScore = localStorage.getItem('highScore');
            if (highScore !== null) {
                this.messages.push(`High score: ${highScore}`);
            }
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

        this.messageHolder.innerText =
            this.messages[Math.floor((Date.now() - this.startTime) / 2250) % this.messages.length];
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