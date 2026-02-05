import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Layers, AlertTriangle } from 'lucide-react';

// Mock 16D Vector Data
const generateVectorData = () => {
    const dimensions = Array.from({ length: 16 }, (_, i) => `dim_${i}`);

    // Normal Baseline (Mean)
    const data = dimensions.map(dim => ({
        subject: dim,
        baseline: 0.5 + Math.random() * 0.1, // Stable around 0.5
        fraud: 0.5 + Math.random() * 0.1, // Initial state
        fullMark: 1,
    }));
    return data;
};

export const EmbeddingInspector = () => {
    const [data, setData] = useState(generateVectorData());
    const [drift, setDrift] = useState(0);

    useEffect(() => {
        // Simulate live drift
        const interval = setInterval(() => {
            const time = Date.now() / 1000;
            const isAttack = Math.sin(time * 0.5) > 0.7; // Attack cycle

            setDrift(isAttack ? 0.85 : 0.02);

            setData(prev => prev.map(item => ({
                ...item,
                // If attack, warp dimensions 3, 7, 12 (Topological signature)
                fraud: isAttack
                    ? (['dim_3', 'dim_7', 'dim_12'].includes(item.subject) ? 0.95 : item.baseline + Math.random() * 0.2)
                    : item.baseline + (Math.random() * 0.05 - 0.025)
            })));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                        <Layers className="w-6 h-6 text-crimson-500" />
                        EMBEDDING MANIFOLD INSPECTOR
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">
                        Visualizing <span className="text-crimson-500 font-mono">16-Dimensional Perturbation Vectors</span> (GAT Latent Space).
                    </p>
                </div>

                {/* Drift Alert */}
                <div className={`px-4 py-2 rounded-lg border flex items-center gap-3 transition-all ${drift > 0.5 ? 'bg-crimson-500/20 border-crimson-500 text-crimson-400' : 'bg-obsidian-800 border-obsidian-700 text-slate-400'}`}>
                    <AlertTriangle className={`w-5 h-5 ${drift > 0.5 ? 'animate-bounce' : ''}`} />
                    <div>
                        <div className="text-[10px] uppercase font-bold tracking-wider">Manifold Drift</div>
                        <div className="text-xl font-mono font-bold">{(drift * 100).toFixed(1)}%</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Radar Scan */}
                <div className="h-[500px] glass-panel p-4 rounded-xl border border-obsidian-700 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.1)_0%,transparent_70%)] animate-pulse-slow"></div>
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                            <PolarGrid stroke="#334155" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 1]} tick={false} axisLine={false} />

                            {/* Normal Trace */}
                            <Radar
                                name="Normal Baseline"
                                dataKey="baseline"
                                stroke="#10B981"
                                strokeWidth={2}
                                fill="#10B981"
                                fillOpacity={0.1}
                            />

                            {/* Live Fraud Trace */}
                            <Radar
                                name="Live Transaction"
                                dataKey="fraud"
                                stroke="#F43F5E"
                                strokeWidth={3}
                                fill="#F43F5E"
                                fillOpacity={drift > 0.5 ? 0.3 : 0.05}
                            />
                            <Legend />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0B1120', borderColor: '#334155' }}
                                itemStyle={{ color: '#F43F5E' }}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>

                {/* Matrix View / Details */}
                <div className="glass-panel p-6 rounded-xl border border-obsidian-700/50 space-y-6">
                    <h3 className="text-sm font-bold text-slate-200">VECTOR COMPONENTS</h3>
                    <div className="grid grid-cols-4 gap-2">
                        {data.map((item, i) => (
                            <div key={i} className="p-2 bg-obsidian-900 rounded border border-obsidian-800 text-center">
                                <div className="text-[9px] text-slate-500 uppercase">{item.subject}</div>
                                <div className={`font-mono text-xs font-bold ${Math.abs(item.fraud - item.baseline) > 0.2 ? 'text-crimson-400' : 'text-slate-300'}`}>
                                    {item.fraud.toFixed(3)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 bg-obsidian-900/50 rounded-lg border border-obsidian-800 mt-6">
                        <h4 className="text-xs font-bold text-amber-500 mb-2">SCIENTIFIC CONTEXT</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            The area between the <span className="text-emerald-500">Green</span> (Normal) and <span className="text-crimson-500">Red</span> (Live) polygons represents the <b>Perturbation Magnitude</b>.
                            <br /><br />
                            Notice how the attack explicitly warps Dimensions 3, 7, and 12. This specific "Vector Fingerprint" is what the Quantum Kernel (Module 2) uses to separate the data in Hilbert Space.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmbeddingInspector;
