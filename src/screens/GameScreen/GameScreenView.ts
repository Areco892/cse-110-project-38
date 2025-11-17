import Konva from "konva"
import type { View } from "../../types.ts"
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants.ts"
import { Layer } from "konva/lib/Layer"

/**
 * GameScreenView - Renders the game UI using Konva
 */
export class GameScreenView implements View {
	private dayCastle: Konva.Group
	private nightCastle: Konva.Group
	private character: Konva.Group
	private enemy1: Konva.Group
	private backgroundDay: Konva.Group
	private backgroundDawn: Konva.Group
	private backgroundNight: Konva.Group
	private gameUI: Konva.Group
	private pauseUI: Konva.Group
	private pauseGroup: Konva.Group
	private resumeGroup: Konva.Group
	private quitGroup: Konva.Group
	private playerInputGroup: Konva.Group
	private questText: Konva.Text
	private ansText: Konva.Text
	private inputTextArea: HTMLTextAreaElement
	private gameScreen: Konva.Group
	private level1: Konva.Group
	private level2: Konva.Group
	private level3: Konva.Group
	private level4: Konva.Group
	private level5: Konva.Group

	// ------------------- TEMP LEVEL -------------------
	private tempLevelGroup: Konva.Group | null = null; // temp level placeholder
	// -------------------------------------------------

	constructor(onPauseClick: () => void, onResumeClick: () => void, onQuitClick: () => void, onKeyPress: () => void, onEnter: (event: KeyboardEvent) => void) {
		// initialize Groups
		this.backgroundDay = new Konva.Group({ visible: true })
		this.backgroundDawn = new Konva.Group({ visible: true })
		this.backgroundNight = new Konva.Group({ visible: true })
		this.character = new Konva.Group({ visible: true })
		this.enemy1 = new Konva.Group({ visible: true })
		this.dayCastle = new Konva.Group({ visible: true })
		this.nightCastle = new Konva.Group({ visible: true })
		this.gameUI = new Konva.Group({ visible: true })
		this.pauseUI = new Konva.Group({ visible: false })
		this.pauseGroup = new Konva.Group({ visible: true })
		this.resumeGroup = new Konva.Group({ visible: true })
		this.quitGroup = new Konva.Group({ visible: true })
		this.playerInputGroup = new Konva.Group({ visible: true })
		this.ansText = new Konva.Text
		this.questText = new Konva.Text
		this.inputTextArea = document.createElement('textarea')
		this.level1 = new Konva.Group({ visible: false })
		this.level2 = new Konva.Group({ visible: false })
		this.level3 = new Konva.Group({ visible: false })
		this.level4 = new Konva.Group({ visible: false })
		this.level5 = new Konva.Group({ visible: false })
		this.gameScreen = new Konva.Group({ visible: false })

		//initialize visual components
		this.createLevel1()
		// this.createLevel2()
		// this.createLevel3()
		// this.createLevel4()
		// this.createLevel5()

		this.createEventHandlers(onPauseClick, onResumeClick, onQuitClick, onKeyPress, onEnter)

		// scale to screen
		this.gameScreen.scaleX(STAGE_WIDTH / 800)
		this.gameScreen.scaleY(STAGE_HEIGHT / 600)
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

		// Use base dimensions (800x600) - scaling is handled by gameScreen parent
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
		this.backgroundDay.visible(false);
		this.backgroundDawn.visible(false);
		this.backgroundNight.visible(false);
		this.character.visible(false);
		this.enemy1.visible(false);
		this.dayCastle.visible(false);
		this.nightCastle.visible(false);
		this.gameUI.visible(false);
		this.pauseUI.visible(false);

		// Add to main gameScreen BEFORE setting visibility
		this.gameScreen.add(this.tempLevelGroup);

		// Make gameScreen visible if it isn't already
		this.gameScreen.visible(true);

		// Draw the layer
		const layer = this.gameScreen.getLayer();
		if (layer) {
			layer.batchDraw();
		}
	}
	/**
	 * Show the screen
	 */
	show(): void {
		this.gameScreen.visible(true)
		this.gameScreen.getLayer()?.draw()
	}
	/**
	 * Hide the screen
	 */
	hide(): void {
		this.gameScreen.visible(false)
		this.gameScreen.getLayer()?.draw()
	}


	// helper functions 
	getGroup(): Konva.Group {
		return this.gameScreen
	}

