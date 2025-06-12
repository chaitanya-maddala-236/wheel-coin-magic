
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CircleArrowLeft, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface SpinWheelProps {
  onBack: () => void;
}

export const SpinWheel = ({ onBack }: SpinWheelProps) => {
  const [segments, setSegments] = useState([
    "Option 1", "Option 2", "Option 3", "Option 4", "Option 5", "Option 6"
  ]);
  const [newOption, setNewOption] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const colors = [
    "from-red-500 to-red-600",
    "from-blue-500 to-blue-600", 
    "from-green-500 to-green-600",
    "from-yellow-500 to-yellow-600",
    "from-purple-500 to-purple-600",
    "from-pink-500 to-pink-600",
    "from-indigo-500 to-indigo-600",
    "from-orange-500 to-orange-600"
  ];

  const addSegment = () => {
    if (newOption.trim() && segments.length < 8) {
      setSegments([...segments, newOption.trim()]);
      setNewOption("");
    }
  };

  const removeSegment = (index: number) => {
    if (segments.length > 2) {
      setSegments(segments.filter((_, i) => i !== index));
    }
  };

  const editSegment = (index: number, value: string) => {
    const newSegments = [...segments];
    newSegments[index] = value;
    setSegments(newSegments);
  };

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setResult(null);
    
    const spins = Math.floor(Math.random() * 5) + 5; // 5-10 full rotations
    const finalRotation = rotation + spins * 360 + Math.floor(Math.random() * 360);
    
    setRotation(finalRotation);
    
    setTimeout(() => {
      const segmentAngle = 360 / segments.length;
      const normalizedRotation = (360 - (finalRotation % 360)) % 360;
      const selectedIndex = Math.floor(normalizedRotation / segmentAngle);
      const winner = segments[selectedIndex];
      
      setResult(winner);
      setIsSpinning(false);
      toast.success(`Result: ${winner}! 🎉`);
    }, 3000);
  };

  const resetWheel = () => {
    setRotation(0);
    setResult(null);
    setIsSpinning(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <Button
          onClick={onBack}
          variant="outline"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <CircleArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        <h2 className="text-4xl font-bold text-white">🎡 Spin the Wheel</h2>
        <div className="w-24" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Wheel Section */}
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            {/* Pointer */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
              <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-yellow-400"></div>
            </div>
            
            {/* Wheel */}
            <div
              ref={wheelRef}
              className={`w-80 h-80 rounded-full relative overflow-hidden shadow-2xl transition-transform duration-3000 ease-out ${
                isSpinning ? 'animate-spin' : ''
              }`}
              style={{
                transform: `rotate(${rotation}deg)`,
                transitionDuration: isSpinning ? '3s' : '0.3s'
              }}
            >
              {segments.map((segment, index) => {
                const angle = 360 / segments.length;
                const rotation = angle * index;
                return (
                  <div
                    key={index}
                    className={`absolute w-full h-full bg-gradient-to-r ${colors[index % colors.length]}`}
                    style={{
                      clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin((angle * Math.PI) / 180)}% ${50 - 50 * Math.cos((angle * Math.PI) / 180)}%)`,
                      transform: `rotate(${rotation}deg)`
                    }}
                  >
                    <div
                      className="absolute text-white font-semibold text-sm"
                      style={{
                        top: '20%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        transformOrigin: '50% 100%'
                      }}
                    >
                      {segment}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={spinWheel}
              disabled={isSpinning}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 text-lg"
            >
              {isSpinning ? "Spinning..." : "SPIN!"}
            </Button>
            <Button
              onClick={resetWheel}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>

          {result && (
            <Card className="p-6 bg-gradient-to-r from-green-500 to-emerald-600 border-none text-white text-center">
              <h3 className="text-2xl font-bold mb-2">🎉 Winner!</h3>
              <p className="text-xl">{result}</p>
            </Card>
          )}
        </div>

        {/* Options Section */}
        <div className="space-y-6">
          <Card className="p-6 bg-white/10 border-white/20 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-4">Customize Options</h3>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  placeholder="Add new option..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  onKeyPress={(e) => e.key === 'Enter' && addSegment()}
                />
                <Button
                  onClick={addSegment}
                  disabled={segments.length >= 8 || !newOption.trim()}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                >
                  Add
                </Button>
              </div>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {segments.map((segment, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${colors[index % colors.length]}`}></div>
                    <Input
                      value={segment}
                      onChange={(e) => editSegment(index, e.target.value)}
                      className="flex-1 bg-white/10 border-white/20 text-white"
                    />
                    <Button
                      onClick={() => removeSegment(index)}
                      disabled={segments.length <= 2}
                      variant="destructive"
                      size="sm"
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
