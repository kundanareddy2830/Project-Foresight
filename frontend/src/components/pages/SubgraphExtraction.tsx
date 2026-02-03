import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Network, 
  Target,
  ChevronRight,
  ChevronLeft,
  ZoomIn,
  Activity,
  Zap
} from 'lucide-react';
import { DEMO_DATA } from '@/data/mockData';

interface SubgraphExtractionProps {
  onNext: (page: string) => void;
  isAutoPlaying?: boolean;
}

const SubgraphExtraction: React.FC<SubgraphExtractionProps> = ({ 
  onNext, 
  isAutoPlaying 
}) => {
  const [extractionProgress, setExtractionProgress] = useState(0);
  const [showSubgraph, setShowSubgraph] = useState(false);
  const [kHop, setKHop] = useState(2);
  
  const { suspiciousTransaction, networkGraph } = DEMO_DATA;

  // Animate extraction
  useEffect(() => {
    const duration = 2000;
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = (currentStep / steps) * 100;
      setExtractionProgress(Math.min(progress, 100));
      
      if (progress >= 30) setKHop(1);
      if (progress >= 60) setKHop(2);
      if (progress >= 80 && !showSubgraph) {
        setShowSubgraph(true);
      }
      
      if (progress >= 100) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // No auto-advance - manual navigation only

  // Extract local subgraph (simplified - in real system would do k-hop extraction)
  const localNodes = networkGraph.nodes.filter(node => 
    node.id === suspiciousTransaction.from || 
    node.id === suspiciousTransaction.to ||
    networkGraph.edges.some(edge => 
      (edge.source === suspiciousTransaction.from || edge.target === suspiciousTransaction.from) &&
      (edge.source === node.id || edge.target === node.id)
    )
  ).slice(0, 12);

  const localEdges = networkGraph.edges.filter(edge =>
    localNodes.some(n => n.id === edge.source) && localNodes.some(n => n.id === edge.target)
  );

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
          <h1 className="text-3xl font-bold text-foreground">Subgraph Extraction (Scalability Layer)</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Extracting k-hop local subgraph around transaction. Quantum computation requires manageable graph size.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Left: Full Graph */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="card-neural">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Network className="h-5 w-5 text-neural" />
                  <span>Full Network Graph</span>
                  <Badge variant="outline" className="text-muted-foreground">
                    {networkGraph.nodes.length} nodes
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                
                {/* Full graph representation */}
                <div className="relative h-64 bg-background-secondary rounded-lg border border-border/50 overflow-hidden">
                  <div className="absolute inset-0 p-4">
                    {/* Dense network visualization */}
                    {Array.from({ length: 30 }).map((_, i) => {
                      const angle = (i / 30) * 2 * Math.PI;
                      const radius = 35 + Math.random() * 10;
                      const x = 50 + Math.cos(angle) * radius;
                      const y = 50 + Math.sin(angle) * radius;
                      
                      return (
                        <div
                          key={i}
                          className="absolute w-2 h-2 bg-neural/40 rounded-full"
                          style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            transform: 'translate(-50%, -50%)'
                          }}
                        />
                      );
                    })}
                    
                    {/* Center node (transaction focus) */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-warning rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg border-2 border-white">
                      {suspiciousTransaction.from.slice(-2)}
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-background-secondary rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Full graph has <strong>{networkGraph.nodes.length} accounts</strong> and{' '}
                    <strong>{networkGraph.edges.length} relationships</strong>. Too large for quantum processing.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right: Local Subgraph */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="card-quantum">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-blue-700" />
                  <span>k-Hop Local Subgraph</span>
                  {showSubgraph && (
                    <Badge className="bg-safe/20 text-safe border-safe/50">
                      Extracted
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* K-hop indicator */}
                <div className="flex items-center justify-between p-3 bg-quantum/10 border border-quantum/30 rounded-lg">
                  <span className="text-sm font-semibold">Current k-hop:</span>
                  <Badge className="bg-quantum text-white text-lg px-4 py-1">
                    k = {kHop}
                  </Badge>
                </div>

                {/* Subgraph visualization */}
                <div className="relative h-64 bg-background-secondary rounded-lg border border-quantum/30 overflow-hidden">
                  {showSubgraph && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 p-4"
                    >
                      {/* Center node */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-quantum rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg z-10"
                      >
                        {suspiciousTransaction.from.slice(-4)}
                      </motion.div>

                      {/* Local nodes */}
                      {localNodes.slice(0, 8).map((node, index) => {
                        const angle = (index / 8) * 2 * Math.PI;
                        const radius = 70;
                        const x = 50 + Math.cos(angle) * (radius / 2.5);
                        const y = 50 + Math.sin(angle) * (radius / 2.5);
                        
                        return (
                          <motion.div
                            key={node.id}
                            initial={{ scale: 0, x: '50%', y: '50%' }}
                            animate={{ scale: 1, x: `${x}%`, y: `${y}%` }}
                            transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                            className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md ${
                              node.type === 'suspicious' ? 'bg-danger' : 'bg-neural'
                            }`}
                          >
                            {node.id.slice(-2)}
                          </motion.div>
                        );
                      })}

                      {/* Edges */}
                      {localEdges.slice(0, 10).map((edge, index) => {
                        const sourceIdx = localNodes.findIndex(n => n.id === edge.source);
                        const targetIdx = localNodes.findIndex(n => n.id === edge.target);
                        if (sourceIdx === -1 || targetIdx === -1) return null;
                        
                        const sourceAngle = (sourceIdx / localNodes.length) * 2 * Math.PI;
                        const targetAngle = (targetIdx / localNodes.length) * 2 * Math.PI;
                        const radius = 70 / 2.5;
                        
                        return (
                          <motion.svg
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            transition={{ delay: 0.5 + index * 0.05 }}
                            className="absolute inset-0 w-full h-full"
                          >
                            <line
                              x1={`${50 + Math.cos(sourceAngle) * radius}%`}
                              y1={`${50 + Math.sin(sourceAngle) * radius}%`}
                              x2={`${50 + Math.cos(targetAngle) * radius}%`}
                              y2={`${50 + Math.sin(targetAngle) * radius}%`}
                              stroke={edge.suspicious ? "#EF4444" : "#3B82F6"}
                              strokeWidth="1.5"
                            />
                          </motion.svg>
                        );
                      })}
                    </motion.div>
                  )}
                </div>

                {/* Statistics */}
                {showSubgraph && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="text-center p-3 bg-background-secondary rounded-lg">
                      <ZoomIn className="h-6 w-6 mx-auto mb-2 text-blue-700" />
                      <div className="text-2xl font-bold">{localNodes.length}</div>
                      <div className="text-xs text-muted-foreground">Local Nodes</div>
                    </div>
                    <div className="text-center p-3 bg-background-secondary rounded-lg">
                      <Activity className="h-6 w-6 mx-auto mb-2 text-neural" />
                      <div className="text-2xl font-bold">{localEdges.length}</div>
                      <div className="text-xs text-muted-foreground">Local Edges</div>
                    </div>
                  </motion.div>
                )}

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Extraction Progress</span>
                    <span className="text-sm font-mono">{extractionProgress.toFixed(0)}%</span>
                  </div>
                  <Progress value={extractionProgress} className="h-2" />
                </div>

                {/* Why this matters */}
                {showSubgraph && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-quantum/10 border border-quantum/30 rounded-lg"
                  >
                    <h4 className="font-semibold text-blue-700 mb-2 flex items-center space-x-2">
                      <Zap className="h-4 w-4" />
                      <span>Scalability Benefit</span>
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Reduced from <strong>{networkGraph.nodes.length} nodes</strong> to{' '}
                      <strong>{localNodes.length} nodes</strong>. Fraud impact is local, making 
                      quantum computation feasible with constant time complexity.
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Navigation */}
        {extractionProgress >= 100 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-between items-center mt-6"
          >
            <Button
              onClick={() => onNext('graph-construction')}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Network
            </Button>

            <Button
              onClick={() => onNext('gat-network')}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 shadow-xl rounded-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Continue to GAT Network
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SubgraphExtraction;




