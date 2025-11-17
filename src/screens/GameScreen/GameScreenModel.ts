import { BaseCharacter } from "../../components/BaseCharacter";

/**
 * GameScreenModel - Manages game state
 */
export class GameScreenModel {
	private score = 0;
	private player: BaseCharacter = new BaseCharacter(100, 100 / 3);
	private enemy: BaseCharacter = new BaseCharacter(100, 100 / 3);
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

	getPlayerHealth(): number {
		return this.player.getHealth();
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

	updatePlayerHealth(): void {
		this.player.takeDamage(this.enemy.damage);
	}

	getEnemyHealth(): number {
		return this.enemy.getHealth();
	}

	updateEnemyHealth(): void {
		this.enemy.takeDamage(this.player.damage);
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