import Konva from "konva"
import type { View } from "../../types.ts"
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants.ts"
import { Layer } from "konva/lib/Layer"

/**
 * GameScreenView - Renders the game UI using Konva
 */
export class GameScreenView implements View {
	private day_castle: Konva.Group
	private night_castle: Konva.Group
	private character: Konva.Group
	private enemy1: Konva.Group
	private background_day: Konva.Group
	private background_dawn: Konva.Group
	private background_night: Konva.Group
	private game_ui: Konva.Group
	private pause_ui: Konva.Group
	private game_screen: Konva.Group
	private level1: Konva.Group

	// ------------------- TEMP LEVEL -------------------
	private tempLevelGroup: Konva.Group | null = null; // temp level placeholder
	// -------------------------------------------------

	constructor(onLemonClick: () => void) {
		// initialize Groups
		this.background_day = new Konva.Group({ visible: false })
		this.background_dawn = new Konva.Group({ visible: true })
		this.background_night = new Konva.Group({ visible: false })
		this.character = new Konva.Group({visible: true })
		this.enemy1 = new Konva.Group({ visible: true })
		this.day_castle = new Konva.Group({ visible: true })
		this.night_castle = new Konva.Group({ visible: false })
		this.game_ui = new Konva.Group({ visible: true })
		this.pause_ui = new Konva.Group({ visible: false })
		this.level1 = new Konva.Group({ visible: false })
		this.game_screen = new Konva.Group({ visible: false })

		// day Background
		const bg_day = new Konva.Rect({
			x: 0,
			y: 0,
			width: STAGE_WIDTH,
			height: STAGE_HEIGHT,
		})
		const bg_day_field = new Konva.Rect({
			x: 0,
			y: 500,
			width: 800,
			height: 100,
			fill: 'green',
			stroke: 'black',
			strokeWidth: 3,
		})
		var bg_day_sun = new Konva.Circle({
			x: 700,
			y: 100,
			width: 125,
			height: 125,
			fill: 'yellow',
			stroke: 'black',
			strokeWidth: 3,
		})
		this.background_day.add(bg_day)
		this.background_day.add(bg_day_field)
		this.background_day.add(bg_day_sun)

		// dawn background
		const bg_dawn = new Konva.Rect({
			x: 0,
			y: 0,
			width: STAGE_WIDTH,
			height: STAGE_HEIGHT,
			// fill: 'blue'
			fillPriority: 'radial-gradient',
			fillRadialGradientStartPoint: {x: 400, y: 500},
			fillRadialGradientStartRadius: 0,
			fillRadialGradientEndPoint: {x: 400, y: 500},
			fillRadialGradientEndRadius: 500,
			fillRadialGradientColorStops: [0, '#FFF2BD', 0.2, '#F4D797', 0.4, '#EBB58A', 0.6, '#DA7F7D', 0.8, '#B5728E', 1, '#776E99'],

		})
		const bg_dawn_field = new Konva.Rect({
			x: 0,
			y: 500,
			width: 800,
			height: 100,
			fill: '#005200',
			stroke: 'black',
			strokeWidth: 3,
		})
		var bg_dawn_sun = new Konva.Circle({
			x: 400,
			y: 500,
			width: 125,
			height: 125,
			fill: 'yellow',
			stroke: 'black',
			strokeWidth: 3,
		})
		this.background_dawn.add(bg_dawn)
		this.background_dawn.add(bg_dawn_sun)
		this.background_dawn.add(bg_dawn_field)

		// night Background
		const bg_night = new Konva.Rect({
			x: 0,
			y: 0,
			width: STAGE_WIDTH,
			height: STAGE_HEIGHT,
			fill: "#000c5c", 
		})
		var bg_night_moon = new Konva.Circle({
			x: 700,
			y: 100,
			width: 125,
			height: 125,
			fill: '#a6a9bf',
			stroke: 'black',
			strokeWidth: 3,
		})
		var bg_night_star1 = new Konva.Circle({
			x: 100,
			y: 100,
			width: 5,
			height: 5,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 2,
		})
		var bg_night_star2 = new Konva.Circle({
			x: 180,
			y: 200,
			width: 5,
			height: 5,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 2,
		})
		var bg_night_star3 = new Konva.Circle({
			x: 50,
			y: 250,
			width: 5,
			height: 5,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 2,
		})
		var bg_night_star4 = new Konva.Circle({
			x: 300,
			y: 300,
			width: 5,
			height: 5,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 2,
		})
		var bg_night_star5 = new Konva.Circle({
			x: 500,
			y: 350,
			width: 5,
			height: 5,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 2,
		})
		var bg_night_star6 = new Konva.Circle({
			x: 750,
			y: 200,
			width: 5,
			height: 5,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 2,
		})
		var bg_night_star7 = new Konva.Circle({
			x: 700,
			y: 400,
			width: 5,
			height: 5,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 2,
		})
		var bg_night_star8 = new Konva.Circle({
			x: 650,
			y: 300,
			width: 5,
			height: 5,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 2,
		})
		var bg_night_star9 = new Konva.Circle({
			x: 375,
			y: 400,
			width: 5,
			height: 5,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 2,
		})
		this.background_night.add(bg_night)
		this.background_night.add(bg_night_moon)
		this.background_night.add(bg_night_star1)
		this.background_night.add(bg_night_star2)
		this.background_night.add(bg_night_star3)
		this.background_night.add(bg_night_star4)
		this.background_night.add(bg_night_star5)
		this.background_night.add(bg_night_star6)
		this.background_night.add(bg_night_star7)
		this.background_night.add(bg_night_star8)
		this.background_night.add(bg_night_star9)

		// game ui
		var info_btn = new Konva.Rect({
			x: 25,
			y: 25,
			width: 50, 
			height: 50,
			fill: 'grey',
			stroke: 'black',
			strokeWidth: 3,
			cornerRadius: [10, 10, 10, 10]
		})
		var pause_bar = new Konva.Rect({
			x: 45,
			y: 47,
			width: 10, 
			height: 20,
			fill: 'black',
			stroke: 'black',
			strokeWidth: 3,
			cornerRadius: [2, 2, 2, 2],
		})
		var pause_dot = new Konva.Circle({
			x: 50,
			y: 37,
			width: 10,
			height: 10,
			fill: 'black',
			stroke: 'black',
			strokeWidth: 3,
		})
		var pause_btn = new Konva.Rect({
			x: 725,
			y: 25,
			width: 50, 
			height: 50,
			fill: 'grey',
			stroke: 'black',
			strokeWidth: 3,
			cornerRadius: [10, 10, 10, 10]
		})
		var pause_bar1 = new Konva.Rect({
			x: 735,
			y: 35,
			width: 10, 
			height: 30,
			fill: 'black',
			stroke: 'black',
			strokeWidth: 3,
			cornerRadius: [2, 2, 2, 2],
		})
		var pause_bar2 = new Konva.Rect({
			x: 755,
			y: 35,
			width: 10, 
			height: 30,
			fill: 'black',
			stroke: 'black',
			strokeWidth: 3,
			cornerRadius: [2, 2, 2, 2],
		})
		var quest_box = new Konva.Rect({
			x: 200,
			y: 50,
			width: 400,
			height: 150,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 3,
			cornerRadius: [10, 10, 10, 10],
		})
		var ans_box = new Konva.Rect({
			x: 300,
			y: 225,
			width: 200,
			height: 50,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 3,
			cornerRadius: [10, 10, 10, 10],
		})
		this.game_ui.add(info_btn)
		this.game_ui.add(pause_bar)
		this.game_ui.add(pause_dot)
		this.game_ui.add(pause_btn)
		this.game_ui.add(pause_bar1)
		this.game_ui.add(pause_bar2)
		this.game_ui.add(quest_box)
		this.game_ui.add(ans_box)

		// pause ui
		var pause_bg = new Konva.Rect({
			x: 0,
			y: 0,
			width: 800,
			height: 600,
			fill: '#404040',
			opacity: 0.9,
		})
		var game_paused_box = new Konva.Rect({
			x: 200,
			y: 50,
			width: 400,
			height: 150,
			fill: 'gray',
			stroke: 'black',
			strokeWidth: 3,
			cornerRadius: [10, 10, 10, 10],
		})
		const game_paused_text = new Konva.Text({
			x: 200,
			y: 95,
			text: "Game Paused",
			fontSize: 54,
			fontFamily: 'Calibri',
			width: 400,
			padding: 0,
			align: 'center'
		});
		var settings_btn = new Konva.Rect({
			x: 300,
			y: 250,
			width: 200,
			height: 100,
			fill: 'gray',
			stroke: 'black',
			strokeWidth: 3,
			cornerRadius: [10, 10, 10, 10],
		})
		const settings_text = new Konva.Text({
			x: 300,
			y: 280,
			text: "Settings",
			fontSize: 36,
			fontFamily: 'Calibri',
			width: 200,
			padding: 0,
			align: 'center'
		});
		var quit_btn = new Konva.Rect({
			x: 300,
			y: 400,
			width: 200,
			height: 100,
			fill: 'gray',
			stroke: 'black',
			strokeWidth: 3,
			cornerRadius: [10, 10, 10, 10],
		})
		const quit_text = new Konva.Text({
			x: 300,
			y: 430,
			text: "Quit",
			fontSize: 36,
			fontFamily: 'Calibri',
			width: 200,
			padding: 0,
			align: 'center'
		});
		this.pause_ui.add(pause_bg)
		this.pause_ui.add(game_paused_box)
		this.pause_ui.add(game_paused_text)
		this.pause_ui.add(settings_btn)
		this.pause_ui.add(settings_text)
		this.pause_ui.add(quit_btn)
		this.pause_ui.add(quit_text)

		// create character
		var char_head = new Konva.Circle({
			x: 175,
			y: 380,
			width: 35,
			height: 35,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 3,
		})
		var char_body = new Konva.Line({
			points: [175, 398, 175, 425],
			stroke: 'black',
			strokeWidth: 3,
		})
		var char_leg1 = new Konva.Line({
			points: [175, 425, 155, 470],
			stroke: 'black',
			strokeWidth: 3,
		})
		var char_leg2 = new Konva.Line({
			points: [175, 425, 195, 470],
			stroke: 'black',
			strokeWidth: 3,
		})
		var char_arm1 = new Konva.Line({
			points: [175, 410, 160, 405, 170, 403],
			stroke: 'black',
			strokeWidth: 3,
		})
		var char_arm2 = new Konva.Line({
			points: [175, 410, 195, 403],
			stroke: 'black',
			strokeWidth: 3,
		})
		var bow_string = new Konva.Line({
			points: [185, 385, 170, 403, 185, 421],
			stroke: 'black',
			strokeWidth: 3,
		})
		var bow_arc = new Konva.Line({
			points: [185, 385, 195, 403, 185, 421],
			stroke: 'black',
			strokeWidth: 3,
			tension: 0.5
		})
		var arrow = new Konva.Line({
			points: [170, 403, 205, 403],
			stroke: 'black',
			strokeWidth: 3,
		})
		var arrow_head = new Konva.Line({
			points: [200, 398, 205, 403, 200, 408],
			stroke: 'black',
			strokeWidth: 3,
		})
		
		this.character.add(char_head)
		this.character.add(char_body)
		this.character.add(char_leg1)
		this.character.add(char_leg2)
		this.character.add(char_arm1)
		this.character.add(char_arm2)
		this.character.add(bow_string)
		this.character.add(bow_arc)
		this.character.add(arrow)
		this.character.add(arrow_head)
		
		// create enemy variants

		// wizard
		var wiz_head = new Konva.Circle({
			x: 625,
			y: 380,
			width: 35,
			height: 35,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 3,
		})
		var wiz_body = new Konva.Line({
			points: [625, 398, 625, 425],
			stroke: 'black',
			strokeWidth: 3,
		})
		var wiz_leg1 = new Konva.Line({
			points: [625, 425, 645, 470],
			stroke: 'black',
			strokeWidth: 3,
		})
		var wiz_leg2 = new Konva.Line({
			points: [625, 425, 605, 470],
			stroke: 'black',
			strokeWidth: 3,
		})
		var wiz_brim = new Konva.Line({
			points: [600, 370, 650, 370],
			stroke: 'black',
			strokeWidth: 3,
		})
		var wiz_hat = new Konva.Shape({
			x: 608,
			y: 370,
			fill: 'blue',
			stroke: "black",
			strokeWidth: 3,
			sceneFunc: function (context, shape) {
				context.beginPath()
				context.moveTo(0, 0) // Relative to the shape's x, y
				context.lineTo(17, -40)
				context.lineTo(34, 0)
				context.closePath()
				context.fillStrokeShape(shape)
  			},
		})
		var wiz_arms = new Konva.Line({
			points: [605, 405, 625, 410, 645, 400],
			stroke: 'black',
			strokeWidth: 3,
		})
		var wiz_staff = new Konva.Line({
			points: [595, 385, 615, 425],
			stroke: 'black',
			strokeWidth: 3,
		})
		var wiz_orb = new Konva.Circle({
			x: 590,
			y: 375,
			width: 20,
			height: 20,
			fill: 'orange',
			stroke: 'black',
			strokeWidth: 3,
		})


		this.enemy1.add(wiz_head)
		this.enemy1.add(wiz_body)
		this.enemy1.add(wiz_leg1)
		this.enemy1.add(wiz_leg2)
		this.enemy1.add(wiz_brim)
		this.enemy1.add(wiz_hat)
		this.enemy1.add(wiz_arms)
		this.enemy1.add(wiz_staff)
		this.enemy1.add(wiz_orb)
		
		// create towers
		var castle1 = new Konva.Rect({
			x: 0,
			y: 470,
			width: 230,
			height: 130,
			fill: "#6e3f26",
			stroke: "black",
			strokeWidth: 3
		})
		var castle_cren = new Konva.Shape({
			x: 0,
			y: 430,
			fill: "#6e3f26",
			stroke: "black",
			strokeWidth: 3,
			sceneFunc: function (context, shape) {
				context.beginPath()
				context.moveTo(0, 0) // Relative to the shape's x, y
				for(let i: number = -10; i < 230; i += 40) {
					context.lineTo(i + 20, 0)
					context.lineTo(i + 20, 20)
					context.lineTo(i + 40, 20)
					context.lineTo(i + 40, 0)
				}
				context.lineTo(250, 0)
				context.lineTo(250, 40)
				context.lineTo(0, 40)
				context.closePath()
				context.fillStrokeShape(shape)
  			},
		})
		var castle1_window1 = new Konva.Rect({
			x: 50,
			y: 500,
			width: 25,
			height: 40,
			fill: "black",
			stroke: "black",
			cornerRadius: [15, 15, 0, 0],
			strokeWidth: 3

		})
		var castle1_window2 = new Konva.Rect({
			x: 155,
			y: 500,
			width: 25,
			height: 40,
			fill: "black",
			stroke: "black",
			cornerRadius: [15, 15, 0, 0],
			strokeWidth: 3

		})
		
		var castle2 = new Konva.Rect({
			x: 570,
			y: 470,
			width: 230,
			height: 130,
			fill: "#6e3f26",
			stroke: "black",
			strokeWidth: 3
		})
		var castle_cren2 = new Konva.Shape({
			x: 800,
			y: 430,
			fill: "#6e3f26",
			stroke: "black",
			strokeWidth: 3,
			sceneFunc: function (context, shape) {
				context.beginPath()
				context.moveTo(0, 0)
				for(let i: number = 10; i > -230; i -= 40) {
					context.lineTo(i - 20, 0)
					context.lineTo(i - 20, 20)
					context.lineTo(i - 40, 20)
					context.lineTo(i - 40, 0)
				}
				context.lineTo(-250, 0)
				context.lineTo(-250, 40)
				context.lineTo(0, 40)
				context.closePath()
				context.fillStrokeShape(shape)
  			},
		})
		var castle2_window1 = new Konva.Rect({
			x: 620,
			y: 500,
			width: 25,
			height: 40,
			fill: "black",
			stroke: "black",
			cornerRadius: [15, 15, 0, 0],
			strokeWidth: 3

		})
		var castle2_window2 = new Konva.Rect({
			x: 725,
			y: 500,
			width: 25,
			height: 40,
			fill: "black",
			stroke: "black",
			cornerRadius: [15, 15, 0, 0],
			strokeWidth: 3

		})

		this.day_castle.add(castle1)
		this.day_castle.add(castle_cren)
		this.day_castle.add(castle1_window1)
		this.day_castle.add(castle1_window2)
		this.day_castle.add(castle2)
		this.day_castle.add(castle_cren2)
		this.day_castle.add(castle2_window1)
		this.day_castle.add(castle2_window2)

		// night castle
		var night_castle_wall = new Konva.Rect({
			x: 0,
			y: 420,
			width: 800,
			height: 180,
			fill: "#6e3f26",
			stroke: "black",
			strokeWidth: 3
		})
		var night_cren1 = new Konva.Shape({
			x: 0,
			y: 460,
			fill: "#6e3f26",
			stroke: "black",
			strokeWidth: 3,
			sceneFunc: function (context, shape) {
				context.beginPath()
				context.moveTo(0, 0) // Relative to the shape's x, y
				for(let i: number = -10; i < 800; i += 40) {
					context.lineTo(i + 20, 0)
					context.lineTo(i + 20, 20)
					context.lineTo(i + 40, 20)
					context.lineTo(i + 40, 0)
				}
				context.lineTo(800, 0)
				context.lineTo(800, 40)
				context.lineTo(0, 40)
				context.closePath()
				context.fillStrokeShape(shape)
  			},
		})
		var night_cren2 = new Konva.Shape({
			x: 0,
			y: 380,
			fill: "#6e3f26",
			stroke: "black",
			strokeWidth: 3,
			sceneFunc: function (context, shape) {
				context.beginPath()
				context.moveTo(0, 0) // Relative to the shape's x, y
				for(let i: number = 5; i < 800; i += 40) {
					context.lineTo(i + 20, 0)
					context.lineTo(i + 20, 20)
					context.lineTo(i + 40, 20)
					context.lineTo(i + 40, 0)
				}
				context.lineTo(800, 0)
				context.lineTo(800, 40)
				context.lineTo(0, 40)
				context.closePath()
				context.fillStrokeShape(shape)
  			},
		})
		var night_window1 = new Konva.Rect({
			x: 87.5,
			y: 530,
			width: 25,
			height: 40,
			fill: "black",
			stroke: "black",
			cornerRadius: [15, 15, 0, 0],
			strokeWidth: 3
		})
		var night_window2 = new Konva.Rect({
			x: 387.5,
			y: 530,
			width: 25,
			height: 40,
			fill: "black",
			stroke: "black",
			cornerRadius: [15, 15, 0, 0],
			strokeWidth: 3
		})
		var night_window3 = new Konva.Rect({
			x: 687.5,
			y: 530,
			width: 25,
			height: 40,
			fill: "black",
			stroke: "black",
			cornerRadius: [15, 15, 0, 0],
			strokeWidth: 3
		})
		this.background_night.add(night_castle_wall)
		this.night_castle.add(night_cren1)
		this.background_night.add(night_cren2)
		this.night_castle.add(night_window1)
		this.night_castle.add(night_window2)
		this.night_castle.add(night_window3)

		// merge groups
		this.game_screen.add(this.background_day)
		this.game_screen.add(this.background_dawn)
		this.game_screen.add(this.background_night)
		this.game_screen.add(this.character)
		this.game_screen.add(this.enemy1)
		this.game_screen.add(this.day_castle)
		this.game_screen.add(this.night_castle)
		this.game_screen.add(this.game_ui)
		this.game_screen.add(this.pause_ui)

		// scale to screen
		this.game_screen.scaleX(STAGE_WIDTH / 800)
		this.game_screen.scaleY(STAGE_HEIGHT / 600)
	}

