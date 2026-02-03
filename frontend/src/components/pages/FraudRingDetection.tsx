import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Zap, 
  ArrowRight,
  Target,
  Clock,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { DEMO_DATA } from '@/data/mockData';

interface FraudRingDetectionProps {
  onNext: (page: string) => void;
  onStartAnalysis: () => void;
  isAutoPlaying?: boolean;
}

const FraudRingDetection: React.FC<FraudRingDetectionProps> = ({ 
  onNext, 
  onStartAnalysis, 
  isAutoPlaying 
}) => {
  const [showCluster, setShowCluster] = useState(false);
  const { fraudRing, suspiciousTransaction } = DEMO_DATA;

  useEffect(() => {
    const timer = setTimeout(() => setShowCluster(true), 500);
    return () => clearTimeout(timer);
  }, []);
  
  // Reorder and retime to match desired display
  const desiredTimes: Record<string, string> = {
    'C11475->C99882': '12:06 PM',
    'C99882->C44391': '12:00 PM',
    'C44391->C77234': '11:30 PM',
    'C77234->C88445': '11:06 PM',
  };
  const desiredOrder = ['C11475->C99882','C99882->C44391','C44391->C77234','C77234->C88445'];
  const edgeKey = (tx: { from: string; to: string; }) => `${tx.from}->${tx.to}`;
  const adjustedFraudRing = [...fraudRing]
    .map(tx => ({ ...tx, time: desiredTimes[edgeKey(tx)] ?? tx.time }))
    .sort((a, b) => desiredOrder.indexOf(edgeKey(a)) - desiredOrder.indexOf(edgeKey(b)));

  // Auto-advance after showing the cluster
  useEffect(() => {
    if (isAutoPlaying && showCluster) {
      const timer = setTimeout(() => onNext('perturbation'), 2000);
      return () => clearTimeout(timer);
    }
  }, [isAutoPlaying, showCluster, onNext]);

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
          <h1 className="text-3xl font-bold text-foreground">New Transaction Arrival</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A new financial transaction entered the system. We update the graph and analyze its context — no fraud labels yet.
          </p>
        </motion.div>

        {/* Main Detection Card */}
        <AnimatePresence>
          {showCluster && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                type: "spring", 
                stiffness: 100,
                damping: 15
              }}
            >
              <Card className="card-quantum">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-6 w-6 text-blue-700" />
                    <span>Transaction Received</span>
                    <Badge className="bg-quantum/20 text-blue-700 border-quantum/50">New</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Primary Transaction */}
                  <div className="p-4 bg-background-secondary border border-border/50 rounded-lg">
                    <h3 className="font-semibold text-neural mb-3 flex items-center">
                      <Target className="h-4 w-4 mr-2" />
                      Primary Transaction
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">ID:</span>
                        <p className="font-mono font-semibold">{suspiciousTransaction.id}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">From:</span>
                        <p className="font-mono font-semibold">{suspiciousTransaction.from}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">To:</span>
                        <p className="font-mono font-semibold">{suspiciousTransaction.to}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Amount:</span>
                        <p className="font-semibold">${suspiciousTransaction.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Graph Update */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground flex items-center">
                      <Zap className="h-4 w-4 mr-2 text-blue-700" />
                      Graph Update — Added Edges
                    </h3>
                    <div className="grid gap-3">
                      {adjustedFraudRing.map((tx, index) => (
                        <motion.div
                          key={tx.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 + 0.5 }}
                          className="flex items-center justify-between p-3 bg-background-secondary border border-border/50 rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{tx.time}</span>
                            <span className="font-mono text-sm">{tx.from} → {tx.to}</span>
                          </div>
                          <span className="font-semibold">${tx.amount.toLocaleString()}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Analysis Trigger */}
                  <div className="pt-4 border-t border-border/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">Ready for Analysis</h4>
                        <p className="text-sm text-muted-foreground">
                          The graph is updated with the new edge. Next we compute the perturbation vector and analyze context.
                        </p>
                      </div>
                      
                      {!isAutoPlaying && (
                        <Button
                          onClick={() => onNext('perturbation')}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 shadow-xl rounded-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                        >
                          <Zap className="h-4 w-4 mr-2" />
                          Analyze
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action buttons */}
        {showCluster && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-between items-center mt-6"
          >
            <Button
              onClick={() => onNext('history')}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to History
            </Button>

            {!isAutoPlaying && (
              <Button
                onClick={() => onNext('perturbation')}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 shadow-xl rounded-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Analyze Perturbation Vector
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FraudRingDetection;


