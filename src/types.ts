export type CognitiveLevel = 'Recall' | 'Understanding' | 'Application' | 'Reasoning';

export type LearningLevel = 'Mastered' | 'Proficient' | 'Developing' | 'Needs Support' | 'Not Yet Demonstrated';

export type GroupReadinessCategory = 'Ready for Extension' | 'Developing Understanding' | 'Needs Targeted Support';

export type MisconceptionCategory = 
  | 'Inverse Operations Sign Reversal'
  | 'Numerator-Denominator Fraction Confusion'
  | 'Variable Isolation Order'
  | 'Distributive Property Neglect'
  | 'Careless Calculation Slip'
  | 'Conceptual Equivalence Gap';

export interface QuestionMetadata {
  id: string;
  concept: string;
  subConcept: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  learningObjective: string;
  cognitiveLevel: CognitiveLevel;
  questionText: string;
  options: { label: string; text: string; isCorrect: boolean; diagnosticSignal?: string }[];
  expectedAnswer: string;
  solutionWalkthrough: string;
  commonMisconceptionTriggered?: string;
}

export interface StudentResponse {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
  timeSpentSeconds: number;
  detectedMisconception?: string;
  confidence: number; // 0 to 1
  analysisNote: string;
}

export interface ConceptMasteryScore {
  concept: string;
  score: number; // 0 to 100
  status: 'Mastered' | 'Developing' | 'Needs Support';
  questionsAssessed: number;
  questionsCorrect: number;
}

export interface MisconceptionDetail {
  id: string;
  title: string;
  concept: string;
  frequencyInClass: number;
  affectedStudentIds: string[];
  severity: 'High' | 'Medium' | 'Low';
  description: string;
  studentEvidenceExample: string;
  recommendedAction: string;
  confidence: number;
}

export interface RemediationPlan {
  studentId: string;
  studentName: string;
  conceptToRevisit: string;
  whyStudentNeedsSupport: string;
  recommendedActivity: string;
  difficultyLevel: 'Foundational' | 'Targeted Guided' | 'Application Reinforcement' | 'Advanced Extension';
  estimatedTimeMinutes: number;
  guidedSteps: string[];
  followUpQuestions: {
    question: string;
    expectedAnswer: string;
    hint: string;
  }[];
  completed?: boolean;
}

export interface StudentAnswerAnalysis {
  isCorrect: boolean;
  category: 'Careless Mistake' | 'Conceptual Misunderstanding' | 'Procedural Misconception' | 'Mastered';
  misconceptionTitle: string;
  confidence: number;
  confidenceLevel: 'High' | 'Medium' | 'Low';
  diagnosticReasoning: string;
  evidence: string;
  targetedRemediation: {
    activityTitle: string;
    activityDescription: string;
    durationMinutes: number;
    modality: string;
    guidedSteps: string[];
    followUpCheck: {
      question: string;
      expectedAnswer: string;
      scaffoldingHint: string;
    };
  };
}

export interface StudentProfile {
  id: string;
  name: string;
  avatar: string;
  rollNumber: string;
  classGrade: string;
  learningLevel: LearningLevel;
  overallScore: number;
  strongConcepts: string[];
  developingConcepts: string[];
  weakConcepts: string[];
  detectedMisconceptions: {
    concept: string;
    misconception: string;
    confidence: number;
    evidence: string;
  }[];
  conceptMastery: ConceptMasteryScore[];
  responses: StudentResponse[];
  remediationPlan?: RemediationPlan;
  assignedGroup: 'Group A — Ready for Extension' | 'Group B — Developing' | 'Group C — Needs Targeted Support';
  readinessGroup: GroupReadinessCategory;
  isManuallyPlaced?: boolean;
  placementReason?: string;
  lastActive: string;
  teacherNotes?: string;
  aiDiagnosticReasoning: string;
}

export interface TeacherActionPlan {
  topic: string;
  headlineRecommendation: string;
  startLessonWith: {
    title: string;
    durationMinutes: number;
    activitySummary: string;
    rationale: string;
  };
  keyMisconceptionToAddress: {
    misconception: string;
    countAffected: number;
    talkingPoint: string;
    counterExample: string;
  };
  groupDirectives: {
    group: 'Group A — Ready for Extension' | 'Group B — Developing' | 'Group C — Needs Targeted Support';
    studentCount: number;
    strategy: string;
    suggestedTask: string;
  }[];
  exitTicketStrategy: {
    questionSummary: string;
    targetSuccessThreshold: string;
  };
}

export interface DiagnosticAssessment {
  id: string;
  title: string;
  subject: string;
  classGrade: string;
  topic: string;
  totalQuestions: number;
  difficulty: 'Foundational' | 'Mixed' | 'Advanced';
  learningObjectives: string[];
  questions: QuestionMetadata[];
  createdAt: string;
  status: 'Draft' | 'Active' | 'Completed';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
  hintLevel?: number;
  isGuidingQuestion?: boolean;
}
