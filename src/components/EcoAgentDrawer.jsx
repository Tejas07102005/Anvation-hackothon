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
  RefreshCw,
  Terminal,
  Layers,
  HelpCircle,
  Truck,
  Activity,
  FileText,
  Clock,
  Play
} from 'lucide-react';
import { 
  answerJudgeQuery, 
  get_realtime_bins, 
  get_historical_waste, 
  get_landfill_status, 
  predict_landfill_capacity, 
  detect_collection_failures, 
  calculate_segregation_score, 
  find_high_risk_zones, 
  optimize_vehicle_routes, 
  create_collection_task, 
  generate_daily_report 
} from '../services/ecoAgentTools';
import { queryEcoAgent, executeAgentTool } from '../services/api';

export const EcoAgentDrawer = ({ 
  isOpen, 
  onClose, 
  recommendations = [], 
  onExecuteRecommendation,
  executedActions = [],
  onNavigateScreen
}) => {
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'tools' | 'actions'
  const [userQuery, setUserQuery] = useState('');
  const [activeToolResult, setActiveToolResult] = useState(null);
  const [selectedToolName, setSelectedToolName] = useState('find_high_risk_zones');
  
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'agent',
      message: 'Greetings Commander. I am EcoAgent — your autonomous city waste intelligence co-pilot. I analyze telemetry, predict municipal risk, and dispatch vehicles. How can I assist municipal operations today?',
      timestamp: '16:00',
      tools: []
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  // The 3 Explicit Judge Questions from Hackathon Brief
  const judgeQuestions = [
    {
      label: 'Which zones need collection now?',
      icon: '🚨',
      query: 'Which zones need collection now?'
    },
    {
      label: 'Why is Market Zone high risk?',
      icon: '🛍️',
      query: 'Why is Market Zone high risk?'
    },
    {
      label: 'What is the biggest problem today?',
      icon: '⚠️',
      query: 'What is the biggest problem today?'
    }
  ];

  // The 10 Operational Tool Definitions
  const toolsList = [
    { id: 'find_high_risk_zones', name: 'find_high_risk_zones()', fn: find_high_risk_zones, desc: 'Rank sectors by weighted multi-factor municipal risk formula' },
    { id: 'get_realtime_bins', name: 'get_realtime_bins()', fn: get_realtime_bins, desc: 'Query IoT sensor telemetry across distributed smart bins' },
    { id: 'get_historical_waste', name: 'get_historical_waste()', fn: () => get_historical_waste(30), desc: 'Analyze 30-day volume trends and Saturday +28.6% surge' },
    { id: 'get_landfill_status', name: 'get_landfill_status()', fn: get_landfill_status, desc: 'Inspect current 78% capacity, 42 T/day intake and 35 T/day processing' },
    { id: 'predict_landfill_capacity', name: 'predict_landfill_capacity()', fn: () => predict_landfill_capacity(42, 35, 7), desc: 'Compute excess accumulation (+7 T/day) and 7-day saturation runway' },
    { id: 'detect_collection_failures', name: 'detect_collection_failures()', fn: detect_collection_failures, desc: 'Detect GPS schedule variance (86% on-time, 9% delayed, 5% missed)' },
    { id: 'calculate_segregation_score', name: 'calculate_segregation_score()', fn: () => calculate_segregation_score(), desc: 'Audit wet/dry/mixed streams; flag Zone D 41% mixed contamination' },
    { id: 'optimize_vehicle_routes', name: 'optimize_vehicle_routes()', fn: () => optimize_vehicle_routes(), desc: 'Run priority-to-capacity matching & calculate 11.4 km route savings' },
    { id: 'create_collection_task', name: 'create_collection_task()', fn: () => create_collection_task('ZONE-D', 'V12', 'CRITICAL'), desc: 'Issue high-priority autonomous dispatch directive to MDT' },
    { id: 'generate_daily_report', name: 'generate_daily_report()', fn: generate_daily_report, desc: 'Generate executive daily municipal solid waste summary' }
  ];

  const handleRunTool = async (tool) => {
    setSelectedToolName(tool.name);
    try {
      // First attempt execution via FastAPI backend
      const backendResult = await executeAgentTool(tool.id);
      if (backendResult && !backendResult.error) {
        setActiveToolResult({ ...backendResult, source: 'FastAPI Backend (:8000)' });
        return;
      }
    } catch {
      // Fallback to local JS tool engine
    }

    try {
      const res = tool.fn();
      setActiveToolResult({ ...res, source: 'Local Tool Engine' });
    } catch (err) {
      setActiveToolResult({ error: err.message });
    }
  };

  const handleAskJudgeQuestion = async (questionText) => {
    setUserQuery('');
    setChatHistory(prev => [...prev, {
      sender: 'user',
      message: questionText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);

    setIsTyping(true);

    try {
      // Call FastAPI Agent endpoint
      const apiRes = await queryEcoAgent(questionText);
      if (apiRes && apiRes.response) {
        setChatHistory(prev => [...prev, {
          sender: 'agent',
          message: apiRes.response,
          tools: apiRes.tools_called || [],
          source: 'FastAPI :8000',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
        setIsTyping(false);
        return;
      }
    } catch {
      // Fallback
    }

    // Local heuristic fallback
    const result = answerJudgeQuery(questionText);
    setChatHistory(prev => [...prev, {
      sender: 'agent',
      message: result.answer,
      tools: result.tools_called,
      source: 'Local Engine',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setIsTyping(false);
  };

  const handleSendMessage = async (e) => {
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

    try {
      const apiRes = await queryEcoAgent(query);
      if (apiRes && apiRes.response) {
        setChatHistory(prev => [...prev, {
          sender: 'agent',
          message: apiRes.response,
          tools: apiRes.tools_called || ['find_high_risk_zones()'],
          source: 'FastAPI :8000',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
        setIsTyping(false);
        return;
      }
    } catch {
      // Fallback
    }

    const result = answerJudgeQuery(query);
    setChatHistory(prev => [...prev, {
      sender: 'agent',
      message: result.answer,
      tools: result.tools_called || ['operational_inference'],
      source: 'Local Engine',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setIsTyping(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-xs animate-fadeIn">
      <div 
        className="w-full max-w-2xl h-full bg-white border-l border-slate-200 shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-emerald-100 border border-emerald-300 p-0.5 shadow-xs">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Bot className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-heading text-slate-900">EcoAgent AI Intelligence</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  OPERATIONAL CO-PILOT
                </span>
              </div>
              <p className="text-xs text-slate-500">Analyzes, Predicts and Acts • 10 Connected Tools</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center border-b border-slate-200 bg-slate-50 px-4">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold font-mono border-b-2 transition-all cursor-pointer ${
              activeTab === 'chat'
                ? 'border-emerald-500 text-emerald-700 bg-white shadow-xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>Judge Inquiries & Chat</span>
          </button>

          <button
            onClick={() => setActiveTab('tools')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold font-mono border-b-2 transition-all cursor-pointer ${
              activeTab === 'tools'
                ? 'border-cyan-500 text-cyan-700 bg-white shadow-xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>10 Operational Tools</span>
            <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 text-[10px]">10</span>
          </button>

          <button
            onClick={() => setActiveTab('actions')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold font-mono border-b-2 transition-all cursor-pointer ${
              activeTab === 'actions'
                ? 'border-amber-400 text-amber-300 bg-amber-950/20'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Action Queue</span>
            <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[10px]">{recommendations.length}</span>
          </button>
        </div>

        {/* TAB 1: Chat & Judge Q&A */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Judge Recommended Quick Inquiry Chips */}
            <div className="p-3.5 bg-gradient-to-r from-slate-50/90 via-slate-900/50 to-slate-50/90 border-b border-slate-200">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-2">
                <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Judge Quick Inquiry Prompts:
                </span>
                <span className="text-[10px] text-slate-500">Click to execute</span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {judgeQuestions.map((jq, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAskJudgeQuestion(jq.query)}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/70 border border-slate-200 hover:border-emerald-500/60 hover:bg-emerald-950/20 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 group-hover:text-emerald-700">
                      <span className="text-sm">{jq.icon}</span>
                      <span>"{jq.label}"</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 group-hover:text-emerald-600 flex items-center gap-1">
                      <span>Query</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans">
              {chatHistory.map((item, index) => (
                <div 
                  key={index}
                  className={`flex flex-col ${item.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div 
                    className={`max-w-[90%] rounded-2xl p-4 text-xs leading-relaxed ${
                      item.sender === 'user'
                        ? 'bg-emerald-600 text-slate-900 rounded-br-none shadow-md font-medium'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-xl'
                    }`}
                  >
                    {/* Tool invocation badge for agent messages */}
                    {item.sender === 'agent' && item.tools && item.tools.length > 0 && (
                      <div className="mb-2.5 pb-2 border-b border-slate-200/80 flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 font-bold flex items-center gap-1">
                          <Terminal className="w-3 h-3" /> Tools Invoked:
                        </span>
                        {item.tools.map((t, tidx) => (
                          <span key={tidx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="whitespace-pre-line font-sans text-slate-100 text-[13px] leading-relaxed">
                      {item.message}
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 mt-1 px-1">
                    {item.timestamp}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-slate-500 text-xs p-3 rounded-2xl bg-white/90 border border-slate-200 w-fit">
                  <Bot className="w-4 h-4 text-emerald-600 animate-spin" />
                  <span className="font-mono text-emerald-700">EcoAgent executing operational tool graph...</span>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3.5 border-t border-slate-200 bg-[#090d18] flex items-center gap-2">
              <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="Ask EcoAgent (e.g., 'Which zones need collection now?', 'Why is Market Zone high risk?')..."
                className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:border-emerald-500/70"
              />
              <button
                type="submit"
                className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-900 transition-colors cursor-pointer shadow-lg shadow-emerald-950"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        )}

        {/* TAB 2: 10 Operational Tools Inspector */}
        {activeTab === 'tools' && (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Tool Selection Sidebar */}
            <div className="w-full md:w-5/12 border-r border-slate-200 overflow-y-auto p-3 space-y-1.5 bg-[#090e1a]">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold px-2 py-1">
                Operational Tool Functions ({toolsList.length})
              </div>

              {toolsList.map((tool, idx) => {
                const isSelected = selectedToolName === tool.name;
                return (
                  <button
                    key={idx}
                    onClick={() => handleRunTool(tool)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-all cursor-pointer flex flex-col gap-1 border ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-200'
                        : 'bg-white/90 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-slate-900 text-[11px] truncate">{tool.name}</span>
                      <Play className="w-3 h-3 text-cyan-600" />
                    </div>
                    <span className="text-[10px] text-slate-500 line-clamp-1">{tool.desc}</span>
                  </button>
                );
              })}
            </div>

            {/* Tool Execution Inspector Console */}
            <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
              <div className="p-3 border-b border-slate-200 flex items-center justify-between bg-slate-950">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-600" />
                  <span className="text-xs font-mono font-bold text-cyan-300">{selectedToolName}</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  LIVE EXECUTION
                </span>
              </div>

              <div className="flex-1 p-4 overflow-y-auto font-mono text-xs">
                {activeToolResult ? (
                  <pre className="text-cyan-300 bg-slate-950/90 p-4 rounded-xl border border-slate-200 overflow-x-auto text-[11px] leading-relaxed">
                    {JSON.stringify(activeToolResult, null, 2)}
                  </pre>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center p-6">
                    <Terminal className="w-8 h-8 text-slate-600 mb-2" />
                    <p className="text-xs">Select any tool from the left to execute and view structured operational data.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: Action Queue */}
        {activeTab === 'actions' && (
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            <div className="flex items-center justify-between text-xs text-emerald-700 font-mono font-bold uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-600" />
                Autonomous Action Queue
              </span>
              <span>{recommendations.length} Directives</span>
            </div>

            {recommendations.map((rec) => {
              const isExecuted = executedActions.includes(rec.id);
              return (
                <div 
                  key={rec.id} 
                  className={`p-4 rounded-2xl border text-xs transition-all ${
                    isExecuted 
                      ? 'bg-white/90 border-slate-200 text-slate-500 opacity-60' 
                      : 'bg-white border-slate-300/80 hover:border-emerald-500/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{rec.id === 'rec-1' ? '🔴' : rec.id === 'rec-2' ? '🟠' : '🟡'}</span>
                      <span className="text-sm">"{rec.text}"</span>
                    </div>
                    {isExecuted && (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" /> Executed
                      </span>
                    )}
                  </div>
                  <p className="text-slate-700 mt-2 text-xs leading-relaxed">{rec.details}</p>
                  <div className="text-emerald-600 font-mono text-xs mt-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> {rec.impact}
                  </div>

                  {!isExecuted && (
                    <button
                      onClick={() => onExecuteRecommendation(rec)}
                      className="mt-3 w-full py-2 px-4 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-slate-900 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                    >
                      <span>{rec.actionLabel}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
