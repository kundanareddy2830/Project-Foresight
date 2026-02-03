import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  BrainCircuit,
  Zap,
  Network,
  Cpu
} from 'lucide-react';

interface AnalyzingProps {
  onNext: (page: string) => void;
  onStartAnalysis: () => void;
  isAutoPlaying?: boolean;
}

const Analyzing: React.FC<AnalyzingProps> = ({ 
  onNext, 
  onStartAnalysis,
  isAutoPlaying 
}) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const analysisSteps = [
    { name: "Graph Construction", icon: Network, color: "text-blue-500" },
    { name: "GNN Processing", icon: BrainCircuit, color: "text-purple-500" },
    { name: "Quantum Analysis", icon: Zap, color: "text-yellow-500" },
    { name: "Risk Assessment", icon: Cpu, color: "text-green-500" }
  ];

  useEffect(() => {
    const duration = 3000; // 3 seconds total
    const interval = 50;
    const steps = duration / interval;
    let currentStepCount = 0;

    const timer = setInterval(() => {
      currentStepCount++;
      const newProgress = (currentStepCount / steps) * 100;
      setProgress(Math.min(newProgress, 100));
      
      // Update current step based on progress
      const stepIndex = Math.floor((newProgress / 100) * analysisSteps.length);
      setCurrentStep(Math.min(stepIndex, analysisSteps.length - 1));
      
      if (newProgress >= 100) {
        clearInterval(timer);
        // Auto-advance to first step of analysis
        setTimeout(() => {
          onNext('graph-construction');
        }, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onNext]);

  const CurrentIcon = analysisSteps[currentStep]?.icon || Activity;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl px-4"
      >
        <Card className="card-quantum">
          <CardContent className="p-12">
            <div className="text-center space-y-8">
              
              {/* Animated Icon */}
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
                }}
                className="flex justify-center"
              >
                <div className="relative">
                  <CurrentIcon className={`h-20 w-20 ${analysisSteps[currentStep]?.color || 'text-blue-700'} animate-pulse`} />
                  <motion.div
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                    className="absolute inset-0 bg-quantum/30 rounded-full"
                  />
                </div>
              </motion.div>

              {/* Title */}
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-foreground">
                  Analyzing Transaction
                </h1>
                <p className="text-muted-foreground">
                  {analysisSteps[currentStep]?.name || "Initializing analysis..."}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-mono font-semibold">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-3" />
              </div>

              {/* Steps Indicator */}
              <div className="flex justify-center space-x-2 pt-4">
                {analysisSteps.map((step, index) => {
                  const StepIcon = step.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0.3, scale: 0.8 }}
                      animate={{ 
                        opacity: index <= currentStep ? 1 : 0.3,
                        scale: index === currentStep ? 1.2 : 1
                      }}
                      transition={{ duration: 0.3 }}
                      className={`p-2 rounded-lg ${index <= currentStep ? step.color : 'text-muted-foreground'}`}
                    >
                      <StepIcon className="h-6 w-6" />
                    </motion.div>
                  );
                })}
              </div>

              {/* Status Message */}
              <motion.p
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-muted-foreground italic"
              >
                Processing quantum-enhanced fraud detection pipeline...
              </motion.p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Analyzing;




