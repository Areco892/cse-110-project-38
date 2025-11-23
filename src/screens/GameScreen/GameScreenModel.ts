import { Character } from "../../components/Character";

/**
 * GameScreenModel - Manages game state
 */
export class GameScreenModel {
	private score = 0;
	private level: number = 1;
	private player: Character = new Character(100, 100 / 1);
	private enemy: Character = new Character(100, 100 / 5);
	private current_question: number = 0;

	// questions and answers for level 1-5
	private q1: string[] = [
  "Solve for x: 3x + 7 = 22",
  "Solve for x: 5x - 12 = 18",
  "Solve for x: 2(x + 4) = 18",
  "Solve for x: 4x + 9 = 3x + 15",
  "Solve for x: 7 - 2x = 15",
  "Solve for x: 3(2x - 5) = 21",
  "Solve for x: 5x + 8 = 2x - 4",
  "Solve for x: 4(x - 3) + 2x = 24",
  "Solve for x: 8 - 3(x + 2) = -7",
  "Solve for x: 2x/3 + 5 = 11",
  "Solve for x: 5(x + 2) - 3x = 22",
  "Solve for x: 6x - 4 = 2(x + 6)",
  "Solve for x: 3x/4 - 2 = 7",
  "Solve for x: 7x + 5 = 4x - 10",
  "Solve for x: 2(3x - 4) + 5 = 15",
  "Solve for x: 9 - 4(x - 1) = 25",
  "Solve for x: 5x/2 + 3 = 18",
  "Solve for x: 3(x + 4) = 2(x + 9)",
  "Solve for x: 8x - 3(x - 2) = 26",
  "Solve for x: 4(2x + 1) - 3x = 29"
	];
	private a1: string[] = ["5","6","5","6","-4","6","-4","6","3","9","6","4","12","-5","3","-3","6","6","4","5"];
	private q2: string[] = [
	"Solve this system (format as x,y):\nx + y = 10 and x - y = 4",
	"Solve this system (format as x,y):\n2x + y = 11 and x - y = 1",
	"Solve this system (format as x,y):\nx + 2y = 12 and x - y = 3",
	"Solve this system (format as x,y):\n3x + y = 17 and x + y = 7",
	"Solve this system (format as x,y):\n2x + 3y = 16 and x + y = 6",
	"Solve this system (format as x,y):\nx + y = 8 and 2x - y = 7",
	"Solve this system (format as x,y):\n3x + 2y = 19 and x - y = 2",
	"Solve this system (format as x,y):\n2x + y = 13 and 3x - y = 12",
	"Solve this system (format as x,y):\nx + 3y = 14 and 2x - y = 5",
	"Solve this system (format as x,y):\n4x + y = 23 and x + y = 8",
	"Solve this system (format as x,y):\n2x + y = 14 and x - y = 1",
	"Solve this system (format as x,y):\nx + y = 9 and 3x - y = 15",
	"Solve this system (format as x,y):\n2x + 3y = 17 and x + y = 7",
	"Solve this system (format as x,y):\n3x + y = 20 and 2x - y = 5",
	"Solve this system (format as x,y):\nx + 2y = 13 and x - y = 4",
	"Solve this system (format as x,y):\n4x + 3y = 33 and x + y = 9",
	"Solve this system (format as x,y):\n2x + y = 15 and x + y = 9",
	"Solve this system (format as x,y):\n3x + 2y = 22 and x - y = 3",
	"Solve this system (format as x,y):\nx + y = 11 and 2x - y = 10",
	"Solve this system (format as x,y):\n5x + y = 28 and x + y = 8"
	];
	private a2: string[] = ["7,3","4,3","6,3","5,2","4,2","5,3","5,2","5,3","4,3",
		"5,3","5,4","6,3","5,2","5,5","7,3","6,3","6,3","6,2","7,4","5,3"
	];
	private q3: string[] = [
	"Factor this quadratic expression:\nx² + 7x + 12",
	"Factor this quadratic expression:\nx² + 8x + 15",
	"Factor this quadratic expression:\nx² - 5x + 6",
	"Factor this quadratic expression:\nx² + 9x + 20",
	"Factor this quadratic expression:\nx² - 7x + 10",
	"Factor this quadratic expression:\nx² + 6x + 8",
	"Factor this quadratic expression:\nx² - 9",
	"Factor this quadratic expression:\nx² + 10x + 21",
	"Factor this quadratic expression:\nx² - 4x - 5",
	"Factor this quadratic expression:\nx² + 3x - 10",
	"Factor this quadratic expression:\nx² - 16",
	"Factor this quadratic expression:\nx² + 11x + 24",
	"Factor this quadratic expression:\nx² - 6x + 9",
	"Factor this quadratic expression:\nx² + 2x - 15",
	"Factor this quadratic expression:\nx² - 25",
	"Factor this quadratic expression:\nx² + 13x + 36",
	"Factor this quadratic expression:\nx² - 8x + 16",
	"Factor this quadratic expression:\nx² + x - 12",
	"Factor this quadratic expression:\nx² - 36",
	"Factor this quadratic expression:\nx² + 5x - 14"
	];
	private a3: string[] = [
    "(x+3)(x+4)", "(x+4)(x+3)",  // q3[0]
    "(x+3)(x+5)", "(x+5)(x+3)",  // q3[1]
    "(x-2)(x-3)", "(x-3)(x-2)",  // q3[2]
    "(x+4)(x+5)", "(x+5)(x+4)",  // q3[3]
    "(x-2)(x-5)", "(x-5)(x-2)",  // q3[4]
    "(x+2)(x+4)", "(x+4)(x+2)",  // q3[5]
    "(x+3)(x-3)", "(x-3)(x+3)",  // q3[6]
    "(x+3)(x+7)", "(x+7)(x+3)",  // q3[7]
    "(x-5)(x+1)", "(x+1)(x-5)",  // q3[8]
    "(x+5)(x-2)", "(x-2)(x+5)",  // q3[9]
    "(x+4)(x-4)", "(x-4)(x+4)",  // q3[10]
    "(x+3)(x+8)", "(x+8)(x+3)",  // q3[11]
    "(x-3)(x-3)", "(x-3)(x-3)",  // q3[12]
    "(x+5)(x-3)", "(x-3)(x+5)",  // q3[13]
    "(x+5)(x-5)", "(x-5)(x+5)",  // q3[14]
    "(x+4)(x+9)", "(x+9)(x+4)",  // q3[15]
    "(x-4)(x-4)", "(x-4)(x-4)",  // q3[16]
    "(x+4)(x-3)", "(x-3)(x+4)",  // q3[17]
    "(x+6)(x-6)", "(x-6)(x+6)",  // q3[18]
    "(x+7)(x-2)", "(x-2)(x+7)"   // q3[19]
];
	private q4: string[] = [
	"What is the slope of the line through (2, 3) and (5, 9)?",
	"What is the slope of the line through (1, 4) and (3, 10)?",
	"Write the equation of a line with slope 2 and y-intercept 5",
	"What is the slope of the line through (-1, 2) and (3, 10)?",
	"Write the equation of a line with slope -3 and y-intercept 7",
	"What is the y-intercept of the line y = 4x - 6?",
	"What is the slope of the line through (0, 5) and (4, 13)?",
	"Convert to slope-intercept form: 2x + y = 8",
	"What is the slope of y = -5x + 3?",
	"What is the slope of the line through (2, 7) and (6, 15)?",
	"Write the equation with slope 4 passing through (0, -2)",
	"What is the slope of the line through (-2, 1) and (2, 9)?",
	"Convert to slope-intercept form: 3x - y = 6",
	"What is the y-intercept of y = -2x + 9?",
	"What is the slope of the line through (1, 3) and (4, 12)?",
	"Write the equation with slope -1 and y-intercept 10",
	"What is the slope of the line through (5, 8) and (9, 20)?",
	"Convert to slope-intercept form: x + y = 12",
	"What is the slope of the line through (2, 5) and (8, 5)?",
	"What is the slope of the line through (0, 0) and (5, 15)?"
	];
	private a4: string[] = ["2","3","y=2x+5","2","y=-3x+7","-6","2","y=-2x+8","-5","2",
		"y=4x-2","2","y=3x-6","9","3","y=-x+10","3","y=-x+12","0","3"
	];
	private q5: string[] = [
	"If f(x) = 2x + 3, find f(4)",
	"If f(x) = 5x - 7, find f(3)",
	"If g(x) = x² + 1, find g(3)",
	"If f(x) = 3x + 2, find f(0)",
	"If h(x) = 4x - 5, find h(2)",
	"If f(x) = x² - 4, find f(5)",
	"If g(x) = 2x + 7, find g(-1)",
	"If f(x) = x² + 2x, find f(3)",
	"If h(x) = 6 - x, find h(4)",
	"If f(x) = 3x - 1, what is x when f(x) = 14?",
	"If g(x) = x² - 9, find g(4)",
	"If f(x) = 7x + 3, find f(1)",
	"If h(x) = x² + 5x, find h(2)",
	"If f(x) = 4x + 1, what is x when f(x) = 21?",
	"If g(x) = 2x² + 3, find g(2)",
	"If f(x) = 8 - 2x, find f(3)",
	"If h(x) = x² - 2x + 1, find h(4)",
	"If f(x) = 5x - 4, find f(-2)",
	"If g(x) = 3x + 5, what is x when g(x) = 20?",
	"If f(x) = x² + 6, find f(0)"
	];
	private a5: string[] = ["11","8","10","2","3","21","5","15","2","5","7","10","14","5","11","2","9","-14","5","6"];

