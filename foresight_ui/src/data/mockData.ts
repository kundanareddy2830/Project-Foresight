export const KPI_DATA = {
    processed: "2.4M",
    highRisk: "14",
    prevented: "$4.2M",
    stability: "98.2%"
};

// Based on the Notebook "Zero-Day Attack" Results
export const LIVE_TRANSACTIONS = [
    { id: "TX-6777", amount: "$1,333,349", time: "10:42:01", account: "C114...7658", risk: "CRITICAL", score: "100.0%", type: "Transfer" },
    { id: "TX-6776", amount: "$1,336,606", time: "10:41:58", account: "C114...7658", risk: "CRITICAL", score: "100.0%", type: "Transfer" },
    { id: "TX-6775", amount: "$1,261,549", time: "10:41:55", account: "C114...7658", risk: "CRITICAL", score: "100.0%", type: "Transfer" },
    { id: "TX-6774", amount: "$1,335,293", time: "10:41:52", account: "C114...7658", risk: "CRITICAL", score: "100.0%", type: "Transfer" },
    { id: "TX-6773", amount: "$1,378,412", time: "10:41:48", account: "C114...7658", risk: "CRITICAL", score: "100.0%", type: "Transfer" },
    { id: "TX-3921", amount: "$420.00", time: "10:41:45", account: "C882...1922", risk: "STABLE", score: "0.02%", type: "Payment" },
    { id: "TX-3922", amount: "$1,299.00", time: "10:41:42", account: "C771...3311", risk: "STABLE", score: "0.15%", type: "Payment" },
    { id: "TX-3923", amount: "$50.00", time: "10:41:40", account: "C112...4421", risk: "STABLE", score: "0.01%", type: "Transfer" },
    { id: "TX-4901", amount: "$1,343,002", time: "10:41:35", account: "C114...7658", risk: "CRITICAL", score: "100.0%", type: "Transfer" },
];

// Entropy History (Simulated VQE Instability)
export const ENTROPY_DATA = Array.from({ length: 60 }, (_, i) => {
    const base = 0.2;
    // Create a spike for the attack
    const isAttack = i > 40 && i < 55;
    const noise = Math.random() * 0.05;
    const spike = isAttack ? 0.6 + Math.random() * 0.1 : 0;
    return {
        time: i,
        entropy: base + noise + spike,
        threshold: 0.5
    };
});
