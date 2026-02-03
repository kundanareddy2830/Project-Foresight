import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  BarChart3, 
  Network, 
  ChevronRight, 
  Activity,
  Clock,
  DollarSign,
  Shield
} from 'lucide-react';
import { DEMO_DATA } from '@/data/mockData';

interface TransactionHistoryProps {
  onNext: (page: string) => void;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ onNext }) => {
  const { transactionHistory } = DEMO_DATA;
  
  const stats = {
    totalTransactions: transactionHistory.length,
    suspiciousCount: 0,
    lastFlagged: "Never",
    totalVolume: transactionHistory.reduce((sum, tx) => sum + tx.amount, 0)
  };

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
          <h1 className="text-3xl font-bold text-foreground">Transaction History</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            This is the context our model learned from — normal account activity provides the baseline 
            for detecting anomalies.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Transaction Table */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="card-quantum">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-blue-700" />
                  <span>User Transaction History</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>To</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactionHistory.map((tx, index) => (
                      <motion.tr
                        key={tx.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <TableCell className="text-muted-foreground">{tx.time}</TableCell>
                        <TableCell className="font-mono text-sm">{tx.from}</TableCell>
                        <TableCell className="font-mono text-sm">{tx.to}</TableCell>
                        <TableCell className="text-right font-semibold">
                          ${tx.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className="status-safe text-xs"
                          >
                            {tx.status}
                          </Badge>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar - Statistics and Controls */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            
            {/* Statistics Card */}
            <Card className="card-neural">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-neural" />
                  <span>Account Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Transactions</span>
                  <span className="font-semibold">{stats.totalTransactions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Suspicious Count</span>
                  <span className="font-semibold text-safe">{stats.suspiciousCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Last Flagged</span>
                  <span className="font-semibold">{stats.lastFlagged}</span>
                </div>
                <div className="flex items-center justify-between border-t border-border/50 pt-4">
                  <span className="text-muted-foreground">Total Volume</span>
                  <span className="font-semibold">${stats.totalVolume.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* GNN Network Preview */}
            <Card className="bg-gradient-to-br from-card to-background-secondary border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Network className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">GNN Learned Graph</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-muted/20 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <Network className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">
                      Network visualization preview
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNext('graph-construction')}
                  className="w-full"
                >
                  Show Full Graph
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                size="lg"
                onClick={() => onNext('graph-construction')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 shadow-lg border-2 border-blue-800"
              >
                <Shield className="h-5 w-5 mr-2" />
                Start Analysis
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
              
              <Button
                onClick={() => onNext('landing')}
                className="w-full bg-white hover:bg-gray-50 text-black border-2 border-black font-bold py-3 px-6 shadow-lg"
              >
                Back to Landing
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;


