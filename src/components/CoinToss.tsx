
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CircleArrowLeft, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface CoinTossProps {
  onBack: () => void;
}

export const CoinToss = ({ onBack }: CoinTossProps) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<'heads' | 'tails' | null>(null);
  const [flipCount, setFlipCount] = useState(0);
  const [headsCount, setHeadsCount] = useState(0);
  const [tailsCount, setTailsCount] = useState(0);

  const tossCoin = () => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    setResult(null);
    
    setTimeout(() => {
      const outcome = Math.random() < 0.5 ? 'heads' : 'tails';
      setResult(outcome);
      setIsFlipping(false);
      setFlipCount(prev => prev + 1);
      
      if (outcome === 'heads') {
        setHeadsCount(prev => prev + 1);
      } else {
        setTailsCount(prev => prev + 1);
      }
      
      const message = outcome === 'heads' ? '👑 Heads! You got it!' : '🔄 Tails! Nice flip!';
      toast.success(message);
    }, 2500);
  };

  const resetCoin = () => {
    setResult(null);
    setIsFlipping(false);
    setFlipCount(0);
    setHeadsCount(0);
    setTailsCount(0);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <Button
          onClick={onBack}
          variant="outline"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
        >
          <CircleArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        <h2 className="text-4xl font-bold text-white animate-in slide-in-from-top duration-700">🪙 Coin Toss</h2>
        <div className="w-24" />
      </div>

      <div className="text-center space-y-8">
        {/* Coin Container */}
        <div className="flex justify-center animate-in slide-in-from-bottom duration-700">
          <div className="relative">
            {/* Coin Shadow */}
            <div className="absolute top-4 left-4 w-56 h-56 rounded-full bg-black/20 blur-xl"></div>
            
            {/* Coin */}
            <div
              className={`relative w-56 h-56 rounded-full shadow-2xl transition-all duration-500 cursor-pointer ${
                isFlipping 
                  ? 'animate-spin' 
                  : 'hover:scale-110 hover:shadow-3xl'
              } ${
                result === 'heads' 
                  ? 'bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600' 
                  : result === 'tails'
                  ? 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-600'
                  : 'bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600'
              }`}
              style={{
                animationDuration: isFlipping ? '2.5s' : undefined,
                animationIterationCount: isFlipping ? '15' : undefined,
                animationTimingFunction: isFlipping ? 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' : undefined
              }}
              onClick={!isFlipping ? tossCoin : undefined}
            >
              {/* Coin Face */}
              <div className="absolute inset-4 rounded-full border-4 border-white/30 flex items-center justify-center backdrop-blur-sm">
                <div className="text-center">
                  {isFlipping ? (
                    <div className="text-8xl font-bold text-white animate-pulse">?</div>
                  ) : result === 'heads' ? (
                    <div className="space-y-2">
                      <div className="text-6xl">👑</div>
                      <div className="text-2xl font-bold text-white">HEADS</div>
                    </div>
                  ) : result === 'tails' ? (
                    <div className="space-y-2">
                      <div className="text-6xl">🔄</div>
                      <div className="text-2xl font-bold text-white">TAILS</div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-6xl">🪙</div>
                      <div className="text-lg font-semibold text-white/80">Click to toss!</div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Coin Edge Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-45 opacity-60"></div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 animate-in slide-in-from-bottom duration-700 delay-200">
          <Button
            onClick={tossCoin}
            disabled={isFlipping}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white font-bold py-4 px-8 text-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 disabled:hover:scale-100 disabled:opacity-50"
          >
            {isFlipping ? (
              <>
                <div className="animate-spin w-6 h-6 border-3 border-white border-t-transparent rounded-full mr-3"></div>
                Flipping...
              </>
            ) : (
              "🎯 TOSS!"
            )}
          </Button>
          
          {flipCount > 0 && (
            <Button
              onClick={resetCoin}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm py-4 px-6 transition-all duration-300 hover:scale-110"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset All
            </Button>
          )}
        </div>

        {/* Result Card */}
        {result && !isFlipping && (
          <Card className={`p-8 mx-auto max-w-md border-none text-white text-center shadow-2xl animate-in scale-in duration-500 ${
            result === 'heads' 
              ? 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500' 
              : 'bg-gradient-to-r from-gray-500 via-slate-600 to-gray-700'
          }`}>
            <div className="text-6xl mb-4 animate-bounce">
              {result === 'heads' ? '🎉' : '✨'}
            </div>
            <h3 className="text-4xl font-bold mb-3">
              {result === 'heads' ? 'HEADS WINS!' : 'TAILS WINS!'}
            </h3>
            <p className="text-lg opacity-90 font-medium">
              {result === 'heads' 
                ? 'The crown side landed up!' 
                : 'The reverse side landed up!'
              }
            </p>
          </Card>
        )}

        {/* Stats */}
        {flipCount > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto animate-in slide-in-from-bottom duration-700 delay-300">
            <Card className="p-4 bg-white/10 border-white/20 backdrop-blur-sm">
              <div className="text-2xl font-bold text-white">{flipCount}</div>
              <div className="text-white/70 text-sm">Total Flips</div>
            </Card>
            <Card className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30 backdrop-blur-sm">
              <div className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                👑 {headsCount}
              </div>
              <div className="text-white/70 text-sm">Heads</div>
            </Card>
            <Card className="p-4 bg-gradient-to-r from-gray-500/20 to-slate-600/20 border-gray-500/30 backdrop-blur-sm">
              <div className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                🔄 {tailsCount}
              </div>
              <div className="text-white/70 text-sm">Tails</div>
            </Card>
          </div>
        )}

        {/* Instructions */}
        <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-sm max-w-2xl mx-auto animate-in slide-in-from-bottom duration-700 delay-400">
          <h3 className="text-xl font-bold text-white mb-3 flex items-center justify-center gap-2">
            💡 How to use
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-white/80 text-sm">
            <ul className="space-y-2">
              <li>• Click the coin or "TOSS!" button</li>
              <li>• Watch the spinning animation</li>
            </ul>
            <ul className="space-y-2">
              <li>• See your result and stats</li>
              <li>• Use "Reset All" to start fresh</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};
