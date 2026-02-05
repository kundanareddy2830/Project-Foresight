import React from 'react';
import { Divide } from 'lucide-react';

interface KPICardProps {
    label: string;
    value: string;
    icon: React.ElementType;
    trend?: string;
    trendUp?: boolean; // Good or Bad?
    color: 'emerald' | 'amber' | 'crimson' | 'blue';
}

export const KPICard: React.FC<KPICardProps> = ({ label, value, icon: Icon, trend, trendUp, color }) => {
    const colorMap = {
        emerald: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
        amber: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
        crimson: 'bg-crimson-500/10 text-crimson-500 border-crimson-500/20',
        blue: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    };

    const textMap = {
        emerald: 'text-emerald-500',
        amber: 'text-amber-500',
        crimson: 'text-crimson-500',
        blue: 'text-blue-500',
    };

    return (
        <div className={`glass-panel p-4 rounded-xl border border-obsidian-700/50 backdrop-blur-md relative overflow-hidden group hover:border-obsidian-600 transition-all`}>
            <div className="flex justify-between items-start mb-2">
                <div className={`p-2 rounded-lg ${colorMap[color]}`}>
                    <Icon className="w-5 h-5" />
                </div>
                {trend && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${trendUp ? 'bg-emerald-500/20 text-emerald-400' : 'bg-crimson-500/20 text-crimson-400'}`}>
                        {trend}
                    </span>
                )}
            </div>
            <div className="mt-2">
                <div className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">{label}</div>
                <div className={`text-2xl font-mono font-bold text-slate-100 mt-0.5 group-hover:${textMap[color]} transition-colors`}>
                    {value}
                </div>
            </div>

            {/* Decorative Glow */}
            <div className={`absolute -right-6 -bottom-6 w-24 h-24 bg-${color}-500/5 rounded-full blur-2xl group-hover:bg-${color}-500/10 transition-all`}></div>
        </div>
    );
};
