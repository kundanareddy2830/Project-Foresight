import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Code, 
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Zap,
  Activity,
  Binary
} from 'lucide-react';
import { DEMO_DATA } from '@/data/mockData';

interface RiskEncodingProps {
  onNext: (page: string) => void;
  isAutoPlaying?: boolean;
}

const RiskEncoding: React.FC<RiskEncodingProps> = ({ 
  onNext, 
  isAutoPlaying 
}) => {
  const [encodingProgress, setEncodingProgress] = useState(0);
  const [showEncoded, setShowEncoded] = useState(false);
  
  const { riskEncoding } = DEMO_DATA;

  // Animate encoding
  useEffect(() => {
    const duration = 2000;
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = (currentStep / steps) * 100;
      setEncodingProgress(Math.min(progress, 100));
      
      if (progress >= 100 && !showEncoded) {
        setShowEncoded(true);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // No auto-advance - manual navigation only

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
          <h1 className="text-3xl font-bold text-foreground">Risk Encoding (Bridge Layer)</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Converting continuous GNN output into quantum-usable form. Normalize → Select top-k → Encode.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Left: GNN Output */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="card-neural">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5 text-neural" />
                  <span>GNN Risk Embedding</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Continuous vector */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground">Continuous Vector (ℝⁿ)</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {riskEncoding.gnnVector.map((value, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 bg-neural/20 rounded-lg border border-neural/30 text-center"
                      >
                        <div className="text-xs font-mono font-bold text-neural">
                          {value.toFixed(3)}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          dim {index + 1}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Encoding steps */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Encoding Steps</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 p-2 bg-background-secondary rounded">
                      <div className="w-2 h-2 rounded-full bg-quantum"></div>
                      <span className="text-sm text-muted-foreground">Normalize features</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 bg-background-secondary rounded">
                      <div className="w-2 h-2 rounded-full bg-quantum"></div>
                      <span className="text-sm text-muted-foreground">Select top-k risk features</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 bg-background-secondary rounded">
                      <div className="w-2 h-2 rounded-full bg-quantum"></div>
                      <span className="text-sm text-muted-foreground">Binarize or angle-encode</span>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Encoding Progress</span>
                    <span className="text-sm font-mono">{encodingProgress.toFixed(0)}%</span>
                  </div>
                  <Progress value={encodingProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right: Encoded Output */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="card-quantum">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Binary className="h-5 w-5 text-blue-700" />
                  <span>Quantum-Ready Encoding</span>
                  {showEncoded && (
                    <Badge className="bg-safe/20 text-safe border-safe/50">
                      Ready
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Encoded vector */}
                {showEncoded && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <h4 className="font-semibold text-sm text-muted-foreground">Encoded Vector</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {riskEncoding.encodedVector.map((value, index) => (
                        <motion.div
                          key={index}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                          className="p-3 bg-gradient-to-br from-quantum to-neural rounded-lg border border-quantum/30 text-center shadow-lg"
                        >
                          <div className="text-xs font-mono font-bold text-white">
                            {value}
                          </div>
                          <div className="text-xs text-white/70 mt-1">
                            q{index}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Encoding method */}
                <div className="p-4 bg-quantum/10 border border-quantum/30 rounded-lg space-y-3">
                  <h4 className="font-semibold text-blue-700">Encoding Method</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-start space-x-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-blue-700" />
                      <span>
                        <strong>Angle encoding:</strong> Feature values mapped to rotation angles
                      </span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-blue-700" />
                      <span>
                        <strong>Top-k selection:</strong> {riskEncoding.topK} most significant features
                      </span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-blue-700" />
                      <span>
                        <strong>Normalization:</strong> Values scaled to [0, π] range
                      </span>
                    </div>
                  </div>
                </div>

                {/* Usage */}
                {showEncoded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-background-secondary rounded-lg border border-border/50"
                  >
                    <h4 className="font-semibold mb-2 flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-blue-700" />
                      <span>Ready for Quantum Processing</span>
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      This encoded vector can now be used for:
                    </p>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                      <li>QSVC quantum kernel computation</li>
                      <li>Hamiltonian mapping for VQE</li>
                      <li>Quantum feature space exploration</li>
                    </ul>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Arrow indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showEncoded ? 1 : 0.3 }}
          className="flex justify-center"
        >
          <ArrowRight className="h-8 w-8 text-blue-700" />
        </motion.div>

        {/* Navigation */}
        {encodingProgress >= 100 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-between items-center mt-6"
          >
            <Button
              onClick={() => onNext('gat-network')}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            <Button
              onClick={() => onNext('quantum-path')}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 shadow-xl rounded-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Select Quantum Path
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RiskEncoding;




