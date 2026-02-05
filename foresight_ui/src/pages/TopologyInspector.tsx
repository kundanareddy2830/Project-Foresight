import React from 'react';
import { NetworkGraph3D } from '../components/NetworkGraph3D';
import { Share2, Info, AlertOctagon } from 'lucide-react';

export const TopologyInspector = () => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                        <Share2 className="w-6 h-6 text-amber-500" />
                        TOPOLOGY INSPECTOR
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">
                        Visualizing the <span className="text-amber-500">"Invisible String"</span> via Graph Attention Networks (GAT).
                    </p>
                </div>
                <div className="flex gap-2">
                    <div className="px-3 py-1 bg-obsidian-800 rounded border border-obsidian-700 text-xs text-slate-400">
                        Nodes: <span className="text-slate-200 font-mono">13,518</span>
                    </div>
                    <div className="px-3 py-1 bg-obsidian-800 rounded border border-obsidian-700 text-xs text-slate-400">
                        Edges: <span className="text-slate-200 font-mono">142K</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Graph View */}
                <div className="lg:col-span-2">
                    <NetworkGraph3D />
                </div>

                {/* GAT Analysis Panel */}
                <div className="space-y-6">
                    <div className="glass-panel p-6 rounded-xl border border-crimson-500/50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 opacity-20">
                            <AlertOctagon className="w-32 h-32 text-crimson-500" />
                        </div>

                        <h3 className="text-lg font-bold text-crimson-500 mb-1">MULE RING DETECTED</h3>
                        <div className="text-xs text-crimson-400 font-mono mb-4">ID: CLUSTER-8841</div>

                        <div className="space-y-4 relative z-10">
                            <div className="flex justify-between text-sm border-b border-crimson-500/20 pb-2">
                                <span className="text-slate-400">Topology Type</span>
                                <span className="text-slate-200 font-bold">STAR (Hub-Spoke)</span>
                            </div>
                            <div className="flex justify-between text-sm border-b border-crimson-500/20 pb-2">
                                <span className="text-slate-400">Nodes Involved</span>
                                <span className="text-slate-200 font-bold">41 Accounts</span>
                            </div>
                            <div className="flex justify-between text-sm border-b border-crimson-500/20 pb-2">
                                <span className="text-slate-400">Total Volume</span>
                                <span className="text-slate-200 font-bold">$14.2M</span>
                            </div>
                            <div className="flex justify-between text-sm pb-2">
                                <span className="text-slate-400">GAT Attention Score</span>
                                <span className="text-crimson-500 font-mono font-bold">0.998</span>
                            </div>
                        </div>

                        <button className="w-full mt-6 py-2 bg-crimson-600 hover:bg-crimson-500 text-white font-bold rounded shadow-lg shadow-crimson-600/20 transition-all">
                            ISOLATE CLUSTER
                        </button>
                    </div>

                    <div className="glass-panel p-6 rounded-xl border border-obsidian-700/50">
                        <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
                            <Info className="w-4 h-4 text-emerald-500" />
                            Methodology
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Project Janus uses a <span className="text-emerald-400">Graph Attention Network (GAT)</span> to learn the "normal" shape of transaction flows.
                            <br /><br />
                            While the fraudster used <span className="text-slate-300">"Structuring"</span> (small amounts) to evade rules, the GAT detected the high-degree hub formation which is statistically impossible in organic traffic.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TopologyInspector;
