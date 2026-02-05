import React, { useState } from 'react';
import Plot from 'react-plotly.js';

export const QuantumKernelViz = () => {
    const [isQuantum, setIsQuantum] = useState(false);

    // Generate Mock Data for Kernel Trick
    // Classical: Mixed ball
    // Quantum: Separated planes
    const generateData = (mode: 'classical' | 'quantum') => {
        const normalX = [], normalY = [], normalZ = [];
        const fraudX = [], fraudY = [], fraudZ = [];
        const cnt = 200;

        for (let i = 0; i < cnt; i++) {
            // Normal
            normalX.push(Math.random() * 2 - 1);
            normalY.push(Math.random() * 2 - 1);
            normalZ.push(mode === 'quantum' ? -0.5 : Math.random() * 2 - 1);

            // Fraud (Ring)
            const theta = Math.random() * Math.PI * 2;
            const r = mode === 'quantum' ? 0.8 : Math.random(); // Ring shape in quantum vs scattered
            fraudX.push(r * Math.cos(theta));
            fraudY.push(r * Math.sin(theta));
            fraudZ.push(mode === 'quantum' ? 0.8 : Math.random() * 2 - 1); // Separated in Z
        }
        return { normal: { x: normalX, y: normalY, z: normalZ }, fraud: { x: fraudX, y: fraudY, z: fraudZ } };
    };

    const dataPoints = generateData(isQuantum ? 'quantum' : 'classical');

    return (
        <div className="glass-panel p-6 rounded-xl relative border border-obsidian-700/50">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-sm font-bold text-slate-200">HILBERT SPACE PROJECTION (QSVC)</h3>
                    <p className="text-xs text-slate-500">Visualizing the Feature Map Kernel</p>
                </div>
                <button
                    onClick={() => setIsQuantum(!isQuantum)}
                    className={`px-4 py-1 text-xs font-bold rounded transition-all border ${isQuantum ? 'bg-amber-500 text-obsidian-900 border-amber-500' : 'bg-obsidian-800 text-slate-400 border-obsidian-600'}`}
                >
                    {isQuantum ? 'QUANTUM KERNEL: ACTIVE' : 'CLASSICAL VIEW'}
                </button>
            </div>

            <div className="h-[400px] w-full bg-obsidian-950 rounded-lg overflow-hidden relative">
                {isQuantum && (
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.5)] z-0 pointer-events-none transform -translate-y-6"></div>
                )}
                <Plot
                    data={[
                        {
                            x: dataPoints.normal.x, y: dataPoints.normal.y, z: dataPoints.normal.z,
                            mode: 'markers',
                            type: 'scatter3d',
                            marker: { color: '#10B981', size: 4, opacity: 0.6 },
                            name: 'Normal'
                        },
                        {
                            x: dataPoints.fraud.x, y: dataPoints.fraud.y, z: dataPoints.fraud.z,
                            mode: 'markers',
                            type: 'scatter3d',
                            marker: { color: '#F43F5E', size: 5 },
                            name: 'Fraud'
                        }
                    ]}
                    layout={{
                        autosize: true,
                        scene: {
                            camera: { eye: { x: 1.5, y: 1.5, z: 1.5 } },
                            xaxis: { showgrid: true, gridcolor: '#1e293b' },
                            yaxis: { showgrid: true, gridcolor: '#1e293b' },
                            zaxis: { showgrid: true, gridcolor: '#1e293b' },
                            bgcolor: '#0B1120'
                        },
                        paper_bgcolor: '#0B1120',
                        margin: { l: 0, r: 0, b: 0, t: 0 },
                        showlegend: false
                    }}
                    config={{ displayModeBar: false }}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        </div>
    );
};
