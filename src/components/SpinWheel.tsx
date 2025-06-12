
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CircleArrowLeft, RotateCcw, Plus, X } from "lucide-react";
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
    "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F"
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
    if (isSpinning || segments.length === 0) return;
    
    setIsSpinning(true);
    setResult(null);
    
    const spins = Math.floor(Math.random() * 5) + 5;
    const finalAngle = Math.floor(Math.random() * 360);
    const totalRotation = rotation + spins * 360 + finalAngle;
    
    setRotation(totalRotation);
    
    setTimeout(() => {
      const segmentAngle = 360 / segments.length;
      const normalizedAngle = (360 - (totalRotation % 360)) % 360;
      const selectedIndex = Math.floor(normalizedAngle / segmentAngle);
      const winner = segments[selectedIndex] || segments[0];
      
      setResult(winner);
      setIsSpinning(false);
      toast.success(`🎉 Result: ${winner}!`);
    }, 3000);
  };

  const resetWheel = () => {
    setRotation(0);
    setResult(null);
    setIsSpinning(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <Button
          onClick={onBack}
          variant="outline"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
        >
          <CircleArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        <h2 className="text-4xl font-bold text-white animate-in slide-in-from-top duration-700">🎡 Spin the Wheel</h2>
        <div className="w-24" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Wheel Section */}
        <div className="flex flex-col items-center space-y-6 animate-in slide-in-from-left duration-700">
          <div className="relative">
            {/* Pointer */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 z-20">
              <div className="w-0 h-0 border-l-6 border-r-6 border-b-8 border-l-transparent border-r-transparent border-b-yellow-400 drop-shadow-lg"></div>
            </div>
            
            {/* Wheel Container */}
            <div className="relative w-80 h-80 rounded-full shadow-2xl overflow-hidden bg-white/10 backdrop-blur-sm border-4 border-white/20">
              {/* Wheel */}
              <svg
                ref={wheelRef}
                className={`w-full h-full transition-transform ease-out ${
                  isSpinning ? 'duration-[3000ms]' : 'duration-300'
                }`}
                style={{
                  transform: `rotate(${rotation}deg)`,
                }}
                viewBox="0 0 200 200"
              >
                {segments.map((segment, index) => {
                  const angle = 360 / segments.length;
                  const startAngle = (angle * index - 90) * (Math.PI / 180);
                  const endAngle = (angle * (index + 1) - 90) * (Math.PI / 180);
                  
                  const x1 = 100 + 90 * Math.cos(startAngle);
                  const y1 = 100 + 90 * Math.sin(startAngle);
                  const x2 = 100 + 90 * Math.cos(endAngle);
                  const y2 = 100 + 90 * Math.sin(endAngle);
                  
                  const largeArc = angle > 180 ? 1 : 0;
                  const pathData = `M 100 100 L ${x1} ${y1} A 90 90 0 ${largeArc} 1 ${x2} ${y2} Z`;
                  
                  const textAngle = (startAngle + endAngle) / 2;
                  const textX = 100 + 60 * Math.cos(textAngle);
                  const textY = 100 + 60 * Math.sin(textAngle);
                  
                  return (
                    <g key={index}>
                      <path
                        d={pathData}
                        fill={colors[index % colors.length]}
                        stroke="#fff"
                        strokeWidth="2"
                        className="hover:brightness-110 transition-all duration-200"
                      />
                      <text
                        x={textX}
                        y={textY}
                        fill="white"
                        fontSize="12"
                        fontWeight="bold"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="pointer-events-none drop-shadow-sm"
                        transform={`rotate(${(textAngle * 180) / Math.PI}, ${textX}, ${textY})`}
                      >
                        {segment.length > 10 ? segment.substring(0, 10) + '...' : segment}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={spinWheel}
              disabled={isSpinning || segments.length === 0}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
            >
              {isSpinning ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Spinning...
                </>
              ) : (
                "🎯 SPIN!"
              )}
            </Button>
            <Button
              onClick={resetWheel}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-200 hover:scale-105"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>

          {result && !isSpinning && (
            <Card className="p-8 mx-auto max-w-md border-none text-white text-center bg-gradient-to-r from-green-500 to-emerald-600 shadow-2xl animate-in scale-in duration-500">
              <div className="text-6xl mb-4 animate-bounce">🎉</div>
              <h3 className="text-3xl font-bold mb-2">Winner!</h3>
              <p className="text-xl font-semibold">{result}</p>
            </Card>
          )}
        </div>

        {/* Options Section */}
        <div className="space-y-6 animate-in slide-in-from-right duration-700">
          <Card className="p-6 bg-white/10 border-white/20 backdrop-blur-sm shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
              ⚙️ Customize Options
            </h3>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  placeholder="Add new option..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 transition-all duration-200"
                  onKeyPress={(e) => e.key === 'Enter' && addSegment()}
                  maxLength={20}
                />
                <Button
                  onClick={addSegment}
                  disabled={segments.length >= 8 || !newOption.trim()}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {segments.map((segment, index) => (
                  <div key={index} className="flex items-center gap-3 group">
                    <div 
                      className="w-5 h-5 rounded-full shadow-sm"
                      style={{ backgroundColor: colors[index % colors.length] }}
                    ></div>
                    <Input
                      value={segment}
                      onChange={(e) => editSegment(index, e.target.value)}
                      className="flex-1 bg-white/10 border-white/20 text-white focus:bg-white/20 transition-all duration-200"
                      maxLength={20}
                    />
                    <Button
                      onClick={() => removeSegment(index)}
                      disabled={segments.length <= 2}
                      variant="destructive"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="text-white/60 text-sm text-center">
                {segments.length}/8 options • Min 2 required
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white/5 border-white/10 backdrop-blur-sm">
            <h4 className="text-lg font-semibold text-white mb-2">💡 How to use:</h4>
            <ul className="text-white/80 space-y-1 text-sm">
              <li>• Add or edit wheel options</li>
              <li>• Click "SPIN!" to start the wheel</li>
              <li>• Wait for the result to appear</li>
              <li>• Use "Reset" to clear and start over</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};
