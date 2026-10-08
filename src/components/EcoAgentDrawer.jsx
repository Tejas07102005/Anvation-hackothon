import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  Bot, 
  Zap, 
  ShieldAlert, 
  Compass, 
  RefreshCw 
} from 'lucide-react';

export const EcoAgentDrawer = ({ 
  isOpen, 
  onClose, 
  recommendations, 
  onExecuteRecommendation,
  executedActions 
}) => {
  const [userQuery, setUserQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'agent',
      message: 'Greetings Commander. I am EcoAgent — your autonomous city waste intelligence co-pilot. I have scanned 6 sectors across 1,420 IoT bins. 3 zones currently require immediate collection to prevent municipal overflow.',
      timestamp: '15:52',
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    const query = userQuery;
    setUserQuery('');
    setChatHistory(prev => [...prev, {
      sender: 'user',
      message: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);

    setIsTyping(true);

    setTimeout(() => {
      let reply = "Processing municipal sensor graph...";
      const q = query.toLowerCase();

      if (q.includes('zone') || q.includes('overflow') || q.includes('immediate')) {
        reply = "Analysis: Market D (92% fill) and Industrial A (87% fill) are reaching critical overflow within 90 minutes. I have prepared dynamic dispatch vectors for Truck V04 and Truck V12 to alleviate 9.9 tons of accumulating waste.";
      } else if (q.includes('landfill') || q.includes('capacity')) {
        reply = "Current landfill intake is 42 T/day against 35 T/day capacity (+7 T/day accumulation). At this trajectory, 90% threshold will breach in 5 days. Recommendation: Divert 8 T/day of wet organic streams to Bio-methanation Unit 2.";
      } else if (q.includes('segregation') || q.includes('mixed')) {
        reply = "Citywide segregation score is 62/100. Mixed waste is high at 23% (Zone D is worst at 28% mixed). Recommendation: Deploy mobile AI bin camera enforcement in Market Zone D.";
      } else if (q.includes('vehicle') || q.includes('truck') || q.includes('v12')) {
        reply = "Fleet Status: 28 total vehicles active. Truck V12 en route to Zone A (ETA 8 mins). Truck V17 en route to Zone C (ETA 14 mins). Truck V04 ready for rapid dispatch to Zone D.";
      } else {
        reply = `EcoAgent Intelligence Response: Telemetry analyzed across all 6 zones. Recommended priority: Execute emergency collection in Market Zone D and activate Landfill organic diversion immediately.`;
      }

      setChatHistory(prev => [...prev, {
        sender: 'agent',
        message: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-xl h-full bg-[#0b1120] border-l border-slate-800 shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-[#0d1527]">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-cyan-500 p-0.5">
              <div className="w-full h-full bg-[#090e1a] rounded-[14px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#090e1a]"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold font-heading text-white">EcoAgent AI Intelligence</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  ONLINE
                </span>
              </div>
              <p className="text-xs text-slate-400">Autonomous Municipal Decision Engine</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Priority Actions Banner */}
        <div className="p-4 bg-emerald-950/20 border-b border-emerald-900/40">
          <div className="flex items-center justify-between text-xs text-emerald-300 font-mono font-bold uppercase tracking-wider mb-2">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              Autonomous Action Queue
            </span>
            <span>{recommendations.length} Pending</span>
          </div>

          <div className="space-y-2.5">
            {recommendations.map((rec) => {
              const isExecuted = executedActions.includes(rec.id);
              return (
                <div 
                  key={rec.id} 
                  className={`p-3 rounded-xl border text-xs transition-all ${
                    isExecuted 
                      ? 'bg-slate-900/60 border-slate-800 text-slate-400 opacity-60' 
                      : 'bg-slate-900/90 border-slate-700/80 hover:border-emerald-500/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <span>{rec.id === 'rec-1' ? '🔴' : rec.id === 'rec-2' ? '🟠' : '🟡'}</span>
                      <span>"{rec.text}"</span>
                    </div>
                    {isExecuted && (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" /> Executed
                      </span>
                    )}
                  </div>
                  <p className="text-slate-300 mt-1 text-[11px] leading-relaxed">{rec.details}</p>
                  <div className="text-emerald-400 font-mono text-[10px] mt-1.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> {rec.impact}
                  </div>

                  {!isExecuted && (
                    <button
                      onClick={() => onExecuteRecommendation(rec)}
                      className="mt-2.5 w-full py-1.5 px-3 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                    >
                      <span>{rec.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Chat Console */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans">
          <div className="text-[11px] text-center font-mono text-slate-500 py-1">
            —— Live Natural Language Copilot ——
          </div>

          {chatHistory.map((item, index) => (
            <div 
              key={index}
              className={`flex flex-col ${item.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div 
                className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                  item.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-lg'
                }`}
              >
                {item.message}
              </div>
              <span className="text-[9px] font-mono text-slate-500 mt-1 px-1">
                {item.timestamp}
              </span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 text-slate-400 text-xs p-2">
              <Bot className="w-4 h-4 text-emerald-400 animate-spin" />
              <span>EcoAgent computing dynamic waste vectors...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="p-3.5 border-t border-slate-800 bg-[#090d18] flex items-center gap-2">
          <input
            type="text"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder="Ask EcoAgent (e.g. 'Reroute trucks', 'Landfill risk')..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/70"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
