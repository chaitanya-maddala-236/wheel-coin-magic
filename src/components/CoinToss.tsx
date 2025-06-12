
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

  const tossCoin = () => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    setResult(null);
    
    // Simulate coin flip
    setTimeout(() => {
      const outcome = Math.random() < 0.5 ? 'heads' : 'tails';
      setResult(outcome);
      setIsFlipping(false);
      setFlipCount(prev => prev + 1);
      
      const message = outcome === 'heads' ? 'Heads! 🎉' : 'Tails! 🎉';
      toast.success(message);
    }, 2000);
  };

  const resetCoin = () => {
    setResult(null);
    setIsFlipping(false);
    setFlipCount(0);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <Button
          onClick={onBack}
          variant="outline"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <CircleArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        <h2 className="text-4xl font-bold text-white">🪙 Coin Toss</h2>
        <div className="w-24" />
      </div>

      <div className="text-center space-y-8">
        {/* Coin */}
        <div className="flex justify-center">
          <div className="relative">
            <div
              className={`w-48 h-48 rounded-full shadow-2xl transition-all duration-500 ${
                isFlipping 
                  ? 'animate-spin' 
                  : 'hover:scale-105'
              } ${
                result === 'heads' 
                  ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' 
                  : result === 'tails'
                  ? 'bg-gradient-to-br from-gray-400 to-gray-600'
                  : 'bg-gradient-to-br from-yellow-400 to-yellow-600'
              }`}
              style={{
                animationDuration: isFlipping ? '2s' : undefined,
                animationIterationCount: isFlipping ? '10' : undefined
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl font-bold text-white">
                  {isFlipping ? '?' : result === 'heads' ? 'H' : result === 'tails' ? 'T' : '?'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={tossCoin}
            disabled={isFlipping}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 px-8 text-lg"
          >
            {isFlipping ? "Flipping..." : "TOSS!"}
          </Button>
          <Button
            onClick={resetCoin}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Result */}
        {result && !isFlipping && (
          <Card className={`p-8 mx-auto max-w-md border-none text-white text-center ${
            result === 'heads' 
              ? 'bg-gradient-to-r from-yellow-500 to-orange-600' 
              : 'bg-gradient-to-r from-gray-500 to-gray-700'
          }`}>
            <div className="text-4xl mb-4">
              {result === 'heads' ? '👑' : '🔄'}
            </div>
            <h3 className="text-3xl font-bold mb-2">
              {result === 'heads' ? 'HEADS!' : 'TAILS!'}
            </h3>
            <p className="text-lg opacity-90">
              {result === 'heads' 
                ? 'The coin landed on heads!' 
                : 'The coin landed on tails!'
              }
            </p>
          </Card>
        )}

        {/* Stats */}
        {flipCount > 0 && (
          <Card className="p-4 bg-white/10 border-white/20 backdrop-blur-sm max-w-sm mx-auto">
            <p className="text-white text-center">
              Total flips: <span className="font-bold">{flipCount}</span>
            </p>
          </Card>
        )}

        {/* Instructions */}
        <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-sm max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-3">How to use:</h3>
          <ul className="text-white/80 space-y-2 text-left">
            <li>• Click "TOSS!" to flip the coin</li>
            <li>• Watch the animation and wait for the result</li>
            <li>• Use "Reset" to clear results and start over</li>
            <li>• Perfect for making quick decisions or settling debates!</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};
