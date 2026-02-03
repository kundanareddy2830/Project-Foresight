import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Layers, 
  Zap,
  Minimize2,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { DEMO_DATA } from '@/data/mockData';

interface PCAReductionProps {
  onNext: (page: string) => void;
  isAutoPlaying?: boolean;
}

const PCAReduction: React.FC<PCAReductionProps> = ({ 
  onNext, 
  isAutoPlaying 
}) => {
  const [showCompression, setShowCompression] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const { perturbationVector, pcaVector } = DEMO_DATA;

  useEffect(() => {
    const timer1 = setTimeout(() => setShowCompression(true), 500);
    const timer2 = setTimeout(() => setShowResult(true), 1500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Auto-advance
  useEffect(() => {
    if (isAutoPlaying && showResult) {
      const timer = setTimeout(() => onNext('risk-encoding'), 1000);
      return () => clearTimeout(timer);
    }
  }, [isAutoPlaying, showResult, onNext]);

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
          <h1 className="text-3xl font-bold text-foreground">PCA: Dimensionality Reduction</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We compress the fingerprint so our quantum step can run efficiently.
          </p>
        </motion.div>

        {/* Compression Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="card-neural">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Minimize2 className="h-5 w-5 text-neural" />
                <span>16D → 4D Compression</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center space-x-8 py-8">
                
                {/* 16D Input Visualization */}
                <div className="text-center space-y-4">
                  <h3 className="font-semibold text-sm text-muted-foreground">16D Input</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {perturbationVector.map((value, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className={`w-8 h-8 rounded text-xs flex items-center justify-center font-mono ${
                          value > 0 ? 'bg-quantum/20 text-blue-700' : 'bg-danger/20 text-danger'
                        }`}
                      >
                        {value.toFixed(2)}
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">Original vector</p>
                </div>

                {/* PCA Arrow */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: showCompression ? 1 : 0, x: showCompression ? 0 : -20 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center space-y-2"
                >
                  <Layers className="h-8 w-8 text-neural" />
                  <ArrowRight className="h-6 w-6 text-neural" />
                  <Badge className="bg-neural/20 text-neural text-xs">
                    PCA
                  </Badge>
                </motion.div>

                {/* 4D Output Visualization */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: showResult ? 1 : 0, x: showResult ? 0 : 20 }}
                  transition={{ duration: 0.6 }}
                  className="text-center space-y-4"
                >
                  <h3 className="font-semibold text-sm text-muted-foreground">4D Output</h3>
                  <div className="flex space-x-3">
                    {pcaVector.map((value, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0 }}
                        animate={{ scale: showResult ? 1 : 0 }}
                        transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                        className="w-16 h-16 rounded-lg bg-gradient-to-br from-neural to-quantum text-white flex items-center justify-center text-sm font-mono font-bold shadow-lg"
                      >
                        {value.toFixed(2)}
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">Compressed for quantum processing</p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 4D Vector Display */}
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-neural/10 to-quantum/10 border-neural/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-neural mb-2">4D Vector Ready</h3>
                    <p className="text-sm text-muted-foreground">
                      Dimensionality reduced from 16 to 4 components while preserving key patterns
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">Compressed Vector:</p>
                    <code className="text-sm font-mono bg-background-secondary px-3 py-1 rounded border">
                      [{pcaVector.join(', ')}]
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Explanation */}
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid md:grid-cols-2 gap-6"
          >
            <Card className="bg-gradient-to-br from-card to-background-secondary">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3 text-neural">Why PCA?</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Principal Component Analysis reduces the 16-dimensional perturbation vector to 4 dimensions, 
                  keeping only the most important patterns. This makes quantum processing feasible while 
                  preserving the signal that distinguishes suspicious activity.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-background-secondary">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3 text-blue-700">Quantum Ready</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The 4D vector is now optimized for quantum circuit processing. Each component represents 
                  a key feature that our Quantum Convolutional Layer will enhance to find hidden correlations 
                  classical methods cannot detect.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Navigation */}
        {showResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-between items-center mt-6"
          >
            <Button
              onClick={() => onNext('perturbation')}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Perturbation
            </Button>

            {isAutoPlaying ? (
              <Badge className="animate-pulse bg-quantum/20 text-blue-700 border-quantum/50">
                <Zap className="h-3 w-3 mr-1" />
                Preparing quantum processing...
              </Badge>
            ) : (
              <Button
                onClick={() => onNext('risk-encoding')}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 shadow-xl rounded-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Process with Quantum Circuit
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PCAReduction;


