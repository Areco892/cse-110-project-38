export class Character {
    /* ========================================================= 
        Properties 
    ============================================================ */
    health: number;
    damage: number;
    isAlive: boolean;

    /* ========================================================= 
        Constructor 
    ============================================================ */
    constructor(health: number, damage: number) {
        this.health = health || 100;
        this.damage = damage || 100 / 3;
        this.isAlive = true;
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

    protected defeat(): void {
        this.isAlive = false;
    }

}