import React from 'react';

export const CircuitDiagram = () => {
    return (
        <div className="w-full h-[200px] bg-obsidian-900 rounded-xl border border-obsidian-700/50 p-6 flex flex-col justify-center relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

            <h4 className="text-xs font-bold text-slate-400 absolute top-4 left-4 z-10">REAL-TIME CIRCUIT TELEMETRY (ANSATZ)</h4>

            {/* Qubit Lines */}
            <div className="space-y-8 relative z-10 ml-8">

                {/* Qubit 0 */}
                <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono text-slate-500 w-8">q[0]</span>
                    <div className="h-0.5 w-full bg-slate-700 relative flex items-center">
                        {/* Gate Ry */}
                        <div className="w-10 h-8 bg-obsidian-800 border border-amber-500 text-[10px] text-amber-500 flex items-center justify-center rounded absolute left-10 animate-pulse-slow shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                            Ry(θ)
                        </div>
                        {/* Control Dot */}
                        <div className="w-3 h-3 bg-slate-200 rounded-full absolute left-32 z-20"></div>
                    </div>
                </div>

                {/* Qubit 1 */}
                <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono text-slate-500 w-8">q[1]</span>
                    <div className="h-0.5 w-full bg-slate-700 relative flex items-center">
                        {/* Gate Ry */}
                        <div className="w-10 h-8 bg-obsidian-800 border border-amber-500 text-[10px] text-amber-500 flex items-center justify-center rounded absolute left-10 animate-pulse-slow shadow-[0_0_10px_rgba(245,158,11,0.3)]" style={{ animationDelay: '0.5s' }}>
                            Ry(θ)
                        </div>
                        {/* Target X */}
                        <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center absolute left-[7.5rem] bg-obsidian-900 z-10 text-slate-200 text-xs font-mono">
                            X
                        </div>
                    </div>
                </div>

                {/* Connection Line (Entanglement) */}
                <div className="absolute left-[8.75rem] top-[0.6rem] w-0.5 h-[2.5rem] bg-slate-700 z-0"></div>
            </div>

            {/* Measurement Barrier */}
            <div className="absolute right-20 top-0 bottom-0 w-1 bg-slate-600/20 border-l border-dashed border-slate-600 flex flex-col justify-center items-center">
                <div className="text-[8px] text-slate-500 -rotate-90 whitespace-nowrap mb-2">MEASURE</div>
            </div>
        </div>
    );
};
