import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  ChevronRight,
  ChevronLeft,
  Zap,
  CircuitBoard,
  TrendingUp,
  Shield
} from 'lucide-react';
import { DEMO_DATA } from '@/data/mockData';

interface QuantumPathSelectionProps {
  onNext: (page: string) => void;
  isAutoPlaying?: boolean;
}

const QuantumPathSelection: React.FC<QuantumPathSelectionProps> = ({
  onNext,
  isAutoPlaying
}) => {
  const [selectedPath, setSelectedPath] = useState<'classical' | 'quantum' | null>(null);
  const [showDecision, setShowDecision] = useState(false);

  const { suspiciousTransaction, quantumPathSelection } = DEMO_DATA;
  const threshold = quantumPathSelection.threshold;
  const amount = suspiciousTransaction.amount;

  // Auto-select path
  useEffect(() => {
    const timer = setTimeout(() => {
      const path = amount >= threshold ? 'quantum' : 'classical';
      setSelectedPath(path);
      setTimeout(() => setShowDecision(true), 500);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // No auto-advance - manual navigation only

  const shouldUseQuantum = amount >= threshold;

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
          <h1 className="text-3xl font-bold text-foreground">Quantum Path Selection Logic</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Economic guardrail: Quantum processing is expensive. We use it only when transaction value justifies the cost.
          </p>
        </motion.div>

        {/* Transaction Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="card-neural">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-neural" />
                <span>Transaction Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-background-secondary rounded-lg">
                  <div className="text-2xl font-bold text-foreground mb-1">
                    ₹{amount.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Transaction Amount</div>
                </div>
                <div className="text-center p-4 bg-background-secondary rounded-lg">
                  <div className="text-2xl font-bold text-foreground mb-1">
                    ₹{threshold.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Quantum Threshold</div>
                </div>
                <div className="text-center p-4 bg-background-secondary rounded-lg">
                  <div className={`text-2xl font-bold mb-1 ${shouldUseQuantum ? 'text-blue-700' : 'text-muted-foreground'}`}>
                    {shouldUseQuantum ? '≥' : '<'}
                  </div>
                  <div className="text-sm text-muted-foreground">Comparison</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Path Selection */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Classical Path */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className={`card-neural ${selectedPath === 'classical' ? 'ring-2 ring-neural' : ''}`}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-neural" />
                  <span>Classical Path</span>
                  {selectedPath === 'classical' && (
                    <Badge className="bg-neural/20 text-neural border-neural/50">
                      Selected
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-neural/10 border border-neural/30 rounded-lg">
                  <h4 className="font-semibold text-neural mb-2">When to Use</h4>
                  <p className="text-sm text-muted-foreground">
                    Amount &lt; ₹{threshold.toLocaleString()}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Processing Method</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Classical ML inference only</li>
                    <li>Fast response time</li>
                    <li>Lower computational cost</li>
                  </ul>
                </div>

                {selectedPath === 'classical' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3 bg-safe/10 border border-safe/30 rounded-lg"
                  >
                    <p className="text-sm text-safe font-semibold">
                      ✓ Selected: Transaction value below threshold
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quantum Path */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className={`card-quantum ${selectedPath === 'quantum' ? 'ring-2 ring-quantum' : ''}`}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CircuitBoard className="h-5 w-5 text-blue-700" />
                  <span>Quantum Path</span>
                  {selectedPath === 'quantum' && (
                    <Badge className="bg-quantum/20 text-blue-700 border-quantum/50 animate-pulse">
                      Selected
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-quantum/10 border border-quantum/30 rounded-lg">
                  <h4 className="font-semibold text-blue-700 mb-2">When to Use</h4>
                  <p className="text-sm text-muted-foreground">
                    Amount ≥ ₹{threshold.toLocaleString()}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Processing Methods</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Path A: QSVC (Quantum Support Vector Classifier)</li>
                    <li>Path B: VQE (Variational Quantum Eigensolver)</li>
                    <li>Higher security for valuable transfers</li>
                  </ul>
                </div>

                {selectedPath === 'quantum' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3 bg-quantum/20 border border-quantum/30 rounded-lg"
                  >
                    <p className="text-sm text-blue-700 font-semibold flex items-center space-x-2">
                      <Zap className="h-4 w-4" />
                      <span>✓ Selected: High-value transaction triggers quantum analysis</span>
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Decision Logic */}
        {showDecision && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-gradient-to-r from-quantum/10 to-neural/10 border border-quantum/30 rounded-lg"
          >
            <h3 className="font-bold text-lg mb-4 flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-700" />
              <span>Decision Logic</span>
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-background-secondary rounded border border-border/50">
                <code className="text-sm font-mono text-foreground">
                  IF transaction_amount &lt; {threshold}:
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;Classical inference only
                  <br />
                  ELSE:
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;Trigger quantum path
                </code>
              </div>
              <div className="p-3 bg-quantum/10 border border-quantum/30 rounded">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-blue-700">Current decision:</strong> Transaction amount of ₹{amount.toLocaleString()}
                  {shouldUseQuantum ? ' exceeds' : ' is below'} the threshold,
                  {shouldUseQuantum ? ' triggering quantum analysis' : ' using classical inference only'}.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        {showDecision && (
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
              Back
            </Button>

            {selectedPath === 'quantum' && (
              <Button
                onClick={() => onNext('qsvc')}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 shadow-xl rounded-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Start QSVC Analysis
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuantumPathSelection;


