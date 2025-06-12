
import { useState } from "react";
import { SpinWheel } from "@/components/SpinWheel";
import { CoinToss } from "@/components/CoinToss";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

const Index = () => {
  const [currentTool, setCurrentTool] = useState<'home' | 'wheel' | 'coin'>('home');

  const renderCurrentTool = () => {
    switch (currentTool) {
      case 'wheel':
        return <SpinWheel onBack={() => setCurrentTool('home')} />;
      case 'coin':
        return <CoinToss onBack={() => setCurrentTool('home')} />;
      default:
        return (
          <div className="text-center space-y-8 animate-in fade-in duration-700">
            <div className="space-y-4">
              <div className="text-8xl mb-4 animate-bounce">🎯</div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Spin & Flip
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Make decisions fun with our interactive tools! Whether you need to choose between options or settle a debate, we've got you covered.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div 
                onClick={() => setCurrentTool('wheel')}
                className="group bg-gradient-to-br from-purple-500 to-pink-500 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 border border-white/20"
              >
                <div className="text-5xl mb-4 group-hover:animate-spin transition-transform duration-500">🎡</div>
                <h3 className="text-2xl font-bold text-white mb-2">Spin the Wheel</h3>
                <p className="text-white/90">Customize your options and let fate decide!</p>
              </div>
              
              <div 
                onClick={() => setCurrentTool('coin')}
                className="group bg-gradient-to-br from-blue-500 to-cyan-500 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 border border-white/20"
              >
                <div className="text-5xl mb-4 group-hover:animate-bounce transition-transform duration-500">🪙</div>
                <h3 className="text-2xl font-bold text-white mb-2">Toss a Coin</h3>
                <p className="text-white/90">Classic heads or tails decision maker!</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="min-h-screen flex items-center justify-center">
          {renderCurrentTool()}
        </div>
      </div>
    </div>
  );
};

export default Index;
