import { ScreenController } from "../../types.ts";
import type { ScreenSwitcher } from "../../types.ts";
import { MenuScreenView } from "./MenuScreenView.ts";

/**
 * MenuScreenController - Handles menu interactions
 */
export class MenuScreenController extends ScreenController {
	private view: MenuScreenView;
	private screenSwitcher: ScreenSwitcher;

	constructor(screenSwitcher: ScreenSwitcher) {
		super();
		this.screenSwitcher = screenSwitcher;
		this.view = new MenuScreenView(() => this.handleStartClick());
	}

	/**
	 * Handle start button click
	 */
	private handleStartClick(): void {
		// TODO: Task 1 - Implement screen transition from menu to game
		//this.screenSwitcher.switchToScreen({ type: "result", score: 10 });
		this.screenSwitcher.switchToScreen({ type: "select" });

	}

	/**
	 * Get the view
	 */
	getView(): MenuScreenView {
		return this.view;
	}
}
