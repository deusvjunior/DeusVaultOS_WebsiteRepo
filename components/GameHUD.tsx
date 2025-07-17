import { useGame } from './GameContext';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Zap, Map, Trophy, Star } from 'lucide-react';

export function GameHUD() {
  const { gameState, getProgressPercentage } = useGame();
  const progressPercentage = getProgressPercentage();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-80">
      {/* Level Badge */}
      <div className="flex items-center gap-3">
        <Badge 
          variant="outline" 
          className="bg-black/80 backdrop-blur-md border-purple-500/50 text-purple-300 px-4 py-2 text-lg shadow-lg"
        >
          <Trophy className="h-4 w-4 mr-2" />
          Level {gameState.level}
        </Badge>
        
        <Badge 
          variant="outline" 
          className="bg-black/80 backdrop-blur-md border-blue-500/50 text-blue-300 px-3 py-2 shadow-lg"
        >
          <Zap className="h-4 w-4 mr-1" />
          {gameState.xp} XP
        </Badge>
      </div>

      {/* XP Progress */}
      {gameState.level < 10 && (
        <div className="bg-black/80 backdrop-blur-md border border-purple-500/30 rounded-lg p-3 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-purple-300">Next Level</span>
            <span className="text-xs text-purple-300">{gameState.xpToNext} XP needed</span>
          </div>
          <Progress 
            value={Math.min((gameState.xp % 100), 100)} 
            className="h-2"
          />
        </div>
      )}

      {/* Exploration Progress */}
      <div className="bg-black/80 backdrop-blur-md border border-blue-500/30 rounded-lg p-3 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Map className="h-4 w-4 text-blue-300" />
            <span className="text-xs text-blue-300">Vault Explored</span>
          </div>
          <span className="text-xs text-blue-300">{progressPercentage}%</span>
        </div>
        <Progress 
          value={progressPercentage} 
          className="h-2"
        />
        <div className="text-xs text-gray-400 mt-1">
          {gameState.exploredSections.size}/{gameState.totalSections} discovered
        </div>
      </div>

      {/* Achievement Notification */}
      {gameState.level >= 5 && (
        <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 backdrop-blur-md border border-yellow-500/30 rounded-lg p-3 shadow-lg">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="text-xs text-yellow-300">Explorer Status Unlocked!</span>
          </div>
        </div>
      )}
    </div>
  );
}