import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  Brain, 
  Users, 
  Target, 
  FileText, 
  ArrowRight,
  RotateCcw,
  BookOpen
} from 'lucide-react';

interface HackathonGuideProps {
  currentStep: number;
  onJumpStep: (step: number) => void;
  onResetDemo: () => void;
}

export const HackathonGuide: React.FC<HackathonGuideProps> = ({
  currentStep,
  onJumpStep,
  onResetDemo
}) => {
  const [minimized, setMinimized] = useState(false);

  const steps = [
    { num: 1, title: 'Diagnostic Dashboard', desc: 'Class-wide mastery & real-time misconception heatmap' },
    { num: 2, title: 'Dynamic Learning Groups', desc: 'Readiness categorization & manual teacher placement' },
    { num: 3, title: 'Misconception Analysis Lab', desc: 'Confidence scores, cognitive reasoning & targeted remediation' },
    { num: 4, title: 'Diagnostic Assessment Gen', desc: 'Recall, Understanding, Application, Reasoning taxonomy' },
    { num: 5, title: 'Prescriptive Action Center', desc: 'Starter lesson plan & Google Docs export' }
  ];

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="fixed bottom-4 right-4 z-40 px-4 py-2.5 rounded-full bg-slate-900 text-white border border-indigo-500/50 shadow-xl text-xs font-bold flex items-center gap-2 hover:bg-slate-800 transition-all cursor-pointer"
      >
        <Sparkles className="w-4 h-4 text-teal-400 animate-pulse" />
        <span>2-Minute Hackathon Demo Script</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-sm w-full bg-slate-950/95 backdrop-blur-md text-white rounded-2xl border border-indigo-500/40 p-4 shadow-2xl space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
            Judge Tour (2–3 Min)
          </span>
        </div>
        <button
          onClick={() => setMinimized(true)}
          className="text-slate-400 hover:text-white text-xs cursor-pointer"
        >
          Minimize
        </button>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed">
        Storyline: <strong className="text-white">Problem ➔ AI Diagnosis ➔ Teacher Action ➔ Real Learning</strong>
      </p>

      <div className="space-y-1.5">
        {steps.map((s) => (
          <button
            key={s.num}
            onClick={() => onJumpStep(s.num)}
            className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
              currentStep === s.num
                ? 'bg-indigo-600 text-white font-bold shadow-xs'
                : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full text-[10px] font-mono flex items-center justify-center font-bold ${
                currentStep === s.num ? 'bg-white text-indigo-900' : 'bg-slate-800 text-slate-400'
              }`}>
                {s.num}
              </span>
              <div>
                <div>{s.title}</div>
                <div className="text-[10px] text-slate-400 font-normal">{s.desc}</div>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px]">
        <button
          onClick={onResetDemo}
          className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" /> Reset Cohort Data
        </button>
        <span className="text-teal-400 font-medium">Class 8-A Ready</span>
      </div>
    </div>
  );
};
