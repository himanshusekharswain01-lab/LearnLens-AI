import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Brain, 
  Compass, 
  Users, 
  Target, 
  BookOpen, 
  Award,
  Layers,
  ChevronRight,
  BarChart3,
  HelpCircle
} from 'lucide-react';

interface LandingPageProps {
  onStartDemo: () => void;
  onOpenAssessment: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartDemo, onOpenAssessment }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      {/* Top Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-teal-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400 font-heading">
                LearnLens AI
              </span>
              <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800/60">
                IIT-B Inspired EdTech
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#problem" className="hover:text-white transition-colors">The Dilemma</a>
            <a href="#solution" className="hover:text-white transition-colors">Diagnostic AI</a>
            <a href="#workflow" className="hover:text-white transition-colors">How It Works</a>
            <a href="#differentiator" className="hover:text-white transition-colors">Why LearnLens</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onStartDemo}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Demo Class 8
            </button>
            <button
              onClick={onStartDemo}
              className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-indigo-200" />
              Teacher Portal
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-900 to-slate-900 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-800/60 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Diagnostic Intelligence + Adaptive Remediation
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
              Don’t teach the average.{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-indigo-300 to-purple-400">
                Teach what each learner actually needs.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8">
              A revolutionary platform that equips educators with psychometric diagnostic AI: 
              detecting underlying student misconceptions, classifying learning levels with evidence, 
              and generating actionable 10-minute classroom interventions.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onStartDemo}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold bg-gradient-to-r from-indigo-500 to-teal-400 text-slate-950 hover:brightness-110 shadow-xl shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
              >
                <span>Launch Interactive Demo</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={onOpenAssessment}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold bg-slate-800/90 hover:bg-slate-700/90 text-white border border-slate-700 transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
              >
                <BookOpen className="w-5 h-5 text-teal-400" />
                <span>Create Diagnostic Test</span>
              </button>
            </div>
          </div>

          {/* Educational AI Visual / Dashboard Preview */}
          <div className="relative rounded-2xl border border-slate-800 bg-slate-950/70 p-4 sm:p-6 shadow-2xl backdrop-blur-sm max-w-5xl mx-auto">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 text-xs font-mono text-slate-400">Class 8-A Mathematics • Diagnostic Analysis • Live</span>
              </div>
              <span className="text-xs font-medium px-2.5 py-1 rounded bg-teal-950 text-teal-300 border border-teal-800/50">
                Confidence 91% • 30/30 Assessed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="text-xs font-medium text-slate-400 mb-1">Detected Common Misconception</div>
                <div className="text-sm font-bold text-amber-400 mb-2">Inverse Operations Sign Reversal</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  7 students repeatedly repeated positive addition when transposing across the equal sign (e.g., 2x + 4 = 10 ➔ 2x = 14).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="text-xs font-medium text-slate-400 mb-1">Teacher Action Directive</div>
                <div className="text-sm font-bold text-teal-300 mb-2">10-Min Two-Pan Balance Starter</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Start tomorrow’s lesson with a zero-pair balance model before moving to multi-step equations.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="text-xs font-medium text-slate-400 mb-1">Differentiated Class Triad</div>
                <div className="text-sm font-bold text-indigo-300 mb-2">Groupings Ready</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  11 Ready for Extension • 12 Developing • 7 Need Targeted Intervention.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-20 border-t border-slate-800/80 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">The Classroom Dilemma</h2>
            <p className="text-3xl font-extrabold text-white">Why Conventional Teaching Fails Every Student</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/60">
              <div className="w-12 h-12 rounded-xl bg-rose-950/60 text-rose-400 border border-rose-800/50 flex items-center justify-center mb-5 font-bold text-lg">
                01
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Teaching in the Dark</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Teachers start curriculum chapters assuming prior mastery. In reality, half the room has latent gaps in prerequisites like integer signs or fraction reduction.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/60">
              <div className="w-12 h-12 rounded-xl bg-amber-950/60 text-amber-400 border border-amber-800/50 flex items-center justify-center mb-5 font-bold text-lg">
                02
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Marks Hide Misconceptions</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                A student scoring 40% tells the teacher nothing about WHY they missed questions. Is it careless calculation, procedural confusion, or conceptual inversion?
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/60">
              <div className="w-12 h-12 rounded-xl bg-indigo-950/60 text-indigo-400 border border-indigo-800/50 flex items-center justify-center mb-5 font-bold text-lg">
                03
              </div>
              <h3 className="text-lg font-bold text-white mb-2">No Time for Remediation</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                With 40+ students per class, tailoring differentiated homework and guided steps manually is an impossible administrative burden for teachers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution & Core Innovation */}
      <section id="solution" className="py-20 border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-2">The LearnLens Architecture</h2>
            <p className="text-3xl font-extrabold text-white">Diagnostic Intelligence + AI-Powered Remediation</p>
            <p className="text-slate-400 text-sm mt-3">Converting raw student clicks into high-impact teaching decisions.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-teal-950 text-teal-400 border border-teal-800/60 flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">Sub-Concept Question Mapping</h4>
                  <p className="text-sm text-slate-300">
                    Every diagnostic item tracks cognitive level (Recall, Understanding, Application, Reasoning) with diagnostic distractors that expose specific error pathways.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-950 text-indigo-400 border border-indigo-800/60 flex items-center justify-center">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">Misconception Detection with Confidence</h4>
                  <p className="text-sm text-slate-300">
                    Distinguishes careless slips from deeply ingrained misconceptions with calibrated confidence scores (e.g., 91% confidence sign reversal).
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-950 text-purple-400 border border-purple-800/60 flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">Teacher Action Center</h4>
                  <p className="text-sm text-slate-300">
                    Does not merely produce passive charts: provides a prescriptive 45-minute lesson plan with exact starter routines and talking points.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Comparison Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">The Hackathon Differentiator</span>
                <h3 className="text-xl font-extrabold text-white mt-1">From Marks to Teacher Action</h3>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-rose-900/30">
                <div className="text-xs font-bold text-rose-400 mb-1">Traditional Assessment Platform</div>
                <div className="text-base text-slate-300 font-medium">“Student Rahul scored 33% (2/6 correct). Needs Improvement.”</div>
                <p className="text-xs text-slate-500 mt-2">Zero diagnostic context, no guidance on what concept failed or how to help.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-teal-800/50 shadow-inner">
                <div className="text-xs font-bold text-teal-400 mb-1">LearnLens AI Diagnostic Engine</div>
                <div className="text-base text-slate-100 font-medium leading-snug">
                  “Rahul struggles with Inverse Operations due to systematic sign reversal on transposition (+4 repeated on RHS). 
                  6 other students share this exact gap. Begin tomorrow’s lesson with a 10-minute physical balance scale intervention.”
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-teal-300">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  Actionable • Personalized • Automated Google Docs Export
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="py-20 border-t border-slate-800 bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Seamless 5-Step Cycle</h2>
            <p className="text-3xl font-extrabold text-white">How LearnLens Empowers Teachers</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { step: '01', title: 'Assess', desc: 'Create diagnostic check with mapped cognitive levels.' },
              { step: '02', title: 'Analyze', desc: 'AI evaluates student responses and distractor patterns.' },
              { step: '03', title: 'Diagnose', desc: 'Isolate root misconceptions and concept mastery matrix.' },
              { step: '04', title: 'Remediate', desc: 'Auto-generate 12-min scaffolding activities & AI tutor chat.' },
              { step: '05', title: 'Improve', desc: 'Deliver exit ticket & track cohort trajectory over time.' }
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl bg-slate-800/60 border border-slate-700/60 relative">
                <div className="text-xs font-mono font-bold text-teal-400 mb-2">{item.step}</div>
                <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Footer */}
      <footer className="py-16 border-t border-slate-800 bg-slate-950 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Ready to experience diagnostic teaching in action?
          </h2>
          <p className="text-slate-400 text-sm mb-8">
            Experience the complete Class 8 Mathematics diagnostic dataset pre-loaded and ready for hackathon review.
          </p>
          <button
            onClick={onStartDemo}
            className="px-8 py-4 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/30 transition-all inline-flex items-center gap-2 cursor-pointer text-base"
          >
            <span>Enter Teacher Dashboard</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
};
