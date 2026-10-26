import React, { useState } from 'react';
import { 
  Users, 
  Sparkles, 
  ArrowRightLeft, 
  SlidersHorizontal, 
  CheckCircle2, 
  AlertTriangle, 
  GraduationCap, 
  RefreshCw, 
  Printer, 
  Layers, 
  Edit3, 
  MessageSquare, 
  UserCheck, 
  BookOpen, 
  Clock,
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react';
import { StudentProfile, GroupReadinessCategory } from '../types';

interface DynamicGroupsManagerProps {
  students: StudentProfile[];
  onUpdateStudent: (updated: StudentProfile) => void;
  onSelectStudent: (student: StudentProfile) => void;
  onOpenTutorForStudent: (student: StudentProfile) => void;
}

export const DynamicGroupsManager: React.FC<DynamicGroupsManagerProps> = ({
  students,
  onUpdateStudent,
  onSelectStudent,
  onOpenTutorForStudent
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAutoGroupModal, setShowAutoGroupModal] = useState(false);
  const [extensionThreshold, setExtensionThreshold] = useState(80);
  const [supportThreshold, setSupportThreshold] = useState(55);
  const [editingNoteStudentId, setEditingNoteStudentId] = useState<string | null>(null);
  const [tempNote, setTempNote] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Group definitions and instructional configuration
  const GROUP_CONFIG: Record<GroupReadinessCategory, {
    title: string;
    badgeColor: string;
    bgAccent: string;
    borderAccent: string;
    icon: any;
    targetDescription: string;
    suggestedDuration: string;
    instructionalStrategy: string;
    suggestedMaterials: string[];
    coreObjective: string;
  }> = {
    'Ready for Extension': {
      title: 'Ready for Extension',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      bgAccent: 'bg-emerald-50/50',
      borderAccent: 'border-emerald-200',
      icon: GraduationCap,
      targetDescription: 'High mastery (>80%), rapid procedural fluency, ready for multi-step non-linear extensions.',
      suggestedDuration: '25 mins autonomous / 10 mins peer model',
      instructionalStrategy: 'Autonomous challenge sets & peer mentoring. Pair with Developing peers to verbalize mathematical thinking.',
      suggestedMaterials: ['Real-World Geometric Perimeter Modeling', 'Simultaneous Equation Challenge Cards', 'Peer Scaffolding Checklists'],
      coreObjective: 'Generalize single-variable algorithms to multi-step contextual modeling.'
    },
    'Developing Understanding': {
      title: 'Developing Understanding',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
      bgAccent: 'bg-blue-50/50',
      borderAccent: 'border-blue-200',
      icon: BookOpen,
      targetDescription: 'Solid conceptual foundation (55-79%), but requires structured reinforcement on fractions and multi-variable balance.',
      suggestedDuration: '20 mins guided pairs / 15 mins independent',
      instructionalStrategy: 'Structured two-step practice with explicit denominator clearing cards. Work in matched pairs.',
      suggestedMaterials: ['Step-by-Step Transposition Flowcharts', 'Fraction Clearing Quick-Check Sheets', 'Substitution Self-Audit Rubrics'],
      coreObjective: 'Consolidate fraction coefficient clearing and sign consistency across two-step equations.'
    },
    'Needs Targeted Support': {
      title: 'Needs Targeted Support',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      bgAccent: 'bg-amber-50/50',
      borderAccent: 'border-amber-200',
      icon: AlertTriangle,
      targetDescription: 'Identified prerequisite conceptual gaps (<55%), persistent inverse sign reversals and transposition confusion.',
      suggestedDuration: '15 mins teacher-led direct / 15 mins concrete visual',
      instructionalStrategy: 'Direct teacher-led small group intervention using concrete two-pan balance models and zero-pair counters.',
      suggestedMaterials: ['Two-Pan Balance Beam Simulation', 'Color-Coded Zero-Pair Integer Tiles', 'Socratic Guiding Question Cue Cards'],
      coreObjective: 'Anchor the conceptual equilibrium model: transposing an operation requires true inverse cancellation to zero.'
    }
  };

  // Filter students based on search
  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.weakConcepts && s.weakConcepts.some(c => c.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  // Group students by readiness category
  const groups: Record<GroupReadinessCategory, StudentProfile[]> = {
    'Ready for Extension': filteredStudents.filter(s => s.readinessGroup === 'Ready for Extension'),
    'Developing Understanding': filteredStudents.filter(s => s.readinessGroup === 'Developing Understanding'),
    'Needs Targeted Support': filteredStudents.filter(s => s.readinessGroup === 'Needs Targeted Support')
  };

  // Calculate statistics per group
  const getGroupStats = (groupStudents: StudentProfile[]) => {
    if (groupStudents.length === 0) return { count: 0, avgScore: 0, topMisconception: 'None detected' };
    const avgScore = Math.round(groupStudents.reduce((acc, s) => acc + s.overallScore, 0) / groupStudents.length);
    
    // Count misconceptions
    const miscCounts: Record<string, number> = {};
    groupStudents.forEach(s => {
      s.detectedMisconceptions.forEach(m => {
        const key = m.misconception.split(':')[0].trim();
        miscCounts[key] = (miscCounts[key] || 0) + 1;
      });
    });

    let topMisconception = 'Careless calculation slips';
    let maxCount = 0;
    Object.entries(miscCounts).forEach(([misc, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topMisconception = misc;
      }
    });

    return { count: groupStudents.length, avgScore, topMisconception };
  };

  // Handle manual group change for a student
  const handleMoveStudent = (student: StudentProfile, targetGroup: GroupReadinessCategory) => {
    if (student.readinessGroup === targetGroup) return;

    const legacyGroupLabel = targetGroup === 'Ready for Extension' 
      ? 'Group A — Ready for Extension' 
      : targetGroup === 'Developing Understanding' 
        ? 'Group B — Developing' 
        : 'Group C — Needs Targeted Support';

    const updated: StudentProfile = {
      ...student,
      readinessGroup: targetGroup,
      assignedGroup: legacyGroupLabel,
      isManuallyPlaced: true,
      placementReason: `Manually reassigned to ${targetGroup} by teacher`
    };

    onUpdateStudent(updated);
    showToast(`Moved ${student.name} to ${targetGroup} (Manual Override)`);
  };

  // Save student accommodation note
  const handleSaveNote = (student: StudentProfile) => {
    const updated: StudentProfile = {
      ...student,
      teacherNotes: tempNote
    };
    onUpdateStudent(updated);
    setEditingNoteStudentId(null);
    setTempNote('');
    showToast(`Saved teacher note for ${student.name}`);
  };

  // Automatically regroup entire class based on recent assessment scores
  const handleAutoRegroup = () => {
    let movedCount = 0;
    students.forEach(student => {
      let targetGroup: GroupReadinessCategory = 'Developing Understanding';
      if (student.overallScore >= extensionThreshold) {
        targetGroup = 'Ready for Extension';
      } else if (student.overallScore < supportThreshold) {
        targetGroup = 'Needs Targeted Support';
      }

      if (student.readinessGroup !== targetGroup) {
        movedCount++;
        const legacyGroupLabel = targetGroup === 'Ready for Extension' 
          ? 'Group A — Ready for Extension' 
          : targetGroup === 'Developing Understanding' 
            ? 'Group B — Developing' 
            : 'Group C — Needs Targeted Support';

        onUpdateStudent({
          ...student,
          readinessGroup: targetGroup,
          assignedGroup: legacyGroupLabel,
          isManuallyPlaced: false,
          placementReason: `Auto-grouped based on assessment score (${student.overallScore}%)`
        });
      }
    });

    setShowAutoGroupModal(false);
    showToast(`Dynamic regrouping applied: ${movedCount} student placement(s) updated.`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header & Controls */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-full uppercase tracking-wider">
              Diagnostic Differentiation
            </span>
            <span className="text-xs text-slate-500 font-medium">Class 8-A • 30 Students</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Dynamic Learning Groups</h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Groups automatically categorized by readiness from the latest diagnostic. Teachers can freely drag or reassign student placement.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setShowAutoGroupModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl text-sm font-semibold transition-all border border-indigo-200"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Auto-Group Settings
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium transition-all"
          >
            <Printer className="w-4 h-4" />
            Print Station Rosters
          </button>
        </div>
      </div>

      {/* Search & Manual Placement Counter Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search students, roll no, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
          />
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-600 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Extension: <strong>{groups['Ready for Extension'].length}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span>Developing: <strong>{groups['Developing Understanding'].length}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>Support: <strong>{groups['Needs Targeted Support'].length}</strong></span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1 text-indigo-700 font-medium">
            <UserCheck className="w-3.5 h-3.5" />
            <span>{students.filter(s => s.isManuallyPlaced).length} Teacher Overrides</span>
          </div>
        </div>
      </div>

      {/* 3-Column Dynamic Groups Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {(['Ready for Extension', 'Developing Understanding', 'Needs Targeted Support'] as GroupReadinessCategory[]).map((category) => {
          const config = GROUP_CONFIG[category];
          const groupStudents = groups[category];
          const stats = getGroupStats(groupStudents);
          const IconComponent = config.icon;

          return (
            <div 
              key={category}
              className={`rounded-2xl border ${config.borderAccent} bg-white shadow-sm flex flex-col h-full overflow-hidden`}
            >
              {/* Group Header */}
              <div className={`p-5 ${config.bgAccent} border-b ${config.borderAccent}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-xl ${config.badgeColor} shadow-xs`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{config.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-slate-600 mt-0.5">
                        <span><strong>{stats.count}</strong> students ({Math.round((stats.count / students.length) * 100)}%)</span>
                        <span>•</span>
                        <span>Avg: <strong>{stats.avgScore}%</strong></span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {config.targetDescription}
                </p>

                {/* Primary Diagnosed Misconception */}
                <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-slate-500 mt-0.5 shrink-0" />
                  <div className="text-xs">
                    <span className="text-slate-500">Key Focus: </span>
                    <span className="font-semibold text-slate-800">{stats.topMisconception}</span>
                  </div>
                </div>

                {/* Pedagogy Directive Pill */}
                <div className="mt-3 bg-white/80 backdrop-blur-xs rounded-xl p-3 border border-slate-200/70">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                    <Clock className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Station Directive ({config.suggestedDuration})</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    {config.instructionalStrategy}
                  </p>
                </div>
              </div>

              {/* Student Cards List */}
              <div className="p-4 space-y-3 flex-1 bg-slate-50/40">
                {groupStudents.length === 0 ? (
                  <div className="text-center py-10 px-4 text-slate-400">
                    <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="text-sm font-medium">No students in this group</p>
                    <p className="text-xs text-slate-400 mt-1">Move students here using the placement selector</p>
                  </div>
                ) : (
                  groupStudents.map(student => (
                    <div 
                      key={student.id}
                      className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-xs hover:border-slate-300 transition-all group relative"
                    >
                      <div className="flex items-start justify-between gap-3">
                        {/* Student Avatar & Identity */}
                        <div 
                          className="flex items-center gap-3 cursor-pointer"
                          onClick={() => onSelectStudent(student)}
                        >
                          <img 
                            src={student.avatar} 
                            alt={student.name} 
                            className="w-10 h-10 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                {student.name}
                              </h4>
                              {student.isManuallyPlaced && (
                                <span 
                                  title={student.placementReason || 'Manually placed by teacher'}
                                  className="px-1.5 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-semibold rounded"
                                >
                                  Manual
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <span>Roll: {student.rollNumber}</span>
                              <span>•</span>
                              <span className={`font-semibold ${
                                student.overallScore >= 80 ? 'text-emerald-600' :
                                student.overallScore >= 55 ? 'text-blue-600' : 'text-amber-600'
                              }`}>
                                {student.overallScore}%
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Quick Placement Selector Dropdown */}
                        <div className="relative">
                          <select
                            value={student.readinessGroup}
                            onChange={(e) => handleMoveStudent(student, e.target.value as GroupReadinessCategory)}
                            aria-label={`Change group for ${student.name}`}
                            className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border-none rounded-lg px-2.5 py-1.5 cursor-pointer focus:ring-2 focus:ring-indigo-500 transition-colors"
                          >
                            <option value="Ready for Extension">→ Extension</option>
                            <option value="Developing Understanding">→ Developing</option>
                            <option value="Needs Targeted Support">→ Support</option>
                          </select>
                        </div>
                      </div>

                      {/* Student Misconception Preview */}
                      {student.detectedMisconceptions.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-slate-100">
                          <p className="text-[11px] text-slate-600 line-clamp-1">
                            <span className="font-semibold text-rose-700">Diagnosis: </span>
                            {student.detectedMisconceptions[0].misconception}
                          </p>
                        </div>
                      )}

                      {/* Teacher Note Display / Trigger */}
                      {student.teacherNotes ? (
                        <div className="mt-2 bg-indigo-50/70 rounded-lg p-2 text-xs text-indigo-900 border border-indigo-100 flex items-start justify-between gap-2">
                          <p className="text-[11px] italic">"{student.teacherNotes}"</p>
                          <button 
                            onClick={() => {
                              setEditingNoteStudentId(student.id);
                              setTempNote(student.teacherNotes || '');
                            }}
                            className="text-indigo-600 hover:text-indigo-800 shrink-0"
                            title="Edit teacher note"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        editingNoteStudentId === student.id ? (
                          <div className="mt-2 space-y-1.5">
                            <textarea
                              value={tempNote}
                              onChange={(e) => setTempNote(e.target.value)}
                              placeholder="Add accommodation or placement note..."
                              rows={2}
                              className="w-full p-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500"
                            />
                            <div className="flex justify-end gap-1.5">
                              <button
                                onClick={() => setEditingNoteStudentId(null)}
                                className="px-2 py-0.5 text-xs text-slate-500 hover:bg-slate-100 rounded"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleSaveNote(student)}
                                className="px-2.5 py-0.5 text-xs bg-indigo-600 text-white rounded font-medium"
                              >
                                Save Note
                              </button>
                            </div>
                          </div>
                        ) : null
                      )}

                      {/* Card Action Footer */}
                      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingNoteStudentId(student.id);
                              setTempNote(student.teacherNotes || '');
                            }}
                            className="text-[11px] text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition-colors"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>{student.teacherNotes ? 'Edit Note' : '+ Note'}</span>
                          </button>
                        </div>

                        <button
                          onClick={() => onOpenTutorForStudent(student)}
                          className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 transition-colors"
                        >
                          <Sparkles className="w-3 h-3 text-amber-500" />
                          <span>AI Tutor</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Group Footer: Suggested Station Materials */}
              <div className="p-4 bg-white border-t border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Station Material Kit
                </span>
                <ul className="space-y-1 text-xs text-slate-600">
                  {config.suggestedMaterials.map((mat, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                      <span>{mat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Auto-Group Calibration Modal */}
      {showAutoGroupModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Dynamic Grouping Calibration</h3>
                  <p className="text-xs text-slate-500">Configure readiness thresholds to automatically categorize students</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAutoGroupModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="py-5 space-y-5">
              {/* Ready for Extension Threshold */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Ready for Extension Threshold
                  </label>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Score ≥ {extensionThreshold}%
                  </span>
                </div>
                <input 
                  type="range" 
                  min="70" 
                  max="95" 
                  value={extensionThreshold} 
                  onChange={(e) => setExtensionThreshold(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <p className="text-[11px] text-slate-500 mt-1">Students scoring at or above this mark are routed to extension projects and peer mentoring.</p>
              </div>

              {/* Needs Targeted Support Threshold */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    Needs Targeted Support Cutoff
                  </label>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    Score &lt; {supportThreshold}%
                  </span>
                </div>
                <input 
                  type="range" 
                  min="40" 
                  max="65" 
                  value={supportThreshold} 
                  onChange={(e) => setSupportThreshold(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
                <p className="text-[11px] text-slate-500 mt-1">Students scoring below this cutoff are routed to small-group teacher interventions and balance visualizers.</p>
              </div>

              {/* Developing Range Preview */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                <span className="text-xs font-semibold text-slate-700 block mb-1">
                  Developing Understanding Range
                </span>
                <span className="text-xs text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded">
                  {supportThreshold}% to {extensionThreshold - 1}%
                </span>
                <p className="text-[11px] text-slate-500 mt-1">Core curriculum guided practice with denominator clearing.</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setShowAutoGroupModal(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAutoRegroup}
                className="px-5 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Apply Dynamic Grouping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