	togglePauseOverlay(): void {
		if (this.pauseUI.isVisible()) {
			this.pauseUI.hide()
		} else {
			this.pauseUI.show()
		}
	}

	getAns(): string {
		return this.ansText.text()
	}

	updateAnsBox(): void {
		this.ansText.text(this.inputTextArea.value);
	}

	resetAnsBox(): void {
		this.inputTextArea.value = ''
		this.ansText.text('')
	}

	updateText(playerInput: string): void {
		this.questText.text('Current Input: \n' + playerInput)
	}


	// create levels
	createLevel1(): void {

		// dawn background
		this.addBgDawn()

		// game ui
		this.addGameUI()

		// pause ui
		this.addPauseUI()

		// create character
		this.addCharacter()


		// wizard
		this.addWiz()

		// create towers
		this.addDayCastle()

		// merge groups
		this.gameScreen.add(this.backgroundDawn)
		this.gameScreen.add(this.character)
		this.gameScreen.add(this.enemy1)
		this.gameScreen.add(this.dayCastle)
		this.gameScreen.add(this.gameUI)
		this.gameScreen.add(this.pauseUI)

	}
	createLevel2(): void {
		// dawn background
		this.addBgDay()

		// game ui
		this.addGameUI()

		// pause ui
		this.addPauseUI()

		// create character
		this.addCharacter()


		// wizard
		this.addWiz()

		// create towers
		this.addDayCastle()

		// merge groups
		this.gameScreen.add(this.backgroundDay)
		this.gameScreen.add(this.character)
		this.gameScreen.add(this.enemy1)
		this.gameScreen.add(this.dayCastle)
		this.gameScreen.add(this.gameUI)
		this.gameScreen.add(this.pauseUI)

	}
	createLevel3(): void {
		// night Background
		this.addBgNight()

		// game ui
		this.addGameUI()

		// pause ui
		this.addPauseUI()

		// create character
		this.addCharacter()

		// create enemy variants

		// wizard
		this.addWiz()

		// night castle
		this.addNightCastle()

		// merge groups
		this.gameScreen.add(this.backgroundNight)
		this.gameScreen.add(this.character)
		this.gameScreen.add(this.enemy1)
		this.gameScreen.add(this.nightCastle)
		this.gameScreen.add(this.gameUI)
		this.gameScreen.add(this.pauseUI)

	}
	createLevel4(): void {
		// day background
		this.addBgDay()

		// dawn background
		this.addBgDawn()

		// night Background
		this.addBgNight()

		// game ui
		this.addGameUI()

		// pause ui
		this.addPauseUI()

		// create character
		this.addCharacter()

		// create enemy variants

		// wizard
		this.addWiz()

		// create towers
		this.addDayCastle()

		// night castle
		this.addNightCastle()

		// merge groups
		this.gameScreen.add(this.backgroundDay)
		this.gameScreen.add(this.backgroundDawn)
		this.gameScreen.add(this.backgroundNight)
		this.gameScreen.add(this.character)
		this.gameScreen.add(this.enemy1)
		this.gameScreen.add(this.dayCastle)
		this.gameScreen.add(this.nightCastle)
		this.gameScreen.add(this.gameUI)
		this.gameScreen.add(this.pauseUI)

	}
	createLevel5(): void {
		// day background
		this.addBgDay()

		// dawn background
		this.addBgDawn()

		// night Background
		this.addBgNight()

		// game ui
		this.addGameUI()

		// pause ui
		this.addPauseUI()

		// create character
		this.addCharacter()

		// create enemy variants

		// wizard
		this.addWiz()

		// create towers
		this.addDayCastle()

		// night castle
		this.addNightCastle()

		// merge groups
		this.gameScreen.add(this.backgroundDay)
		this.gameScreen.add(this.backgroundDawn)
		this.gameScreen.add(this.backgroundNight)
		this.gameScreen.add(this.character)
		this.gameScreen.add(this.enemy1)
		this.gameScreen.add(this.dayCastle)
		this.gameScreen.add(this.nightCastle)
		this.gameScreen.add(this.gameUI)
		this.gameScreen.add(this.pauseUI)

	}


