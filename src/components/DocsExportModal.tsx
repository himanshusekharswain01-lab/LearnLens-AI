import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Copy, 
  Printer,
  FileDown
} from 'lucide-react';
import { exportReportToGoogleDocs } from '../services/googleDocsService';
import { StudentProfile, TeacherActionPlan, MisconceptionDetail } from '../types';

interface DocsExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: StudentProfile[];
  actionPlan: TeacherActionPlan;
  misconceptions: MisconceptionDetail[];
}

export const DocsExportModal: React.FC<DocsExportModalProps> = ({
  isOpen,
  onClose,
  students,
  actionPlan,
  misconceptions
}) => {
  const [exporting, setExporting] = useState(false);
  const [exportResult, setExportResult] = useState<{ url?: string; docId?: string; error?: string } | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const total = students.length;
  const needsSupport = students.filter(s => s.learningLevel === 'Needs Support').length;
  const avgMastery = Math.round(students.reduce((a, s) => a + s.overallScore, 0) / total);

  const studentBreakdownText = students.slice(0, 10).map(s => 
    `- ${s.name} (${s.learningLevel}, ${s.overallScore}%): ${s.detectedMisconceptions[0]?.misconception || 'Foundations demonstrated'}`
  ).join('\n');

  const handleExport = async () => {
    setExporting(true);
    setExportResult(null);

    const res = await exportReportToGoogleDocs({
      title: 'Class 8-A Mathematics Diagnostic & Remediation Report',
      topic: 'Linear Equations in One Variable',
      classGrade: 'Class 8-A',
      masteryPercentage: avgMastery,
      studentsAssessed: total,
      needsSupportCount: needsSupport,
      topMisconception: `${misconceptions[0]?.title}: ${misconceptions[0]?.description}`,
      teacherActionPlan: `${actionPlan.headlineRecommendation}\nStarter Activity (10 min): ${actionPlan.startLessonWith.activitySummary}`,
      studentBreakdownText
    });

    setExporting(false);
    if (res.success) {
      setExportResult({ url: res.documentUrl, docId: res.documentId });
    } else {
      setExportResult({ error: res.error });
    }
  };

  const handleCopySummary = () => {
    const text = `LEARNLENS AI DIAGNOSTIC REPORT
Class 8-A • Topic: Linear Equations in One Variable
Mastery: ${avgMastery}% • Needs Support: ${needsSupport}/${total}
Key Misconception: ${misconceptions[0]?.title}
Teacher Action: ${actionPlan.headlineRecommendation}
Starter Routine: ${actionPlan.startLessonWith.activitySummary}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Export Report to Google Docs</h3>
              <p className="text-xs text-slate-500">
                Generate an executive pedagogical report via Google Docs API
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 text-sm font-semibold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Report Content Preview Box */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-slate-700 font-mono">
          <div className="font-bold text-slate-900">Document Contents Preview:</div>
          <p>• Executive Summary: Class 8-A Mathematics ({total} students assessed)</p>
          <p>• Class Mastery Index: {avgMastery}% (7 students need immediate intervention)</p>
          <p>• Root Misconception: Inverse Operations Sign Reversal (23.3% affected)</p>
          <p>• 45-Min Teacher Action Plan: 10-min two-pan balance starter routine</p>
          <p>• Differentiated Small-Group Roster (Groups A, B, and C)</p>
        </div>

        {/* Status / Output display */}
        {exportResult && (
          <div className={`p-4 rounded-xl text-xs space-y-2 ${
            exportResult.error ? 'bg-rose-50 text-rose-800 border border-rose-200' : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
          }`}>
            {exportResult.error ? (
              <p>Error: {exportResult.error}</p>
            ) : (
              <div>
                <div className="flex items-center gap-2 font-bold mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Google Docs Export Generated Successfully!
                </div>
                <p className="text-emerald-700">
                  Your formatted diagnostic and remediation report is ready.
                </p>
                {exportResult.url && (
                  <div className="mt-2 flex items-center gap-2">
                    <a
                      href={exportResult.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold inline-flex items-center gap-1.5 shadow-xs"
                    >
                      <span>Open Document in Google Docs</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Modal Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            onClick={handleCopySummary}
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied to Clipboard!' : 'Copy Summary Text'}
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleExport}
              disabled={exporting}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              {exporting ? 'Exporting to Google Docs...' : 'Generate Google Doc'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
