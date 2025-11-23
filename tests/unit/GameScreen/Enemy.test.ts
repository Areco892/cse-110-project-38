import { describe, it, expect, beforeEach } from 'vitest'
import { GameScreenModel } from '../../../src/screens/GameScreen/GameScreenModel'

describe('GameScreenModel - Auto Attack', () => {
  let model: GameScreenModel

  beforeEach(() => {
    model = new GameScreenModel()
    model.reset()
  })

  it('should reduce player health when auto-attacked', () => {
    const initialHealth = model.getPlayerHealth()
    
    model.autoAttackPlayer()
    
    const newHealth = model.getPlayerHealth()
    expect(newHealth).toBeLessThan(initialHealth)
    expect(newHealth).toBeGreaterThanOrEqual(0)
  })

  it('should handle multiple auto-attacks', () => {
    const initialHealth = model.getPlayerHealth()
    
    model.autoAttackPlayer()
    model.autoAttackPlayer()
    model.autoAttackPlayer()
    
    const finalHealth = model.getPlayerHealth()
    expect(finalHealth).toBeLessThan(initialHealth)
  })

  it('should mark player as not alive when health reaches 0', () => {
    // Attack until player dies
    while (model.isPlayerAlive() && model.getPlayerHealth() > 0) {
      model.autoAttackPlayer()
    }
    
    expect(model.isPlayerAlive()).toBe(false)
  })

  it('should return current player health', () => {
    const health = model.getPlayerHealth()
    
    expect(health).toBeGreaterThanOrEqual(0)
    expect(health).toBeLessThanOrEqual(100)
  })
})