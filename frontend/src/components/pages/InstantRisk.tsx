import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  CheckCircle,
  XCircle,
  Smartphone,
  AlertTriangle,
  Shield,
  CreditCard,
  MapPin,
  Clock,
  Eye,
  EyeOff,
  FileText,
  Loader2,
  Home,
  ChevronRight
} from 'lucide-react';

interface InstantRiskProps {
  onNext: (nextPage: string) => void;
  onStartAnalysis?: () => void;
  isAutoPlaying?: boolean;
}

type FraudStatus = 'pending' | 'approved' | 'declined';
type OtpStatus = 'idle' | 'sending' | 'sent' | 'verifying' | 'verified' | 'failed';

const InstantRisk: React.FC<InstantRiskProps> = ({ onNext }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [status, setStatus] = useState<FraudStatus>('pending');
  const [declineReason, setDeclineReason] = useState<string>('');
  const [otherReason, setOtherReason] = useState('');

  // OTP State
  const [otpStatus, setOtpStatus] = useState<OtpStatus>('idle');
  const [otpCode, setOtpCode] = useState('');

  // Report Modal State
  const [showReport, setShowReport] = useState(false);

  // Dialog open state for decline
  const [declineOpen, setDeclineOpen] = useState(false);

  const handleApprove = () => {
    setStatus('approved');
  };

  const handleDecline = () => {
    if (!declineReason) return;
    setStatus('declined');
    setDeclineOpen(false);
  };

  const sendOtp = () => {
    setOtpStatus('sending');
    setTimeout(() => {
      setOtpStatus('sent');
    }, 1500);
  };

  const verifyOtp = () => {
    setOtpStatus('verifying');
    setTimeout(() => {
      if (otpCode.length === 4) {
        setOtpStatus('verified');
      } else {
        setOtpStatus('failed');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-5xl space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-3">
            {status === 'pending' ? (
              <Shield className="h-10 w-10 text-danger" />
            ) : status === 'approved' ? (
              <CheckCircle className="h-10 w-10 text-safe" />
            ) : (
              <XCircle className="h-10 w-10 text-danger" />
            )}
            <h1 className="text-4xl font-bold text-foreground">
              {status === 'pending' ? 'Fraud Alert Detected' :
                status === 'approved' ? 'Transaction Approved' : 'Transaction Declined'}
            </h1>
          </div>
          {status === 'pending' && (
            <p className="text-lg text-muted-foreground">
              AI analysis has identified suspicious transaction patterns
            </p>
          )}
          {status === 'declined' && (
            <p className="text-lg text-danger font-medium">
              Reason: {declineReason === 'Other' ? otherReason : declineReason}
            </p>
          )}
          {status === 'approved' && (
            <p className="text-lg text-safe font-medium">
              Transaction authorized and processed successfully.
            </p>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Left Column: Transaction Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <Card className="card-banking h-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <span>Transaction Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-border/40">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-bold text-xl text-foreground">$2,847.50</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/40">
                  <span className="text-muted-foreground">Merchant</span>
                  <span className="font-medium">ElectroMax Store</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/40">
                  <span className="text-muted-foreground">Location</span>
                  <div className="flex items-center text-foreground">
                    <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                    New York, NY
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/40">
                  <span className="text-muted-foreground">Time</span>
                  <div className="flex items-center text-foreground">
                    <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                    2:47 PM EST
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-muted-foreground">Account</span>
                  <span className="font-mono font-medium">****1234</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column: Risk & OTP */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="card-banking">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    <span>Risk Analysis</span>
                  </div>
                  {otpStatus === 'verified' && (
                    <Badge className="bg-safe text-white">Identity Verified</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">

                {/* Scores */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-danger/10 border border-danger/20 rounded-lg text-center">
                    <div className="text-2xl font-bold text-danger">87%</div>
                    <div className="text-xs text-muted-foreground">Fraud Score</div>
                  </div>
                  <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg text-center">
                    <div className="text-2xl font-bold text-warning">High</div>
                    <div className="text-xs text-muted-foreground">Anomaly Level</div>
                  </div>
                </div>

                {/* OTP Section */}
                <div className="p-4 bg-background-secondary rounded-lg border border-border/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium flex items-center">
                      <Smartphone className="h-4 w-4 mr-2 text-primary" />
                      Customer Verification
                    </h4>
                    {otpStatus === 'verified' && <CheckCircle className="h-5 w-5 text-safe" />}
                  </div>

                  {otpStatus === 'idle' && (
                    <Button onClick={sendOtp} variant="outline" className="w-full">
                      Send OTP to ending in **89
                    </Button>
                  )}

                  {(otpStatus === 'sending' || otpStatus === 'sent' || otpStatus === 'verifying' || otpStatus === 'failed') && (
                    <div className="space-y-2">
                      {otpStatus === 'sending' ? (
                        <div className="flex items-center justify-center text-sm text-muted-foreground p-2">
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Sending Code...
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          <Input
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                            placeholder="Enter 4-digit code"
                            maxLength={4}
                            className="text-center tracking-widest font-mono"
                            disabled={otpStatus === 'verifying'}
                          />
                          <Button onClick={verifyOtp} disabled={otpCode.length !== 4 || otpStatus === 'verifying'}>
                            {otpStatus === 'verifying' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Verify'}
                          </Button>
                        </div>
                      )}
                      {otpStatus === 'sent' && <p className="text-xs text-muted-foreground text-center">Code sent!</p>}
                      {otpStatus === 'failed' && <p className="text-xs text-danger text-center">Incorrect code. Try again.</p>}
                    </div>
                  )}

                  {otpStatus === 'verified' && (
                    <div className="text-center text-sm text-safe font-medium py-1">
                      Successfully Verified via OTP
                    </div>
                  )}
                </div>

                {/* Toggles */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetails(!showDetails)}
                  className="w-full text-muted-foreground hover:text-foreground"
                >
                  {showDetails ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                  {showDetails ? 'Hide' : 'Show'} Advanced Analysis
                </Button>

              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Detailed Analysis Section */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <Card className="card-banking border-primary/20">
                <CardHeader>
                  <CardTitle>Fraud Analysis Report</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-8">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-danger mr-2">•</span>
                      <span className="text-muted-foreground">Unusual spending velocity (3x avg)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-danger mr-2">•</span>
                      <span className="text-muted-foreground">Device fingerprint mismatch</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span className="text-muted-foreground">IP address geolocated to high-risk region</span>
                    </li>
                  </ul>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-blue-700 mr-2">•</span>
                      <span className="text-muted-foreground">Quantum QSVC identified pattern cluster #4B</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-700 mr-2">•</span>
                      <span className="text-muted-foreground">VQE Optimization suggests 94% confidence</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Bar */}
        {status === 'pending' ? (
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* PRIMARY ACTION for InstantRisk: Deep Dive */}
            <Button
              onClick={() => onNext('graph-construction')}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 shadow-xl rounded-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Deep Dive Analysis
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>

            <div className="w-px h-10 bg-border hidden sm:block mx-2 opacity-50" />

            <Button
              size="lg"
              className="btn-approve"
              onClick={handleApprove}
              disabled={otpStatus !== 'verified'}
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              Approve
            </Button>

            <Dialog open={declineOpen} onOpenChange={setDeclineOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="btn-decline">
                  <XCircle className="h-5 w-5 mr-2" />
                  Decline
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Decline Transaction</DialogTitle>
                  <DialogDescription>
                    Please select a reason for declining this transaction. This will be logged for compliance.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                  <div className="space-y-2">
                    <Label>Reason Code</Label>
                    <Select onValueChange={setDeclineReason}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reason..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Confirmed Fraud">Confirmed Fraud</SelectItem>
                        <SelectItem value="Suspected Fraud">Suspected Fraud</SelectItem>
                        <SelectItem value="Customer Request">Customer Request</SelectItem>
                        <SelectItem value="Policy Violation">Policy Violation</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {declineReason === 'Other' && (
                    <div className="space-y-2">
                      <Label>Specify Reason</Label>
                      <Input
                        value={otherReason}
                        onChange={(e) => setOtherReason(e.target.value)}
                        placeholder="Enter details..."
                      />
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDeclineOpen(false)}>Cancel</Button>
                  <Button
                    variant="destructive"
                    onClick={handleDecline}
                    disabled={!declineReason || (declineReason === 'Other' && !otherReason)}
                  >
                    Confirm Decline
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <div className="w-px h-10 bg-border hidden sm:block mx-2" />

            <Dialog open={showReport} onOpenChange={setShowReport}>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg">
                  <FileText className="h-5 w-5 mr-2" />
                  View Full Report
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Comprehensive Transaction Report</DialogTitle>
                </DialogHeader>

                <div className="py-4 space-y-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Transaction ID</p>
                      <p className="font-mono font-medium">TXN-8842-XQ-99</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Timestamp</p>
                      <p className="font-medium">Oct 24, 2024 - 14:47:33</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Merchant ID</p>
                      <p className="font-mono font-medium">MER-7721 (ElectroMax)</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Terminal ID</p>
                      <p className="font-mono font-medium">TERM-0042</p>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-muted px-4 py-2 border-b">
                      <h4 className="font-semibold text-sm">Technical Risk Indicators</h4>
                    </div>
                    <div className="p-4 space-y-4 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-muted-foreground text-xs uppercase tracking-wider">IP / Geolocation</p>
                          <p className="font-medium">192.168.X.X (Proxy Detected)</p>
                          <p className="text-xs text-danger">Distance {'>'} 500km from last login</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs uppercase tracking-wider">Device Fingerprint</p>
                          <p className="font-mono font-medium">DEV-HASH-99283</p>
                          <p className="text-xs text-warning">New Device</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-muted-foreground text-xs uppercase tracking-wider">Velocity Check</p>
                          <p className="font-medium">3 Transactions / 10 mins</p>
                          <p className="text-xs text-danger">High Velocity Warning</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs uppercase tracking-wider">Merchant Risk</p>
                          <p className="font-medium">Electronics / High Value</p>
                          <p className="text-xs text-muted-foreground">MCC: 5732</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-danger/5 border border-danger/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-danger mb-2 text-sm flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      AI Model Verdict
                    </h4>
                    <p className="text-sm text-foreground">
                      The hybrid Quantum-Classical model indicates a <strong>87% probability of fraud</strong> based on the velocity and geolocation mismatch. Immediate verification is recommended.
                    </p>
                  </div>
                </div>

              </DialogContent>
            </Dialog>

          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center pt-8 space-x-4"
          >
            <Button size="lg" onClick={() => onNext('graph-construction')} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Continue to Deep Dive
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => onNext('landing')}>
              <Home className="h-5 w-5 mr-2" />
              Return to Dashboard
            </Button>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default InstantRisk;



