import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { 
  Network, 
  BarChart3, 
  Zap,
  Target,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { DEMO_DATA } from '@/data/mockData';

interface PerturbationVectorProps {
  onNext: (page: string) => void;
  isAutoPlaying?: boolean;
}

const PerturbationVector: React.FC<PerturbationVectorProps> = ({ 
  onNext, 
  isAutoPlaying 
}) => {
  const [showVector, setShowVector] = useState(false);
  const { perturbationVector, networkGraph } = DEMO_DATA;

  // Example compact embeddings for visual explanation
  const embeddingOrig = [0.12, 1.03, 0.75, 0.22, -0.14];
  const embeddingDest = [0.98, 0.45, 1.22, -0.05, 0.31];

  // Prepare bar chart data
  const vectorData = perturbationVector.map((value, index) => ({
    index: index + 1,
    value: value,
    abs: Math.abs(value)
  }));

  useEffect(() => {
    const timer = setTimeout(() => setShowVector(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (isAutoPlaying && showVector) {
      const timer = setTimeout(() => onNext('pca'), 2000);
      return () => clearTimeout(timer);
    }
  }, [isAutoPlaying, showVector, onNext]);

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
          <h1 className="text-3xl font-bold text-foreground">Perturbation Vector</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We compare embeddings of origin and destination accounts to highlight behavioral differences — this is not a fraud label.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Left: Network with Highlights */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="card-neural">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Network className="h-5 w-5 text-neural" />
                  <span>Graph Update View</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Network visualization placeholder */}
                  <div className="aspect-square bg-background-secondary rounded-lg p-6 flex items-center justify-center relative border border-border/50">
                    <div className="relative w-full h-full">
                      {/* Normal nodes (muted) */}
                      <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-muted-foreground rounded-full opacity-50"></div>
                      <div className="absolute top-1/4 left-1/2 w-3 h-3 bg-muted-foreground rounded-full opacity-50"></div>
                      <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-muted-foreground rounded-full opacity-50"></div>
                      <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-muted-foreground rounded-full opacity-50"></div>
                      
                      {/* Primary account */}
                      <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-quantum rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                      
                      {/* Neighbor nodes (neutral) */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1, type: "spring" }}
                        className="absolute top-1/2 right-1/4 w-4 h-4 bg-muted-foreground rounded-full"
                      ></motion.div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.2, type: "spring" }}
                        className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-muted-foreground rounded-full"
                      ></motion.div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.4, type: "spring" }}
                        className="absolute bottom-1/4 right-1/2 w-4 h-4 bg-muted-foreground rounded-full"
                      ></motion.div>

                      {/* Connection line to neighbor */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <motion.line
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 1.6, duration: 0.5 }}
                          x1="50%" y1="50%"
                          x2="75%" y2="50%"
                          stroke="#6B7280"
                          strokeWidth="2"
                          strokeDasharray="2,6"
                        />
                      </svg>
                    </div>
                    
                    {/* Callout arrow */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2 }}
                      className="absolute top-4 right-4 flex items-center space-x-2"
                    >
                      <Target className="h-5 w-5 text-neural" />
                      <span className="text-sm text-muted-foreground font-semibold">Graph update shown</span>
                    </motion.div>
                  </div>
                  {/* Removed flagged list in this neutral step */}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right: Perturbation Vector */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="card-quantum">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-blue-700" />
                  <span>16D Perturbation Vector</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showVector ? 1 : 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-6"
                >
                  {/* Embedding Update Step */}
                  <div className="p-4 bg-background-secondary rounded-lg border border-border/50">
                    <h4 className="font-semibold mb-3">Graph Neural Network Embedding Update</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          The GNN (trained on history) ingests the current graph with node and edge features, performs
                          message passing, and updates account embeddings.
                        </p>
                        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                          <li>Input: node features (accounts), edge features (transactions)</li>
                          <li>Message passing aggregates neighbor information</li>
                          <li>Embeddings capture structural relationships</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <span className="text-xs text-muted-foreground">embedding_orig</span>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {embeddingOrig.map((v, i) => (
                              <span key={i} className="px-2 py-1 text-xs font-mono rounded bg-quantum/10 border border-quantum/30">{v}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground">embedding_dest</span>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {embeddingDest.map((v, i) => (
                              <span key={i} className="px-2 py-1 text-xs font-mono rounded bg-neural/10 border border-neural/30">{v}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bar Chart */}
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={vectorData}>
                        <XAxis 
                          dataKey="index" 
                          tick={{ fontSize: 10, fill: '#9CA3AF' }}
                          axisLine={{ stroke: '#374151' }}
                        />
                        <YAxis 
                          tick={{ fontSize: 10, fill: '#9CA3AF' }}
                          axisLine={{ stroke: '#374151' }}
                        />
                        <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                          {vectorData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.value > 0 ? '#0EA5E9' : '#EF4444'} 
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Numeric Array Display */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Vector Values:</h4>
                    <div className="p-3 bg-background-secondary rounded-lg border border-border/50">
                      <code className="text-xs text-muted-foreground break-all">
                        [{perturbationVector.map(v => v.toFixed(2)).join(', ')}]
                      </code>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="p-3 bg-quantum/10 border border-quantum/30 rounded-lg">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-blue-700">How it's built:</strong> GNN updates embeddings with the new edge, then we compute 
                      perturbation_vector = embedding_orig − embedding_dest. It captures structural differences only.
                    </p>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Action buttons */}
        {showVector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-between items-center mt-6"
          >
            <Button
              onClick={() => onNext('fraud-ring')}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Fraud Ring
            </Button>

            {!isAutoPlaying && (
              <Button
                onClick={() => onNext('pca')}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 shadow-xl rounded-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Apply PCA Compression
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PerturbationVector;


