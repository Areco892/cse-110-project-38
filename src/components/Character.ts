import type { Position } from "../types";

export class Character {
    /* ========================================================= 
        Properties 
    ============================================================ */
    health: number;
    damage: number;
    isAlive: boolean;
    position: Position;
    /* Position will be needed in order to determine if the character gets hit */

    /* ========================================================= 
        Constructor 
    ============================================================ */
    constructor(health: number, damage: number, position: Position) {
        this.health = health || 100;
        this.damage = damage || 100 / 3;
        this.isAlive = true;
        this.position = position || { x: 0, y: 0 };
    }

    /* ========================================================= 
        Methods 
    ============================================================ */
    attack(target: Character): void {
        target.health -= this.damage;

        if (target.health <= 0) {
            target.health = 0;
            target.defeat();
        }
    }

    getHealth(): number {
        return this.health;
    }

    getPosition(): Position {
        return this.position;
    }

    protected defeat(): void {
        this.isAlive = false;
    }

}