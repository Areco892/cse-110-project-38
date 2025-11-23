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
	private isAnimating: boolean = false;
	private numStars: number = 3;
	private playerInput: string = '';
	private paused: boolean = false;

	constructor(screenSwitcher: ScreenSwitcher) {
		super();
		this.screenSwitcher = screenSwitcher;

		this.model = new GameScreenModel();
		this.view = new GameScreenView(() => this.handlePauseClick(), () => this.handleResumeClick(), () => this.handleQuitClick(), () => this.handleKeyPress(), (event: KeyboardEvent) => this.checkEnter(event));
		
	}

	/**
	 * Start the game
	 */
	startGame(): void {
		// Reset model state
		this.model.reset();
		this.view.reset();
		this.numStars = 3;

		this.view.show();
		this.model.genQuestion();
		this.view.displayQuestion(this.model.getQuestion());
		this.startTimer();
	}

	/**
	 * Start the countdown timer
	 */
	private startTimer(): void {
		let timeRemaining = GAME_DURATION;
		const timerID = setInterval(() => {
			if(!this.paused) {
				timeRemaining -= 0.01;
				this.view.updateTimer(timeRemaining);
				if (timeRemaining <= 0) {
					this.endGame();
				}
			}
		}, 10)
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
		this.paused = true;
	}

	private handleResumeClick(): void {
		this.view.togglePauseOverlay()
		this.paused = false;
	}

	private handleQuitClick(): void {
		this.view.togglePauseOverlay()
		this.view.resetAnsBox()
		this.screenSwitcher.switchToScreen({ type: 'menu' })
		this.numStars = 3;
		this.paused = false;
		localStorage.setItem("numStars", JSON.stringify(this.numStars));
		this.view.resetGameScreen()
		this.stopTimer();
	}

	private handleKeyPress(): void {
		this.view.updateAnsBox()
	}

	/**
	 * Handle gameplay (user input) events
	 */
	private async checkEnter(event: KeyboardEvent): Promise<void> {
		if (event.key !== "Enter" || this.view.getAns() == "") { return };
		if (this.isAnimating) { return };

		this.isAnimating = true;

		this.playerInput = this.view.getAns();
		this.view.resetAnsBox();
		if (this.model.isCorrect(this.playerInput)) {
			this.model.attackEnemy();
			await this.view.attackEnemy(this.model.getEnemyHealth());
			localStorage.setItem("numStars", JSON.stringify(this.numStars));
			if (!this.model.isEnemyAlive()) {
				await this.view.enemyDefeated();
				if (this.gameTimer) {
					this.screenSwitcher.switchToScreen({ type: 'result' });
					this.stopTimer();
				}
			}
			this.model.genQuestion();
		} else {
			this.model.attackPlayer();
			await this.view.attackPlayer(this.model.getPlayerHealth());
			if(this.model.getPlayerHealth() <= 40) {
				this.numStars = 1;
			} else if(this.model.getPlayerHealth() <= 80) {
				this.numStars = 2;
			} else {
				this.numStars = 3;
			}
			if (!this.model.isPlayerAlive()) {
				await this.view.playerDefeated();
				this.numStars = 0;
				if (this.gameTimer) {
					this.screenSwitcher.switchToScreen({ type: 'result' });
					this.stopTimer();
				}
			}
		}
		this.isAnimating = false;
		this.view.displayQuestion(this.model.getQuestion());
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
			this.model.setLevel(levelNumber);
		// Define a mapping from level number to level handler
		//based on number passed in we call a function to start the level. for now that's jus tthis.starGame as a placeholder
		const levelMap: Record<number, () => void> = {
			1: () => {
				console.log("Starting Level 1");
				// Normal game logic 
				this.view.setLevel(1); // ensure level groups exist before reset/show
				this.startGame();
			},
			2: () => {
				console.log("Starting Level 2");
				this.view.setLevel(2);
				this.startGame();
			},
			3: () => {
				console.log("Starting Level 3");
				this.view.setLevel(3);
				this.startGame();
			},
			4: () => {
				console.log("Starting Level 4");
				this.view.setLevel(3);
				this.startGame();
			},
			5: () => {
				console.log("Starting Level 5");
				this.view.setLevel(3);
				this.startGame();
			},
		};

		this.view.resetGameScreen();

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
