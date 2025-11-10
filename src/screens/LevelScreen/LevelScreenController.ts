import { ScreenController } from "../../types.ts";
import type { ScreenSwitcher } from "../../types.ts";
import { LevelScreenModel } from "./LevelScreenModel.ts";
import { LevelScreenView } from "./LevelScreenView.ts";

/**
 * GameScreenController - Coordinates game logic between Model and View
 */
export class LevelScreenController extends ScreenController {
    private model: LevelScreenModel;
    private view: LevelScreenView;
    private screenSwitcher: ScreenSwitcher;

    /**
     * Constructor
     * @param screenSwitcher - Reference to the screen switcher for navigation
     */
    constructor(screenSwitcher: ScreenSwitcher) {
        super();
        this.screenSwitcher = screenSwitcher;

        // Initialize the game model
        this.model = new LevelScreenModel();

        // Initialize the game view with cubes
        // 3 cubes by default, each with its own click handler
        this.view = new LevelScreenView(11, [
            (index) => this.startLevel(index),  // cube level selecter
            (index) => this.startLevel(index),       // Other cubes start levels
            (index) => this.startLevel(index),
            (index) => this.startLevel(index),
            (index) => this.startLevel(index),
            (index) => this.startLevel(index),
            (index) => this.startLevel(index),
            (index) => this.startLevel(index),
            (index) => this.startLevel(index),
            (index) => this.startLevel(index),
            (index) => this.startLevel(index),
        ]);
    }

    /**
     * Start the game
     */
    startGame(): void {
        // Reset the model state for a new game
        this.model.reset();

        // Show the view with the cubes
        this.view.show();
    }

    /**
     * Start a specific level
     * @param levelNumber - Index of the level to start
     */
    private startLevel(levelNumber: number): void {
        console.log(`Starting level ${levelNumber + 1}`);
        this.model.setSelectedLevel(levelNumber);

        // Dynamically switch to the corresponding level screen
        this.screenSwitcher.switchToScreen({
            type: "game",
            level: levelNumber + 1, // optional: +1 if you want levels 1-based
        });
    }


    /**
     * Handle cube click event to navigate to results screen
     */
    private navigateResultScreen(): void {
        this.screenSwitcher.switchToScreen({
            type: "result",
            score: this.model.getScore(),
        });
    }

    /**
     * Get the final score
     * @returns number
     */
    getFinalScore(): number {
        return this.model.getScore();
    }

    /**
     * Get the view instance
     * @returns GameScreenView
     */
    getView(): LevelScreenView {
        return this.view;
    }
}
