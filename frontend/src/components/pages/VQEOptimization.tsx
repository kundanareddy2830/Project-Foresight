import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Zap, 
  Activity,
  Target,
  BarChart3,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { DEMO_DATA } from '@/data/mockData';

interface VQEOptimizationProps {
  onNext: (page: string) => void;
  isAutoPlaying?: boolean;
}

const VQEOptimization: React.FC<VQEOptimizationProps> = ({ 
  onNext, 
  isAutoPlaying 
}) => {
  const [searchProgress, setSearchProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [pulsing, setPulsing] = useState(true);
  
  const { vqeResults } = DEMO_DATA;

  // Animate search progress
  useEffect(() => {
    const duration = 3000; // 3 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = (currentStep / steps) * 100;
      setSearchProgress(Math.min(progress, 100));
      
      if (progress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setShowResults(true);
          setPulsing(false);
        }, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // No auto-advance - manual navigation only

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h1 className="text-3xl font-bold text-foreground">VQE — Finding the Most Probable Outcome</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            VQE explores the risk map and returns a probability for each outcome.
          </p>
        </motion.div>

        {/* Search Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="card-quantum">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="h-5 w-5 text-blue-700" />
                <span>Quantum Optimization in Progress</span>
                {pulsing && (
                  <Badge className="animate-pulse bg-quantum/20 text-blue-700 border-quantum/50">
                    <Activity className="h-3 w-3 mr-1" />
                    Running
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Risk map with pulsing search */}
              <div className="relative">
                <div className="aspect-video bg-background-secondary rounded-lg border border-border/50 overflow-hidden relative">
                  {/* Background heatmap representation */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-yellow-500/20 to-red-500/20"></div>
                  
                  {/* Pulsing search point */}
                  {pulsing && (
                    <motion.div
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.8, 0.3, 0.8]
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute top-1/2 left-2/3 w-6 h-6 bg-quantum rounded-full shadow-lg"
                      style={{ transform: 'translate(-50%, -50%)' }}
                    >
                      <div className="absolute inset-0 bg-quantum rounded-full animate-ping"></div>
                    </motion.div>
                  )}
                  
                  {/* Search completed marker */}
                  {showResults && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="absolute top-1/2 left-2/3 w-4 h-4 bg-safe rounded-full border-2 border-white shadow-lg"
                      style={{ transform: 'translate(-50%, -50%)' }}
                    >
                      <Target className="w-full h-full text-white" />
                    </motion.div>
                  )}
                  
                  {/* Grid overlay */}
                  <svg className="absolute inset-0 w-full h-full opacity-30">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#374151" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Optimization Progress</span>
                    <span className="text-sm font-mono">{searchProgress.toFixed(0)}%</span>
                  </div>
                  <Progress value={searchProgress} className="h-2" />
                </div>
              </div>

              {/* VQE Status */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-quantum/10 border border-quantum/30 rounded-lg">
                  <h4 className="font-semibold text-blue-700 mb-2">Current Status</h4>
                  <p className="text-sm text-muted-foreground">
                    {!showResults ? "Exploring risk landscape using variational quantum eigensolvers..." : 
                     "Optimization complete - minimum energy state found"}
                  </p>
                </div>
                
                <div className="p-4 bg-neural/10 border border-neural/30 rounded-lg">
                  <h4 className="font-semibold text-neural mb-2">Search Method</h4>
                  <p className="text-sm text-muted-foreground">
                    VQE systematically explores parameter space to find the ground state configuration
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Display */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="card-neural">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-neural" />
                  <span>VQE Results</span>
                  <Badge className="bg-safe/20 text-safe border-safe/50">
                    Complete
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Energy Result */}
                <div className="text-center p-6 bg-gradient-to-r from-quantum/10 to-neural/10 rounded-lg border border-quantum/30">
                  <h3 className="text-lg font-semibold text-blue-700 mb-2">VQE Energy</h3>
                  <p className="text-3xl font-bold font-mono">{vqeResults.energy}</p>
                  <p className="text-sm text-muted-foreground mt-2">Validated vs baseline</p>
                </div>

                {/* Probability Measurements */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Measured Probabilities:</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-background-secondary rounded border border-border/50">
                      <div className="flex items-center space-x-3">
                        <code className="font-mono text-sm">|01⟩</code>
                        <span className="text-sm text-muted-foreground">Account takeover state</span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-warning">{(vqeResults.probabilities["01"] * 100).toFixed(2)}%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-background-secondary rounded border border-border/50">
                      <div className="flex items-center space-x-3">
                        <code className="font-mono text-sm">|00⟩</code>
                        <span className="text-sm text-muted-foreground">Normal transaction state</span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-safe">{(vqeResults.probabilities["00"] * 100).toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="p-4 bg-warning/10 border border-warning/30 rounded-lg">
                  <h4 className="font-semibold text-warning mb-2">Analysis Summary</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    VQE found the ground state with energy {vqeResults.energy}, indicating a {vqeResults.confidence} 
                    probability of account takeover. The quantum measurement reveals this transaction cluster 
                    has significantly elevated risk.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Navigation */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-between items-center mt-6"
          >
            <Button
              onClick={() => onNext('energy-gap')}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Risk Map
            </Button>

            <Button
              onClick={() => onNext('forecast')}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 shadow-xl rounded-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Generate Final Forecast
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </motion.div>
        )}

        {/* Auto-play indicator */}
        {isAutoPlaying && showResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <Badge className="animate-pulse bg-quantum/20 text-blue-700 border-quantum/50">
              <Zap className="h-3 w-3 mr-1" />
              Generating final forecast...
            </Badge>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VQEOptimization;