	// merge arrays into question_bank and answer_bank
	private questions: string[][] = [this.q1, this.q2, this.q3, this.q4, this.q5];
	private answers: string[][] = [this.a1, this.a2, this.a3, this.a4, this.a5];

	/**
	 * Reset game state for a new game
	 */
	reset(): void {
		this.player.reset();
		this.enemy.reset();
		this.score = 0;
	}

	genQuestion(): string {
		this.current_question = Math.floor(Math.random() * this.questions[this.level - 1].length);
		return this.questions[this.level - 1][this.current_question];
	}

	getQuestion(): string {
		return this.questions[this.level - 1][this.current_question];
	}
	isCorrect(answer: string): boolean {
		if(this.level == 3) {
			return answer === this.answers[this.level - 1][this.current_question * 2] || 
			answer === this.answers[this.level - 1][this.current_question * 2 + 1]
		}
		return answer === this.answers[this.level - 1][this.current_question]
	}

	attackPlayer(): void {
		this.enemy.attack(this.player);
	}

	attackEnemy(): void {
		this.player.attack(this.enemy);
	}

	getPlayerHealth(): number {
		return this.player.getHealth();
	}

	getEnemyHealth(): number {
		return this.enemy.getHealth();
	}

	isPlayerAlive(): boolean {
		return this.player.getIsAlive();
	}

	isEnemyAlive(): boolean {
		return this.enemy.getIsAlive();
	}

	setLevel(level: number): void {
		this.level = level;
	}

	/**
	 * Increment score when lemon is clicked
	 */
	incrementScore(): void {
		this.score++;
	}

	/**
	 * Get current score
	 */
	getScore(): number {
		return this.score;
	}
}