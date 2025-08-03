import React, { createContext, useContext, useReducer, useCallback } from 'react';

interface GameState {
  level: number;
  xp: number;
  xpToNext: number;
  exploredSections: Set<string>;
  totalSections: number;
  achievements: string[];
}

interface GameAction {
  type: 'GAIN_XP' | 'EXPLORE_SECTION' | 'UNLOCK_ACHIEVEMENT' | 'LEVEL_UP';
  payload?: any;
}

const initialState: GameState = {
  level: 1,
  xp: 0,
  xpToNext: 100,
  exploredSections: new Set(),
  totalSections: 20, // Total discoverable sections
  achievements: []
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'GAIN_XP':
      const newXP = state.xp + action.payload;
      const newLevel = Math.min(Math.floor(newXP / 100) + 1, 10);
      
      return {
        ...state,
        xp: newXP,
        level: newLevel,
        xpToNext: newLevel < 10 ? 100 - (newXP % 100) : 0
      };
      
    case 'EXPLORE_SECTION':
      const newExploredSections = new Set(state.exploredSections);
      newExploredSections.add(action.payload);
      
      return {
        ...state,
        exploredSections: newExploredSections
      };
      
    case 'UNLOCK_ACHIEVEMENT':
      if (!state.achievements.includes(action.payload)) {
        return {
          ...state,
          achievements: [...state.achievements, action.payload]
        };
      }
      return state;
      
    default:
      return state;
  }
}

interface GameContextType {
  gameState: GameState;
  gainXP: (amount: number, reason?: string) => void;
  exploreSection: (sectionId: string) => void;
  unlockAchievement: (achievement: string) => void;
  getProgressPercentage: () => number;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);

  const gainXP = useCallback((amount: number, reason?: string) => {
    const prevLevel = gameState.level;
    dispatch({ type: 'GAIN_XP', payload: amount });
    
    // Level up logic without console logs for production
    const newLevel = Math.min(Math.floor((gameState.xp + amount) / 100) + 1, 10);
    
    if (newLevel > prevLevel && newLevel <= 10) {
      // Level up occurred - could trigger UI notification here
    }
  }, [gameState.level, gameState.xp]);

  const exploreSection = useCallback((sectionId: string) => {
    if (!gameState.exploredSections.has(sectionId)) {
      dispatch({ type: 'EXPLORE_SECTION', payload: sectionId });
      gainXP(10, `Exploring ${sectionId}`);
    }
  }, [gameState.exploredSections, gainXP]);

  const unlockAchievement = useCallback((achievement: string) => {
    if (!gameState.achievements.includes(achievement)) {
      dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: achievement });
      // Achievement unlocked - could trigger UI notification here
      gainXP(50, 'Achievement unlocked');
    }
  }, [gameState.achievements, gainXP]);

  const getProgressPercentage = useCallback(() => {
    return Math.round((gameState.exploredSections.size / gameState.totalSections) * 100);
  }, [gameState.exploredSections.size, gameState.totalSections]);

  return (
    <GameContext.Provider value={{
      gameState,
      gainXP,
      exploreSection,
      unlockAchievement,
      getProgressPercentage
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}