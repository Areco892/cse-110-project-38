import { ScreenController } from "../../types.ts";
import type { ScreenSwitcher } from "../../types.ts";
import { GameScreenModel } from "./GameScreenModel.ts";
import { GameScreenView } from "./GameScreenView.ts";
import { GAME_DURATION } from "../../constants.ts";
import Konva from "konva"


/**
 * GameScreenController - Coordinates game logic between Model and View
 */
export class GameScreenController extends ScreenController {
	private model: GameScreenModel;
	private view: GameScreenView;
	private screenSwitcher: ScreenSwitcher;
	private gameTimer: number | null = null;
	private playerInput: string

	constructor(screenSwitcher: ScreenSwitcher) {
		super();
		this.screenSwitcher = screenSwitcher;

		this.model = new GameScreenModel();
		this.view = new GameScreenView(() => this.handlePauseClick(), () => this.handleResumeClick(), () => this.handleQuitClick(), () => this.handleKeyPress(), (event: KeyboardEvent) => this.checkEnter(event));
		this.playerInput = ''
	}

	/**
	 * Start the game
	 */
	startGame(): void {
		// Reset model state
		this.model.reset();

		this.view.show();
	}

	/**
	 * Stop the timer
	 */
	private stopTimer(): void {
		// TODO: Task 3 - Stop the timer using clearInterval
		if (this.gameTimer != null) {
			clearInterval(this.gameTimer);
			this.gameTimer = null;
		}
	}

	/**
	 * Handle lemon click event
	 */
	private handlePauseClick(): void {
		this.view.togglePauseOverlay()
	}

	private handleResumeClick(): void {
		this.view.togglePauseOverlay()
	}

	private handleQuitClick(): void {
		this.view.togglePauseOverlay()
		this.view.resetAnsBox()
		this.screenSwitcher.switchToScreen({ type: 'menu' })
	}

	private handleKeyPress(): void {
		this.view.updateAnsBox()
	}

	private checkEnter(event: KeyboardEvent): void {
		if (event.keyCode == 13) {
			this.playerInput = this.view.getAns()
			this.view.resetAnsBox()
			this.view.updateText(this.playerInput)
		}
	}
	/*
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
		if (levelFn) {
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
