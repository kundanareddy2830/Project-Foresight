import React from 'react';
import { LIVE_TRANSACTIONS } from '../data/mockData';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export const TransactionFeed = () => {
    return (
        <div className="glass-panel rounded-xl border border-obsidian-700/50 flex flex-col h-full">
            <div className="p-4 border-b border-obsidian-800 flex justify-between items-center bg-obsidian-900/50 rounded-t-xl">
                <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    LIVE TRANSACTIONS
                </h3>
                <span className="text-[10px] text-slate-500 font-mono">STREAMING via WEBSOCKET</span>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                {LIVE_TRANSACTIONS.map((tx) => (
                    <div key={tx.id} className="group flex items-center justify-between p-3 rounded-lg hover:bg-obsidian-800 transition-all border border-transparent hover:border-obsidian-700 cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className={`
                w-8 h-8 rounded-full flex items-center justify-center border
                ${tx.risk === 'CRITICAL' ? 'bg-crimson-500/10 border-crimson-500/30 text-crimson-500' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'}
              `}>
                                {tx.risk === 'CRITICAL' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-mono text-slate-300 font-bold">{tx.id}</span>
                                    <span className="text-[10px] text-slate-500">{tx.time}</span>
                                </div>
                                <div className="text-[10px] text-slate-400 font-mono">
                                    {tx.account} • {tx.type}
                                </div>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="text-sm font-bold text-slate-200 mono-font">{tx.amount}</div>
                            <div className={`text-[10px] font-bold ${tx.risk === 'CRITICAL' ? 'text-crimson-400' : 'text-emerald-400'}`}>
                                {tx.risk} ({tx.score})
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
