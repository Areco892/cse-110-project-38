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
	private playerInput: string
	private isAnimating: boolean = false;
	private numStars: number = 0;

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
		this.view.reset();
		this.numStars = 0;

		this.view.show();
		this.startTimer();
	}

	/**
	 * Start the countdown timer
	 */
	private startTimer(): void {
		let timeRemaining = GAME_DURATION;
		const timerID = setInterval(() => {
			timeRemaining -= 1;
			this.view.updateTimer(timeRemaining);
			if (timeRemaining <= 0) {
				this.endGame();
			}
		}, 1000)
		this.gameTimer = timerID;
	}

	/**
	 * Stop the timer
	 */
	private stopTimer(): void {
		if (this.gameTimer != null) {
			clearInterval(this.gameTimer);
			this.gameTimer = null;
		}
	}

	/**
	 * End the game
	 */
	private endGame(): void {
		this.stopTimer();
		this.screenSwitcher.switchToScreen({ type: "result" });
	}

	/**
	 * Handle Game UI related events
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
		this.numStars = 0;
		localStorage.setItem("numStars", JSON.stringify(this.numStars));
		this.stopTimer();
	}

	private handleKeyPress(): void {
		this.view.updateAnsBox()
	}

	/**
	 * Handle gameplay (user input) events
	 */
	private async checkEnter(event: KeyboardEvent): Promise<void> {
		if (event.key !== "Enter") { return };
		if (this.isAnimating) { return };

		this.isAnimating = true;

		const answer = this.view.getAns();
		if (this.model.isCorrect(answer)) {
			this.model.attackEnemy();
			await this.view.attackEnemy(this.model.getEnemyHealth());
			this.numStars += 1;
			localStorage.setItem("numStars", JSON.stringify(this.numStars));
			if (!this.model.isEnemyAlive()) {
				await this.view.enemyDefeated();
				if (this.gameTimer) {
					this.screenSwitcher.switchToScreen({ type: 'result' });
					this.stopTimer();
				}
			}
		} else {
			this.model.attackPlayer();
			await this.view.attackPlayer(this.model.getPlayerHealth());
			if (!this.model.isPlayerAlive()) {
				await this.view.playerDefeated();
				if (this.gameTimer) {
					this.screenSwitcher.switchToScreen({ type: 'result' });
					this.stopTimer();
				}
			}
		}
		this.isAnimating = false;
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
