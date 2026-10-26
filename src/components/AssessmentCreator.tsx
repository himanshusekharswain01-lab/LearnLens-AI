import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  BookOpen, 
  Plus, 
  CheckCircle2, 
  HelpCircle, 
  Sliders, 
  Send,
  Layers,
  ChevronDown,
  RefreshCw,
  Play
} from 'lucide-react';
import { DiagnosticAssessment, QuestionMetadata } from '../types';

interface AssessmentCreatorProps {
  onBack: () => void;
  onSaveAssessment: (newAssessment: DiagnosticAssessment) => void;
  onTakeAssessmentPreview: (assessment: DiagnosticAssessment) => void;
}

export const AssessmentCreator: React.FC<AssessmentCreatorProps> = ({
  onBack,
  onSaveAssessment,
  onTakeAssessmentPreview
}) => {
  const [subject, setSubject] = useState('Mathematics');
  const [classGrade, setClassGrade] = useState('Class 8');
  const [topic, setTopic] = useState('Linear Equations in One Variable');
  const [difficulty, setDifficulty] = useState<'Foundational' | 'Mixed' | 'Advanced'>('Mixed');
  const [questionCount, setQuestionCount] = useState(5);
  const [learningObjectives, setLearningObjectives] = useState(
    'Inverse operations balance, Transposition across equal sign, Distributive bracket expansion'
  );
  const [generating, setGenerating] = useState(false);
  const [generatedAssessment, setGeneratedAssessment] = useState<DiagnosticAssessment | null>(null);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const res = await fetch('/api/generate-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          classGrade,
          topic,
          difficulty,
          questionCount,
          learningObjectives: learningObjectives.split(',').map(s => s.trim())
        })
      });

      const json = await res.json();
      if (json.success && json.data) {
        const fullAssmt: DiagnosticAssessment = {
          id: `diag-${Date.now()}`,
          title: json.data.title || `Diagnostic Check: ${topic}`,
          subject,
          classGrade,
          topic,
          totalQuestions: json.data.questions?.length || questionCount,
          difficulty,
          learningObjectives: json.data.learningObjectives || [learningObjectives],
          questions: json.data.questions || [],
          createdAt: new Date().toISOString().split('T')[0],
          status: 'Active'
        };
        setGeneratedAssessment(fullAssmt);
      }
    } catch (err) {
      console.error('Assessment generation failed:', err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
              Psychometric Design Tool
            </span>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Diagnostic Assessment Generator
            </h1>
          </div>
        </div>
      </div>

      {/* Input Configuration Card */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Class / Grade</label>
            <input
              type="text"
              value={classGrade}
              onChange={(e) => setClassGrade(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Cognitive Depth</label>
            <select
              value={difficulty}
              onChange={(e: any) => setDifficulty(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:outline-none"
            >
              <option value="Foundational">Foundational (Recall & Understanding)</option>
              <option value="Mixed">Mixed (Bloom's Taxonomy Balanced)</option>
              <option value="Advanced">Advanced (Application & Reasoning)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
            Key Learning Objectives / Prerequisite Concepts to Diagnose
          </label>
          <textarea
            rows={2}
            value={learningObjectives}
            onChange={(e) => setLearningObjectives(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:outline-none"
            placeholder="e.g. Inverse operations balance, clearing denominators, distributing brackets"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={generating}
          className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {generating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>AI is generating diagnostic questions & distractor signals...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-indigo-200" />
              <span>Generate Diagnostic Assessment</span>
            </>
          )}
        </button>
      </div>

      {/* Generated Questions Preview */}
      {generatedAssessment && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-wrap gap-3">
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase">Assessment Ready</span>
              <h3 className="text-lg font-bold text-slate-900">{generatedAssessment.title}</h3>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                {['Recall', 'Understanding', 'Application', 'Reasoning'].map(cog => (
                  <span key={cog} className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    ✓ {cog}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => window.print()}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Print / PDF
              </button>
              <button
                onClick={() => onTakeAssessmentPreview(generatedAssessment)}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                Preview Student Test Mode
              </button>
              <button
                onClick={() => onSaveAssessment(generatedAssessment)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Assign to Class 8-A
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {generatedAssessment.questions.map((q, idx) => (
              <div key={q.id || idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between text-xs flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold">
                      Q{idx + 1}
                    </span>
                    <span className="font-semibold text-slate-800">{q.concept} • {q.subConcept}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-semibold text-[11px]">
                      Cognitive: {q.cognitiveLevel}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-medium text-[11px]">
                      {q.difficulty}
                    </span>
                  </div>
                </div>

                {q.learningObjective && (
                  <div className="text-[11px] text-indigo-700 font-medium">
                    <strong>Target Learning Objective:</strong> {q.learningObjective}
                  </div>
                )}

                <div className="text-sm font-semibold text-slate-900">{q.questionText}</div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.options.map((opt, oIdx) => (
                    <div
                      key={oIdx}
                      className={`p-2.5 rounded-lg border ${
                        opt.isCorrect
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="font-bold mb-0.5 flex items-center justify-between">
                        <span>Option {opt.label}: {opt.text}</span>
                        {opt.isCorrect && <span className="text-emerald-700 font-extrabold text-[11px]">✓ Correct</span>}
                      </div>
                      <div className="text-[11px] text-slate-500 italic mt-1">
                        <strong>Diagnostic Signal:</strong> {opt.diagnosticSignal}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Solution Walkthrough and Misconception Trigger */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                  {q.expectedAnswer && (
                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
                      <strong>Expected Answer:</strong> {q.expectedAnswer}
                      {q.solutionWalkthrough && <p className="mt-0.5 text-emerald-800">{q.solutionWalkthrough}</p>}
                    </div>
                  )}
                  {q.commonMisconceptionTriggered && (
                    <div className="p-2 rounded-lg bg-amber-50 text-amber-900 border border-amber-200">
                      <strong>Triggered Misconception:</strong> {q.commonMisconceptionTriggered}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
