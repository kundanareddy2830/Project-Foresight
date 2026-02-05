
import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

export const EnergyLandscape = ({ bias = 0 }: { bias?: number }) => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        // Generate Energy Surface (Simulated Hamiltonian Cost Function)
        const size = 30;
        const x = [], y = [], z = [];

        for (let i = -size; i < size; i++) {
            const rowX = [], rowY = [], rowZ = [];
            for (let j = -size; j < size; j++) {
                const u = i / 10;
                const v = j / 10;

                // Base Hamiltonian (Symmetric Bowl)
                let energy = (u * u + v * v) * 0.5;

                // Add Bias (The "Classical Potential" from QSVC)
                // Warps the bowl to create a new minimum at |10>
                // Use prop bias or default animation if not provided (for older usage)
                const activeBias = bias || (Math.sin(Date.now() / 2000) * 0.5 + 0.5);

                if (u > 0) {
                    energy -= (u * activeBias * 2); // Tilt
                }

                rowX.push(u);
                rowY.push(v);
                rowZ.push(energy);
            }
            x.push(rowX);
            y.push(rowY);
            z.push(rowZ);
        }

        setData([{
            z: z,
            type: 'surface',
            contours: {
                z: { show: true, usecolormap: true, highlightcolor: "#42f462", project: { z: true } }
            },
            colorscale: 'Viridis',
            showscale: false
        }]);

    }, [bias]); // Update when bias prop changes

    return (
        <div className="w-full h-[400px] bg-obsidian-900 rounded-xl overflow-hidden relative">
            <div className="absolute top-4 left-4 z-10">
                <h4 className="text-xs font-bold text-slate-300">HAMILTONIAN ENERGY SURFACE (H)</h4>
                <span className="text-[10px] text-amber-500 font-mono">Simulating VQE Cost Function</span>
            </div>
            {data && (
                <Plot
                    data={data}
                    layout={{
                        width: 600,
                        height: 400,
                        autosize: true,
                        margin: { l: 0, r: 0, b: 0, t: 0 },
                        scene: {
                            camera: { eye: { x: 1.5, y: 1.5, z: 1.5 } },
                            xaxis: { showgrid: false, zeroline: false, showticklabels: false },
                            yaxis: { showgrid: false, zeroline: false, showticklabels: false },
                            zaxis: { showgrid: false, zeroline: false, showticklabels: false },
                            bgcolor: '#0B1120'
                        },
                        paper_bgcolor: '#0B1120',
                    }}
                    config={{ displayModeBar: false }}
                    style={{ width: '100%', height: '100%' }}
                />
            )}
        </div>
    );
};
