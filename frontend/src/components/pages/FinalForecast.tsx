import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Download,
  RotateCcw,
  ArrowRight,
  Activity,
  ChevronLeft
} from 'lucide-react';
import { DEMO_DATA } from '@/data/mockData';

interface FinalForecastProps {
  onNext: (page: string) => void;
}

const FinalForecast: React.FC<FinalForecastProps> = ({ onNext }) => {
  const [showChart, setShowChart] = useState(false);
  const [showDecision, setShowDecision] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  
  const { vqeResults } = DEMO_DATA;

  // Prepare pie chart data
  const chartData = [
    { 
      name: 'Account Takeover', 
      value: vqeResults.probabilities["01"] * 100, 
      color: '#F59E0B' 
    },
    { 
      name: 'Normal Transaction', 
      value: vqeResults.probabilities["00"] * 100, 
      color: '#10B981' 
    }
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setShowChart(true), 500);
    const timer2 = setTimeout(() => setShowDecision(true), 1200);
    const timer3 = setTimeout(() => setShowSummary(true), 2000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const getVerdictIcon = () => {
    const prob = vqeResults.probabilities["01"];
    if (prob > 0.7) return <AlertTriangle className="h-6 w-6 text-danger" />;
    if (prob > 0.4) return <Shield className="h-6 w-6 text-warning" />;
    return <CheckCircle className="h-6 w-6 text-safe" />;
  };

  const getVerdictColor = () => {
    const prob = vqeResults.probabilities["01"];
    if (prob > 0.7) return "text-danger border-danger/50 bg-danger/10";
    if (prob > 0.4) return "text-warning border-warning/50 bg-warning/10";
    return "text-safe border-safe/50 bg-safe/10";
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
          <h1 className="text-3xl font-bold text-foreground">Final Forecast & Action</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Human-friendly probabilistic forecast with clear recommendations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Left: Probability Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="card-quantum">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-blue-700" />
                  <span>Risk Probability</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: showChart ? 1 : 0, scale: showChart ? 1 : 0.8 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-6"
                >
                  {/* Donut Chart */}
                  <div className="h-64 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          dataKey="value"
                          startAngle={90}
                          endAngle={450}
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    
                    {/* Center text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-warning">{vqeResults.confidence}</p>
                        <p className="text-xs text-muted-foreground">Risk Level</p>
                      </div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="space-y-3">
                    {chartData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded bg-background-secondary">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded" 
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="text-sm">{item.name}</span>
                        </div>
                        <span className="font-semibold">{item.value.toFixed(2)}%</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right: Decision Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className={`${getVerdictColor()} border-2`}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {getVerdictIcon()}
                  <span>Risk Assessment</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: showDecision ? 1 : 0, y: showDecision ? 0 : 20 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-4"
                >
                  {/* Verdict */}
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold">{vqeResults.verdict}</h2>
                    <p className="text-muted-foreground">
                      {vqeResults.confidence} chance of account takeover
                    </p>
                  </div>

                  {/* Recommendation */}
                  <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                    <h3 className="font-semibold mb-2">Recommended Action:</h3>
                    <p className="text-sm">{vqeResults.recommendation}</p>
                  </div>

                  {/* Confidence Score */}
                  <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                    <h3 className="font-semibold mb-2">Confidence:</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">VQE energy {vqeResults.energy}</span>
                      <Badge variant="outline">
                        Close to theoretical
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Plain English Summary */}
        {showSummary && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="card-neural">
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold text-neural">What this means:</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                    This transaction cluster is a <strong className="text-warning">high-probability risk of account takeover</strong> — 
                    we recommend verification to avoid customer loss. The quantum-enhanced analysis found patterns 
                    that classical fraud detection would miss.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Navigation */}
        {showSummary && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-between items-center"
          >
            <Button
              onClick={() => onNext('vqe')}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to VQE
            </Button>

            <Button
              onClick={() => onNext('fraud-decision')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <Shield className="h-4 w-4 mr-2" />
              Review Fraud Decision
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FinalForecast;


