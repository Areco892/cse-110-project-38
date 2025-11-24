export class Character {
    /**
     * Properties 
     */
    private health: number;
    private damage: number;
    private isAlive: boolean;

    /** 
     * Constructor 
     */
    constructor(health: number, damage: number) {
        this.health = health || 100;
        this.damage = damage || 100 / 3;
        this.isAlive = true;
    }

    /**
     * Methods 
     */
    attack(target: Character): void {
        target.health -= this.damage;

        if (target.health <= 0) {
            target.health = 0;
            target.defeat();
        }
    }
     /**
     * Auto-attack: deal 10% of target's max health  
     */
    autoAttack(target: Character): void { 
        const damage = target.damage * 0.3; // 10% of target's max health
        target.health -= damage;
        if (target.health <= 0) {
            target.health = 0;
            target.defeat();  //takes 5 hits to kill
        }
    }

    getHealth(): number {
        return this.health;
    }

    getIsAlive(): boolean {
        return this.isAlive;
    }

    reset(): void {
        this.health = 100;
        this.isAlive = true;
    }

    protected defeat(): void {
        this.isAlive = false;
    }

}