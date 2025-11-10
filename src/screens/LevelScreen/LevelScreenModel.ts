

/* --------------------------------------------------------------------
   LevelSelectModel.ts
   --------------------------------------------------------------------
   Stores the state for the Level Select screen:
   - The currently selected level
   - Optional: overall score (can be used by levels or results)
-------------------------------------------------------------------- */
export class LevelScreenModel {
	// ------------------------ Selected Level ------------------------
	// Stores the index of the level selected by the user
	private selectedLevel: number | null = null;

	// ------------------------ Score (optional) ------------------------
	// You can track score across levels if needed
	private score = 0;

	// ------------------------ Reset ------------------------
	// Clears selected level and score
	reset(): void {
		this.selectedLevel = null;
		this.score = 0;
	}

	// ------------------------ Set Selected Level ------------------------
	// Called when a cube is clicked
	setSelectedLevel(level: number): void {
		this.selectedLevel = level;
	}

	// ------------------------ Get Selected Level ------------------------
	// Returns the currently selected level
	getSelectedLevel(): number | null {
		return this.selectedLevel;
	}

	// ------------------------ Score Methods (optional) ------------------------
	incrementScore(): void {
		this.score++;
	}

	getScore(): number {
		return this.score;
	}
}
