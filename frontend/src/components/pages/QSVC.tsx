import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CircuitBoard, 
  Zap, 
  BarChart3,
  ChevronRight,
  ChevronLeft,
  TrendingUp,
  Activity
} from 'lucide-react';
import { DEMO_DATA } from '@/data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface QSVCProps {
  onNext: (page: string) => void;
  isAutoPlaying?: boolean;
}

const QSVC: React.FC<QSVCProps> = ({ 
  onNext, 
  isAutoPlaying 
}) => {
  const [processingProgress, setProcessingProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [quantumKernel, setQuantumKernel] = useState(false);
  
  const { qsvcResults } = DEMO_DATA;

  // Animate processing
  useEffect(() => {
    const duration = 2500;
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = (currentStep / steps) * 100;
      setProcessingProgress(Math.min(progress, 100));
      
      if (progress >= 50 && !quantumKernel) {
        setQuantumKernel(true);
      }
      
      if (progress >= 100) {
        clearInterval(timer);
        setTimeout(() => setShowResults(true), 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // No auto-advance - manual navigation only

  // Comparison data
  const comparisonData = [
    { method: 'XGBoost', accuracy: 80.71, color: '#6B7280' },
    { method: 'QSVC', accuracy: 82.07, color: '#3B82F6' }
  ];

  const kernelEvolution = [
    { iteration: 0, qsvc: 75, xgboost: 78 },
    { iteration: 10, qsvc: 78, xgboost: 79 },
    { iteration: 20, qsvc: 80, xgboost: 79.5 },
    { iteration: 30, qsvc: 81.5, xgboost: 80 },
    { iteration: 40, qsvc: 82.07, xgboost: 80.71 }
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
          <h1 className="text-3xl font-bold text-foreground">QSVC: Quantum Support Vector Classifier</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Path A: Quantum kernel advantage demonstration. QSVC uses quantum feature maps to find non-linear decision boundaries.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Left: Quantum Processing */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="card-quantum">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CircuitBoard className="h-5 w-5 text-blue-700" />
                  <span>Quantum Kernel Processing</span>
                  {!showResults && (
                    <Badge className="animate-pulse bg-quantum/20 text-blue-700 border-quantum/50">
                      <Activity className="h-3 w-3 mr-1" />
                      Computing
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Input Vector */}
                <div className="text-center space-y-3">
                  <h3 className="font-semibold text-sm text-muted-foreground">Risk Embedding Vector</h3>
                  <div className="flex justify-center flex-wrap gap-2">
                    {DEMO_DATA.pcaVector.map((value, index) => (
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
                  animate={{ opacity: quantumKernel ? 1 : 0.5, scale: quantumKernel ? 1 : 0.8 }}
                  transition={{ duration: 0.8 }}
                  className="text-center space-y-4"
                >
                  <div className="relative p-6 bg-gradient-to-br from-quantum/20 to-neural/20 rounded-lg border border-quantum/30">
                    <CircuitBoard className="h-16 w-16 mx-auto text-blue-700 animate-pulse-neural" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-quantum/20 to-transparent animate-slide-up"></div>
                  </div>
                  <Badge className="bg-quantum/20 text-blue-700">
                    {quantumKernel ? "Quantum kernel computed" : "Encoding into quantum feature space..."}
                  </Badge>
                </motion.div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Kernel Computation</span>
                    <span className="text-sm font-mono">{processingProgress.toFixed(0)}%</span>
                  </div>
                  <Progress value={processingProgress} className="h-2" />
                </div>

                {/* Results */}
                {showResults && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-quantum/10 border border-quantum/30 rounded-lg space-y-3"
                  >
                    <h4 className="font-semibold text-blue-700">QSVC Classification Result</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Fraud Probability:</span>
                        <span className="text-lg font-bold text-warning">{qsvcResults.fraudProbability}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Kernel Advantage:</span>
                        <span className="text-sm font-semibold text-blue-700">+{qsvcResults.advantage}%</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Right: Comparison */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="card-neural">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-neural" />
                  <span>Quantum vs Classical Comparison</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Accuracy Comparison */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Test A: Same Embeddings</h4>
                  
                  <div className="space-y-3">
                    {comparisonData.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{item.method}</span>
                          <span className="text-sm font-bold" style={{ color: item.color }}>
                            {item.accuracy}%
                          </span>
                        </div>
                        <Progress 
                          value={item.accuracy} 
                          className="h-3"
                          style={{ 
                            backgroundColor: `${item.color}20`,
                            ['--progress-background' as any]: item.color
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-quantum/10 border border-quantum/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-blue-700">QSVC shows +1.36% advantage</strong> over classical XGBoost 
                      using the same embeddings, demonstrating quantum kernel superiority.
                    </p>
                  </div>
                </div>

                {/* Evolution Chart */}
                {showResults && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <h4 className="font-semibold">Training Evolution</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={kernelEvolution}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis 
                            dataKey="iteration" 
                            tick={{ fontSize: 10, fill: '#9CA3AF' }}
                            axisLine={{ stroke: '#374151' }}
                          />
                          <YAxis 
                            tick={{ fontSize: 10, fill: '#9CA3AF' }}
                            axisLine={{ stroke: '#374151' }}
                            domain={[70, 85]}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1F2937', 
                              border: '1px solid #374151',
                              borderRadius: '8px'
                            }}
                          />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="qsvc" 
                            stroke="#3B82F6" 
                            strokeWidth={2}
                            name="QSVC"
                            dot={{ fill: '#3B82F6', r: 4 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="xgboost" 
                            stroke="#6B7280" 
                            strokeWidth={2}
                            name="XGBoost"
                            dot={{ fill: '#6B7280', r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                )}

                {/* Test B Result */}
                {showResults && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-warning/10 border border-warning/30 rounded-lg"
                  >
                    <h4 className="font-semibold text-warning mb-2 flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4" />
                      <span>Test B: Blind Classical Model</span>
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Tabular XGBoost: <strong className="text-danger">0% detection</strong> (missed fraud)
                      <br />
                      QSVC: <strong className="text-safe">Detected fraud</strong> using topological features
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Navigation */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-between items-center mt-6"
          >
            <Button
              onClick={() => onNext('risk-encoding')}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to PCA
            </Button>

            <Button
              onClick={() => onNext('hamiltonian')}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 shadow-xl rounded-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Continue to Hamiltonian
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QSVC;




