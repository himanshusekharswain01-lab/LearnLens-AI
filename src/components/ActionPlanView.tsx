import React from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Clock, 
  Layers, 
  Users, 
  CheckCircle2, 
  HelpCircle, 
  FileText,
  AlertCircle,
  TrendingUp,
  Share2
} from 'lucide-react';
import { TeacherActionPlan } from '../types';

interface ActionPlanViewProps {
  actionPlan: TeacherActionPlan;
  onBack: () => void;
  onExportDocs: () => void;
}

export const ActionPlanView: React.FC<ActionPlanViewProps> = ({
  actionPlan,
  onBack,
  onExportDocs
}) => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                Prescriptive Teaching Roadmap
              </span>
              <span className="text-xs text-slate-500">Class 8-A Mathematics</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Today's Prescriptive Action Center
            </h1>
          </div>
        </div>

        <button
          onClick={onExportDocs}
          className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all flex items-center gap-2 cursor-pointer"
        >
          <FileText className="w-4 h-4" />
          Export Lesson Plan to Docs
        </button>
      </div>

      {/* Hero Recommendation Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white shadow-lg space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950 border border-teal-800/80 text-teal-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          Evidence-Backed Directive (DATA ➔ INSIGHT ➔ ACTION)
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
          {actionPlan.headlineRecommendation}
        </h2>
        <p className="text-sm text-indigo-100/80 leading-relaxed max-w-3xl">
          Based on the diagnostic assessment, 7 out of 30 students displayed the specific sign reversal error on transposition. 
          Targeting this root misconception for 10 minutes prevents cumulative compounding errors during simultaneous and quadratic algebra.
        </p>
      </div>

      {/* 45-Minute Classroom Timeline Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1: Starter Routine */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
              Min 00 - 10: Anchor
            </span>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            {actionPlan.startLessonWith.title}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {actionPlan.startLessonWith.activitySummary}
          </p>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700">
            <strong>Why:</strong> {actionPlan.startLessonWith.rationale}
          </div>
        </div>

        {/* Step 2: Differentiated Grouping */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
              Min 10 - 35: Triad Directives
            </span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Differentiated Triad Rotations
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Split the room into 3 evidence-backed tracks. Teacher focuses 15 minutes of direct small-group guidance with Group C.
          </p>
          <div className="space-y-2 text-xs">
            <div className="p-2 rounded bg-amber-50 text-amber-900 border border-amber-200">
              <strong>Group C (7 stds):</strong> Hands-on zero-pair color blocks.
            </div>
            <div className="p-2 rounded bg-indigo-50 text-indigo-900 border border-indigo-200">
              <strong>Group B (12 stds):</strong> Guided fraction clearing pairs.
            </div>
            <div className="p-2 rounded bg-emerald-50 text-emerald-900 border border-emerald-200">
              <strong>Group A (11 stds):</strong> Autonomous geometry equations.
            </div>
          </div>
        </div>

        {/* Step 3: Exit Ticket Strategy */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
              Min 35 - 45: Verification
            </span>
            <TrendingUp className="w-4 h-4 text-slate-400" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Rapid 3-Question Exit Ticket
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {actionPlan.exitTicketStrategy.questionSummary}
          </p>
          <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-xs text-purple-900">
            <strong>Pass Threshold:</strong> {actionPlan.exitTicketStrategy.targetSuccessThreshold} to verify that sign reversal is cured before moving to inequalities.
          </div>
        </div>
      </div>

      {/* Key Misconception Deep Dive with Classroom Talking Points */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600">
          <AlertCircle className="w-4 h-4" />
          Critical Misconception Talking Points & Counter-Example
        </div>
        <h3 className="text-lg font-bold text-slate-900">
          {actionPlan.keyMisconceptionToAddress.misconception}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="font-bold text-slate-800">Classroom Talking Point for Teacher:</div>
            <p className="text-slate-600 leading-relaxed italic">
              "{actionPlan.keyMisconceptionToAddress.talkingPoint}"
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="font-bold text-slate-800">Counter-Example to Put on Board:</div>
            <p className="text-slate-600 leading-relaxed">
              {actionPlan.keyMisconceptionToAddress.counterExample}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
