import { Character } from "../../components/Character";

/**
 * GameScreenModel - Manages game state
 */
export class GameScreenModel {
	private score = 0;
	private player: Character = new Character(100, 100 / 3);
	private enemy: Character = new Character(100, 100 / 3);
	private question_bank: string[] = ["2+2", "3+3"];
	private current_question: number = 0;
	private answer_bank: number[] = [4, 6];

	/**
	 * Reset game state for a new game
	 */
	reset(): void {
		this.player.health = 100;
		this.player.isAlive = true;
		this.enemy.health = 100;
		this.enemy.isAlive = true;
		this.score = 0;
	}

	getQuestion(): string {
		this.current_question = Math.random() * (this.question_bank.length - 1);
		return this.question_bank[this.current_question];
	}

	validateAnswer(answer: number): boolean {
		if (answer === this.answer_bank[this.current_question]) {
			return true;
		}
		else {
			return false;
		}
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