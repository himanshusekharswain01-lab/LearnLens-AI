import React from 'react';
import { 
  ArrowLeft, 
  Brain, 
  Target, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  BookOpen, 
  Activity, 
  Send,
  Layers,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { StudentProfile } from '../types';

interface StudentProfileModalProps {
  student: StudentProfile | null;
  onClose: () => void;
  onOpenTutor: (student: StudentProfile) => void;
  onAnalyzeInLab?: (student: StudentProfile) => void;
  onUpdateStudent?: (student: StudentProfile) => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  student,
  onClose,
  onOpenTutor,
  onAnalyzeInLab,
  onUpdateStudent
}) => {
  if (!student) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="sticky top-0 bg-white/90 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-200"
              />
              <div>
                <h2 className="text-lg font-bold text-slate-900">{student.name}</h2>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>{student.classGrade}</span>
                  <span>•</span>
                  <span>Roll #{student.rollNumber}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-end">
            {onUpdateStudent && (
              <select
                value={student.readinessGroup || 'Developing Understanding'}
                onChange={(e) => {
                  const target = e.target.value as any;
                  onUpdateStudent({
                    ...student,
                    readinessGroup: target,
                    isManuallyPlaced: true,
                    placementReason: `Manually set to ${target} via student modal`
                  });
                }}
                className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg px-2.5 py-1.5 border border-slate-200 cursor-pointer"
                title="Adjust student dynamic learning group"
              >
                <option value="Ready for Extension">Group: Extension</option>
                <option value="Developing Understanding">Group: Developing</option>
                <option value="Needs Targeted Support">Group: Targeted Support</option>
              </select>
            )}

            {onAnalyzeInLab && (
              <button
                onClick={() => onAnalyzeInLab(student)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Brain className="w-3.5 h-3.5 text-amber-600" />
                Misconception Lab
              </button>
            )}

            <button
              onClick={() => onOpenTutor(student)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
              Launch AI Tutor
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* AI Evidence-Based Diagnostic Reasoning Banner */}
          <div className="p-4 rounded-xl bg-slate-900 text-slate-100">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 mb-1">
              <Brain className="w-4 h-4" />
              AI Psychometric Reasoning (Based on 6 Assessed Items)
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">
              {student.aiDiagnosticReasoning}
            </p>
            <div className="mt-2 text-[11px] text-slate-400">
              Assigned Triad: <strong className="text-slate-200">{student.assignedGroup}</strong>
            </div>
          </div>

          {/* Concept Mastery Matrix */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Concept Mastery Matrix
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {student.conceptMastery.map((cm, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-slate-800">{cm.concept}</span>
                    <span className={`font-bold ${
                      cm.status === 'Mastered' ? 'text-emerald-700' : cm.status === 'Developing' ? 'text-indigo-700' : 'text-amber-700'
                    }`}>
                      {cm.score}% ({cm.status})
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        cm.status === 'Mastered' ? 'bg-emerald-500' : cm.status === 'Developing' ? 'bg-indigo-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${cm.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detected Misconceptions Breakdown */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Specific Detected Misconceptions
            </h3>
            {student.detectedMisconceptions.length > 0 ? (
              <div className="space-y-3">
                {student.detectedMisconceptions.map((dm, i) => (
                  <div key={i} className="p-4 rounded-xl border border-rose-200 bg-rose-50/50">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-rose-900">{dm.concept}</span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                        {Math.round(dm.confidence * 100)}% Confidence
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-rose-800 mb-1">{dm.misconception}</div>
                    <div className="text-xs text-rose-700/90 leading-relaxed bg-white/70 p-2.5 rounded-lg border border-rose-100">
                      <strong>Observed Evidence:</strong> {dm.evidence}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/60 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <div className="text-sm text-emerald-800 font-medium">
                  No structural or recurring procedural misconceptions detected. Demonstrating strong fluency.
                </div>
              </div>
            )}
          </div>

          {/* Personalized Remediation Plan */}
          {student.remediationPlan && (
            <div className="p-5 rounded-2xl border border-indigo-200 bg-indigo-50/40 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-indigo-800 uppercase tracking-wider">
                    Recommended Adaptive Remediation
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-0.5">
                    {student.remediationPlan.conceptToRevisit}
                  </h4>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-800 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {student.remediationPlan.estimatedTimeMinutes} min activity
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">
                <strong>Why student needs support:</strong> {student.remediationPlan.whyStudentNeedsSupport}
              </p>

              <div className="bg-white p-3.5 rounded-xl border border-indigo-100 space-y-2">
                <div className="text-xs font-bold text-slate-900">Guided Instructional Steps:</div>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                  {student.remediationPlan.guidedSteps.map((step, sIdx) => (
                    <li key={sIdx}>{step}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-900">Follow-Up Diagnostic Check:</div>
                {student.remediationPlan.followUpQuestions.map((fq, qIdx) => (
                  <div key={qIdx} className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="font-semibold text-slate-800">{fq.question}</div>
                    <div className="text-emerald-700 font-medium">Expected Answer: {fq.expectedAnswer}</div>
                    <div className="text-slate-500 italic">Scaffolding Hint: {fq.hint}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Student Detailed Assessment Question Responses */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Assessment Item Log (Question by Question)
            </h3>
            <div className="space-y-2">
              {student.responses.map((resp, rIdx) => (
                <div 
                  key={rIdx} 
                  className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                    resp.isCorrect ? 'bg-emerald-50/50 border-emerald-100 text-emerald-900' : 'bg-rose-50/50 border-rose-100 text-rose-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold uppercase">{resp.questionId}</span>
                    <span>Selected: <strong>Option {resp.selectedAnswer}</strong></span>
                    <span className="text-slate-500">• {resp.analysisNote}</span>
                  </div>
                  <div className="flex items-center gap-3 font-semibold">
                    <span>{resp.timeSpentSeconds}s</span>
                    <span className={`px-2 py-0.5 rounded ${resp.isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {resp.isCorrect ? 'Correct' : 'Needs Review'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            LearnLens AI Diagnostic Evaluation Engine
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
