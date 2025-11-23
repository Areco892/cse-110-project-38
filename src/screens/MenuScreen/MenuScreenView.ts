import Konva from "konva";
import type { View } from "../../types.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants.ts";

/**
 * MenuScreenView - Renders the menu screen
 */
export class MenuScreenView implements View {
	private group: Konva.Group;
	private background: Konva.Image | Konva.Rect;
	private title: Konva.Text;
	private startText: Konva.Text;
	private startButton: Konva.Rect;
	private startButtonGroup: Konva.Group;

	constructor(onStartClick: () => void) {
		this.group = new Konva.Group({ visible: true });

		// Background
		this.background = new Konva.Rect({
			x: STAGE_WIDTH / 2,
			y: STAGE_HEIGHT / 2,
			width: STAGE_WIDTH,
			height: STAGE_HEIGHT,
			fill: "rgba(0, 0, 0, 0)",
			offsetX: STAGE_WIDTH / 2,
			offsetY: STAGE_HEIGHT / 2,
		});
		this.group.add(this.background);
		Konva.Image.fromURL("sky bridge.png", (image) => {
			// Set position to the center of the stage
			image.x(STAGE_WIDTH / 2);
			image.y(STAGE_HEIGHT / 2); // <-- use STAGE_HEIGHT for vertical centering
			image.width(STAGE_WIDTH);
			image.height(STAGE_HEIGHT);
			// Set offset to center the image around its middle point
			image.offsetX(image.width() / 2);
			image.offsetY(image.height() / 2);
			this.group.add(image);
			image.moveToBottom();
		})

		// Title text
		this.title = new Konva.Text({
			x: this.background.x(),
			y: this.background.y() - 0.25 * (this.background.height()),
			text: "PROJECT-38",
			fontSize: this.background.width() > this.background.height() ? this.background.height() * 0.07 : this.background.width() * 0.07,
			fontFamily: "Arial",
			fill: "yellow",
			stroke: "brown",
			strokeWidth: 2,
			align: "center",
			verticalAlign: "middle",
		});
		// Center the text using offsetX
		this.title.offsetX(this.title.width() / 2);
		this.title.offsetY(this.title.height() / 2);
		this.group.add(this.title);

		// Button
		this.startButtonGroup = new Konva.Group({
			x: this.background.x(),
			y: this.background.y() + 0.5 * (this.background.height() / 2),
		});
		this.startButton = new Konva.Rect({
			x: 0,
			y: 0,
			width: this.background.width() > this.background.height() ? this.background.width() * 0.15 : this.background.width() * 0.3,
			height: this.background.height() * 0.08,
			fill: "green",
			stroke: "darkgreen",
			strokeWidth: 4,
			cornerRadius: 10,
		});
		this.startText = new Konva.Text({
			x: this.startButton.x(),
			y: this.startButton.y(),
			width: this.startButton.width(),
			height: this.startButton.height(),
			text: "START GAME",
			fontSize: this.background.width() > this.background.height() ? this.background.height() * 0.04 : this.background.width() * 0.04,
			fontFamily: "Arial",
			fill: "white",
			align: "center",
			verticalAlign: "middle",
		});
		this.startButtonGroup.add(this.startButton);
		this.startButtonGroup.add(this.startText);
		this.startButtonGroup.offsetX(this.startButton.width() / 2);
		this.startButtonGroup.offsetY(this.startButton.height() / 2);
		this.startButtonGroup.on("click", onStartClick);
		this.group.add(this.startButtonGroup);

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
