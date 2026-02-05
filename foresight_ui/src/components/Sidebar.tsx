import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Radio,
    Search,
    Share2,
    Layers,
    Atom,
    Briefcase,
    BarChart3,
    Settings,
    ShieldCheck,
    Menu
} from 'lucide-react';


const MENU_ITEMS = [
    { path: '/', label: 'Global Command', icon: LayoutDashboard },
    { path: '/monitoring', label: 'Real-Time Monitoring', icon: Radio },
    { path: '/transactions', label: 'Transaction Explorer', icon: Search },
    { path: '/topology', label: 'Network Intelligence', icon: Share2 },
    { path: '/embedding', label: 'Embedding & Behavior', icon: Layers },
    { path: '/quantum', label: 'Quantum Risk Lab', icon: Atom, highlight: true },
    { path: '/investigation', label: 'Investigation Workspace', icon: Briefcase },
    { path: '/analytics', label: 'Analytics & Reports', icon: BarChart3 },
    { path: '/config', label: 'System Configuration', icon: Settings },
    { path: '/compliance', label: 'Compliance & Audit', icon: ShieldCheck },
];

export const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-obsidian-950 border-r border-obsidian-800 flex flex-col fixed left-0 top-0 z-50">
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-obsidian-800">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-400 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-emerald-500/20">
                    <ShieldCheck className="w-5 h-5 text-obsidian-950" />
                </div>
                <div>
                    <h1 className="text-sm font-bold tracking-wider text-slate-100">FORESIGHT</h1>
                    <p className="text-[10px] text-amber-500 font-mono tracking-widest">ENTERPRISE OS</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {MENU_ITEMS.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
              flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
              ${isActive
                                ? 'bg-obsidian-800 text-emerald-400 border border-obsidian-700 shadow-sm'
                                : 'text-slate-400 hover:bg-obsidian-800/50 hover:text-slate-200'
                            }
              ${item.highlight ? 'mt-6 mb-2 border border-amber-500/20 bg-amber-500/5' : ''}
            `}
                    >
                        <item.icon className={`
              w-4 h-4 mr-3 transition-colors
              ${item.highlight ? 'text-amber-500' : ''}
            `} />
                        <span className={item.highlight ? 'text-amber-100' : ''}>{item.label}</span>

                        {item.highlight && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* System Status Footer */}
            <div className="p-4 border-t border-obsidian-800 bg-obsidian-900/50">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase text-slate-500 font-bold">System Status</span>
                    <span className="flex items-center text-[10px] text-emerald-500 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                        ONLINE
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase text-slate-500 font-bold">Quantum Core</span>
                    <span className="flex items-center text-[10px] text-amber-500 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5" />
                        ACTIVE
                    </span>
                </div>
                <div className="mt-3 text-[10px] text-slate-600 font-mono text-center">
                    Latency: 12ms
                </div>
            </div>
        </div>
    );
};
