import { describe, it, expect, beforeEach, vi } from 'vitest'
import { LeaderboardEntry, ResultsScreenModel } from '../../../src/screens/ResultsScreen/ResultsScreenModel'

describe('Result Screen - Number of Stars', () => {
  let model: ResultsScreenModel

  beforeEach(() => {
    model = new ResultsScreenModel();
    // Create a mock localStorage
    const mockStorage: any = {
      store: {} as Record<string, string>,
      getItem(key: string) {
        return this.store[key] ?? null;
      },
      setItem(key: string, value: string) {
        this.store[key] = value;
      },
      removeItem(key: string) {
        delete this.store[key];
      },
      clear() {
        this.store = {};
      }
    };

    vi.stubGlobal("localStorage", mockStorage);
  });

  /**
   * Stars Test
   */
  it("should return stored stars and reset them to 0", () => {
    localStorage.setItem("numStars", JSON.stringify(3));
    const stars = model.getStars();

    expect(stars).toBe(3);
    expect(localStorage.getItem("numStars")).toBe("0");
  });

  it("should return 0 if no stars were stored", () => {
    const stars = model.getStars();
    expect(stars).toBe(0);
    expect(localStorage.getItem("numStars")).toBe("0");
  });

  /**
   * Final Score Tests
   */
  it("should set and get the final score", () => {
    model.setFinalScore(70);
    expect(model.getFinalScore()).toBe(70);
  });

  /**
   * Leaderboard Tests
   */
  it("should set and get leaderboard entries", () => {
    const entries: LeaderboardEntry[] = [
      { score: 70, timestamp: "2025-11-25 10:00" },
      { score: 80, timestamp: "2025-11-25 11:00" }
    ];

    model.setLeaderboard(entries);

    expect(model.getLeaderboard()).toEqual(entries);
  });

  it("should return an empty array if leaderboard has not been set", () => {
    expect(model.getLeaderboard()).toEqual([]);
  });

})