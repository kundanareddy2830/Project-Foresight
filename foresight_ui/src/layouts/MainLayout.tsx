import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Bell, Search, User } from 'lucide-react';

export const MainLayout = () => {
    return (
        <div className="min-h-screen bg-obsidian-950 font-sans text-slate-200">
            <Sidebar />

            {/* Main Content Area */}
            <div className="pl-64 flex flex-col min-h-screen">

                {/* Top Bar (Status Strip) */}
                <header className="h-16 bg-obsidian-900/80 backdrop-blur-md border-b border-obsidian-800 flex items-center justify-between px-6 sticky top-0 z-40">

                    {/* Left: Environment Info */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2"></span>
                            <span className="text-xs font-mono text-emerald-500 font-bold tracking-wide">HDFC – PROD | REAL-TIME</span>
                        </div>
                        <div className="h-4 w-px bg-obsidian-700"></div>
                        <span className="text-xs text-slate-400 font-mono">HYBRID AI + QUANTUM</span>
                    </div>

                    {/* Right: User Profile & Actions */}
                    <div className="flex items-center space-x-6">

                        {/* Search */}
                        <div className="relative group">
                            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-emerald-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search Transaction ID..."
                                className="bg-obsidian-950 border border-obsidian-800 rounded-full py-1.5 pl-9 pr-4 text-xs w-64 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all text-slate-300 placeholder-slate-600"
                            />
                        </div>

                        {/* Alerts */}
                        <button className="relative p-2 hover:bg-obsidian-800 rounded-full transition-colors">
                            <Bell className="w-5 h-5 text-slate-400" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-crimson-500 rounded-full border border-obsidian-900"></span>
                        </button>

                        {/* Profile */}
                        <div className="flex items-center space-x-3 pl-6 border-l border-obsidian-800">
                            <div className="text-right hidden md:block">
                                <div className="text-xs font-bold text-slate-200">Lead Analyst</div>
                                <div className="text-[10px] text-slate-500">Global Risk Team</div>
                            </div>
                            <div className="w-8 h-8 bg-slate-700/50 rounded-full flex items-center justify-center border border-slate-600">
                                <User className="w-4 h-4 text-slate-400" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-x-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
