import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  ChevronRight,
  ChevronLeft,
  Zap,
  Activity,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { DEMO_DATA } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface EnergyGapProps {
  onNext: (page: string) => void;
  isAutoPlaying?: boolean;
}

const EnergyGap: React.FC<EnergyGapProps> = ({ 
  onNext, 
  isAutoPlaying 
}) => {
  const [computationProgress, setComputationProgress] = useState(0);
  const [showGap, setShowGap] = useState(false);
  
  const { energyGap } = DEMO_DATA;

  // Animate computation
  useEffect(() => {
    const duration = 2500;
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = (currentStep / steps) * 100;
      setComputationProgress(Math.min(progress, 100));
      
      if (progress >= 100 && !showGap) {
        setShowGap(true);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // No auto-advance - manual navigation only

  const energyData = [
    { name: 'Ground State', value: energyGap.groundEnergy, type: 'ground' },
    { name: 'Observed State', value: energyGap.observedEnergy, type: 'observed' }
  ];

  const riskLevel = energyGap.deltaE > 0.1 ? 'high' : energyGap.deltaE > 0.05 ? 'moderate' : 'low';

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
          <h1 className="text-3xl font-bold text-foreground">Energy Gap Computation</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            ΔE = E_observed - E_ground. High energy gap indicates system instability (fraud).
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Left: Energy States */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="card-quantum">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-blue-700" />
                  <span>Energy States</span>
                  {showGap && (
                    <Badge className="bg-safe/20 text-safe border-safe/50">
                      Computed
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Ground State */}
                <div className="p-4 bg-safe/10 border border-safe/30 rounded-lg">
                  <h4 className="font-semibold text-safe mb-2 flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Ground State Energy (E_ground)</span>
                  </h4>
                  <p className="text-3xl font-bold font-mono text-safe mb-2">
                    {energyGap.groundEnergy}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Represents stable (normal) behavior. Found by VQE optimization.
                  </p>
                </div>

                {/* Observed State */}
                <div className="p-4 bg-warning/10 border border-warning/30 rounded-lg">
                  <h4 className="font-semibold text-warning mb-2 flex items-center space-x-2">
                    <Activity className="h-4 w-4" />
                    <span>Observed State Energy (E_observed)</span>
                  </h4>
                  <p className="text-3xl font-bold font-mono text-warning mb-2">
                    {energyGap.observedEnergy}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Energy of current transaction state. Computed from Hamiltonian.
                  </p>
                </div>

                {/* Progress */}
                {!showGap && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Computation Progress</span>
                      <span className="text-sm font-mono">{computationProgress.toFixed(0)}%</span>
                    </div>
                    <Progress value={computationProgress} className="h-2" />
                  </div>
                )}

                {/* Energy Gap Formula */}
                {showGap && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-quantum/10 border border-quantum/30 rounded-lg"
                  >
                    <h4 className="font-semibold text-blue-700 mb-2">Energy Gap Formula</h4>
                    <div className="space-y-2">
                      <code className="text-sm font-mono text-foreground block">
                        ΔE = E_observed - E_ground
                      </code>
                      <code className="text-sm font-mono text-foreground block">
                        ΔE = {energyGap.observedEnergy} - ({energyGap.groundEnergy})
                      </code>
                      <code className="text-lg font-mono font-bold text-blue-700 block">
                        ΔE = {energyGap.deltaE.toFixed(4)}
                      </code>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Right: Interpretation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="card-neural">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-neural" />
                  <span>Anomaly Detection</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Energy Comparison Chart */}
                {showGap && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-48"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={energyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis 
                          dataKey="name" 
                          tick={{ fontSize: 10, fill: '#9CA3AF' }}
                          axisLine={{ stroke: '#374151' }}
                        />
                        <YAxis 
                          tick={{ fontSize: 10, fill: '#9CA3AF' }}
                          axisLine={{ stroke: '#374151' }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar dataKey="value">
                          {energyData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.type === 'ground' ? '#10B981' : '#F59E0B'} 
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}

                {/* Risk Interpretation */}
                {showGap && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg border ${
                      riskLevel === 'high' 
                        ? 'bg-danger/10 border-danger/30' 
                        : riskLevel === 'moderate'
                        ? 'bg-warning/10 border-warning/30'
                        : 'bg-safe/10 border-safe/30'
                    }`}
                  >
                    <h4 className={`font-semibold mb-2 flex items-center space-x-2 ${
                      riskLevel === 'high' ? 'text-danger' : riskLevel === 'moderate' ? 'text-warning' : 'text-safe'
                    }`}>
                      {riskLevel === 'high' ? (
                        <AlertTriangle className="h-4 w-4" />
                      ) : (
                        <CheckCircle className="h-4 w-4" />
                      )}
                      <span>Risk Level: {riskLevel.toUpperCase()}</span>
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {riskLevel === 'high' 
                        ? `High energy gap (ΔE = ${energyGap.deltaE.toFixed(4)}) indicates significant system instability. This transaction disturbs the natural stability of the financial network.`
                        : riskLevel === 'moderate'
                        ? `Moderate energy gap (ΔE = ${energyGap.deltaE.toFixed(4)}) suggests some deviation from normal behavior. Requires verification.`
                        : `Low energy gap (ΔE = ${energyGap.deltaE.toFixed(4)}) indicates normal behavior. Transaction appears safe.`
                      }
                    </p>
                  </motion.div>
                )}

                {/* Interpretation Table */}
                {showGap && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2"
                  >
                    <h4 className="font-semibold text-sm">Energy Gap Interpretation</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between p-2 bg-background-secondary rounded">
                        <span className="text-muted-foreground">Low ΔE:</span>
                        <span className="text-safe font-semibold">Normal</span>
                      </div>
                      <div className="flex justify-between p-2 bg-background-secondary rounded">
                        <span className="text-muted-foreground">High ΔE:</span>
                        <span className="text-danger font-semibold">Fraud / Anomaly</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Navigation */}
        {showGap && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-between items-center mt-6"
          >
            <Button
              onClick={() => onNext('vqe')}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to VQE
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
      </div>
    </div>
  );
};

export default EnergyGap;




