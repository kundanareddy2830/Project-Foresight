import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Network, 
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Circle,
  GitBranch,
  Activity
} from 'lucide-react';
import { DEMO_DATA } from '@/data/mockData';

interface GraphConstructionProps {
  onNext: (page: string) => void;
  isAutoPlaying?: boolean;
}

const GraphConstruction: React.FC<GraphConstructionProps> = ({ 
  onNext, 
  isAutoPlaying 
}) => {
  const [constructionProgress, setConstructionProgress] = useState(0);
  const [showGraph, setShowGraph] = useState(false);
  const [showEdges, setShowEdges] = useState(false);
  
  const { suspiciousTransaction, networkGraph } = DEMO_DATA;

  // Animate construction
  useEffect(() => {
    const duration = 2000;
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = (currentStep / steps) * 100;
      setConstructionProgress(Math.min(progress, 100));
      
      if (progress >= 50 && !showGraph) {
        setShowGraph(true);
      }
      
      if (progress >= 80 && !showEdges) {
        setShowEdges(true);
      }
      
      if (progress >= 100) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // No auto-advance - manual navigation only

  const graphStats = {
    nodes: networkGraph.nodes.length,
    edges: networkGraph.edges.length,
    transactions: DEMO_DATA.transactionHistory.length + 1
  };

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
          <h1 className="text-3xl font-bold text-foreground">Graph Construction Layer</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Converting transactions into a dynamic graph structure. Nodes = Accounts, Edges = Transactions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Left: Input Transactions */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="card-neural">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-neural" />
                  <span>Raw Transaction Data</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                
                {/* Current Transaction */}
                <div className="p-4 bg-warning/10 border border-warning/30 rounded-lg">
                  <h4 className="font-semibold text-warning mb-3">Current Transaction</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ID:</span>
                      <span className="font-mono font-semibold">{suspiciousTransaction.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">From:</span>
                      <span className="font-mono">{suspiciousTransaction.from}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">To:</span>
                      <span className="font-mono">{suspiciousTransaction.to}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount:</span>
                      <span className="font-bold text-warning">₹{suspiciousTransaction.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time:</span>
                      <span>{suspiciousTransaction.time}</span>
                    </div>
                  </div>
                </div>

                {/* Historical Transactions */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Historical Context</h4>
                  <div className="max-h-48 overflow-y-auto space-y-1">
                    {DEMO_DATA.transactionHistory.slice(-5).map((tx) => (
                      <div key={tx.id} className="p-2 bg-background-secondary rounded text-xs flex items-center justify-between">
                        <span className="font-mono">{tx.from} → {tx.to}</span>
                        <span className="text-muted-foreground">₹{tx.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Graph Construction</span>
                    <span className="text-sm font-mono">{constructionProgress.toFixed(0)}%</span>
                  </div>
                  <Progress value={constructionProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right: Graph Output */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="card-quantum">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Network className="h-5 w-5 text-blue-700" />
                  <span>Dynamic Graph G(V, E)</span>
                  {showGraph && (
                    <Badge className="bg-safe/20 text-safe border-safe/50">
                      Constructed
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Graph Visualization */}
                <div className="relative h-64 bg-background-secondary rounded-lg border border-border/50 overflow-hidden">
                  {/* Simple graph representation */}
                  {showGraph && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 p-4"
                    >
                      {/* Center node */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-quantum rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg"
                      >
                        {suspiciousTransaction.from.slice(-4)}
                      </motion.div>

                      {/* Surrounding nodes */}
                      {showEdges && networkGraph.nodes.slice(0, 8).map((node, index) => {
                        const angle = (index / 8) * 2 * Math.PI;
                        const radius = 80;
                        const x = 50 + Math.cos(angle) * (radius / 2.5);
                        const y = 50 + Math.sin(angle) * (radius / 2.5);
                        
                        return (
                          <motion.div
                            key={node.id}
                            initial={{ scale: 0, x: '50%', y: '50%' }}
                            animate={{ scale: 1, x: `${x}%`, y: `${y}%` }}
                            transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-neural rounded-full flex items-center justify-center text-white font-bold text-xs"
                          >
                            {node.id.slice(-2)}
                          </motion.div>
                        );
                      })}

                      {/* Edges */}
                      {showEdges && networkGraph.edges.slice(0, 8).map((edge, index) => {
                        const sourceNode = networkGraph.nodes.find(n => n.id === edge.source);
                        const targetNode = networkGraph.nodes.find(n => n.id === edge.target);
                        if (!sourceNode || !targetNode) return null;
                        
                        return (
                          <motion.svg
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            transition={{ delay: 0.5 + index * 0.05 }}
                            className="absolute inset-0 w-full h-full"
                          >
                            <line
                              x1="50%"
                              y1="50%"
                              x2={`${50 + Math.cos((index / 8) * 2 * Math.PI) * 25}%`}
                              y2={`${50 + Math.sin((index / 8) * 2 * Math.PI) * 25}%`}
                              stroke="#3B82F6"
                              strokeWidth="1"
                            />
                          </motion.svg>
                        );
                      })}
                    </motion.div>
                  )}
                </div>

                {/* Graph Statistics */}
                {showGraph && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-3 gap-4"
                  >
                    <div className="text-center p-3 bg-background-secondary rounded-lg">
                      <Circle className="h-6 w-6 mx-auto mb-2 text-blue-700" />
                      <div className="text-2xl font-bold">{graphStats.nodes}</div>
                      <div className="text-xs text-muted-foreground">Nodes</div>
                    </div>
                    <div className="text-center p-3 bg-background-secondary rounded-lg">
                      <GitBranch className="h-6 w-6 mx-auto mb-2 text-neural" />
                      <div className="text-2xl font-bold">{graphStats.edges}</div>
                      <div className="text-xs text-muted-foreground">Edges</div>
                    </div>
                    <div className="text-center p-3 bg-background-secondary rounded-lg">
                      <Activity className="h-6 w-6 mx-auto mb-2 text-warning" />
                      <div className="text-2xl font-bold">{graphStats.transactions}</div>
                      <div className="text-xs text-muted-foreground">Transactions</div>
                    </div>
                  </motion.div>
                )}

                {/* Edge Attributes */}
                {showEdges && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-quantum/10 border border-quantum/30 rounded-lg"
                  >
                    <h4 className="font-semibold text-blue-700 mb-2">Edge Attributes</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div>• Amount (normalized)</div>
                      <div>• Frequency</div>
                      <div>• Time gap</div>
                      <div>• Direction</div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Navigation */}
        {constructionProgress >= 100 && (
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

            <Button
              onClick={() => onNext('subgraph-extraction')}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 shadow-xl rounded-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                View GNN Network
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GraphConstruction;