	/**
	 * Update score display
	 */
	updateScore(score: number): void {
		this.day_castle.getLayer()?.draw()
	}

	/**
	 * Update timer display
	 */
	updateTimer(timeRemaining: number): void {
		this.day_castle.getLayer()?.draw()
	}






		/**
	 * Show a temporary level screen dynamically
	 */
	showTempLevel(levelNumber: number): void {
		// Remove old temp level if exists
		if (this.tempLevelGroup) {
			this.tempLevelGroup.destroy();
			this.tempLevelGroup = null;
		}

		// Create new temp level group
		this.tempLevelGroup = new Konva.Group({ visible: true });
		
		// Use base dimensions (800x600) - scaling is handled by game_screen parent
		const bg = new Konva.Rect({
			x: 0,
			y: 0,
			width: 800,  // Base width
			height: 600, // Base height
			fill: "rgba(0,0,0,0.8)",
		});
		this.tempLevelGroup.add(bg);

		// Big text showing level
		const text = new Konva.Text({
			text: `Level ${levelNumber}`,
			fontSize: 72,  // Fixed size for base dimensions
			fontFamily: "Arial",
			fill: "white",
		});
		text.x((800 - text.width()) / 2);
		text.y((600 - text.height()) / 2);
		this.tempLevelGroup.add(text);

		// Hide all other main groups
		this.background_day.visible(false);
		this.background_dawn.visible(false);
		this.background_night.visible(false);
		this.character.visible(false);
		this.enemy1.visible(false);
		this.day_castle.visible(false);
		this.night_castle.visible(false);
		this.game_ui.visible(false);
		this.pause_ui.visible(false);

		// Add to main game_screen BEFORE setting visibility
		this.game_screen.add(this.tempLevelGroup);

		// Make game_screen visible if it isn't already
		this.game_screen.visible(true);

		// Draw the layer
		const layer = this.game_screen.getLayer();
		if (layer) {
			layer.batchDraw();
		}
	}




	/**
	 * Show the screen
	 */
	show(): void {
		this.game_screen.visible(true)
		this.game_screen.getLayer()?.draw()
	}

	/**
	 * Hide the screen
	 */
	hide(): void {
		this.game_screen.visible(false)
		this.game_screen.getLayer()?.draw()
	}

	getGroup(): Konva.Group {
		return this.game_screen
	}
}
