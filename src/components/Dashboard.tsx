import React, { useState } from 'react';
import { 
  Users, 
  Target, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpRight, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  BrainCircuit, 
  Layers, 
  ChevronRight,
  Filter,
  FileDown,
  HelpCircle,
  BarChart,
  PieChart as PieChartIcon
} from 'lucide-react';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { StudentProfile, MisconceptionDetail, TeacherActionPlan } from '../types';

interface DashboardProps {
  students: StudentProfile[];
  misconceptions: MisconceptionDetail[];
  actionPlan: TeacherActionPlan;
  onSelectStudent: (student: StudentProfile) => void;
  onOpenActionPlan: () => void;
  onOpenAssessmentCreator: () => void;
  onExportReport: () => void;
  onOpenGroups?: () => void;
  onOpenMisconceptionLab?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  students,
  misconceptions,
  actionPlan,
  onSelectStudent,
  onOpenActionPlan,
  onOpenAssessmentCreator,
  onExportReport,
  onOpenGroups,
  onOpenMisconceptionLab
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'needsSupport' | 'developing' | 'mastered'>('all');

  const totalStudents = students.length;
  const studentsAssessed = students.filter(s => s.responses.length > 0).length;
  const avgScore = Math.round(students.reduce((acc, s) => acc + s.overallScore, 0) / totalStudents);
  const studentsNeedingSupport = students.filter(s => s.learningLevel === 'Needs Support').length;
  const studentsMastered = students.filter(s => s.learningLevel === 'Mastered').length;
  const studentsDeveloping = students.filter(s => s.learningLevel === 'Developing' || s.learningLevel === 'Proficient').length;

  // Chart 1: Concept Mastery Distribution
  const conceptData = [
    { name: 'Basic Equations', mastery: 93, benchmark: 80 },
    { name: 'Word Problems', mastery: 82, benchmark: 75 },
    { name: 'Distributive Prop', mastery: 68, benchmark: 75 },
    { name: 'Inverse Ops', mastery: 54, benchmark: 80 },
    { name: 'Rational Coeff', mastery: 42, benchmark: 70 }
  ];

  // Chart 2: Learning Level Triad Distribution
  const levelDistributionData = [
    { name: 'Mastered / Ready for Extension', value: studentsMastered, color: '#10b981' },
    { name: 'Developing Competence', value: studentsDeveloping, color: '#6366f1' },
    { name: 'Needs Targeted Support', value: studentsNeedingSupport, color: '#f59e0b' }
  ];

  // Chart 3: Longitudinal Cohort Progress over 4 diagnostic checks
  const progressTimelineData = [
    { week: 'Week 1 (Diagnostic 7.4)', classMastery: 52, inverseOps: 38 },
    { week: 'Week 2 (Formative 8.0)', classMastery: 58, inverseOps: 44 },
    { week: 'Week 3 (Pre-Lesson Check)', classMastery: 67, inverseOps: 54 },
    { week: 'Projected (Post Remediation)', classMastery: 84, inverseOps: 86 }
  ];

