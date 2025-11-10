import { ScreenController } from "../../types.ts";
import type { ScreenSwitcher } from "../../types.ts";
import { GameScreenModel } from "./GameScreenModel.ts";
import { GameScreenView } from "./GameScreenView.ts";
import { GAME_DURATION } from "../../constants.ts";


/**
 * GameScreenController - Coordinates game logic between Model and View
 */
export class GameScreenController extends ScreenController {
	private model: GameScreenModel;
	private view: GameScreenView;
	private screenSwitcher: ScreenSwitcher;
	private gameTimer: number | null = null;

	private squeezeSound: HTMLAudioElement;

	constructor(screenSwitcher: ScreenSwitcher) {
		super();
		this.screenSwitcher = screenSwitcher;

		this.model = new GameScreenModel();
		this.view = new GameScreenView(() => this.handleLemonClick());

		// TODO: Task 4 - Initialize squeeze sound audio
		this.squeezeSound = new Audio('/squeeze.mp3'); // initialized to squeeze.mp3
	}

	/**
	 * Start the game
	 */
	startGame(): void {
		// Reset model state
		this.model.reset();

		// Update view
		this.view.updateScore(this.model.getScore());
		this.view.updateTimer(GAME_DURATION);
		this.view.show();

		this.startTimer();
	}

	/**
	 * Start the countdown timer
	 */
	private startTimer(): void {
		// TODO: Task 3 - Implement countdown timer using setInterval
		let timeRemaining:number = GAME_DURATION;
		
		const timerID = setInterval(() => {
				this.gameTimer = timerID
				timeRemaining = timeRemaining - 1;
				this.view.updateTimer(timeRemaining);
				if (timeRemaining <= 0)
				{
					// this.endGame();
				}
			}, 1000 
		);
		this.stopTimer();
	

	}

	/**
	 * Stop the timer
	 */
	private stopTimer(): void {
		// TODO: Task 3 - Stop the timer using clearInterval
		if(this.gameTimer != null)
		{
			clearInterval(this.gameTimer);
			this.gameTimer = null;
		}
	}

	/**
	 * Handle lemon click event
	 */
	private handleLemonClick(): void {
		// Update model
		this.model.incrementScore();

		// Update view
		this.view.updateScore(this.model.getScore());

		// TODO: Task 4 - Play the squeeze sound
		this.squeezeSound.play();
		this.squeezeSound.currentTime = 0;
	}

	/**
	 * End the game
	 */
	private endGame(): void {
		this.stopTimer();

		// Switch to results screen with final score
		this.screenSwitcher.switchToScreen({
			type: "result",
			score: this.model.getScore(),
		});
	}

	/**
	 * Get final score
	 */
	getFinalScore(): number {
		return this.model.getScore();
	}

	/**
	 * Get the view group
	 */
	getView(): GameScreenView {
		return this.view;
	}

	//TEMPORARY LEVEL VIEW FOR TESTING
   	startTempLevel(levelNumber: number): void {
        console.log(`Showing temp level ${levelNumber}`);

        // Call view function to show temp level overlay
        this.view.showTempLevel(levelNumber);
    }	

		/**
	 * Start a specific level (efficient dispatch)
	 * @param levelNumber - Index of the level to start
	 */
	startLevel(levelNumber: number): void {
		// TODO: Add real start level logic for each level here.
    	// You can create separate functions for each level, e.g., startLevel1(), startLevel2(), etc.

		console.log(`startLevel called for level ${levelNumber}`); //notes which level is being started

		// Define a mapping from level number to level handler
		//based on number passed in we call a function to start the level. for now that's jus tthis.starGame as a placeholder
		const levelMap: Record<number, () => void> = {
			1: () => {
				console.log("Starting Level 1");
				// Normal game logic 
				this.startGame();  //TODO CHANGE TO REAL LEVEL LOGIC CALL LEVEL FUNCTION HERE
			},
			2: () => {
				console.log("Starting Level 2");
				this.startTempLevel(2); //TODO CHANGE TO REAL LEVEL LOGIC CALL LEVEL FUNCTION HERE
			},
			3: () => {
				console.log("Starting Level 3");
				this.startTempLevel(3); //TODO CHANGE TO REAL LEVEL LOGIC CALL LEVEL FUNCTION HERE
			}, 
		};

		// Call a function to open up a selected level based on number
		//based on passed in integer. calls the the fucntion stored in the level map correspodning to integer
		//if the level doesn't exist then we go to result screen
		const levelFn = levelMap[levelNumber]; 
		if (levelFn)  
			{
			levelFn();
		} else {
			console.warn(`Level ${levelNumber} not implemented yet`);
			this.screenSwitcher.switchToScreen({
				type: "result",
				score: this.model.getScore(),
       		 }); //by default go to result screen if nothing implemented
		}
	}

}
