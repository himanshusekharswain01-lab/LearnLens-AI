import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  Lightbulb, 
  Compass, 
  MessageSquare, 
  Bookmark, 
  Zap, 
  Activity, 
  Clock, 
  Layers,
  ChevronRight,
  User,
  BrainCircuit,
  Sliders,
  Share2
} from 'lucide-react';
import { StudentProfile, DiagnosticAssessment, StudentAnswerAnalysis } from '../types';

interface StudentAnswerAnalyzerProps {
  students: StudentProfile[];
  assessment: DiagnosticAssessment;
  initialStudent?: StudentProfile | null;
  onOpenTutorWithContext: (studentName: string, question: string, misconception: string) => void;
  onUpdateStudentNote?: (studentId: string, note: string) => void;
}

export const StudentAnswerAnalyzer: React.FC<StudentAnswerAnalyzerProps> = ({
  students,
  assessment,
  initialStudent,
  onOpenTutorWithContext,
  onUpdateStudentNote
}) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(initialStudent?.id || students[0]?.id || 's1');
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>(assessment.questions[0]?.id || 'q1');
  const [customQuestionText, setCustomQuestionText] = useState(assessment.questions[0]?.questionText || 'Solve for x: 2x + 4 = 10');
  const [customExpectedAnswer, setCustomExpectedAnswer] = useState(assessment.questions[0]?.expectedAnswer || 'x = 3');
  const [studentAnswerInput, setStudentAnswerInput] = useState('x = 7');
  const [studentWorkScratchpad, setStudentWorkScratchpad] = useState('2x = 10 + 4 = 14 => x = 7');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<StudentAnswerAnalysis | null>(null);
  const [analysisSource, setAnalysisSource] = useState<'gemini' | 'psychometric-rules'>('psychometric-rules');
  const [noteSavedMessage, setNoteSavedMessage] = useState(false);

  const currentStudent = students.find(s => s.id === selectedStudentId) || students[0];
  const currentQuestion = assessment.questions.find(q => q.id === selectedQuestionId) || assessment.questions[0];

  // Preset scenarios to demonstrate instant diagnosability for judges/teachers
  const PRESETS = [
    {
      title: 'Transposition Sign Reversal',
      studentName: 'Rahul Sharma',
      studentId: 's1',
      questionId: 'q1',
      question: 'Solve for x: 2x + 4 = 10',
      expected: 'x = 3',
      submitted: 'x = 7',
      scratchpad: '2x = 10 + 4 = 14, therefore x = 14 / 2 = 7'
    },
    {
      title: 'Fraction Reciprocal Inversion',
      studentName: 'Devansh Verma',
      studentId: 's5',
      questionId: 'q4',
      question: 'Solve for k: (2/3)k + 1 = 5',
      expected: 'k = 6',
      submitted: 'k = 8',
      scratchpad: '(2/3)k = 4, multiplied 4 by 2 to get 8'
    },
    {
      title: 'Negative Divisor Sign Loss',
      studentName: 'Priya Patel',
      studentId: 's2',
      questionId: 'q6',
      question: 'Solve for p: 14 - 4p = 2',
      expected: 'p = 3',
      submitted: 'p = -3',
      scratchpad: '-4p = 2 - 14 = -12, divided -12 by 4, got -3'
    },
    {
      title: 'Distributive Bracket Neglect',
      studentName: 'Ananya Deshmukh',
      studentId: 's4',
      questionId: 'q3',
      question: 'Solve for m: 3(m - 2) = 15',
      expected: 'm = 7',
      submitted: 'm = 5',
      scratchpad: '3m - 2 = 15 => 3m = 17 or approximate 5'
    }
  ];

  const handleApplyPreset = (preset: typeof PRESETS[0]) => {
    setSelectedStudentId(preset.studentId);
    setSelectedQuestionId(preset.questionId);
    setCustomQuestionText(preset.question);
    setCustomExpectedAnswer(preset.expected);
    setStudentAnswerInput(preset.submitted);
    setStudentWorkScratchpad(preset.scratchpad);
    runAnalysis(preset.question, preset.submitted, preset.expected, preset.scratchpad, preset.studentName);
  };

  const handleQuestionSelect = (qId: string) => {
    setSelectedQuestionId(qId);
    const q = assessment.questions.find(x => x.id === qId);
    if (q) {
      setCustomQuestionText(q.questionText);
      setCustomExpectedAnswer(q.expectedAnswer);
      // Auto-load student's historical response if available
      const studentResp = currentStudent?.responses.find(r => r.questionId === qId);
      if (studentResp) {
        const opt = q.options.find(o => o.label === studentResp.selectedAnswer);
        setStudentAnswerInput(opt?.text || studentResp.selectedAnswer);
      } else {
        setStudentAnswerInput(q.options.find(o => !o.isCorrect)?.text || '');
      }
    }
  };

  const handleStudentSelect = (sId: string) => {
    setSelectedStudentId(sId);
    const s = students.find(x => x.id === sId);
    if (s && currentQuestion) {
      const resp = s.responses.find(r => r.questionId === currentQuestion.id);
      if (resp) {
        const opt = currentQuestion.options.find(o => o.label === resp.selectedAnswer);
        setStudentAnswerInput(opt?.text || resp.selectedAnswer);
      }
    }
  };

  const runAnalysis = async (
    qText = customQuestionText, 
    sAns = studentAnswerInput, 
    eAns = customExpectedAnswer,
    sWork = studentWorkScratchpad,
    sName = currentStudent?.name
  ) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const res = await fetch('/api/analyze-student-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: qText,
          studentAnswer: sAns,
          expectedAnswer: eAns,
          studentName: sName,
          studentWork: sWork,
          options: currentQuestion?.options || []
        })
      });

      const json = await res.json();
      if (json.success && json.data) {
        setAnalysisResult(json.data);
        setAnalysisSource(json.source === 'gemini' ? 'gemini' : 'psychometric-rules');
      }
    } catch (err) {
      console.error('Answer analysis call failed:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveToProfile = () => {
    if (analysisResult && currentStudent && onUpdateStudentNote) {
      const note = `[Diagnosed Misconception: ${analysisResult.misconceptionTitle} (${Math.round(analysisResult.confidence * 100)}% Confidence)]. Recommended: ${analysisResult.targetedRemediation.activityTitle}.`;
      onUpdateStudentNote(currentStudent.id, note);
      setNoteSavedMessage(true);
      setTimeout(() => setNoteSavedMessage(false), 3000);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full uppercase tracking-wider">
              Diagnostic Misconception Engine
            </span>
            <span className="text-xs text-slate-500 font-medium">Cognitive Root-Cause Analysis</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Student Answer & Misconception Lab</h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Evaluate a student's answer or scratchpad steps to uncover underlying misconceptions, calculate diagnostic confidence, and generate targeted remediation.
          </p>
        </div>

        {/* Quick Diagnostic Presets */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-500 font-medium mr-1">One-Click Presets:</span>
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(p)}
              className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 rounded-lg font-medium border border-slate-200 transition-all"
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Controls & Problem Context (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-600" />
                Diagnostic Context
              </h3>
              <span className="text-xs text-slate-500">Select or Customize</span>
            </div>

            {/* Student Picker */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Student to Analyze
              </label>
              <div className="flex items-center gap-2">
                <select
                  value={selectedStudentId}
                  onChange={(e) => handleStudentSelect(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.rollNumber}) — {s.learningLevel} ({s.overallScore}%)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Question Picker from Current Assessment */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Assessment Question
              </label>
              <select
                value={selectedQuestionId}
                onChange={(e) => handleQuestionSelect(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                {assessment.questions.map((q, idx) => (
                  <option key={q.id} value={q.id}>
                    Q{idx + 1}: {q.questionText.slice(0, 45)}... ({q.cognitiveLevel})
                  </option>
                ))}
              </select>
            </div>

            {/* Question Text Box */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Question Text
              </label>
              <textarea
                value={customQuestionText}
                onChange={(e) => setCustomQuestionText(e.target.value)}
                rows={2}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
              />
            </div>

            {/* Expected Target Answer */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Correct Expected Target Answer
              </label>
              <input
                type="text"
                value={customExpectedAnswer}
                onChange={(e) => setCustomExpectedAnswer(e.target.value)}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
                placeholder="e.g. x = 3"
              />
            </div>

            {/* Student's Submitted Answer */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1 flex items-center justify-between">
                <span>Student's Submitted Answer</span>
                <span className="text-[10px] text-amber-600 font-normal">To be diagnosed</span>
              </label>
              <input
                type="text"
                value={studentAnswerInput}
                onChange={(e) => setStudentAnswerInput(e.target.value)}
                className="w-full p-2.5 text-xs bg-amber-50/50 border border-amber-200 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
                placeholder="e.g. x = 7"
              />
            </div>

            {/* Optional Scratchpad / Student Work Steps */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Student Written Steps / Scratchpad Work <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <textarea
                value={studentWorkScratchpad}
                onChange={(e) => setStudentWorkScratchpad(e.target.value)}
                rows={3}
                placeholder="Paste or transcribe student intermediate lines: e.g. 2x = 10 + 4 = 14..."
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
              />
            </div>

            {/* Run Diagnostic Trigger */}
            <button
              onClick={() => runAnalysis()}
              disabled={isAnalyzing || !studentAnswerInput.trim()}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-xl text-sm font-semibold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {isAnalyzing ? (
                <>
                  <Activity className="w-4 h-4 animate-spin" />
                  <span>Psychometric Engine Diagnosing...</span>
                </>
              ) : (
                <>
                  <BrainCircuit className="w-4 h-4" />
                  <span>Run AI Misconception Diagnosis</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: In-Depth Diagnostic Results & Remediation (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {!analysisResult && !isAnalyzing && (
            <div className="bg-white rounded-2xl p-12 border border-slate-200 shadow-sm text-center">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BrainCircuit className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Ready for Psychometric Diagnosis</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                Click <strong>"Run AI Misconception Diagnosis"</strong> or select one of the top preset scenarios to analyze student mental models, confidence scores, and remediation steps.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => handleApplyPreset(PRESETS[0])}
                  className="px-4 py-2 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-xl hover:bg-indigo-100 transition-colors"
                >
                  Try Sample: Transposition Reversal
                </button>
              </div>
            </div>
          )}

          {isAnalyzing && (
            <div className="bg-white rounded-2xl p-12 border border-slate-200 shadow-sm text-center animate-pulse">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Activity className="w-6 h-6 animate-spin" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Analyzing Student Error Paths...</h3>
              <p className="text-xs text-slate-500">
                Evaluating distractor signals, sign consistency, and cognitive overgeneralization.
              </p>
            </div>
          )}

          {analysisResult && (
            <div className="space-y-5">
              {/* Diagnosis Verdict Card */}
              <div className={`rounded-2xl p-6 border shadow-sm ${
                analysisResult.isCorrect 
                  ? 'bg-emerald-50/60 border-emerald-200' 
                  : 'bg-white border-slate-200'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl ${
                      analysisResult.isCorrect 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {analysisResult.isCorrect ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <AlertCircle className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                          analysisResult.category === 'Mastered' ? 'bg-emerald-100 text-emerald-800' :
                          analysisResult.category === 'Careless Mistake' ? 'bg-amber-100 text-amber-800' :
                          analysisResult.category === 'Conceptual Misunderstanding' ? 'bg-rose-100 text-rose-800' :
                          'bg-indigo-100 text-indigo-800'
                        }`}>
                          {analysisResult.category}
                        </span>
                        <span className="text-xs text-slate-500">
                          Diagnosed for: <strong>{currentStudent?.name}</strong>
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 mt-1">
                        {analysisResult.misconceptionTitle}
                      </h2>
                    </div>
                  </div>

                  {/* Calibrated Confidence Gauge */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-center sm:text-right shrink-0">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                      AI Diagnostic Confidence
                    </span>
                    <div className="flex items-baseline justify-center sm:justify-end gap-1.5 mt-0.5">
                      <span className="text-2xl font-black text-indigo-600">
                        {Math.round(analysisResult.confidence * 100)}%
                      </span>
                      <span className="text-xs font-semibold text-emerald-600">
                        ({analysisResult.confidenceLevel} Calibration)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Evidence & Comparison */}
                <div className="py-4 border-b border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                    <span className="text-slate-500 block mb-0.5 font-medium">Student Submitted:</span>
                    <code className="text-slate-900 font-bold text-sm">{studentAnswerInput}</code>
                  </div>
                  <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-200">
                    <span className="text-emerald-700 block mb-0.5 font-medium">Correct Mathematical Solution:</span>
                    <code className="text-emerald-900 font-bold text-sm">{customExpectedAnswer}</code>
                  </div>
                </div>

                {/* Cognitive Reasoning Breakdown */}
                <div className="pt-4">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    Cognitive Reasoning & Pedagogical Diagnosis
                  </h4>
                  <div className="text-xs text-slate-700 leading-relaxed space-y-2 bg-slate-50/60 p-4 rounded-xl border border-slate-200/60">
                    <p>{analysisResult.diagnosticReasoning}</p>
                    <p className="text-slate-500 text-[11px] italic">
                      <strong>Direct Evidence:</strong> {analysisResult.evidence}
                    </p>
                  </div>
                </div>
              </div>

              {/* Targeted Remediation Activity Card */}
              <div className="bg-white rounded-2xl p-6 border border-indigo-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-indigo-100 text-indigo-800 rounded-xl">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block">
                        Prescriptive Intervention
                      </span>
                      <h3 className="text-base font-bold text-slate-900">
                        {analysisResult.targetedRemediation.activityTitle}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{analysisResult.targetedRemediation.durationMinutes} mins</span>
                    <span>•</span>
                    <span className="font-semibold text-indigo-700">
                      {analysisResult.targetedRemediation.modality}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {analysisResult.targetedRemediation.activityDescription}
                </p>

                {/* Guided Scaffolding Steps */}
                <div className="bg-indigo-50/40 rounded-xl p-4 border border-indigo-100 space-y-2">
                  <span className="text-xs font-bold text-indigo-900 block">
                    Guided Socratic Scaffolding Steps:
                  </span>
                  <div className="space-y-1.5">
                    {analysisResult.targetedRemediation.guidedSteps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <span className="w-5 h-5 rounded-full bg-indigo-200 text-indigo-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Follow-Up Resolution Check Problem */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      Immediate Follow-Up Check
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Target: {analysisResult.targetedRemediation.followUpCheck.expectedAnswer}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800">
                    {analysisResult.targetedRemediation.followUpCheck.question}
                  </p>
                  <p className="text-[11px] text-slate-500 italic">
                    <strong>Teacher Scaffolding Cue:</strong> {analysisResult.targetedRemediation.followUpCheck.scaffoldingHint}
                  </p>
                </div>

                {/* Action Row */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSaveToProfile}
                      className="px-3.5 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>{noteSavedMessage ? 'Saved to Student Record!' : 'Save Note to Student Profile'}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => onOpenTutorWithContext(
                      currentStudent?.name || 'Student',
                      customQuestionText,
                      analysisResult.misconceptionTitle
                    )}
                    className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Launch Socrates-AI Tutor with this Diagnosis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
