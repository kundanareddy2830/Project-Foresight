// Hardcoded data for Project Foresight demo
export const DEMO_DATA = {
  // Transaction history (normal baseline)
  transactionHistory: [
    { id: "TX-0992", time: "09:15 AM", from: "C11475", to: "C88234", amount: 850, status: "Normal" },
    { id: "TX-0993", time: "09:32 AM", from: "C77391", to: "C11475", amount: 1200, status: "Normal" },
    { id: "TX-0994", time: "10:41 AM", from: "C11475", to: "C55123", amount: 2300, status: "Normal" },
    { id: "TX-0995", time: "11:03 AM", from: "C44567", to: "C11475", amount: 750, status: "Normal" },
    { id: "TX-0996", time: "11:28 AM", from: "C11475", to: "C33891", amount: 1450, status: "Normal" },
    { id: "TX-0997", time: "11:45 AM", from: "C22445", to: "C11475", amount: 980, status: "Normal" },
    { id: "TX-0998", time: "12:01 PM", from: "C11475", to: "C66778", amount: 1750, status: "Normal" },
    { id: "TX-0999", time: "12:02 PM", from: "C11475", to: "C77889", amount: 320, status: "Normal" },
    { id: "TX-1000", time: "12:03 PM", from: "C11475", to: "C99882", amount: 5000, status: "Normal" }
  ],

  // The suspicious transaction that triggers analysis
  suspiciousTransaction: {
    id: "TX-1001",
    from: "C11475",
    to: "C99882",
    amount: 5000,
    time: "12:03 PM",
    note: "Selected for analysis"
  },

  // Fraud ring cluster (3-4 coordinated transactions)
  fraudRing: [
    { id: "TX-1001", from: "C11475", to: "C99882", amount: 5000, time: "12:03 PM" },
    { id: "TX-1002", from: "C99882", to: "C44391", amount: 4800, time: "12:04 PM" },
    { id: "TX-1003", from: "C44391", to: "C77234", amount: 4600, time: "12:05 PM" },
    { id: "TX-1004", from: "C77234", to: "C88445", amount: 4400, time: "12:06 PM" }
  ],

  // GNN Network nodes and edges (learned from history) - Complex Network
  networkGraph: {
    nodes: [
      // Primary account and immediate connections
      { id: "C11475", label: "Primary Account", type: "primary", transfers: 15, flagged: false },
      
      // Regular accounts (expanded network)
      { id: "C88234", label: "Regular", type: "normal", transfers: 8, flagged: false },
      { id: "C77391", label: "Regular", type: "normal", transfers: 12, flagged: false },
      { id: "C55123", label: "Regular", type: "normal", transfers: 6, flagged: false },
      { id: "C44567", label: "Regular", type: "normal", transfers: 9, flagged: false },
      { id: "C33891", label: "Regular", type: "normal", transfers: 5, flagged: false },
      { id: "C22445", label: "Regular", type: "normal", transfers: 7, flagged: false },
      { id: "C66778", label: "Regular", type: "normal", transfers: 4, flagged: false },
      { id: "C77889", label: "Regular", type: "normal", transfers: 3, flagged: false },
      
      // Additional regular accounts for complexity
      { id: "C12345", label: "Regular", type: "normal", transfers: 6, flagged: false },
      { id: "C23456", label: "Regular", type: "normal", transfers: 8, flagged: false },
      { id: "C34567", label: "Regular", type: "normal", transfers: 5, flagged: false },
      { id: "C45678", label: "Regular", type: "normal", transfers: 7, flagged: false },
      { id: "C56789", label: "Regular", type: "normal", transfers: 4, flagged: false },
      { id: "C67890", label: "Regular", type: "normal", transfers: 6, flagged: false },
      { id: "C78901", label: "Regular", type: "normal", transfers: 3, flagged: false },
      { id: "C89012", label: "Regular", type: "normal", transfers: 5, flagged: false },
      { id: "C90123", label: "Regular", type: "normal", transfers: 4, flagged: false },
      { id: "C01234", label: "Regular", type: "normal", transfers: 6, flagged: false },
      { id: "C11111", label: "Regular", type: "normal", transfers: 8, flagged: false },
      { id: "C22222", label: "Regular", type: "normal", transfers: 5, flagged: false },
      { id: "C33333", label: "Regular", type: "normal", transfers: 7, flagged: false },
      { id: "C44444", label: "Regular", type: "normal", transfers: 4, flagged: false },
      { id: "C55555", label: "Regular", type: "normal", transfers: 6, flagged: false },
      { id: "C66666", label: "Regular", type: "normal", transfers: 3, flagged: false },
      { id: "C77777", label: "Regular", type: "normal", transfers: 5, flagged: false },
      { id: "C88888", label: "Regular", type: "normal", transfers: 4, flagged: false },
      { id: "C99999", label: "Regular", type: "normal", transfers: 6, flagged: false },
      
      // Suspicious nodes (fraud ring)
      { id: "C99882", label: "Suspicious", type: "suspicious", transfers: 1, flagged: true },
      { id: "C44391", label: "Suspicious", type: "suspicious", transfers: 1, flagged: true },
      { id: "C77234", label: "Suspicious", type: "suspicious", transfers: 1, flagged: true },
      { id: "C88445", label: "Suspicious", type: "suspicious", transfers: 1, flagged: true },
      { id: "C55555", label: "Suspicious", type: "suspicious", transfers: 1, flagged: true },
      { id: "C66666", label: "Suspicious", type: "suspicious", transfers: 1, flagged: true }
    ],
    edges: [
      // Original edges
      { source: "C11475", target: "C88234", value: 850 },
      { source: "C77391", target: "C11475", value: 1200 },
      { source: "C11475", target: "C55123", value: 2300 },
      { source: "C44567", target: "C11475", value: 750 },
      { source: "C11475", target: "C33891", value: 1450 },
      { source: "C22445", target: "C11475", value: 980 },
      { source: "C11475", target: "C66778", value: 1750 },
      { source: "C11475", target: "C77889", value: 320 },
      
      // Additional regular network connections
      { source: "C11475", target: "C12345", value: 1200 },
      { source: "C11475", target: "C23456", value: 800 },
      { source: "C11475", target: "C34567", value: 1500 },
      { source: "C11475", target: "C45678", value: 900 },
      { source: "C11475", target: "C56789", value: 1100 },
      { source: "C11475", target: "C67890", value: 1300 },
      { source: "C11475", target: "C78901", value: 700 },
      { source: "C11475", target: "C89012", value: 1600 },
      { source: "C11475", target: "C90123", value: 950 },
      { source: "C11475", target: "C01234", value: 1400 },
      { source: "C11475", target: "C11111", value: 1800 },
      { source: "C11475", target: "C22222", value: 650 },
      { source: "C11475", target: "C33333", value: 1250 },
      { source: "C11475", target: "C44444", value: 1050 },
      { source: "C11475", target: "C77777", value: 1350 },
      { source: "C11475", target: "C88888", value: 850 },
      { source: "C11475", target: "C99999", value: 1150 },
      
      // Inter-account connections (regular network)
      { source: "C88234", target: "C12345", value: 400 },
      { source: "C88234", target: "C23456", value: 300 },
      { source: "C77391", target: "C34567", value: 500 },
      { source: "C77391", target: "C45678", value: 350 },
      { source: "C55123", target: "C56789", value: 600 },
      { source: "C44567", target: "C67890", value: 450 },
      { source: "C33891", target: "C78901", value: 250 },
      { source: "C22445", target: "C89012", value: 400 },
      { source: "C66778", target: "C90123", value: 300 },
      { source: "C77889", target: "C01234", value: 200 },
      { source: "C12345", target: "C11111", value: 350 },
      { source: "C23456", target: "C22222", value: 280 },
      { source: "C34567", target: "C33333", value: 420 },
      { source: "C45678", target: "C44444", value: 380 },
      { source: "C56789", target: "C77777", value: 320 },
      { source: "C67890", target: "C88888", value: 290 },
      { source: "C78901", target: "C99999", value: 180 },
      { source: "C89012", target: "C11111", value: 450 },
      { source: "C90123", target: "C22222", value: 220 },
      { source: "C01234", target: "C33333", value: 380 },
      { source: "C11111", target: "C44444", value: 300 },
      { source: "C22222", target: "C77777", value: 250 },
      { source: "C33333", target: "C88888", value: 400 },
      { source: "C44444", target: "C99999", value: 350 },
      
      // Suspicious edges (fraud ring)
      { source: "C11475", target: "C99882", value: 5000, suspicious: true },
      { source: "C99882", target: "C44391", value: 4800, suspicious: true },
      { source: "C44391", target: "C77234", value: 4600, suspicious: true },
      { source: "C77234", target: "C88445", value: 4400, suspicious: true },
      { source: "C88445", target: "C55555", value: 4200, suspicious: true },
      { source: "C55555", target: "C66666", value: 4000, suspicious: true }
    ]
  },

  // Perturbation vector (16D) - exact numbers from spec
  perturbationVector: [0.12, -0.07, 0.04, 0.20, -0.01, 0.05, 0.09, -0.02, 0.03, 0.11, -0.06, 0.02, 0.00, 0.08, 0.06, -0.03],

  // PCA reduced (4D) - exact numbers from spec
  pcaVector: [0.21, -0.05, 0.12, 0.03],

  // Quantum-enhanced (2D) - exact numbers from spec
  quantumVector: [0.15375345, 0.03578131],
  quantumVectorDisplay: [0.1538, 0.0358],

  // Hamiltonian display
  hamiltonian: "H = 0.1538 * ZI + 0.0358 * IZ",

  // VQE results - exact numbers from spec
  vqeResults: {
    energy: -0.1744,
    probabilities: {
      "01": 0.7959,
      "00": 0.2041
    },
    verdict: "Moderate Risk — Verify",
    confidence: "79.59%",
    recommendation: "Manual review, request OTP"
  },

  // 2D scatter plot data for QCL visualization
  scatterData: {
    normal: [
      { x: 0.02, y: 0.01, label: "Normal" },
      { x: 0.01, y: 0.03, label: "Normal" },
      { x: -0.01, y: 0.02, label: "Normal" },
      { x: 0.03, y: -0.01, label: "Normal" },
      { x: -0.02, y: -0.01, label: "Normal" },
      { x: 0.01, y: -0.02, label: "Normal" },
      { x: -0.01, y: 0.01, label: "Normal" }
    ],
    suspicious: { x: 0.1538, y: 0.0358, label: "Suspicious" }
  },

  // QSVC results
  qsvcResults: {
    fraudProbability: 82.07,
    advantage: 1.36,
    kernelType: "Quantum Feature Map",
    accuracy: 82.07
  },

  // Risk encoding data
  riskEncoding: {
    gnnVector: [0.31, 0.77, -0.12, 0.58, 0.23, -0.45, 0.67, 0.19],
    encodedVector: [0.97, 2.42, 0.00, 1.82, 0.72, 0.00, 2.10, 0.60],
    topK: 4,
    method: "Angle Encoding"
  },

  // Quantum path selection
  quantumPathSelection: {
    threshold: 50,
    decision: "quantum",
    reason: "Transaction amount exceeds threshold"
  },

  // Energy gap computation
  energyGap: {
    groundEnergy: -0.1744,
    observedEnergy: -0.0892,
    deltaE: 0.0852,
    interpretation: "High energy gap indicates system instability"
  },

  // Digital twin simulation
  digitalTwin: {
    scenario: "Fraud Ring Propagation",
    scenarioDescription: "Simulating what happens if node C99882 is compromised",
    simulationSteps: [
      {
        step: 0,
        description: "Initial state: Normal network behavior",
        affectedNodes: 1,
        riskLevel: 5,
        riskMap: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
        earlyWarning: null
      },
      {
        step: 1,
        description: "Compromised node detected: Risk spreading to immediate neighbors",
        affectedNodes: 3,
        riskLevel: 25,
        riskMap: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.3, 0.3, 0.3, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
        earlyWarning: "Risk detected in 3 connected accounts"
      },
      {
        step: 2,
        description: "Cascade effect: Risk propagating through transaction network",
        affectedNodes: 8,
        riskLevel: 45,
        riskMap: [0.1, 0.1, 0.2, 0.2, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.5, 0.5, 0.5, 0.3, 0.3, 0.3, 0.2, 0.2, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
        earlyWarning: "Fraud cascade detected: 8 accounts at risk"
      },
      {
        step: 3,
        description: "Critical state: High-risk nodes forming fraud ring pattern",
        affectedNodes: 12,
        riskLevel: 72,
        riskMap: [0.2, 0.2, 0.4, 0.4, 0.2, 0.2, 0.1, 0.1, 0.1, 0.1, 0.8, 0.8, 0.8, 0.6, 0.6, 0.6, 0.4, 0.4, 0.3, 0.3, 0.2, 0.2, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
        earlyWarning: "URGENT: Fraud ring pattern detected. Immediate containment required."
      }
    ]
  }
};