import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  Play,
  RotateCcw,
  Activity,
  Network,
  Zap,
  Cpu,
  BrainCircuit,
  Shield,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

// Import essential workflow pages only
import LandingPage from './pages/LandingPage';
import TransactionHistory from './pages/TransactionHistory';
import InstantRisk from './pages/InstantRisk';
import GraphConstruction from './pages/GraphConstruction';
import GNNNetwork from './pages/GNNNetwork';
import SubgraphExtraction from './pages/SubgraphExtraction';
import RiskEncoding from './pages/RiskEncoding';
import QuantumPathSelection from './pages/QuantumPathSelection';
import QSVC from './pages/QSVC';
import HamiltonianRiskMap from './pages/HamiltonianRiskMap';
import VQEOptimization from './pages/VQEOptimization';
import EnergyGap from './pages/EnergyGap';
import FinalForecast from './pages/FinalForecast';
import FraudDecision from './pages/FraudDecision';


type PageType =
  | 'landing'
  | 'history'
  | 'instant-risk'
  | 'graph-construction'
  | 'subgraph-extraction'
  | 'gat-network'
  | 'risk-encoding'
  | 'quantum-path'
  | 'qsvc'
  | 'hamiltonian'
  | 'vqe'
  | 'energy-gap'
  | 'forecast'
  | 'fraud-decision'


const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  // No auto-play - manual navigation only
  const autoPlaySequence: PageType[] = [];

  const startAutoPlay = () => {
    // Go to instant risk page
    setCurrentPage('instant-risk');
    setIsAutoPlaying(false);
    setAnalysisStep(0);
  };

  const stopAutoPlay = () => {
    setIsAutoPlaying(false);
    setAnalysisStep(0);
  };

  const resetDemo = () => {
    setCurrentPage('landing');
    setIsAutoPlaying(false);
    setAnalysisStep(0);
  };

  // Auto-play progression
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setTimeout(() => {
      const nextStep = analysisStep + 1;

      if (nextStep < autoPlaySequence.length) {
        setCurrentPage(autoPlaySequence[nextStep]);
        setAnalysisStep(nextStep);
      } else {
        // End of auto-play sequence
        setIsAutoPlaying(false);
        setCurrentPage('forecast');
      }
    }, getStepDuration(currentPage));

    return () => clearTimeout(timer);
  }, [currentPage, analysisStep, isAutoPlaying]);

  // Different durations for each step
  const getStepDuration = (page: PageType): number => {
    const durations = {
      'graph-construction': 5000,
      'subgraph-extraction': 5000,
      'gat-network': 5000,
      'risk-encoding': 5000,
      'quantum-path': 5000,
      'qsvc': 5000,
      'hamiltonian': 5000,
      'vqe': 5000,
      'energy-gap': 5000,
      'forecast': 5000,
      'fraud-decision': 5000,

    };
    return durations[page] || 5000;
  };

  const renderCurrentPage = () => {
    const pageProps = {
      onNext: (nextPage: PageType) => setCurrentPage(nextPage),
      onStartAnalysis: startAutoPlay,
      isAutoPlaying
    };

    switch (currentPage) {
      case 'landing':
        return <LandingPage {...pageProps} />;
      case 'history':
        return <TransactionHistory {...pageProps} />;
      case 'instant-risk':
        return <InstantRisk {...pageProps} />;
      case 'graph-construction':
        return <GraphConstruction {...pageProps} />;
      case 'subgraph-extraction':
        return <SubgraphExtraction {...pageProps} />;
      case 'gat-network':
        return <GNNNetwork {...pageProps} />;
      case 'risk-encoding':
        return <RiskEncoding {...pageProps} />;
      case 'quantum-path':
        return <QuantumPathSelection {...pageProps} />;
      case 'qsvc':
        return <QSVC {...pageProps} />;
      case 'hamiltonian':
        return <HamiltonianRiskMap {...pageProps} />;
      case 'vqe':
        return <VQEOptimization {...pageProps} />;
      case 'energy-gap':
        return <EnergyGap {...pageProps} />;
      case 'forecast':
        return <FinalForecast {...pageProps} />;
      case 'fraud-decision':
        return <FraudDecision {...pageProps} />;

      default:
        return <LandingPage {...pageProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background opacity-80" />

      {/* Navigation bar */}
      <nav className="relative z-10 border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-foreground">Project Foresight</h1>
            </div>
            <Badge variant="outline" className="text-primary border-primary/50 font-semibold text-sm px-3 py-1">
              Transaction Fraud Detection
            </Badge>
          </div>

          <div className="flex items-center space-x-2">
            {isAutoPlaying && (
              <Badge className="animate-pulse bg-primary/20 text-primary border-primary/50">
                <Activity className="h-3 w-3 mr-1" />
                Analyzing...
              </Badge>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={resetDemo}
              className="text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full"
          >
            {renderCurrentPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Progress indicator for auto-play */}
      {isAutoPlaying && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20">
          <Card className="card-banking">
            <CardContent className="p-4 flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {autoPlaySequence.map((step, index) => (
                  <div
                    key={step}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${index <= analysisStep ? 'bg-primary' : 'bg-muted'
                      }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                Step {analysisStep + 1} of {autoPlaySequence.length}
              </span>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dashboard;