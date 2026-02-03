import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScatterChart, Scatter, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { 
  Cpu, 
  Zap, 
  ArrowRight,
  CircuitBoard,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { DEMO_DATA } from '@/data/mockData';

interface QuantumProcessingProps {
  onNext: (page: string) => void;
  isAutoPlaying?: boolean;
}

const QuantumProcessing: React.FC<QuantumProcessingProps> = ({ 
  onNext, 
  isAutoPlaying 
}) => {
  const [showQuantumChip, setShowQuantumChip] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showScatter, setShowScatter] = useState(false);
  
  const { pcaVector, quantumVectorDisplay, scatterData } = DEMO_DATA;

  useEffect(() => {
    const timer1 = setTimeout(() => setShowQuantumChip(true), 500);
    const timer2 = setTimeout(() => setShowResult(true), 1500);
    const timer3 = setTimeout(() => setShowScatter(true), 2500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Auto-advance
  useEffect(() => {
    if (isAutoPlaying && showScatter) {
      const timer = setTimeout(() => onNext('hamiltonian'), 2000);
      return () => clearTimeout(timer);
    }
  }, [isAutoPlaying, showScatter, onNext]);

  // Prepare scatter plot data
  const allScatterData = [
    ...scatterData.normal.map(point => ({ ...point, type: 'normal' })),
    { ...scatterData.suspicious, type: 'suspicious' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h1 className="text-3xl font-bold text-foreground">QCL: Quantum-Enhanced Features</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Quantum circuits find hidden correlations classical methods miss.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Left: Quantum Processing */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="card-neural">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Cpu className="h-5 w-5 text-neural" />
                  <span>Quantum Convolutional Layer</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* 4D Input */}
                <div className="text-center space-y-3">
                  <h3 className="font-semibold text-sm text-muted-foreground">4D Input Vector</h3>
                  <div className="flex justify-center space-x-2">
                    {pcaVector.map((value, index) => (
                      <div
                        key={index}
                        className="w-12 h-12 rounded bg-neural/20 text-neural flex items-center justify-center text-xs font-mono"
                      >
                        {value.toFixed(2)}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quantum Circuit Visualization */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: showQuantumChip ? 1 : 0, scale: showQuantumChip ? 1 : 0.8 }}
                  transition={{ duration: 0.8, type: "spring" }}
                  className="text-center space-y-4"
                >
                  <div className="relative p-6 bg-gradient-to-br from-neural/20 to-quantum/20 rounded-lg border border-neural/30">
                    <CircuitBoard className="h-16 w-16 mx-auto text-neural animate-pulse-neural" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-quantum/20 to-transparent animate-slide-up"></div>
                  </div>
                  <Badge className="bg-neural/20 text-neural">
                    Processing quantum correlations...
                  </Badge>
                </motion.div>

                {/* 2D Output */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: showResult ? 1 : 0, y: showResult ? 0 : 20 }}
                  transition={{ duration: 0.6 }}
                  className="text-center space-y-3"
                >
                  <h3 className="font-semibold text-sm text-muted-foreground">2D Quantum Vector</h3>
                  <div className="flex justify-center space-x-4">
                    {quantumVectorDisplay.map((value, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0 }}
                        animate={{ scale: showResult ? 1 : 0 }}
                        transition={{ delay: index * 0.2, type: "spring" }}
                        className="w-20 h-20 rounded-lg bg-gradient-to-br from-quantum to-neural text-white flex items-center justify-center text-sm font-mono font-bold shadow-lg"
                      >
                        {value.toFixed(4)}
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="p-3 bg-quantum/10 border border-quantum/30 rounded-lg text-left">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-blue-700">This 2D vector captures hidden correlations</strong> the classical stage missed. 
                      We use it to build a quantum risk map that reveals probabilistic fraud patterns.
                    </p>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right: 2D Scatter Plot */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="card-quantum">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-blue-700" />
                  <span>Quantum Feature Space</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showScatter ? 1 : 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-4"
                >
                  {/* Scatter plot */}
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart data={allScatterData}>
                        <XAxis 
                          type="number" 
                          dataKey="x" 
                          tick={{ fontSize: 10, fill: '#9CA3AF' }}
                          axisLine={{ stroke: '#374151' }}
                          domain={[-0.05, 0.18]}
                        />
                        <YAxis 
                          type="number" 
                          dataKey="y" 
                          tick={{ fontSize: 10, fill: '#9CA3AF' }}
                          axisLine={{ stroke: '#374151' }}
                          domain={[-0.03, 0.05]}
                        />
                        <Scatter dataKey="y">
                          {allScatterData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.type === 'suspicious' ? '#EF4444' : '#6B7280'}
                              r={entry.type === 'suspicious' ? 8 : 4}
                            />
                          ))}
                        </Scatter>
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Legend */}
                  <div className="flex items-center justify-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
                      <span className="text-sm text-muted-foreground">Normal Cluster</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full bg-danger"></div>
                      <span className="text-sm text-danger font-semibold">Suspicious Point</span>
                    </div>
                  </div>

                  <div className="p-3 bg-background-secondary rounded-lg border border-border/50">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-blue-700">Quantum-enhanced features</strong> push the anomaly 
                      away from the normal cluster — making it clearer. The separation in this 2D space 
                      reveals patterns invisible to classical analysis.
                    </p>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Navigation */}
        {showScatter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-between items-center mt-6"
          >
            <Button
              onClick={() => onNext('pca')}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to PCA Reduction
            </Button>

            {!isAutoPlaying && (
              <Button
                onClick={() => onNext('hamiltonian')}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 shadow-xl rounded-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Build Risk Map
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuantumProcessing;


