'use client';

import React from 'react';
import { Activity, TrendingUp, AlertTriangle, CheckCircle2, Sparkles, RefreshCw, Calendar, Zap, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInsights, useRefreshInsights } from '@/hooks/useInsights';
import { useWeeklySummary } from '@/hooks/useWeeklySummary';

const insightConfig: Record<string, { icon: React.ComponentType<{ className?: string; size?: number }>; iconColor: string; bgColor: string }> = {
  consistency: { icon: CheckCircle2, iconColor: 'text-green-600', bgColor: 'bg-green-50' },
  fatigue: { icon: AlertTriangle, iconColor: 'text-orange-600', bgColor: 'bg-orange-50' },
  recovery: { icon: Activity, iconColor: 'text-blue-600', bgColor: 'bg-blue-50' },
  motivation: { icon: Zap, iconColor: 'text-purple-600', bgColor: 'bg-purple-50' },
  performance: { icon: TrendingUp, iconColor: 'text-green-600', bgColor: 'bg-green-50' },
};

const InsightsPage = () => {
  const { data: insightsRes, isLoading: insightsLoading } = useInsights();
  const { data: summaryRes } = useWeeklySummary();
  const { mutate: refreshInsights, isPending: isRefreshing } = useRefreshInsights();

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  if (insightsLoading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>;

  const aiInsights = insightsRes?.data || [];
  const latestSummary = summaryRes?.data?.summary;
  const recoveryScore = latestSummary?.consistency_score || 75;
  const recoveryStatus = recoveryScore >= 90 ? 'High' : recoveryScore >= 70 ? 'Medium' : 'Low';

  const insights = aiInsights.map((insight: any) => {
    const config = insightConfig[insight.type] || insightConfig.performance;
    const dateObj = new Date(insight.created_at);
    const now = new Date();
    const diffHours = Math.round((now.getTime() - dateObj.getTime()) / (1000 * 60 * 60));
    const timeAgo = diffHours < 24 ? `${diffHours}h ago` : diffHours < 48 ? 'Yesterday' : `${Math.round(diffHours / 24)}d ago`;
    return { type: insight.type?.toUpperCase() || 'INSIGHT', icon: config.icon, iconColor: config.iconColor, bgColor: config.bgColor, time: timeAgo, title: (insight.type?.charAt(0).toUpperCase() + insight.type?.slice(1)) + ' Insight', message: insight.content };
  });

  return (
    <motion.div className="max-w-7xl mx-auto space-y-6" initial="hidden" animate="visible" variants={containerVariants}>
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold text-gray-800">AI Insights</h1><p className="text-gray-500 mt-1">Deep analysis of your performance metrics and physiological data</p></div>
        <motion.button onClick={() => refreshInsights()} disabled={isRefreshing} className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white rounded-xl font-semibold transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          {isRefreshing ? <Loader2 size={18} className="animate-spin" /> : <RefreshCw size={18} />}<span>Refresh Insights</span>
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Recovery Status */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex items-center gap-2 mb-6"><div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center"><Activity className="text-green-600" size={18} /></div><span className="text-sm font-semibold text-green-600 uppercase tracking-wide">The Big Picture</span></div>
            <div className="flex items-center gap-8">
              <div className="relative w-40 h-40">
                <svg className="w-40 h-40 transform -rotate-90"><circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="none" className="text-gray-200" /><motion.circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="none" strokeDasharray={`${2 * Math.PI * 70}`} className="text-blue-500" strokeLinecap="round" initial={{ strokeDashoffset: 2 * Math.PI * 70 }} animate={{ strokeDashoffset: 2 * Math.PI * 70 * (1 - recoveryScore / 100) }} transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }} /></svg>
                <motion.div className="absolute inset-0 flex items-center justify-center" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.5 }}><div className="text-center"><div className="text-4xl font-bold text-gray-800">{recoveryScore}</div><div className="text-sm text-gray-500">Score</div></div></motion.div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Recovery Status: {recoveryStatus}</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">Based on your logged sessions and consistency score, you&apos;re in {recoveryStatus.toLowerCase() === 'high' ? 'excellent' : 'good'} condition for training.</p>
                <div className="flex gap-3">
                  <motion.button className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Start Peak Workout</motion.button>
                  <motion.button className="px-6 py-2.5 border-2 border-gray-300 hover:bg-gray-50 rounded-xl font-semibold text-gray-700 transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>View Details</motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* All Insights */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm">
            <div className="p-6 border-b border-gray-200"><div className="flex items-center gap-4"><button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium text-sm">All Insights</button></div></div>
            <div className="divide-y divide-gray-200">
              {insights.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No insights generated yet. Click &quot;Refresh Insights&quot; to generate.</div>
              ) : insights.map((insight: any, index: number) => (
                <motion.div key={index} className="p-6 hover:bg-gray-50 transition-colors" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.15 + 0.6 }} whileHover={{ x: 4 }}>
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 ${insight.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}><insight.icon className={insight.iconColor} size={24} /></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2"><span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{insight.type}</span><span className="text-xs text-gray-400">•</span><span className="text-xs text-gray-500">{insight.time}</span></div>
                      <h4 className="font-bold text-gray-800 mb-2">{insight.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{insight.message}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl shadow-lg p-6 text-white" whileHover={{ scale: 1.02 }}>
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4"><Sparkles className="text-white" size={24} /></div>
            <h3 className="text-xl font-bold mb-2">Pro Coaching</h3>
            <p className="text-sm text-white/90 mb-4 leading-relaxed">Get AI 1-on-1 reviews of these insights with a human coach.</p>
            <motion.button className="w-full py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Upgrade Now</motion.button>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4"><Calendar className="text-blue-500" size={20} /><h3 className="font-bold text-gray-800">Next Check-In</h3></div>
            <div className="text-center py-4"><div className="text-3xl font-bold text-gray-800 mb-1">In 4h</div><p className="text-sm text-gray-500">Weekly progress analysis</p></div>
            <motion.button className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>Schedule Now</motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default InsightsPage;