  // Filtered student list for quick triage
  const filteredStudents = students.filter(s => {
    if (selectedFilter === 'needsSupport') return s.learningLevel === 'Needs Support';
    if (selectedFilter === 'mastered') return s.learningLevel === 'Mastered';
    if (selectedFilter === 'developing') return s.learningLevel === 'Developing' || s.learningLevel === 'Proficient';
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800">
              Class 8-A Mathematics
            </span>
            <span className="text-xs text-slate-500 font-medium">Diagnostic: Linear Equations in One Variable</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Diagnostic Command Dashboard
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Transforming student cognitive assessment signals into actionable instructional guidance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {onOpenGroups && (
            <button
              onClick={onOpenGroups}
              className="px-3.5 py-2.5 rounded-xl text-sm font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Users className="w-4 h-4 text-indigo-600" />
              Dynamic Groups ({totalStudents})
            </button>
          )}
          {onOpenMisconceptionLab && (
            <button
              onClick={onOpenMisconceptionLab}
              className="px-3.5 py-2.5 rounded-xl text-sm font-semibold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-all flex items-center gap-2 cursor-pointer"
            >
              <BrainCircuit className="w-4 h-4 text-amber-600" />
              Misconception Lab
            </button>
          )}
          <button
            onClick={onOpenActionPlan}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-indigo-200" />
            Today's Lesson Plan
          </button>
          <button
            onClick={onExportReport}
            className="px-3.5 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300/80 transition-all flex items-center gap-2 cursor-pointer"
          >
            <FileDown className="w-4 h-4 text-slate-600" />
            Google Docs
          </button>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Class Mastery</span>
            <Target className="w-4 h-4 text-teal-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{avgScore}%</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              +15% vs last unit
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Overall diagnostic proficiency index</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Cohort Assessed</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{studentsAssessed} / {totalStudents}</span>
            <span className="text-xs font-semibold text-indigo-600">100% submission</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">6 cognitive items evaluated</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-amber-200/80 bg-amber-50/30 shadow-xs">
          <div className="flex items-center justify-between text-amber-800 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Targeted Support</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-900">{studentsNeedingSupport} Students</span>
            <span className="text-xs font-semibold text-amber-700">23.3% of cohort</span>
          </div>
          <p className="text-xs text-amber-700/80 mt-2">Require small-group zero-pair routine</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-teal-200/80 bg-teal-50/30 shadow-xs">
          <div className="flex items-center justify-between text-teal-800 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Ready for Extension</span>
            <TrendingUp className="w-4 h-4 text-teal-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-teal-900">{studentsMastered} Students</span>
            <span className="text-xs font-semibold text-teal-700">Group A autonomous</span>
          </div>
          <p className="text-xs text-teal-700/80 mt-2">Ready for simultaneous equations</p>
        </div>
      </div>

      {/* Critical Prescriptive Alert: Teacher Action Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 rounded-2xl shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-700/50 text-indigo-200 text-xs font-semibold uppercase tracking-wider border border-indigo-600/40">
              <BrainCircuit className="w-3.5 h-3.5 text-teal-300" />
              AI Pedagogical Diagnostic Recommendation
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {actionPlan.headlineRecommendation}
            </h3>
            <p className="text-sm text-indigo-100/90 leading-relaxed">
              <strong className="text-teal-300">7 students (including Rahul & Devansh)</strong> repeatedly made the exact same error of repeating positive additions during transposition (e.g., 2x + 4 = 10 ➔ 2x = 14).
              Do not jump to word problems until this zero-pair balance gap is resolved.
            </p>
          </div>

          <div className="flex-shrink-0 flex items-center gap-3">
            <button
              onClick={onOpenActionPlan}
              className="px-5 py-3 rounded-xl font-semibold bg-white text-indigo-950 hover:bg-slate-100 shadow-md transition-all flex items-center gap-2 text-sm cursor-pointer"
            >
              <span>View Full 45-Min Lesson Plan</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Concept Performance Matrix */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Concept-Wise Cohort Mastery (%)</h3>
              <p className="text-xs text-slate-500">Benchmark vs Actual student demonstration</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 text-slate-600">
                <span className="w-3 h-3 rounded bg-indigo-600" /> Class Average
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <span className="w-3 h-3 rounded bg-slate-300" /> Mastery Target (75%)
              </div>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={conceptData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} interval={0} angle={-15} textAnchor="end" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip 
                  formatter={(value: any) => [`${value}%`, 'Score']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="mastery" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={34} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span><strong>Urgent Attention:</strong> Rational Coefficients (42%) and Inverse Operations (54%) fall below threshold.</span>
            <span className="text-indigo-600 font-semibold cursor-pointer" onClick={onOpenActionPlan}>See remediation steps ➔</span>
          </div>
        </div>

        {/* Chart 2: Learning-Level Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Student Grouping Triad</h3>
            <p className="text-xs text-slate-500 mb-4">Evidence-based learning categorization</p>
            
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={levelDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {levelDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => [`${value} students`, 'Count']}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Group A: Ready for Extension
              </span>
              <span className="font-bold text-slate-900">{studentsMastered} students</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Group B: Developing
              </span>
              <span className="font-bold text-slate-900">{studentsDeveloping} students</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Group C: Targeted Support
              </span>
              <span className="font-bold text-slate-900">{studentsNeedingSupport} students</span>
            </div>
          </div>
        </div>
      </div>

      {/* Misconceptions Radar & Student Roster */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Detected Misconceptions List */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Detected Misconceptions</h3>
              <p className="text-xs text-slate-500">Root cognitive causes behind incorrect responses</p>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
              {misconceptions.length} Active
            </span>
          </div>

          <div className="space-y-3">
            {misconceptions.map((m) => (
              <div 
                key={m.id}
                className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900">{m.title}</span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    m.severity === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {m.frequencyInClass} Students ({Math.round((m.frequencyInClass/30)*100)}%)
                  </span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-2">
                  {m.description}
                </p>
                <div className="text-[11px] text-indigo-700 font-medium flex items-center gap-1">
                  <span>Confidence {Math.round(m.confidence * 100)}%</span>
                  <span>•</span>
                  <span>Affected: Rahul, Priya, Devansh...</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student Roster & Triage Table */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Student Learning Profiles</h3>
              <p className="text-xs text-slate-500">Click any student to view diagnostic breakdown and individual remediation</p>
            </div>

            {/* Segmented Filter */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-semibold text-slate-600">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  selectedFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                All ({totalStudents})
              </button>
              <button
                onClick={() => setSelectedFilter('needsSupport')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  selectedFilter === 'needsSupport' ? 'bg-amber-500 text-white shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                Needs Support ({studentsNeedingSupport})
              </button>
              <button
                onClick={() => setSelectedFilter('developing')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  selectedFilter === 'developing' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                Developing ({studentsDeveloping})
              </button>
              <button
                onClick={() => setSelectedFilter('mastered')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  selectedFilter === 'mastered' ? 'bg-emerald-600 text-white shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                Mastered ({studentsMastered})
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase bg-slate-50 text-slate-500 border-y border-slate-200/80">
                <tr>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Learning Status</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Primary Diagnostic Gap</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.slice(0, 8).map((student) => (
                  <tr 
                    key={student.id} 
                    onClick={() => onSelectStudent(student)}
                    className="hover:bg-indigo-50/50 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={student.avatar} 
                          alt={student.name} 
                          className="w-8 h-8 rounded-full object-cover border border-slate-200" 
                        />
                        <div>
                          <div className="font-semibold text-slate-900">{student.name}</div>
                          <div className="text-xs text-slate-400">{student.rollNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        student.learningLevel === 'Mastered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : student.learningLevel === 'Proficient' || student.learningLevel === 'Developing'
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {student.learningLevel}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold text-slate-700">
                      {student.overallScore}%
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-600">
                      {student.detectedMisconceptions.length > 0 ? (
                        <span className="text-rose-600 font-medium">
                          {student.detectedMisconceptions[0].misconception.split(':')[0]}
                        </span>
                      ) : (
                        <span className="text-emerald-600 font-medium">All foundational concepts cleared</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1">
                        View Profile <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
