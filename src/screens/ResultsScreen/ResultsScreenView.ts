import Konva from "konva";
import type { View } from "../../types.ts";
import type { LeaderboardEntry } from "./ResultsScreenModel.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants.ts";

/**
 * ResultsScreenView - Renders the results screen
 */
export class ResultsScreenView implements View {
	private group: Konva.Group;
	private finalScoreText: Konva.Text;
	private leaderboardText: Konva.Text;
	private background: Konva.Rect;

	constructor(onPlayAgainClick: () => void) {
		this.group = new Konva.Group({ visible: false });

		// Results Background
		this.background = new Konva.Rect({
			x: STAGE_WIDTH / 2,
			y: STAGE_HEIGHT / 2,
			width: STAGE_WIDTH > 500 ? 500 : STAGE_WIDTH / 4,
			height: STAGE_HEIGHT * 3 / 4,
			fill: "#eec691ff",
			offsetY: (STAGE_HEIGHT * 3 / 4) / 2,
			cornerRadius: 20,
			stroke: "#f89f2bff",
			strokeWidth: 4,
		});
		this.background.offsetX(this.background.width() / 2);
		this.group.add(this.background);

		// "Level Completion" title
		const title = new Konva.Text({
			x: this.background.x(),
			y: this.background.y() - 0.8 * (this.background.height() / 2),
			text: "LEVEL COMPLETE!",
			fontSize: this.background.width() > this.background.height() ? this.background.height() * 0.1 : this.background.width() * 0.1,
			fontFamily: "Arial",
			fill: "gold",
			stroke: "brown",
			strokeWidth: 3,
			align: "center",
		});
		title.offsetX(title.width() / 2);
		title.offsetY(title.height() / 2);
		this.group.add(title);

		// Final score display
		this.finalScoreText = new Konva.Text({
			x: this.background.x(),
			y: this.background.y() - 0.4 * (this.background.height() / 2),
			text: "Final Score: 0",
			fontSize: this.background.width() > this.background.height() ? this.background.height() * 0.08 : this.background.width() * 0.08,
			fontFamily: "Arial",
			fill: "black",
			align: "center",
		});
		this.finalScoreText.offsetX(this.finalScoreText.width() / 2);
		this.finalScoreText.offsetY(this.finalScoreText.height() / 2);
		this.group.add(this.finalScoreText);

		// Leaderboard display
		this.leaderboardText = new Konva.Text({
			x: this.background.x(),
			y: this.background.y() - 0.3 * (this.background.height() / 2),
			text: "Top Scores:\n(Play to see your scores!)",
			fontSize: this.background.width() > this.background.height() ? this.background.height() * 0.05 : this.background.width() * 0.05,
			fontFamily: "Arial",
			fill: "#000000ff",
			align: "center",
			verticalAlign: "middle",
			lineHeight: 1.5,
		});
		this.group.add(this.leaderboardText);

		// Play Again button (grouped) - moved down to make room for leaderboard
		const playAgainButtonGroup = new Konva.Group({
			x: this.background.x(),
			y: this.background.y() + 0.8 * (this.background.height() / 2),
		});
		const playAgainButton = new Konva.Rect({
			x: 0,
			y: 0,
			width: this.background.width() * 0.5,
			height: this.background.height() * 0.1,
			fill: "gold",
			stroke: "brown",
			strokeWidth: 4,
			cornerRadius: 10,
		});
		const playAgainText = new Konva.Text({
			x: playAgainButton.x(),
			y: playAgainButton.y(),
			width: playAgainButton.width(),
			height: playAgainButton.height(),
			text: "PLAY AGAIN",
			fontSize: this.background.width() > this.background.height() ? this.background.height() * 0.05 : this.background.width() * 0.05,
			fontFamily: "Arial",
			fill: "black",
			align: "center",
			verticalAlign: "middle",
		});
		playAgainButtonGroup.add(playAgainButton);
		playAgainButtonGroup.add(playAgainText);
		playAgainButtonGroup.offsetX(playAgainButton.width() / 2);
		playAgainButtonGroup.offsetY(playAgainButton.height() / 2);
		// Button interaction - on the group
		playAgainButtonGroup.on("click", onPlayAgainClick);
		this.group.add(playAgainButtonGroup);
	}

	/**
	 * Update the stars earned
	 */
	updateStars(): void {
		const starGroup = new Konva.Group();
		const offset = this.background.width() > this.background.height() ? this.background.height() / 4 : this.background.width() / 4;
		// Get Stars
		let stored = localStorage.getItem("numStars");
		let num_stars = stored ? JSON.parse(stored) : 0;

		for (let i = 0; i < 3; i++) {
			// Create a new star for each position
			let isComplete = i < num_stars;

			let star = new Konva.Star({
				x: this.background.x() - offset + offset * i, // center the three stars
				y: this.background.y() - 0.6 * (this.background.height() / 2),
				numPoints: 5,
				innerRadius: this.background.height() > this.background.width() ? this.background.width() / 20 : this.background.height() / 30,
				outerRadius: this.background.height() > this.background.width() ? this.background.width() / 40 : this.background.height() / 60,
				fill: isComplete ? 'gold' : 'lightgray',
				stroke: 'brown',
				strokeWidth: 4,
			});

			starGroup.add(star);
		}
		localStorage.setItem("numStars", JSON.stringify(0));
		this.group.add(starGroup);
	}

	/**
	 * Update the final score display
	 */
	updateFinalScore(score: number): void {
		this.finalScoreText.text(`Final Score: ${score}`);
		// Re-center after text change
		this.finalScoreText.offsetX(this.finalScoreText.width() / 2);
		this.group.getLayer()?.draw();
	}

	/**
	 * Update the leaderboard display
	 */
	updateLeaderboard(entries: LeaderboardEntry[]): void {
		if (entries.length === 0) {
			this.leaderboardText.text("Top Scores:\n(No scores yet!)");
		} else {
			let text = "Top Scores:\n";
			entries.forEach((entry, index) => {
				text += `${index + 1}. ${entry.score} - ${entry.timestamp}\n`;
			});
			this.leaderboardText.text(text);
		}
		// Re-center after text change
		this.leaderboardText.offsetX(this.leaderboardText.width() / 2);
		this.group.getLayer()?.draw();
	}

	/**
	 * Show the screen
	 */
	show(): void {
		this.group.visible(true);
		this.group.getLayer()?.draw();
	}

	/**
	 * Hide the screen
	 */
	hide(): void {
		this.group.visible(false);
		this.group.getLayer()?.draw();
	}

	getGroup(): Konva.Group {
		return this.group;
	}
}
