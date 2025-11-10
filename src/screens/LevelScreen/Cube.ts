import Konva from "konva";

/**
 * Cube - A simple rounded square rendered with Konva
 */
export class Cube {
	private group: Konva.Group;
	private size: number;
	private rect: Konva.Rect;
	private label: Konva.Text; // <-- added for number label
	private hoverTween: Konva.Tween | null = null;

	constructor(x: number, y: number, size: number = 60, number?: number) {
		this.size = size;
		this.group = new Konva.Group({ x, y });

		// Create the rounded square
		this.rect = new Konva.Rect({
			x: 0,
			y: 0,
			width: size,
			height: size,
			fill: "#FFD700", // Gold
			stroke: "#000",
			strokeWidth: 2,
			cornerRadius: 10,
			shadowColor: "#FFD700",
			shadowBlur: 0,
			shadowOpacity: 0,
			offsetX: size / 2,
			offsetY: size / 2,
		});

		// Center the rectangle
		this.rect.x(size / 2);
		this.rect.y(size / 2);

		// Create label (centered number)
		this.label = new Konva.Text({
			text: number !== undefined ? String(number) : "",
			fontSize: size / 2.5, // scales text relative to cube size
			fontFamily: "Arial",
			fill: "white",
			stroke: "black",
			strokeWidth: 1.5,
			align: "center",
			listening: false, // so clicks pass through to cube
		});

		// Center the label manually
		this.label.offsetX(this.label.width() / 2);
		this.label.offsetY(this.label.height() / 2);
		this.label.x(size / 2);
		this.label.y(size / 2);

		this.group.add(this.rect);
		this.group.add(this.label); // add label above cube

		this.setupHoverAnimation();
	}

	/**
	 * Setup hover animation effects
	 */
	private setupHoverAnimation(): void {
		this.group.on("mouseenter", () => {
			document.body.style.cursor = "pointer";
			this.hoverTween = new Konva.Tween({
				node: this.rect,
				duration: 0.2,
				scaleX: 1.1,
				scaleY: 1.1,
				shadowBlur: 15,
				shadowOpacity: 0.6,
				easing: Konva.Easings.EaseOut,
			});
			this.hoverTween.play();
		});

		this.group.on("mouseleave", () => {
			document.body.style.cursor = "default";
			this.hoverTween = new Konva.Tween({
				node: this.rect,
				duration: 0.2,
				scaleX: 1,
				scaleY: 1,
				shadowBlur: 0,
				shadowOpacity: 0,
				easing: Konva.Easings.EaseOut,
			});
			this.hoverTween.play();
		});
	}

	/**
	 * Set the number label text
	 */
	setNumber(num: number): void {
		this.label.text(String(num));
		this.label.offsetX(this.label.width() / 2);
		this.label.offsetY(this.label.height() / 2);
		this.label.x(this.size / 2);
		this.label.y(this.size / 2);
	}

	/**
	 * Set cube position
	 */
	setPosition(x: number, y: number): void {
		this.group.x(x);
		this.group.y(y);
	}

	getPosition(): { x: number; y: number } {
		return { x: this.group.x(), y: this.group.y() };
	}

	setSize(size: number): void {
		this.size = size;
		this.rect.width(size);
		this.rect.height(size);
		this.rect.offsetX(size / 2);
		this.rect.offsetY(size / 2);
		this.rect.x(size / 2);
		this.rect.y(size / 2);

		// scale label accordingly
		this.label.fontSize(size / 2.5);
		this.label.x(size / 2);
		this.label.y(size / 2);
	}

	getSize(): number {
		return this.size;
	}

	setColor(color: string): void {
		this.rect.fill(color);
		this.rect.shadowColor(color);
	}

	setCornerRadius(radius: number): void {
		this.rect.cornerRadius(radius);
	}

	onClick(handler: () => void): void {
		this.group.on("click", handler);
	}

	getGroup(): Konva.Group {
		return this.group;
	}

	destroy(): void {
		this.group.destroy();
	}
}
