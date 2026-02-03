import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  BarChart3,
  BrainCircuit,
  Zap,
  Shield,
  Network,
  ChevronRight,
  Loader2,
  CheckCircle,
  Activity
} from 'lucide-react';

interface LandingPageProps {
  onNext: (page: string) => void;
  onStartAnalysis: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNext, onStartAnalysis }) => {
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isLoadingAnalyze, setIsLoadingAnalyze] = useState(false);
  const [isHistorySuccess, setIsHistorySuccess] = useState(false);
  const [isAnalyzeSuccess, setIsAnalyzeSuccess] = useState(false);
  const [transactionsProcessed, setTransactionsProcessed] = useState(2450032);

  useEffect(() => {
    let mounted = true;
    let ticks = 0;
    const interval = setInterval(() => {
      if (!mounted) return;
      ticks += 1;
      setTransactionsProcessed((prev) => prev + Math.floor(3 + Math.random() * 9));
      if (ticks > 120) {
        clearInterval(interval);
      }
    }, 60);
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  const handleShowHistory = () => {
    if (isLoadingHistory || isLoadingAnalyze) return;
    setIsHistorySuccess(false);
    setIsLoadingHistory(true);
    setTimeout(() => {
      setIsLoadingHistory(false);
      setIsHistorySuccess(true);
      setTimeout(() => onNext('graph-construction'), 600);
    }, 600);
  };

  const handleAnalyze = () => {
    if (isLoadingHistory || isLoadingAnalyze) return;
    setIsAnalyzeSuccess(false);
    setIsLoadingAnalyze(true);
    setTimeout(() => {
      setIsLoadingAnalyze(false);
      setIsAnalyzeSuccess(true);
      setTimeout(() => onStartAnalysis(), 600);
    }, 600);
  };
  return (
    <div className="h-screen flex items-start justify-center overflow-hidden pt-16">
      <div className="max-w-4xl mx-auto text-center space-y-4 px-4">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >

          <h1 className="text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent tracking-tight py-4">
            Project Foresight
          </h1>

          <h2 className="text-lg font-semibold text-slate-600  tracking-wider">
            A Quantum Powered Digital Twin for proactive fraud simulation
            and prevention
          </h2>

          <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            Enable financial institutions to prevent fraud before it happens
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <Card className="group card-banking border border-slate-200 rounded-xl p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.02] hover:border-slate-300">
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <Network className="h-4 w-4 text-primary group-hover:animate-pulse" />
                <CardTitle className="text-base font-semibold">Transaction Analysis</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0 text-left">
              <p className="text-xs text-slate-600">
                Advanced AI analyzes transaction patterns and account relationships
              </p>
            </CardContent>
          </Card>

          <Card className="group card-banking border border-slate-200 rounded-xl p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.02] hover:border-slate-300">
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-neural group-hover:animate-pulse" />
                <CardTitle className="text-base font-semibold">Real-time Detection</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0 text-left">
              <p className="text-xs text-slate-600">
                Instant fraud detection using quantum-enhanced machine learning
              </p>
            </CardContent>
          </Card>

          <Card className="group card-banking border border-slate-200 rounded-xl p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.02] hover:border-slate-300">
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-safe group-hover:animate-pulse" />
                <CardTitle className="text-base font-semibold">Bank Security</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0 text-left">
              <p className="text-xs text-slate-600">
                Secure your customers with intelligent fraud prevention
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Live data panel */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto w-full max-w-md border border-slate-200 rounded-lg p-3 flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-slate-700">Transactions Processed</span>
          </div>
          <div className="font-mono font-bold text-slate-900">
            {transactionsProcessed.toLocaleString()}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={handleShowHistory}
            disabled={isLoadingHistory || isLoadingAnalyze}
            className="btn-banking w-full sm:w-auto text-base md:text-lg font-semibold px-8 py-3 shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:scale-105 transition-all"
          >
            {isLoadingHistory ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Loading...
              </>
            ) : isHistorySuccess ? (
              <>
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                Done
              </>
            ) : (
              <>
                <BarChart3 className="h-5 w-5 mr-2" />
                Show History
              </>
            )}
          </Button>

          <Button
            onClick={handleAnalyze}
            disabled={isLoadingHistory || isLoadingAnalyze}
            className="bg-secondary hover:bg-secondary/80 text-secondary-foreground w-full sm:w-auto text-base md:text-lg font-semibold px-8 py-3 shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:scale-105 transition-all"
          >
            {isLoadingAnalyze ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : isAnalyzeSuccess ? (
              <>
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                Ready
              </>
            ) : (
              <>
                <Play className="h-5 w-5 mr-2" />
                Analyze Transaction
                <ChevronRight className="h-5 w-5 ml-2" />
              </>
            )}
          </Button>
        </motion.div>

        {/* Guidance under Analyze button */}
        {/* <p className="text-xs text-slate-500 mt-1">Upload a transaction file to analyze for potential fraud risk.</p> */}

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-wrap justify-center gap-2"
        >
          <Badge variant="outline" className="text-green-800 border-green-300 bg-green-100 px-2.5 py-1.5 text-xs font-semibold transition-transform hover:scale-105">
            Detects new fraud rings
          </Badge>
          <Badge variant="outline" className="text-blue-800 border-blue-300 bg-blue-100 px-2.5 py-1.5 text-xs font-semibold transition-transform hover:scale-105">
            Produces clear probability
          </Badge>
          <Badge variant="outline" className="text-purple-800 border-purple-300 bg-purple-100 px-2.5 py-1.5 text-xs font-semibold transition-transform hover:scale-105">
            Works without prior fraud examples
          </Badge>
        </motion.div>

        {/* Footer with link hover underline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-4 text-xs text-slate-500"
        >
          <div className="flex items-center justify-center gap-4">
            <a className="hover:underline" href="#" onClick={(e) => { e.preventDefault(); window.alert('Privacy Policy coming soon'); }}>Privacy Policy</a>
            <span className="text-slate-300">|</span>
            <a className="hover:underline" href="#" onClick={(e) => { e.preventDefault(); window.alert('Terms coming soon'); }}>Terms</a>
            <span className="text-slate-300">|</span>
            <a className="hover:underline" href="#" onClick={(e) => { e.preventDefault(); window.alert('Contact: team@foresight.example'); }}>Contact</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;