import React from 'react';
import { EnergyLandscape } from '../components/quantum/EnergyLandscape';
import { CircuitDiagram } from '../components/quantum/CircuitDiagram';
import { QuantumKernelViz } from '../components/quantum/QuantumKernelViz';
import { Atom, Zap, Cpu } from 'lucide-react';

export const QuantumLab = () => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                        <Atom className="w-6 h-6 text-amber-500 animate-spin-slow" />
                        QUANTUM RISK LAB
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">
                        Analyzing transaction physics via <span className="text-amber-500">Hybrid VQE + QSVC Protocol</span>.
                    </p>
                </div>
                <div className="flex gap-2">
                    <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded text-xs text-amber-500 font-mono flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                        BACKEND: IBQM_OSAKA
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Left: Circuit */}
                <div className="glass-panel p-6 rounded-xl border border-obsidian-700/50">
                    <CircuitDiagram />
                    <div className="mt-4 flex justify-between text-xs text-slate-400 font-mono">
                        <span>Optimizer: SPSA (maxiter=50)</span>
                        <span>Shots: 1024</span>
                    </div>
                </div>

                {/* Top Right: Energy Well */}
                <div className="glass-panel p-6 rounded-xl border border-obsidian-700/50">
                    <EnergyLandscape />
                </div>
            </div>

            {/* Bottom: Kernel Viz */}
            <QuantumKernelViz />

        </div>
    );
};

export default QuantumLab;
