import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Zap, 
  MapPin,
  Calculator,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { DEMO_DATA } from '@/data/mockData';

interface HamiltonianRiskMapProps {
  onNext: (page: string) => void;
  isAutoPlaying?: boolean;
}

const HamiltonianRiskMap: React.FC<HamiltonianRiskMapProps> = ({ 
  onNext, 
  isAutoPlaying 
}) => {
  const [showFormula, setShowFormula] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showMarker, setShowMarker] = useState(false);
  
  const { hamiltonian, quantumVectorDisplay } = DEMO_DATA;

  useEffect(() => {
    const timer1 = setTimeout(() => setShowFormula(true), 500);
    const timer2 = setTimeout(() => setShowHeatmap(true), 1200);
    const timer3 = setTimeout(() => setShowMarker(true), 2000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // No auto-advance - manual navigation only

  // Generate heatmap data
  const generateHeatmapData = () => {
    const data = [];
    const resolution = 20;
    for (let i = 0; i < resolution; i++) {
      for (let j = 0; j < resolution; j++) {
        const x = (i / resolution) * 0.2 - 0.05;
        const y = (j / resolution) * 0.08 - 0.03;
        
        // Simple risk function based on distance from origin and quantum vector
        const distanceFromOrigin = Math.sqrt(x * x + y * y);
        const distanceFromQuantum = Math.sqrt(
          (x - quantumVectorDisplay[0]) ** 2 + 
          (y - quantumVectorDisplay[1]) ** 2
        );
        
        const risk = Math.max(0, Math.min(1, distanceFromOrigin * 8 + (0.1 - distanceFromQuantum) * 10));
        
        data.push({ x: i, y: j, risk, actualX: x, actualY: y });
      }
    }
    return data;
  };

  const heatmapData = generateHeatmapData();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h1 className="text-3xl font-bold text-foreground">Hamiltonian Risk Map</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hamiltonian = risk map. This shows where outcomes are more probable.
          </p>
        </motion.div>

        {/* Hamiltonian Formula */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showFormula ? 1 : 0, y: showFormula ? 0 : 20 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="card-neural">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="h-5 w-5 text-neural" />
                <span>Quantum Hamiltonian Construction</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-6 bg-background-secondary rounded-lg border border-border/50">
                  <code className="text-lg font-mono font-bold text-foreground">
                    {hamiltonian}
                  </code>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-quantum/10 border border-quantum/30 rounded">
                    <strong className="text-blue-700">ZI Term (0.1538):</strong>
                    <p className="text-muted-foreground mt-1">
                      Primary account isolation - measures deviation from normal connection patterns
                    </p>
                  </div>
                  <div className="p-3 bg-neural/10 border border-neural/30 rounded">
                    <strong className="text-neural">IZ Term (0.0358):</strong>
                    <p className="text-muted-foreground mt-1">
                      Transaction velocity anomaly - captures unusual timing patterns
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Risk Map Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: showHeatmap ? 1 : 0, scale: showHeatmap ? 1 : 0.95 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="card-quantum">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-blue-700" />
                <span>Risk Probability Landscape</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Heatmap Canvas */}
                <div className="aspect-square max-w-lg mx-auto relative bg-background-secondary rounded-lg border border-border/50 overflow-hidden">
                  <svg className="w-full h-full">
                    {heatmapData.map((point, index) => {
                      const color = point.risk > 0.7 ? '#EF4444' : 
                                   point.risk > 0.4 ? '#F59E0B' : 
                                   point.risk > 0.2 ? '#10B981' : '#3B82F6';
                      
                      return (
                        <motion.rect
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: showHeatmap ? point.risk * 0.8 + 0.2 : 0 }}
                          transition={{ delay: index * 0.001 }}
                          x={point.x * (400 / 20)}
                          y={point.y * (400 / 20)}
                          width={400 / 20}
                          height={400 / 20}
                          fill={color}
                        />
                      );
                    })}
                  </svg>
                  
                  {/* Current position marker */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: showMarker ? 1 : 0, scale: showMarker ? 1 : 0 }}
                    transition={{ delay: 1, type: "spring", stiffness: 200 }}
                    className="absolute w-4 h-4 bg-white border-2 border-quantum rounded-full shadow-lg animate-pulse"
                    style={{
                      left: `${((quantumVectorDisplay[0] + 0.05) / 0.2) * 100}%`,
                      top: `${((0.03 - quantumVectorDisplay[1]) / 0.08) * 100}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div className="absolute inset-0 bg-quantum rounded-full animate-ping"></div>
                  </motion.div>
                </div>

                {/* Legend */}
                <div className="mt-6 flex items-center justify-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-sm text-muted-foreground">Low Risk</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm text-muted-foreground">Medium</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span className="text-sm text-muted-foreground">High</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-sm text-muted-foreground">Critical</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-blue-700" />
                    <span className="text-sm text-blue-700 font-semibold">Current Position</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Risk Analysis */}
        {showMarker && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-6"
          >
            <Card className="bg-gradient-to-br from-card to-background-secondary">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3 text-blue-700">Position Analysis</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">X Coordinate:</span>
                    <span className="font-mono">{quantumVectorDisplay[0].toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Y Coordinate:</span>
                    <span className="font-mono">{quantumVectorDisplay[1].toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between border-t border-border/50 pt-2">
                    <span className="text-muted-foreground">Risk Zone:</span>
                    <span className="font-semibold text-warning">High-Medium</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-background-secondary">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3 text-neural">Map Properties</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The risk landscape encodes quantum probability amplitudes. Areas of high risk 
                  indicate parameter combinations that lead to fraud-consistent outcomes. The current 
                  position shows elevated risk requiring further analysis.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Navigation */}
        {showMarker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-between items-center mt-6"
          >
            <Button
              onClick={() => onNext('vqe')}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Quantum Processing
            </Button>

            <Button
              onClick={() => onNext('vqe')}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 shadow-xl rounded-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Run VQE Optimization
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
          </motion.div>
        )}

        {/* Auto-play indicator */}
        {isAutoPlaying && showMarker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <Badge className="animate-pulse bg-quantum/20 text-blue-700 border-quantum/50">
              <Zap className="h-3 w-3 mr-1" />
              Initiating VQE optimization...
            </Badge>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HamiltonianRiskMap;


