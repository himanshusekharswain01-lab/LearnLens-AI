import React, { useState } from 'react';
import { 
  Brain, 
  LayoutDashboard, 
  Users, 
  FileText, 
  Sparkles, 
  HelpCircle, 
  ChevronRight, 
  BookOpen, 
  Layers,
  Bot,
  FileDown,
  ArrowRight,
  School,
  LogOut
} from 'lucide-react';
import { 
  INITIAL_ASSESSMENT, 
  COMMON_MISCONCEPTIONS, 
  TEACHER_ACTION_PLAN, 
  generateFullCohort 
} from './mockData';
import { StudentProfile, DiagnosticAssessment, StudentResponse } from './types';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { StudentProfileModal } from './components/StudentProfileModal';
import { AiTutorModal } from './components/AiTutorModal';
import { DynamicGroupsManager } from './components/DynamicGroupsManager';
import { StudentAnswerAnalyzer } from './components/StudentAnswerAnalyzer';
import { ActionPlanView } from './components/ActionPlanView';
import { AssessmentCreator } from './components/AssessmentCreator';
import { StudentTestView } from './components/StudentTestView';
import { DocsExportModal } from './components/DocsExportModal';
import { HackathonGuide } from './components/HackathonGuide';

export default function App() {
  // Navigation & View State
  const [currentView, setCurrentView] = useState<
    'landing' | 'dashboard' | 'groups' | 'misconceptionLab' | 'actionPlan' | 'createAssessment' | 'studentTest'
  >('landing');

  // Classroom Cohort State
  const [cohort, setCohort] = useState<StudentProfile[]>(() => generateFullCohort());
  const [activeAssessment, setActiveAssessment] = useState<DiagnosticAssessment>(INITIAL_ASSESSMENT);
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);
  const [hackathonStep, setHackathonStep] = useState(1);

  // Update student across the entire app state
  const handleUpdateStudent = (updatedStudent: StudentProfile) => {
    setCohort(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    if (selectedStudent && selectedStudent.id === updatedStudent.id) {
      setSelectedStudent(updatedStudent);
    }
  };

  const handleUpdateStudentNote = (studentId: string, note: string) => {
    setCohort(prev => prev.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          teacherNotes: s.teacherNotes ? `${s.teacherNotes} | ${note}` : note
        };
      }
      return s;
    }));
  };

  // Judge tour handlers
  const handleJumpJudgeStep = (step: number) => {
    setHackathonStep(step);
    if (step === 1) {
      setCurrentView('dashboard');
      setSelectedStudent(null);
    } else if (step === 2) {
      setCurrentView('groups');
      setSelectedStudent(null);
    } else if (step === 3) {
      setCurrentView('misconceptionLab');
      setSelectedStudent(cohort[0]);
    } else if (step === 4) {
      setSelectedStudent(null);
      setCurrentView('createAssessment');
    } else if (step === 5) {
      setSelectedStudent(null);
      setCurrentView('actionPlan');
    }
  };

  const handleResetDemo = () => {
    setCohort(generateFullCohort());
    setActiveAssessment(INITIAL_ASSESSMENT);
    setCurrentView('dashboard');
    setSelectedStudent(null);
  };

  const handleSaveAssessment = (newAssmt: DiagnosticAssessment) => {
    setActiveAssessment(newAssmt);
    setCurrentView('dashboard');
  };

  const handleTakeAssessmentPreview = (assmt: DiagnosticAssessment) => {
    setActiveAssessment(assmt);
    setCurrentView('studentTest');
  };

  const handleStudentTestSubmission = (evaluatedResponses: StudentResponse[]) => {
    console.log('Submitted student responses:', evaluatedResponses);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      {/* If Landing page is active */}
      {currentView === 'landing' ? (
        <LandingPage
          onStartDemo={() => setCurrentView('dashboard')}
          onOpenAssessment={() => setCurrentView('createAssessment')}
        />
      ) : (
        /* Teacher Dashboard & App Layout */
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Main Top Header */}
          <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentView('landing')}
                  className="flex items-center gap-2.5 group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="font-bold text-slate-900 text-lg leading-tight block">
                      LearnLens AI
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium block">
                      Diagnostic Intelligence Platform
                    </span>
                  </div>
                </button>

                <div className="hidden md:flex items-center gap-1.5 ml-6 pl-6 border-l border-slate-200 text-xs">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md">
                    <School className="w-3.5 h-3.5 text-indigo-600" />
                    Class 8-A Mathematics
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500">30 Students</span>
                </div>
              </div>

              {/* Navigation Items */}
              <nav className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    currentView === 'dashboard'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Dashboard
                </button>

                <button
                  onClick={() => setCurrentView('groups')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    currentView === 'groups'
                      ? 'bg-indigo-50 text-indigo-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Users className="w-3.5 h-3.5 text-indigo-600" />
                  Dynamic Groups
                </button>

                <button
                  onClick={() => setCurrentView('misconceptionLab')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    currentView === 'misconceptionLab'
                      ? 'bg-amber-50 text-amber-900 border border-amber-200 font-bold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Brain className="w-3.5 h-3.5 text-amber-600" />
                  Misconception Lab
                </button>

                <button
                  onClick={() => setCurrentView('actionPlan')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    currentView === 'actionPlan'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  Action Center
                </button>

                <button
                  onClick={() => setCurrentView('createAssessment')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    currentView === 'createAssessment'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Assessment Creator
                </button>

                <button
                  onClick={() => setCurrentView('studentTest')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    currentView === 'studentTest'
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Users className="w-3.5 h-3.5 text-teal-600" />
                  Student Mode
                </button>

                <button
                  onClick={() => setIsTutorOpen(true)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ml-1"
                >
                  <Bot className="w-3.5 h-3.5" />
                  AI Tutor
                </button>
              </nav>
            </div>
          </header>

          {/* Main Body Content View */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {currentView === 'dashboard' && (
              <Dashboard
                students={cohort}
                misconceptions={COMMON_MISCONCEPTIONS}
                actionPlan={TEACHER_ACTION_PLAN}
                onSelectStudent={(s) => setSelectedStudent(s)}
                onOpenActionPlan={() => setCurrentView('actionPlan')}
                onOpenAssessmentCreator={() => setCurrentView('createAssessment')}
                onExportReport={() => setIsDocsModalOpen(true)}
                onOpenGroups={() => setCurrentView('groups')}
                onOpenMisconceptionLab={() => setCurrentView('misconceptionLab')}
              />
            )}

            {currentView === 'groups' && (
              <DynamicGroupsManager
                students={cohort}
                onUpdateStudent={handleUpdateStudent}
                onSelectStudent={(s) => setSelectedStudent(s)}
                onOpenTutorForStudent={(s) => {
                  setSelectedStudent(s);
                  setIsTutorOpen(true);
                }}
              />
            )}

            {currentView === 'misconceptionLab' && (
              <StudentAnswerAnalyzer
                students={cohort}
                assessment={activeAssessment}
                initialStudent={selectedStudent || cohort[0]}
                onOpenTutorWithContext={(name, q, misc) => {
                  setIsTutorOpen(true);
                }}
                onUpdateStudentNote={handleUpdateStudentNote}
              />
            )}

            {currentView === 'actionPlan' && (
              <ActionPlanView
                actionPlan={TEACHER_ACTION_PLAN}
                onBack={() => setCurrentView('dashboard')}
                onExportDocs={() => setIsDocsModalOpen(true)}
              />
            )}

            {currentView === 'createAssessment' && (
              <AssessmentCreator
                onBack={() => setCurrentView('dashboard')}
                onSaveAssessment={handleSaveAssessment}
                onTakeAssessmentPreview={handleTakeAssessmentPreview}
              />
            )}

            {currentView === 'studentTest' && (
              <StudentTestView
                assessment={activeAssessment}
                onBack={() => setCurrentView('dashboard')}
                onSubmitCompletedTest={handleStudentTestSubmission}
              />
            )}
          </main>

          {/* Modals */}
          <StudentProfileModal
            student={selectedStudent}
            onClose={() => setSelectedStudent(null)}
            onOpenTutor={(s) => {
              setSelectedStudent(s);
              setIsTutorOpen(true);
            }}
            onAnalyzeInLab={(s) => {
              setSelectedStudent(s);
              setCurrentView('misconceptionLab');
            }}
            onUpdateStudent={handleUpdateStudent}
          />

          <AiTutorModal
            isOpen={isTutorOpen}
            onClose={() => setIsTutorOpen(false)}
            selectedStudent={selectedStudent}
          />

          <DocsExportModal
            isOpen={isDocsModalOpen}
            onClose={() => setIsDocsModalOpen(false)}
            students={cohort}
            actionPlan={TEACHER_ACTION_PLAN}
            misconceptions={COMMON_MISCONCEPTIONS}
          />

          {/* Hackathon 2-Minute Judge Experience floating navigator */}
          <HackathonGuide
            currentStep={hackathonStep}
            onJumpStep={handleJumpJudgeStep}
            onResetDemo={handleResetDemo}
          />
        </div>
      )}
    </div>
  );
}
