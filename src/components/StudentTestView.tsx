import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle, 
  Clock, 
  Send,
  HelpCircle,
  TrendingUp,
  Brain
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DiagnosticAssessment, StudentResponse } from '../types';

interface StudentTestViewProps {
  assessment: DiagnosticAssessment;
  onBack: () => void;
  onSubmitCompletedTest: (responses: StudentResponse[]) => void;
}

export const StudentTestView: React.FC<StudentTestViewProps> = ({
  assessment,
  onBack,
  onSubmitCompletedTest
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [diagnosticFeedback, setDiagnosticFeedback] = useState<any[] | null>(null);

  const questions = assessment.questions;
  const currentQ = questions[currentIdx];

  const handleSelectOption = (questionId: string, optionLabel: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: optionLabel }));
  };

  const handleFinish = async () => {
    setSubmitted(true);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });

    // Build student response diagnostic list
    const evaluatedList: StudentResponse[] = questions.map(q => {
      const selected = answers[q.id] || '';
      const chosenOpt = q.options.find(o => o.label === selected);
      const isCorrect = chosenOpt ? chosenOpt.isCorrect : false;

      return {
        questionId: q.id,
        selectedAnswer: selected,
        isCorrect,
        timeSpentSeconds: Math.floor(Math.random() * 30) + 20,
        detectedMisconception: isCorrect ? undefined : q.commonMisconceptionTriggered,
        confidence: isCorrect ? 0.95 : 0.88,
        analysisNote: chosenOpt ? chosenOpt.diagnosticSignal || '' : 'No response entered'
      };
    });

    setDiagnosticFeedback(evaluatedList);
    onSubmitCompletedTest(evaluatedList);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
              Student Assessment Simulator
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">{assessment.title}</h2>
          </div>
        </div>

        {!submitted && (
          <div className="text-xs font-semibold text-slate-500">
            Question {currentIdx + 1} of {questions.length}
          </div>
        )}
      </div>

      {!submitted ? (
        /* Question Card */
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100">
            <span>Sub-concept: <strong className="text-slate-800">{currentQ.subConcept}</strong></span>
            <span>Cognitive Level: <strong>{currentQ.cognitiveLevel}</strong></span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 leading-snug">
            {currentQ.questionText}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt) => {
              const isSelected = answers[currentQ.id] === opt.label;
              return (
                <button
                  key={opt.label}
                  onClick={() => handleSelectOption(currentQ.id, opt.label)}
                  className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-semibold shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {opt.label}
                    </span>
                    <span>{opt.text}</span>
                  </div>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                </button>
              );
            })}
          </div>

          {/* Navigation between questions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
            >
              Previous
            </button>

            {currentIdx < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIdx(prev => prev + 1)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Next Question
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                Submit Assessment
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Instant Diagnostic Analysis Screen */
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
          <div className="text-center max-w-md mx-auto space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Diagnostic Assessment Completed</h3>
            <p className="text-xs text-slate-500">
              Responses evaluated by the LearnLens Diagnostic Intelligence Engine.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Question-by-Question Diagnostic Feedback
            </h4>
            {diagnosticFeedback?.map((df, idx) => {
              const qObj = questions.find(q => q.id === df.questionId);
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border text-xs space-y-2 ${
                    df.isCorrect ? 'bg-emerald-50/60 border-emerald-200' : 'bg-rose-50/60 border-rose-200'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-slate-900">Q{idx + 1}: {qObj?.questionText}</span>
                    <span className={`px-2 py-0.5 rounded ${df.isCorrect ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'}`}>
                      {df.isCorrect ? 'Correct ✓' : 'Concept Gap Detected'}
                    </span>
                  </div>
                  <div className="text-slate-600">
                    Your Choice: <strong>Option {df.selectedAnswer}</strong>
                  </div>
                  <div className="p-2.5 rounded bg-white/80 border border-slate-200/60 text-slate-700">
                    <strong>Diagnostic Signal:</strong> {df.analysisNote}
                  </div>
                  {df.detectedMisconception && (
                    <div className="text-rose-700 font-semibold">
                      Detected Misconception: {df.detectedMisconception}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={onBack}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Return to Teacher Command Center
          </button>
        </div>
      )}
    </div>
  );
};