	// create level components
	addBgDay(): void {
		const bgDay = new Konva.Rect({
			x: 0,
			y: 0,
			fill: '#70d4ff',
			width: 800,
			height: 600,
		})
		const bgDayField = new Konva.Rect({
			x: 0,
			y: 500,
			width: 800,
			height: 100,
			fill: 'green',
			stroke: 'black',
			strokeWidth: 3,
		})
		const bgDaySun = new Konva.Circle({
			x: 700,
			y: 100,
			width: 125,
			height: 125,
			fill: 'yellow',
			stroke: 'black',
			strokeWidth: 3,
		})
		this.backgroundDay.add(bgDay)
		this.backgroundDay.add(bgDayField)
		this.backgroundDay.add(bgDaySun)

	}
	addBgDawn(): void {
		const bgDawn = new Konva.Rect({
			x: 0,
			y: 0,
			width: 800,
			height: 600,
			// fill: 'blue'
			fillPriority: 'radial-gradient',
			fillRadialGradientStartPoint: { x: 400, y: 500 },
			fillRadialGradientStartRadius: 0,
			fillRadialGradientEndPoint: { x: 400, y: 500 },
			fillRadialGradientEndRadius: 500,
			fillRadialGradientColorStops: [0, '#FFF2BD', 0.2, '#F4D797', 0.4, '#EBB58A', 0.6, '#DA7F7D', 0.8, '#B5728E', 1, '#776E99'],

		})
		const bgDawnField = new Konva.Rect({
			x: 0,
			y: 500,
			width: 800,
			height: 100,
			fill: '#005200',
			stroke: 'black',
			strokeWidth: 3,
		})
		var bgDawnSun = new Konva.Circle({
			x: 400,
			y: 500,
			width: 125,
			height: 125,
			fill: 'yellow',
			stroke: 'black',
			strokeWidth: 3,
		})
		this.backgroundDawn.add(bgDawn)
		this.backgroundDawn.add(bgDawnSun)
		this.backgroundDawn.add(bgDawnField)
	}
	addBgNight(): void {
		const bgNight = new Konva.Rect({
			x: 0,
			y: 0,
			width: 800,
			height: 600,
			fill: "#000c5c",
		})
		var bgNightMoon = new Konva.Circle({
			x: 700,
			y: 100,
			width: 125,
			height: 125,
			fill: '#a6a9bf',
			stroke: 'black',
			strokeWidth: 3,
		})
		var bgNightStar1 = new Konva.Circle({
			x: 100,
			y: 100,
			width: 5,
			height: 5,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 2,
		})
		var bgNightStar2 = new Konva.Circle({
			x: 180,
			y: 200,
			width: 5,
			height: 5,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 2,
		})
		var bgNightStar3 = new Konva.Circle({
			x: 50,
			y: 250,
			width: 5,
			height: 5,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 2,
		})
		var bgNightStar4 = new Konva.Circle({
			x: 300,
			y: 300,
			width: 5,
			height: 5,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 2,
		})
		var bgNightStar5 = new Konva.Circle({
			x: 500,
			y: 350,
			width: 5,
			height: 5,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 2,
		})
		var bgNightStar6 = new Konva.Circle({
			x: 750,
			y: 200,
			width: 5,
			height: 5,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 2,
		})
		var bgNightStar7 = new Konva.Circle({
			x: 700,
			y: 400,
			width: 5,
			height: 5,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 2,
		})
		var bgNightStar8 = new Konva.Circle({
			x: 650,
			y: 300,
			width: 5,
			height: 5,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 2,
		})
		var bgNightStar9 = new Konva.Circle({
			x: 375,
			y: 400,
			width: 5,
			height: 5,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 2,
		})

		var nightCastleWall = new Konva.Rect({
			x: 0,
			y: 420,
			width: 800,
			height: 180,
			fill: "#6e3f26",
			stroke: "black",
			strokeWidth: 3
		})
		var nightCren = new Konva.Shape({
			x: 0,
			y: 380,
			fill: "#6e3f26",
			stroke: "black",
			strokeWidth: 3,
			sceneFunc: function (context, shape) {
				context.beginPath()
				context.moveTo(0, 0) // Relative to the shape's x, y
				for (let i: number = 5; i < 800; i += 40) {
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

		this.backgroundNight.add(bgNight)
		this.backgroundNight.add(bgNightMoon)
		this.backgroundNight.add(bgNightStar1)
		this.backgroundNight.add(bgNightStar2)
		this.backgroundNight.add(bgNightStar3)
		this.backgroundNight.add(bgNightStar4)
		this.backgroundNight.add(bgNightStar5)
		this.backgroundNight.add(bgNightStar6)
		this.backgroundNight.add(bgNightStar7)
		this.backgroundNight.add(bgNightStar8)
		this.backgroundNight.add(bgNightStar9)
		this.backgroundNight.add(nightCastleWall)
		this.backgroundNight.add(nightCren)
	}
	addGameUI(): void {
		var infoBtn = new Konva.Rect({
			x: 25,
			y: 25,
			width: 50,
			height: 50,
			fill: 'grey',
			stroke: 'black',
			strokeWidth: 3,
			cornerRadius: [10, 10, 10, 10]
		})
		var infoBar = new Konva.Rect({
			x: 45,
			y: 47,
			width: 10,
			height: 20,
			fill: 'black',
			stroke: 'black',
			strokeWidth: 3,
			cornerRadius: [2, 2, 2, 2],
		})
		var infoDot = new Konva.Circle({
			x: 50,
			y: 37,
			width: 10,
			height: 10,
			fill: 'black',
			stroke: 'black',
			strokeWidth: 3,
		})
		var pauseBtn = new Konva.Rect({
			x: 725,
			y: 25,
			width: 50,
			height: 50,
			fill: 'grey',
			stroke: 'black',
			strokeWidth: 3,
			cornerRadius: [10, 10, 10, 10]
		})
		var pauseBar1 = new Konva.Rect({
			x: 735,
			y: 35,
			width: 10,
			height: 30,
			fill: 'black',
			stroke: 'black',
			strokeWidth: 3,
			cornerRadius: [2, 2, 2, 2],
		})
		var pauseBar2 = new Konva.Rect({
			x: 755,
			y: 35,
			width: 10,
			height: 30,
			fill: 'black',
			stroke: 'black',
			strokeWidth: 3,
			cornerRadius: [2, 2, 2, 2],
		})
		var questBox = new Konva.Rect({
			x: 200,
			y: 50,
			width: 400,
			height: 150,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 3,
			cornerRadius: [10, 10, 10, 10],
		})
		this.questText = new Konva.Text({
			x: 200,
			y: 70,
			text: '',
			fontSize: 36,
			fontFamily: 'Calibri',
			width: 400,
			height: 200,
			padding: 0,
			align: 'center'
		});
		var ansBox = new Konva.Rect({
			x: 250,
			y: 225,
			width: 300,
			height: 50,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 3,
			cornerRadius: [10, 10, 10, 10],
		})
		this.ansText = new Konva.Text({
			x: 250,
			y: 230,
			text: '',
			fontSize: 36,
			fontFamily: 'Calibri',
			width: 300,
			height: 50,
			padding: 0,
			align: 'center'
		});

		this.inputTextArea = document.createElement('textarea')
		document.body.appendChild(this.inputTextArea)
		this.inputTextArea.style.position = 'absolute'
		this.inputTextArea.style.display = 'none'
		this.inputTextArea.style.zIndex = '0'


		this.playerInputGroup.on('click', () => {
			var textPosition = this.ansText.absolutePosition();
			this.inputTextArea.style.left = textPosition.x - 1000 + 'px';
			this.inputTextArea.style.top = textPosition.y - 1000 + 'px';
			this.inputTextArea.style.width = (this.ansText.width() * STAGE_WIDTH / 800) + 'px';
			this.inputTextArea.style.height = (this.ansText.height() * STAGE_HEIGHT / 600) + 'px';
			this.inputTextArea.value = '';
			this.inputTextArea.style.display = 'block';
			this.inputTextArea.focus();
		})

		this.gameUI.add(infoBtn)
		this.gameUI.add(infoBar)
		this.gameUI.add(infoDot)
		this.pauseGroup.add(pauseBtn)
		this.pauseGroup.add(pauseBar1)
		this.pauseGroup.add(pauseBar2)
		this.gameUI.add(this.pauseGroup)
		this.gameUI.add(questBox)
		this.gameUI.add(this.questText)
		this.playerInputGroup.add(ansBox)
		this.playerInputGroup.add(this.ansText)
		this.gameUI.add(this.playerInputGroup)
	}
	addPauseUI(): void {
		var pauseBg = new Konva.Rect({
			x: 0,
			y: 0,
			width: 800,
			height: 600,
			fill: '#404040',
			opacity: 0.9,
		})
		var gamePausedBox = new Konva.Rect({
			x: 200,
			y: 50,
			width: 400,
			height: 150,
			fill: 'gray',
			stroke: 'black',
			strokeWidth: 3,
			cornerRadius: [10, 10, 10, 10],
		})
		const gamePausedText = new Konva.Text({
			x: 200,
			y: 95,
			text: "Game Paused",
			fontSize: 54,
			fontFamily: 'Calibri',
			width: 400,
			padding: 0,
			align: 'center'
		});
		var resumeBtn = new Konva.Rect({
			x: 300,
			y: 250,
			width: 200,
			height: 100,
			fill: 'gray',
			stroke: 'black',
			strokeWidth: 3,
			cornerRadius: [10, 10, 10, 10],
		})
		const resumeText = new Konva.Text({
			x: 300,
			y: 280,
			text: "Resume",
			fontSize: 36,
			fontFamily: 'Calibri',
			width: 200,
			padding: 0,
			align: 'center'
		});
		var quitBtn = new Konva.Rect({
			x: 300,
			y: 400,
			width: 200,
			height: 100,
			fill: 'gray',
			stroke: 'black',
			strokeWidth: 3,
			cornerRadius: [10, 10, 10, 10],
		})
		const quitText = new Konva.Text({
			x: 300,
			y: 430,
			text: "Quit",
			fontSize: 36,
			fontFamily: 'Calibri',
			width: 200,
			padding: 0,
			align: 'center'
		});
		this.pauseUI.add(pauseBg)
		this.pauseUI.add(gamePausedBox)
		this.pauseUI.add(gamePausedText)
		this.resumeGroup.add(resumeBtn)
		this.resumeGroup.add(resumeText)
		this.pauseUI.add(this.resumeGroup)
		this.quitGroup.add(quitBtn)
		this.quitGroup.add(quitText)
		this.pauseUI.add(this.quitGroup)
	}
	addCharacter(): void {
		var charHead = new Konva.Circle({
			x: 175,
			y: 380,
			width: 35,
			height: 35,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 3,
		})
		var charBody = new Konva.Line({
			points: [175, 398, 175, 425],
			stroke: 'black',
			strokeWidth: 3,
		})
		var charLeg1 = new Konva.Line({
			points: [175, 425, 155, 470],
			stroke: 'black',
			strokeWidth: 3,
		})
		var charLeg2 = new Konva.Line({
			points: [175, 425, 195, 470],
			stroke: 'black',
			strokeWidth: 3,
		})
		var charArm1 = new Konva.Line({
			points: [175, 410, 160, 405, 170, 403],
			stroke: 'black',
			strokeWidth: 3,
		})
		var charArm2 = new Konva.Line({
			points: [175, 410, 195, 403],
			stroke: 'black',
			strokeWidth: 3,
		})
		var bowString = new Konva.Line({
			points: [185, 385, 170, 403, 185, 421],
			stroke: 'black',
			strokeWidth: 3,
		})
		var bowArc = new Konva.Line({
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
		var arrowHead = new Konva.Line({
			points: [200, 398, 205, 403, 200, 408],
			stroke: 'black',
			strokeWidth: 3,
		})

		this.character.add(charHead)
		this.character.add(charBody)
		this.character.add(charLeg1)
		this.character.add(charLeg2)
		this.character.add(charArm1)
		this.character.add(charArm2)
		this.character.add(bowString)
		this.character.add(bowArc)
		this.character.add(arrow)
		this.character.add(arrowHead)
	}
	addWiz(): void {
		var wizHead = new Konva.Circle({
			x: 625,
			y: 380,
			width: 35,
			height: 35,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 3,
		})
		var wizBody = new Konva.Line({
			points: [625, 398, 625, 425],
			stroke: 'black',
			strokeWidth: 3,
		})
		var wizLeg1 = new Konva.Line({
			points: [625, 425, 645, 470],
			stroke: 'black',
			strokeWidth: 3,
		})
		var wizLeg2 = new Konva.Line({
			points: [625, 425, 605, 470],
			stroke: 'black',
			strokeWidth: 3,
		})
		var wizBrim = new Konva.Line({
			points: [600, 370, 650, 370],
			stroke: 'black',
			strokeWidth: 3,
		})
		var wizHat = new Konva.Shape({
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
		var wizArms = new Konva.Line({
			points: [605, 405, 625, 410, 645, 400],
			stroke: 'black',
			strokeWidth: 3,
		})
		var wizStaff = new Konva.Line({
			points: [595, 385, 615, 425],
			stroke: 'black',
			strokeWidth: 3,
		})
		var wizOrb = new Konva.Circle({
			x: 590,
			y: 375,
			width: 20,
			height: 20,
			fill: 'orange',
			stroke: 'black',
			strokeWidth: 3,
		})

		this.enemy1.add(wizHead)
		this.enemy1.add(wizBody)
		this.enemy1.add(wizLeg1)
		this.enemy1.add(wizLeg2)
		this.enemy1.add(wizBrim)
		this.enemy1.add(wizHat)
		this.enemy1.add(wizArms)
		this.enemy1.add(wizStaff)
		this.enemy1.add(wizOrb)
	}
	addDayCastle(): void {
		var castle1 = new Konva.Rect({
			x: 0,
			y: 470,
			width: 230,
			height: 130,
			fill: "#6e3f26",
			stroke: "black",
			strokeWidth: 3
		})
		var castleCren = new Konva.Shape({
			x: 0,
			y: 430,
			fill: "#6e3f26",
			stroke: "black",
			strokeWidth: 3,
			sceneFunc: function (context, shape) {
				context.beginPath()
				context.moveTo(0, 0) // Relative to the shape's x, y
				for (let i: number = -10; i < 230; i += 40) {
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
		var castle1Window1 = new Konva.Rect({
			x: 50,
			y: 500,
			width: 25,
			height: 40,
			fill: "black",
			stroke: "black",
			cornerRadius: [15, 15, 0, 0],
			strokeWidth: 3

		})
		var castle1Window2 = new Konva.Rect({
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
		var castleCren2 = new Konva.Shape({
			x: 800,
			y: 430,
			fill: "#6e3f26",
			stroke: "black",
			strokeWidth: 3,
			sceneFunc: function (context, shape) {
				context.beginPath()
				context.moveTo(0, 0)
				for (let i: number = 10; i > -230; i -= 40) {
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
		var castle2Window1 = new Konva.Rect({
			x: 620,
			y: 500,
			width: 25,
			height: 40,
			fill: "black",
			stroke: "black",
			cornerRadius: [15, 15, 0, 0],
			strokeWidth: 3

		})
		var castle2Window2 = new Konva.Rect({
			x: 725,
			y: 500,
			width: 25,
			height: 40,
			fill: "black",
			stroke: "black",
			cornerRadius: [15, 15, 0, 0],
			strokeWidth: 3

		})

		this.dayCastle.add(castle1)
		this.dayCastle.add(castleCren)
		this.dayCastle.add(castle1Window1)
		this.dayCastle.add(castle1Window2)
		this.dayCastle.add(castle2)
		this.dayCastle.add(castleCren2)
		this.dayCastle.add(castle2Window1)
		this.dayCastle.add(castle2Window2)
	}
	addNightCastle(): void {
		var nightCren1 = new Konva.Shape({
			x: 0,
			y: 460,
			fill: "#6e3f26",
			stroke: "black",
			strokeWidth: 3,
			sceneFunc: function (context, shape) {
				context.beginPath()
				context.moveTo(0, 0) // Relative to the shape's x, y
				for (let i: number = -10; i < 800; i += 40) {
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
		var nightWindow1 = new Konva.Rect({
			x: 87.5,
			y: 530,
			width: 25,
			height: 40,
			fill: "black",
			stroke: "black",
			cornerRadius: [15, 15, 0, 0],
			strokeWidth: 3
		})
		var nightWindow2 = new Konva.Rect({
			x: 387.5,
			y: 530,
			width: 25,
			height: 40,
			fill: "black",
			stroke: "black",
			cornerRadius: [15, 15, 0, 0],
			strokeWidth: 3
		})
		var nightWindow3 = new Konva.Rect({
			x: 687.5,
			y: 530,
			width: 25,
			height: 40,
			fill: "black",
			stroke: "black",
			cornerRadius: [15, 15, 0, 0],
			strokeWidth: 3
		})
		this.nightCastle.add(nightCren1)
		this.nightCastle.add(nightWindow1)
		this.nightCastle.add(nightWindow2)
		this.nightCastle.add(nightWindow3)
	}

	// create event handlers
	createEventHandlers(onPauseClick: () => void, onResumeClick: () => void, onQuitClick: () => void, onKeyPress: () => void, onEnter: (event: KeyboardEvent) => void): void {
		this.pauseGroup.on('click', onPauseClick)
		this.resumeGroup.on('click', onResumeClick)
		this.quitGroup.on('click', onQuitClick)
		this.inputTextArea.addEventListener('input', onKeyPress)
		this.inputTextArea.addEventListener('keydown', (e) => onEnter(e))
	}



}
