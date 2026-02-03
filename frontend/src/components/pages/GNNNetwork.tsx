import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Network, 
  ChevronLeft, 
  Info,
  Users,
  ArrowRight
} from 'lucide-react';
import { DEMO_DATA } from '@/data/mockData';

interface GNNNetworkProps {
  onNext: (page: string) => void;
}

const GNNNetwork: React.FC<GNNNetworkProps> = ({ onNext }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { networkGraph } = DEMO_DATA;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear canvas with gradient background
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#0f172a');
    gradient.addColorStop(1, '#1e293b');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const nodePositions: { [key: string]: { x: number, y: number } } = {};

    // Separate nodes by type (no suspicion labeling at this stage)
    const primaryNodes = networkGraph.nodes.filter(n => n.type === 'primary');
    const allNonPrimaryNodes = networkGraph.nodes.filter(n => n.type !== 'primary');

    // Position primary node in center
    primaryNodes.forEach(node => {
      nodePositions[node.id] = { x: centerX, y: centerY };
    });

    // Position non-primary nodes in multiple concentric circles
    const innerRadius = Math.min(rect.width, rect.height) * 0.15;
    const outerRadius = Math.min(rect.width, rect.height) * 0.35;
    const farRadius = Math.min(rect.width, rect.height) * 0.45;

    allNonPrimaryNodes.forEach((node, index) => {
      let radius, angle;
      
      if (index < 8) {
        // Inner circle
        radius = innerRadius;
        angle = (index / 8) * 2 * Math.PI;
      } else if (index < 20) {
        // Middle circle
        radius = outerRadius;
        angle = ((index - 8) / 12) * 2 * Math.PI;
      } else {
        // Outer circle
        radius = farRadius;
        angle = ((index - 20) / (allNonPrimaryNodes.length - 20)) * 2 * Math.PI;
      }

      nodePositions[node.id] = {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius
      };
    });

    // Draw edges (no suspicion coloring at this stage)
    networkGraph.edges.forEach(edge => {
      const sourcePos = nodePositions[edge.source];
      const targetPos = nodePositions[edge.target];
      
      if (sourcePos && targetPos) {
        ctx.beginPath();
        ctx.moveTo(sourcePos.x, sourcePos.y);
        ctx.lineTo(targetPos.x, targetPos.y);
        
        // Use a single style for all edges at the GNN stage
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = Math.max(1, Math.sqrt(edge.value / 2000));
        ctx.shadowColor = '#3b82f6';
        ctx.shadowBlur = 3;
        
        ctx.stroke();
        ctx.shadowBlur = 0; // Reset shadow
      }
    });

    // Draw nodes with enhanced styling
    networkGraph.nodes.forEach(node => {
      const pos = nodePositions[node.id];
      if (!pos) return;

      // Node size based on transfer count
      const nodeSize = Math.max(8, Math.min(20, 8 + (node.transfers * 0.5)));
      
      // Node circle with gradient
      const nodeGradient = ctx.createRadialGradient(
        pos.x - nodeSize/4, pos.y - nodeSize/4, 0,
        pos.x, pos.y, nodeSize
      );

      if (node.type === 'primary') {
        nodeGradient.addColorStop(0, '#0ea5e9');
        nodeGradient.addColorStop(1, '#0284c7');
      } else {
        nodeGradient.addColorStop(0, '#6b7280');
        nodeGradient.addColorStop(1, '#4b5563');
      }

      ctx.beginPath();
      ctx.arc(pos.x, pos.y, nodeSize, 0, 2 * Math.PI);
      ctx.fillStyle = nodeGradient;
      ctx.fill();

      // Node border
      ctx.strokeStyle = node.type === 'suspicious' ? '#fca5a5' : '#e5e7eb';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Glow effect for important nodes (primary only at this stage)
      if (node.type === 'primary') {
        ctx.shadowColor = '#0ea5e9';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, nodeSize + 2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Node label with better visibility
      ctx.fillStyle = '#f9fafb';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Add background for text
      const textWidth = ctx.measureText(node.id).width;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(
        pos.x - textWidth/2 - 2, 
        pos.y + nodeSize + 15, 
        textWidth + 4, 
        12
      );
      
      // Draw text
      ctx.fillStyle = '#f9fafb';
      ctx.fillText(node.id, pos.x, pos.y + nodeSize + 21);
    });

    // Add animated particles for visual appeal
    const time = Date.now() * 0.001;
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * 2 * Math.PI + time;
      const radius = Math.min(rect.width, rect.height) * 0.4;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(59, 130, 246, ${0.3 + 0.2 * Math.sin(time + i)})`;
      ctx.fill();
    }

  }, [networkGraph]);

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
          <h1 className="text-4xl font-bold text-foreground">GAT: Graph Attention Network</h1>
          <p className="text-lg text-foreground max-w-3xl mx-auto leading-relaxed">
            GAT (Graph Attention Network) learns neighbor importance and transaction influence to detect fraud ring patterns. 
            Output: Risk embedding vector p_vector ∈ ℝⁿ encoding topological + behavioral risk.
            This network shows {networkGraph.nodes.length} accounts with {networkGraph.edges.length} transfer relationships.
          </p>
        </motion.div>

        {/* Network Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="card-quantum">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Network className="h-5 w-5 text-blue-700" />
                <span>Account Relationship Graph</span>
                <Badge variant="outline" className="text-foreground border-border/60">
                  Graph Overview
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  className="w-full h-[600px] rounded-lg bg-background-secondary border border-border/50"
                />
                
                {/* Interactive tooltip overlay */}
                <div className="absolute top-4 right-4 space-y-2 bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-border/50">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-foreground font-medium">Primary Account</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                    <span className="text-foreground font-medium">Other Accounts</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-4 h-0.5 bg-blue-500"></div>
                    <span className="text-foreground font-medium">Normal Transfers</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Network Statistics (no suspicion counts at this stage) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <Card className="bg-gradient-to-br from-card to-background-secondary">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-semibold text-lg text-foreground">{networkGraph.nodes.length - 1}</h3>
              <p className="text-sm text-foreground font-medium">Connected Accounts</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-background-secondary">
            <CardContent className="p-6 text-center">
              <ArrowRight className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold text-lg text-foreground">{networkGraph.edges.filter(e => !e.suspicious).length}</h3>
              <p className="text-sm text-foreground font-medium">Transfers</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Info className="h-6 w-6 text-blue-500 mt-0.5" />
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-3">How GNN Works</h3>
                  <p className="text-base text-foreground leading-relaxed">
                    The Graph Neural Network learns from transaction patterns to understand normal 
                    account relationships. Each node represents an account, and edges show transfer 
                    relationships. This learned structure becomes the baseline for detecting unusual activity.
                    The network now includes {networkGraph.nodes.length} interconnected accounts with 
                    {networkGraph.edges.length} transfer pathways, creating a complex web of financial relationships.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-between"
        >
          <Button
            onClick={() => onNext('history')}
            className="bg-white hover:bg-gray-50 text-black border-2 border-black font-bold px-6 py-3 shadow-lg"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to History
          </Button>

          <Button
            onClick={() => onNext('risk-encoding')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 shadow-lg border-2 border-blue-800"
          >
            Continue to Risk Encoding
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default GNNNetwork;


