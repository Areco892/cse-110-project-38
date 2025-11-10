import Konva from "konva";
import type { View } from "../../types.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants.ts";
import { Cube } from "./Cube.ts";

/**
 * GameScreenView - Renders the game UI using Konva
 */
export class LevelScreenView implements View 
{
	private group: Konva.Group;
	private cubes: Cube[] = [];
	//default value when we run it but it can be changed
	constructor(numberOfCubes: number = 5, cubeClickHandlers?: ((index: number) => void)[]) 
	{
		this.group = new Konva.Group({ visible: false });

		// Background
		const bg = new Konva.Rect({
			x: 0,
			y: 0,
			width: STAGE_WIDTH,
			height: STAGE_HEIGHT,
			fill: "#87CEEB", // Sky blue
		});
		this.group.add(bg);

		// Create grid of cubes
		this.createCubeGrid(numberOfCubes, cubeClickHandlers);
	}

	/**
	 * Create a grid of cubes based on the number requested
	 */
	private createCubeGrid(numberOfCubes: number, cubeClickHandlers?: ((index: number) => void)[]): void 
	{
		const CUBES_PER_ROW = 5;
		const MAX_ROWS = 10;
		const PADDING = 50;
		const CUBE_SIZE = (.09 * STAGE_WIDTH); //Change to make adaptive based off of stage height / width

		const availableWidth = STAGE_WIDTH - (2 * PADDING);
		const availableHeight = STAGE_HEIGHT - (2 * PADDING);

		const horizontalSpacing = availableWidth / CUBES_PER_ROW;
		const verticalSpacing = availableHeight / MAX_ROWS * 2.5; //cube padding and spacing and sizing details

		for (let i = 0; i < numberOfCubes; i++)  //fill in cube amount
			{
			const row = Math.floor(i / CUBES_PER_ROW);
			const col = i % CUBES_PER_ROW;

			// Stop if more cubes than available slots
			if (row >= MAX_ROWS) break;

			const x = PADDING + (col * horizontalSpacing) + (horizontalSpacing / 2) - (CUBE_SIZE / 2);
			const y = PADDING + (row * verticalSpacing) + (verticalSpacing / 2) - (CUBE_SIZE / 2);

			const cube = new Cube(x, y, CUBE_SIZE, i + 1); 
			
			if (cubeClickHandlers && cubeClickHandlers[i])  //if the cube handler exists 
			{
				cube.onClick(() => cubeClickHandlers[i](i)); //use this cube handler
			} else 
			{
				cube.onClick(() => { //default cube behavior if no handler is passed in with controller
					console.log(`Cube ${i + 1} clicked!`);
				});
			}

			this.cubes.push(cube);
			this.group.add(cube.getGroup());
		}
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