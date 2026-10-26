import { 
  StudentProfile, 
  DiagnosticAssessment, 
  TeacherActionPlan, 
  MisconceptionDetail 
} from './types';

export const INITIAL_ASSESSMENT: DiagnosticAssessment = {
  id: 'diag-math-8-01',
  title: 'Diagnostic 8.1: Foundations of Linear Equations & Single Variables',
  subject: 'Mathematics',
  classGrade: 'Class 8',
  topic: 'Linear Equations in One Variable',
  totalQuestions: 6,
  difficulty: 'Mixed',
  learningObjectives: [
    'Apply inverse operations to isolate variables with balanced equations',
    'Differentiate variable terms from constants across both sides',
    'Expand expressions using the distributive property before solving',
    'Translate real-world word problems into balanced linear algebraic statements'
  ],
  createdAt: '2026-09-18',
  status: 'Completed',
  questions: [
    {
      id: 'q1',
      concept: 'Linear Equations',
      subConcept: 'Inverse Operations & Term Isolation',
      difficulty: 'Easy',
      cognitiveLevel: 'Recall',
      learningObjective: 'Apply inverse operations correctly to remove additive constants',
      questionText: 'Solve for x: 2x + 4 = 10',
      options: [
        { label: 'A', text: 'x = 3', isCorrect: true, diagnosticSignal: 'Correct mastery of inverse operations (10-4=6, 6/2=3)' },
        { label: 'B', text: 'x = 7', isCorrect: false, diagnosticSignal: 'Added 4 instead of subtracting (10+4=14, 14/2=7). Sign reversal misconception.' },
        { label: 'C', text: 'x = 5', isCorrect: false, diagnosticSignal: 'Divided 10 by 2 before subtracting constant. Order of operations slip.' },
        { label: 'D', text: 'x = 1', isCorrect: false, diagnosticSignal: 'Arithmetic miscalculation slip.' }
      ],
      expectedAnswer: 'x = 3',
      solutionWalkthrough: 'Subtract 4 from both sides: 2x = 6. Divide both sides by 2: x = 3.',
      commonMisconceptionTriggered: 'Inverse Operations Sign Reversal'
    },
    {
      id: 'q2',
      concept: 'Linear Equations',
      subConcept: 'Variables on Both Sides',
      difficulty: 'Medium',
      cognitiveLevel: 'Understanding',
      learningObjective: 'Collect variable terms on one side and constant terms on the other',
      questionText: 'Solve for y: 5y - 3 = 2y + 9',
      options: [
        { label: 'A', text: 'y = 4', isCorrect: true, diagnosticSignal: 'Correct balance of both variable and constant terms (3y = 12 -> y = 4)' },
        { label: 'B', text: 'y = 2', isCorrect: false, diagnosticSignal: 'Added 2y to 5y (7y = 12) or miscalculated 9 - 3 instead of 9 + 3.' },
        { label: 'C', text: 'y = 6', isCorrect: false, diagnosticSignal: 'Subtracted 3 from 9 (3y = 6 -> y = 2) then mixed operations.' },
        { label: 'D', text: 'y = 3', isCorrect: false, diagnosticSignal: 'Arithmetic slip during subtraction.' }
      ],
      expectedAnswer: 'y = 4',
      solutionWalkthrough: 'Subtract 2y from both sides: 3y - 3 = 9. Add 3 to both sides: 3y = 12. Divide by 3: y = 4.',
      commonMisconceptionTriggered: 'Variable Isolation Order'
    },
    {
      id: 'q3',
      concept: 'Linear Equations',
      subConcept: 'Distributive Property with Variables',
      difficulty: 'Medium',
      cognitiveLevel: 'Application',
      learningObjective: 'Distribute factors across parentheses without dropping multipliers',
      questionText: 'Solve for m: 3(m - 2) = 15',
      options: [
        { label: 'A', text: 'm = 7', isCorrect: true, diagnosticSignal: 'Correct expansion: 3m - 6 = 15 -> 3m = 21 -> m = 7 (or divided first: m - 2 = 5 -> m = 7)' },
        { label: 'B', text: 'm = 5', isCorrect: false, diagnosticSignal: 'Neglected distributing 3 to -2, wrote 3m - 2 = 15 -> 3m = 17 or dropped bracket.' },
        { label: 'C', text: 'm = 3', isCorrect: false, diagnosticSignal: 'Subtracted 2 instead of adding after division.' },
        { label: 'D', text: 'm = 9', isCorrect: false, diagnosticSignal: 'Added 6 then made arithmetic division error.' }
      ],
      expectedAnswer: 'm = 7',
      solutionWalkthrough: 'Method 1: 3m - 6 = 15 => 3m = 21 => m = 7. Method 2: m - 2 = 5 => m = 7.',
      commonMisconceptionTriggered: 'Distributive Property Neglect'
    },
    {
      id: 'q4',
      concept: 'Fractions & Rational Coefficients',
      subConcept: 'Fractional Coefficients in Equations',
      difficulty: 'Hard',
      cognitiveLevel: 'Application',
      learningObjective: 'Clear denominators or multiply by reciprocals to isolate variables',
      questionText: 'Solve for k: (2/3)k + 1 = 5',
      options: [
        { label: 'A', text: 'k = 6', isCorrect: true, diagnosticSignal: 'Subtracted 1: (2/3)k = 4. Multiplied by 3/2: k = 6.' },
        { label: 'B', text: 'k = 8', isCorrect: false, diagnosticSignal: 'Multiplied 4 by 2 instead of reciprocal 3/2.' },
        { label: 'C', text: 'k = 2.6', isCorrect: false, diagnosticSignal: 'Divided 4 by 3/2 incorrectly.' },
        { label: 'D', text: 'k = 9', isCorrect: false, diagnosticSignal: 'Numerator-denominator inversion mistake.' }
      ],
      expectedAnswer: 'k = 6',
      solutionWalkthrough: '(2/3)k = 4. Multiply both sides by 3: 2k = 12. Divide by 2: k = 6.',
      commonMisconceptionTriggered: 'Numerator-Denominator Fraction Confusion'
    },
    {
      id: 'q5',
      concept: 'Linear Equations',
      subConcept: 'Word Problem Algebraic Translation',
      difficulty: 'Medium',
      cognitiveLevel: 'Reasoning',
      learningObjective: 'Formulate a balanced algebraic equation from written situational text',
      questionText: 'Arun has 3 times as many books as Maya. Together they have 24 books. Which equation finds Maya\'s books (b)?',
      options: [
        { label: 'A', text: 'b + 3b = 24', isCorrect: true, diagnosticSignal: 'Identified Maya=b, Arun=3b, Total=24. Perfect conceptual formulation.' },
        { label: 'B', text: 'b + 3 = 24', isCorrect: false, diagnosticSignal: 'Confused "3 times as many" with "3 more than". Operation translation gap.' },
        { label: 'C', text: '3b = 24', isCorrect: false, diagnosticSignal: 'Omitted Maya’s own share from total books.' },
        { label: 'D', text: '3(b + 24) = 0', isCorrect: false, diagnosticSignal: 'Completely ungrounded relational setup.' }
      ],
      expectedAnswer: 'b + 3b = 24 (or 4b = 24)',
      solutionWalkthrough: 'Let Maya have b books. Arun has 3b books. Sum = b + 3b = 24.',
      commonMisconceptionTriggered: 'Conceptual Equivalence Gap'
    },
    {
      id: 'q6',
      concept: 'Linear Equations',
      subConcept: 'Negative Coefficients & Division',
      difficulty: 'Hard',
      cognitiveLevel: 'Reasoning',
      learningObjective: 'Maintain inequality/equality signs when dividing through negative coefficients',
      questionText: 'Solve for p: 14 - 4p = 2',
      options: [
        { label: 'A', text: 'p = 3', isCorrect: true, diagnosticSignal: '-4p = -12 => p = 3. Accurate handling of negative signs.' },
        { label: 'B', text: 'p = -3', isCorrect: false, diagnosticSignal: 'Lost negative sign on right side (-4p = 12 instead of -12).' },
        { label: 'C', text: 'p = 4', isCorrect: false, diagnosticSignal: 'Added 14 instead of subtracting 14.' },
        { label: 'D', text: 'p = -4', isCorrect: false, diagnosticSignal: 'Sign reversal combined with arithmetic slip.' }
      ],
      expectedAnswer: 'p = 3',
      solutionWalkthrough: '-4p = 2 - 14 = -12. Divide both sides by -4: p = 3.',
      commonMisconceptionTriggered: 'Inverse Operations Sign Reversal'
    }
  ]
};

export const COMMON_MISCONCEPTIONS: MisconceptionDetail[] = [
  {
    id: 'misc-1',
    title: 'Inverse Operations Sign Reversal',
    concept: 'Linear Equations',
    frequencyInClass: 7, // 7 out of 30 students (23.3%)
    affectedStudentIds: ['s1', 's2', 's5', 's11', 's17', 's22', 's28'],
    severity: 'High',
    description: 'When isolating a variable by transposing an addition term, the student repeats the positive addition on the other side instead of applying subtraction (e.g. 2x + 4 = 10 leads to 2x = 10 + 4 = 14).',
    studentEvidenceExample: 'Rahul answered x = 7 for 2x + 4 = 10; Priya chose p = -3 for 14 - 4p = 2 due to losing negative cancelation.',
    recommendedAction: 'Facilitate a 10-minute visual balance scale simulation showing why adding weight to both sides tilts the equation, whereas subtracting the constant restores equilibrium.',
    confidence: 0.91
  },
  {
    id: 'misc-2',
    title: 'Distributive Property Neglect',
    concept: 'Algebraic Expressions',
    frequencyInClass: 5,
    affectedStudentIds: ['s2', 's7', 's13', 's19', 's25'],
    severity: 'Medium',
    description: 'Students multiply the external scalar only into the first variable term inside parentheses, completely neglecting the constant or secondary term (e.g. 3(m - 2) converted as 3m - 2 = 15).',
    studentEvidenceExample: 'Ananya wrote 3m - 2 = 15 -> 3m = 17 in Q3.',
    recommendedAction: 'Provide an area model graphic representing 3 * (m - 2) as 3 rows of length m minus 2 units.',
    confidence: 0.86
  },
  {
    id: 'misc-3',
    title: 'Numerator-Denominator Fraction Confusion',
    concept: 'Fractions & Rational Coefficients',
    frequencyInClass: 6,
    affectedStudentIds: ['s1', 's4', 's9', 's14', 's20', 's26'],
    severity: 'Medium',
    description: 'When multiplying by the reciprocal of a fraction coefficient (e.g., 2/3), students multiply the numerator instead of dividing, or confuse inverse fractions with direct multiplication.',
    studentEvidenceExample: 'In Q4 (2/3)k = 4, Devansh calculated k = 4 * 2 = 8 rather than 4 * (3/2) = 6.',
    recommendedAction: 'Use two-step clearing: first multiply entire equation by the denominator 3, then divide by the numerator 2.',
    confidence: 0.88
  },
  {
    id: 'misc-4',
    title: 'Careless Arithmetic / Sign Drift',
    concept: 'Integer Operations',
    frequencyInClass: 3,
    affectedStudentIds: ['s3', 's12', 's18'],
    severity: 'Low',
    description: 'Student demonstrates full structural understanding of algebra balance, but makes quick calculation slips under timed pressure (e.g., 9 + 3 misread as 11).',
    studentEvidenceExample: 'Aarav identified 3y = 12 correctly in scratch work but scribbled y = 3.',
    recommendedAction: 'Encourage a 30-second substitution check: plug the found value back into the original left-hand side to verify equality.',
    confidence: 0.82
  }
];

export const INITIAL_STUDENTS: StudentProfile[] = [
  {
    id: 's1',
    name: 'Rahul Sharma',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    rollNumber: '8A-01',
    classGrade: 'Class 8-A',
    learningLevel: 'Needs Support',
    overallScore: 33,
    strongConcepts: ['Basic Equations Recognition'],
    developingConcepts: ['Word Problem Formulation'],
    weakConcepts: ['Inverse Operations', 'Fractional Coefficients'],
    detectedMisconceptions: [
      {
        concept: 'Linear Equations',
        misconception: 'Inverse Operations Sign Reversal: Repeatedly adds constant instead of subtracting.',
        confidence: 0.92,
        evidence: 'Selected x = 7 for 2x + 4 = 10 (did 10 + 4 = 14, 14/2 = 7) and made identical transposition slip on Q6.'
      },
      {
        concept: 'Fractions',
        misconception: 'Numerator-Denominator Confusion when resolving fractional coefficients.',
        confidence: 0.84,
        evidence: 'Selected k = 8 for (2/3)k + 1 = 5 by multiplying 4 by 2.'
      }
    ],
    conceptMastery: [
      { concept: 'Basic Equations', score: 80, status: 'Mastered', questionsAssessed: 1, questionsCorrect: 1 },
      { concept: 'Inverse Operations', score: 20, status: 'Needs Support', questionsAssessed: 2, questionsCorrect: 0 },
      { concept: 'Distributive Property', score: 50, status: 'Developing', questionsAssessed: 1, questionsCorrect: 1 },
      { concept: 'Rational Coefficients', score: 0, status: 'Needs Support', questionsAssessed: 1, questionsCorrect: 0 },
      { concept: 'Word Problem Translation', score: 60, status: 'Developing', questionsAssessed: 1, questionsCorrect: 0 }
    ],
    responses: [
      { questionId: 'q1', selectedAnswer: 'B', isCorrect: false, timeSpentSeconds: 42, detectedMisconception: 'Inverse Operations Sign Reversal', confidence: 0.92, analysisNote: 'Calculated 10 + 4 instead of 10 - 4.' },
      { questionId: 'q2', selectedAnswer: 'C', isCorrect: false, timeSpentSeconds: 58, detectedMisconception: 'Variable Isolation Order', confidence: 0.81, analysisNote: 'Mixed constants transposition.' },
      { questionId: 'q3', selectedAnswer: 'A', isCorrect: true, timeSpentSeconds: 65, confidence: 0.88, analysisNote: 'Expanded 3(m-2) cleanly.' },
      { questionId: 'q4', selectedAnswer: 'B', isCorrect: false, timeSpentSeconds: 74, detectedMisconception: 'Numerator-Denominator Fraction Confusion', confidence: 0.89, analysisNote: 'Multiplied numerator directly.' },
      { questionId: 'q5', selectedAnswer: 'B', isCorrect: false, timeSpentSeconds: 38, detectedMisconception: 'Conceptual Equivalence Gap', confidence: 0.78, analysisNote: 'Equated 3 times to plus 3.' },
      { questionId: 'q6', selectedAnswer: 'C', isCorrect: false, timeSpentSeconds: 50, detectedMisconception: 'Inverse Operations Sign Reversal', confidence: 0.87, analysisNote: 'Sign error on negative variable.' }
    ],
    assignedGroup: 'Group C — Needs Targeted Support',
    readinessGroup: 'Needs Targeted Support',
    isManuallyPlaced: false,
    lastActive: '12 mins ago',
    aiDiagnosticReasoning: 'Rahul has strong willingness to engage with algebra and correctly expanded distributive brackets. However, an ingrained procedural misconception causes him to invert subtraction and addition during transposition across equal signs. Target inverse balance operations first.',
    remediationPlan: {
      studentId: 's1',
      studentName: 'Rahul Sharma',
      conceptToRevisit: 'Inverse Operations & Transposition Balance',
      whyStudentNeedsSupport: 'Rahul consistently reverses subtraction and addition operations when transposing constant terms across equality signs (evident in Q1 and Q6).',
      recommendedActivity: 'Interactive Two-Pan Balance Visualizer + 3 Guided Inverse Scaffold Cards',
      difficultyLevel: 'Targeted Guided',
      estimatedTimeMinutes: 15,
      guidedSteps: [
        'Step 1: Visualize the equation 2x + 4 = 10 as a balanced scale with 2 bags of x and 4 single blocks on Left, and 10 single blocks on Right.',
        'Step 2: Remove 4 single blocks from BOTH sides to keep balance level (10 - 4 = 6). Notice subtraction cancels addition.',
        'Step 3: Divide remaining 6 blocks into 2 equal piles: each x bag equals 3.'
      ],
      followUpQuestions: [
        {
          question: 'If 3x + 5 = 20, what is the exact inverse step to isolate 3x?',
          expectedAnswer: 'Subtract 5 from both sides (3x = 15)',
          hint: 'Look at the sign in front of 5: it is +5. What undoes +5?'
        },
        {
          question: 'Solve for m: 4m - 8 = 12',
          expectedAnswer: 'm = 5',
          hint: 'The constant is -8. To undo -8, you must add 8 to both sides.'
        }
      ]
    }
  },
  {
    id: 's2',
    name: 'Priya Patel',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rollNumber: '8A-02',
    classGrade: 'Class 8-A',
    learningLevel: 'Needs Support',
    overallScore: 50,
    strongConcepts: ['Word Problem Translation', 'Basic Equations'],
    developingConcepts: ['Distributive Property'],
    weakConcepts: ['Negative Coefficients', 'Inverse Operations'],
    detectedMisconceptions: [
      {
        concept: 'Linear Equations',
        misconception: 'Inverse Operations Sign Reversal: drops negative sign when dividing coefficients.',
        confidence: 0.89,
        evidence: 'Selected p = -3 on Q6 instead of +3, dropping minus on RHS.'
      }
    ],
    conceptMastery: [
      { concept: 'Basic Equations', score: 100, status: 'Mastered', questionsAssessed: 1, questionsCorrect: 1 },
      { concept: 'Inverse Operations', score: 50, status: 'Developing', questionsAssessed: 2, questionsCorrect: 1 },
      { concept: 'Distributive Property', score: 45, status: 'Needs Support', questionsAssessed: 1, questionsCorrect: 0 },
      { concept: 'Rational Coefficients', score: 60, status: 'Developing', questionsAssessed: 1, questionsCorrect: 0 },
      { concept: 'Word Problem Translation', score: 100, status: 'Mastered', questionsAssessed: 1, questionsCorrect: 1 }
    ],
    responses: [
      { questionId: 'q1', selectedAnswer: 'A', isCorrect: true, timeSpentSeconds: 31, confidence: 0.94, analysisNote: 'Accurately solved 2x + 4 = 10.' },
      { questionId: 'q2', selectedAnswer: 'A', isCorrect: true, timeSpentSeconds: 45, confidence: 0.91, analysisNote: 'Handled both sides variables cleanly.' },
      { questionId: 'q3', selectedAnswer: 'B', isCorrect: false, timeSpentSeconds: 52, detectedMisconception: 'Distributive Property Neglect', confidence: 0.84, analysisNote: 'Multiplied 3 only by m, kept -2.' },
      { questionId: 'q4', selectedAnswer: 'A', isCorrect: true, timeSpentSeconds: 61, confidence: 0.86, analysisNote: 'Proper reciprocal multiplication.' },
      { questionId: 'q5', selectedAnswer: 'A', isCorrect: true, timeSpentSeconds: 29, confidence: 0.95, analysisNote: 'Great mathematical comprehension.' },
      { questionId: 'q6', selectedAnswer: 'B', isCorrect: false, timeSpentSeconds: 47, detectedMisconception: 'Inverse Operations Sign Reversal', confidence: 0.89, analysisNote: 'Negative sign lost in division step.' }
    ],
    assignedGroup: 'Group B — Developing',
    readinessGroup: 'Developing Understanding',
    isManuallyPlaced: false,
    lastActive: '5 mins ago',
    aiDiagnosticReasoning: 'Priya exhibits brilliant word-problem formulation and high conceptual comprehension. However, her execution falters specifically when distributing over negative brackets and handling negative divisors.',
    remediationPlan: {
      studentId: 's2',
      studentName: 'Priya Patel',
      conceptToRevisit: 'Negative Bracket Distribution & Division by Negatives',
      whyStudentNeedsSupport: 'Priya missed Q3 and Q6 because of negative sign dropping during distributive expansion and division.',
      recommendedActivity: 'Sign-Checker Scratchpad & 4 Targeted Distributive Challenges',
      difficultyLevel: 'Targeted Guided',
      estimatedTimeMinutes: 12,
      guidedSteps: [
        'Step 1: Always circle the sign in front of each term before multiplying.',
        'Step 2: Remember that dividing a negative integer by another negative integer yields a POSITIVE result (-12 / -4 = +3).'
      ],
      followUpQuestions: [
        {
          question: 'Expand: -2(3y - 4)',
          expectedAnswer: '-6y + 8',
          hint: 'Remember negative times negative is positive: (-2) * (-4) = +8.'
        }
      ]
    }
  },
  {
    id: 's3',
    name: 'Aarav Mehta',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rollNumber: '8A-03',
    classGrade: 'Class 8-A',
    learningLevel: 'Mastered',
    overallScore: 100,
    strongConcepts: ['Inverse Operations', 'Distributive Property', 'Rational Coefficients', 'Word Problem Translation'],
    developingConcepts: [],
    weakConcepts: [],
    detectedMisconceptions: [],
    conceptMastery: [
      { concept: 'Basic Equations', score: 100, status: 'Mastered', questionsAssessed: 1, questionsCorrect: 1 },
      { concept: 'Inverse Operations', score: 100, status: 'Mastered', questionsAssessed: 2, questionsCorrect: 2 },
      { concept: 'Distributive Property', score: 100, status: 'Mastered', questionsAssessed: 1, questionsCorrect: 1 },
      { concept: 'Rational Coefficients', score: 100, status: 'Mastered', questionsAssessed: 1, questionsCorrect: 1 },
      { concept: 'Word Problem Translation', score: 100, status: 'Mastered', questionsAssessed: 1, questionsCorrect: 1 }
    ],
    responses: [
      { questionId: 'q1', selectedAnswer: 'A', isCorrect: true, timeSpentSeconds: 18, confidence: 0.98, analysisNote: 'Mastered inverse operations.' },
      { questionId: 'q2', selectedAnswer: 'A', isCorrect: true, timeSpentSeconds: 24, confidence: 0.97, analysisNote: 'Clean algebraic balance.' },
      { questionId: 'q3', selectedAnswer: 'A', isCorrect: true, timeSpentSeconds: 26, confidence: 0.99, analysisNote: 'Rapid bracket expansion.' },
      { questionId: 'q4', selectedAnswer: 'A', isCorrect: true, timeSpentSeconds: 32, confidence: 0.95, analysisNote: 'Clear reciprocal calculation.' },
      { questionId: 'q5', selectedAnswer: 'A', isCorrect: true, timeSpentSeconds: 20, confidence: 0.99, analysisNote: 'Immediate setup of 4b = 24.' },
      { questionId: 'q6', selectedAnswer: 'A', isCorrect: true, timeSpentSeconds: 28, confidence: 0.98, analysisNote: 'Perfect integer division.' }
    ],
    assignedGroup: 'Group A — Ready for Extension',
    readinessGroup: 'Ready for Extension',
    isManuallyPlaced: false,
    lastActive: 'Just now',
    aiDiagnosticReasoning: 'Aarav has full procedural fluency and conceptual depth across all assessed objectives. Ready for extension into simultaneous linear equations and non-linear word problems.',
    remediationPlan: {
      studentId: 's3',
      studentName: 'Aarav Mehta',
      conceptToRevisit: 'Extension Challenge: Real-World Systems of Equations',
      whyStudentNeedsSupport: 'Ready for higher cognitive challenge (Application and Reasoning).',
      recommendedActivity: 'Olympiad-tier Word Problem Modeling & Peer Tutoring Prompt',
      difficultyLevel: 'Advanced Extension',
      estimatedTimeMinutes: 20,
      guidedSteps: [
        'Explore two simultaneous linear conditions: e.g., finding two integers whose sum is 45 and difference is 11.',
        'Act as peer mentor during Group B discussions for the inverse operations review.'
      ],
      followUpQuestions: [
        {
          question: 'Solve for x and y: x + y = 14 and x - y = 4',
          expectedAnswer: 'x = 9, y = 5',
          hint: 'Try adding both equations together to eliminate y.'
        }
      ]
    }
  },
  {
    id: 's4',
    name: 'Ananya Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    rollNumber: '8A-04',
    classGrade: 'Class 8-A',
    learningLevel: 'Developing',
    overallScore: 67,
    strongConcepts: ['Inverse Operations', 'Word Problem Translation'],
    developingConcepts: ['Distributive Property'],
    weakConcepts: ['Rational Coefficients'],
    detectedMisconceptions: [
      {
        concept: 'Fractions',
        misconception: 'Numerator-Denominator Fraction Confusion',
        confidence: 0.88,
        evidence: 'Chose k = 8 on Q4, forgetting to multiply by denominator 3.'
      }
    ],
    conceptMastery: [
      { concept: 'Basic Equations', score: 100, status: 'Mastered', questionsAssessed: 1, questionsCorrect: 1 },
      { concept: 'Inverse Operations', score: 100, status: 'Mastered', questionsAssessed: 2, questionsCorrect: 2 },
      { concept: 'Distributive Property', score: 65, status: 'Developing', questionsAssessed: 1, questionsCorrect: 1 },
      { concept: 'Rational Coefficients', score: 20, status: 'Needs Support', questionsAssessed: 1, questionsCorrect: 0 },
      { concept: 'Word Problem Translation', score: 85, status: 'Mastered', questionsAssessed: 1, questionsCorrect: 1 }
    ],
    responses: [
      { questionId: 'q1', selectedAnswer: 'A', isCorrect: true, timeSpentSeconds: 28, confidence: 0.95, analysisNote: 'Flawless single variable isolation.' },
      { questionId: 'q2', selectedAnswer: 'A', isCorrect: true, timeSpentSeconds: 40, confidence: 0.92, analysisNote: 'Transposed variable correctly.' },
      { questionId: 'q3', selectedAnswer: 'A', isCorrect: true, timeSpentSeconds: 44, confidence: 0.89, analysisNote: 'Calculated m=7.' },
      { questionId: 'q4', selectedAnswer: 'B', isCorrect: false, timeSpentSeconds: 65, detectedMisconception: 'Numerator-Denominator Fraction Confusion', confidence: 0.88, analysisNote: 'Multiplied numerator 2.' },
      { questionId: 'q5', selectedAnswer: 'A', isCorrect: true, timeSpentSeconds: 33, confidence: 0.96, analysisNote: 'Strong relational modeling.' },
      { questionId: 'q6', selectedAnswer: 'C', isCorrect: false, timeSpentSeconds: 52, confidence: 0.79, analysisNote: 'Calculation slip on -12 / -4.' }
    ],
    assignedGroup: 'Group B — Developing',
    readinessGroup: 'Developing Understanding',
    isManuallyPlaced: false,
    lastActive: '20 mins ago',
    aiDiagnosticReasoning: 'Ananya is confident with linear relationships. Her only roadblock is fractional manipulation. Resolving clearing denominators will immediately elevate her to Mastered level.',
    remediationPlan: {
      studentId: 's4',
      studentName: 'Ananya Deshmukh',
      conceptToRevisit: 'Clearing Denominators with Rational Coefficients',
      whyStudentNeedsSupport: 'Confused numerator multiplication with reciprocal transformation in Q4.',
      recommendedActivity: 'Denominators Clearing Step-Through Cards',
      difficultyLevel: 'Targeted Guided',
      estimatedTimeMinutes: 12,
      guidedSteps: [
        'Whenever you see a fraction like (2/3)k = 4, first multiply BOTH sides by 3 to eliminate the denominator: 2k = 12.',
        'Then divide both sides by 2 to get k = 6.'
      ],
      followUpQuestions: [
        {
          question: 'Solve for x: (3/5)x = 9',
          expectedAnswer: 'x = 15',
          hint: 'Multiply 9 by 5 first, then divide by 3.'
        }
      ]
    }
  },
  {
    id: 's5',
    name: 'Devansh Verma',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rollNumber: '8A-05',
    classGrade: 'Class 8-A',
    learningLevel: 'Needs Support',
    overallScore: 33,
    strongConcepts: ['Basic Equations Recognition'],
    developingConcepts: ['Word Problem Formulation'],
    weakConcepts: ['Inverse Operations', 'Distributive Property'],
    detectedMisconceptions: [
      {
        concept: 'Linear Equations',
        misconception: 'Inverse Operations Sign Reversal',
        confidence: 0.90,
        evidence: 'Answered x = 7 for Q1 and p = -3 on Q6.'
      },
      {
        concept: 'Linear Equations',
        misconception: 'Distributive Property Neglect',
        confidence: 0.85,
        evidence: 'Answered m = 5 on Q3.'
      }
    ],
    conceptMastery: [
      { concept: 'Basic Equations', score: 70, status: 'Developing', questionsAssessed: 1, questionsCorrect: 1 },
      { concept: 'Inverse Operations', score: 15, status: 'Needs Support', questionsAssessed: 2, questionsCorrect: 0 },
      { concept: 'Distributive Property', score: 30, status: 'Needs Support', questionsAssessed: 1, questionsCorrect: 0 },
      { concept: 'Rational Coefficients', score: 40, status: 'Developing', questionsAssessed: 1, questionsCorrect: 0 },
      { concept: 'Word Problem Translation', score: 60, status: 'Developing', questionsAssessed: 1, questionsCorrect: 1 }
    ],
    responses: [
      { questionId: 'q1', selectedAnswer: 'B', isCorrect: false, timeSpentSeconds: 40, detectedMisconception: 'Inverse Operations Sign Reversal', confidence: 0.90, analysisNote: 'Added 4 instead of subtracting.' },
      { questionId: 'q2', selectedAnswer: 'B', isCorrect: false, timeSpentSeconds: 62, detectedMisconception: 'Variable Isolation Order', confidence: 0.83, analysisNote: 'Added 2y instead of subtracting 2y.' },
      { questionId: 'q3', selectedAnswer: 'B', isCorrect: false, timeSpentSeconds: 50, detectedMisconception: 'Distributive Property Neglect', confidence: 0.85, analysisNote: 'Omitted 3 * 2 expansion.' },
      { questionId: 'q4', selectedAnswer: 'A', isCorrect: true, timeSpentSeconds: 70, confidence: 0.84, analysisNote: 'Accidentally or correctly found k = 6.' },
      { questionId: 'q5', selectedAnswer: 'A', isCorrect: true, timeSpentSeconds: 35, confidence: 0.91, analysisNote: 'Good word problem translation.' },
      { questionId: 'q6', selectedAnswer: 'B', isCorrect: false, timeSpentSeconds: 49, detectedMisconception: 'Inverse Operations Sign Reversal', confidence: 0.88, analysisNote: 'Negative sign loss.' }
    ],
    assignedGroup: 'Group C — Needs Targeted Support',
    readinessGroup: 'Needs Targeted Support',
    isManuallyPlaced: false,
    lastActive: '30 mins ago',
    aiDiagnosticReasoning: 'Devansh has foundational intuition for real-life situations (Q5 correct), but algebraic syntax and transposition mechanics break down repeatedly. Guided step cards will anchor his mechanics.',
    remediationPlan: {
      studentId: 's5',
      studentName: 'Devansh Verma',
      conceptToRevisit: 'Inverse Operations & Distributive Expansion',
      whyStudentNeedsSupport: 'Both sign reversal and bracket distribution were missing in Q1, Q2, and Q3.',
      recommendedActivity: 'Color-Coded Algebra Tiles & Balanced Scales Routine',
      difficultyLevel: 'Foundational',
      estimatedTimeMinutes: 18,
      guidedSteps: [
        'Color positive numbers blue and negative numbers red.',
        'Apply the opposite color to both sides to cancel terms.'
      ],
      followUpQuestions: [
        {
          question: 'Solve for x: 3x + 6 = 18',
          expectedAnswer: 'x = 4',
          hint: 'Subtract 6 from 18 first, then divide by 3.'
        }
      ]
    }
  },
  {
    id: 's6',
    name: 'Meera Iyer',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    rollNumber: '8A-06',
    classGrade: 'Class 8-A',
    learningLevel: 'Proficient',
    overallScore: 83,
    strongConcepts: ['Inverse Operations', 'Distributive Property', 'Word Problem Translation'],
    developingConcepts: ['Rational Coefficients'],
    weakConcepts: [],
    detectedMisconceptions: [],
    conceptMastery: [
      { concept: 'Basic Equations', score: 100, status: 'Mastered', questionsAssessed: 1, questionsCorrect: 1 },
      { concept: 'Inverse Operations', score: 90, status: 'Mastered', questionsAssessed: 2, questionsCorrect: 2 },
      { concept: 'Distributive Property', score: 85, status: 'Mastered', questionsAssessed: 1, questionsCorrect: 1 },
      { concept: 'Rational Coefficients', score: 50, status: 'Developing', questionsAssessed: 1, questionsCorrect: 0 },
      { concept: 'Word Problem Translation', score: 95, status: 'Mastered', questionsAssessed: 1, questionsCorrect: 1 }
    ],
    responses: [
      { questionId: 'q1', selectedAnswer: 'A', isCorrect: true, timeSpentSeconds: 22, confidence: 0.96, analysisNote: 'Fast execution.' },
      { questionId: 'q2', selectedAnswer: 'A', isCorrect: true, timeSpentSeconds: 34, confidence: 0.94, analysisNote: 'Sound algebraic balance.' },
      { questionId: 'q3', selectedAnswer: 'A', isCorrect: true, timeSpentSeconds: 30, confidence: 0.92, analysisNote: 'Clean distribution.' },
      { questionId: 'q4', selectedAnswer: 'C', isCorrect: false, timeSpentSeconds: 58, detectedMisconception: 'Numerator-Denominator Fraction Confusion', confidence: 0.81, analysisNote: 'Decimal rounding slip on fractional multiplication.' },
      { questionId: 'q5', selectedAnswer: 'A', isCorrect: true, timeSpentSeconds: 25, confidence: 0.98, analysisNote: 'Accurate model.' },
      { questionId: 'q6', selectedAnswer: 'A', isCorrect: true, timeSpentSeconds: 31, confidence: 0.95, analysisNote: 'Signed numbers handled properly.' }
    ],
    assignedGroup: 'Group A — Ready for Extension',
    readinessGroup: 'Ready for Extension',
    isManuallyPlaced: false,
    lastActive: '1 hour ago',
    aiDiagnosticReasoning: 'Meera demonstrates proficient conceptual mastery and solid speed. Her lone slip was arithmetic representation of 4 * 1.5. Ready for extension assignments.',
    remediationPlan: {
      studentId: 's6',
      studentName: 'Meera Iyer',
      conceptToRevisit: 'Rational Fractions vs Decimals in Equations',
      whyStudentNeedsSupport: 'Chose decimal approximation instead of exact fractional reciprocal.',
      recommendedActivity: 'Fraction Exact Form Mini-Check',
      difficultyLevel: 'Application Reinforcement',
      estimatedTimeMinutes: 10,
      guidedSteps: [
        'Keep fractions in exact improper form (e.g., 6/1) rather than converting to decimals early.'
      ],
      followUpQuestions: [
        {
          question: 'Solve for y: (4/7)y = 8',
          expectedAnswer: 'y = 14',
          hint: 'Multiply 8 by 7/4 directly.'
        }
      ]
    }
  }
];

// Generate additional 24 students for the full 30-student cohort realism
export function generateFullCohort(): StudentProfile[] {
  const cohort = [...INITIAL_STUDENTS];
  const names = [
    'Rohan Kulkarni', 'Sneha Nair', 'Aditya Joshi', 'Kavya Pillai',
    'Ishaan Gupta', 'Tanvi Singhania', 'Nikhil Reddy', 'Pooja Bhatt',
    'Siddharth Roy', 'Riya Sen', 'Kabir Das', 'Diya Kapoor',
    'Harsh Pandey', 'Ananya Roy', 'Varun Kapoor', 'Shruti Saxena',
    'Manish Tiwari', 'Kritika Sen', 'Gaurav Chopra', 'Pallavi Rao',
    'Arjun Menon', 'Rhea Chakraborty', 'Kunal Shah', 'Bhavna Lal'
  ];

  const avatars = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
  ];

  names.forEach((name, idx) => {
    const studentNum = idx + 7;
    const isNeedsSupport = [11, 17, 22, 28, 25].includes(studentNum);
    const isMastered = [8, 10, 15, 16, 21, 24, 29, 30].includes(studentNum);
    
    let learningLevel: StudentProfile['learningLevel'] = 'Developing';
    let group: StudentProfile['assignedGroup'] = 'Group B — Developing';
    let score = 67;

    if (isNeedsSupport) {
      learningLevel = 'Needs Support';
      group = 'Group C — Needs Targeted Support';
      score = 33;
    } else if (isMastered) {
      learningLevel = 'Mastered';
      group = 'Group A — Ready for Extension';
      score = 100;
    }

    cohort.push({
      id: `s${studentNum}`,
      name,
      avatar: avatars[idx % avatars.length],
      rollNumber: `8A-${studentNum < 10 ? '0' + studentNum : studentNum}`,
      classGrade: 'Class 8-A',
      learningLevel,
      overallScore: score,
      strongConcepts: isNeedsSupport ? ['Basic Equations'] : ['Inverse Operations', 'Distributive Property', 'Word Problems'],
      developingConcepts: isMastered ? [] : ['Rational Coefficients', 'Linear Balance'],
      weakConcepts: isNeedsSupport ? ['Inverse Operations', 'Fractional Equations'] : [],
      detectedMisconceptions: isNeedsSupport ? [
        {
          concept: 'Linear Equations',
          misconception: 'Inverse Operations Sign Reversal: transposing + into + on RHS.',
          confidence: 0.87,
          evidence: `Failed Q1 and Q6 with consistent + sign reproduction on transposition.`
        }
      ] : [],
      conceptMastery: [
        { concept: 'Basic Equations', score: isNeedsSupport ? 70 : 100, status: isNeedsSupport ? 'Developing' : 'Mastered', questionsAssessed: 1, questionsCorrect: 1 },
        { concept: 'Inverse Operations', score: isNeedsSupport ? 25 : (isMastered ? 100 : 75), status: isNeedsSupport ? 'Needs Support' : 'Mastered', questionsAssessed: 2, questionsCorrect: isNeedsSupport ? 0 : 2 },
        { concept: 'Distributive Property', score: isNeedsSupport ? 35 : (isMastered ? 100 : 80), status: isNeedsSupport ? 'Needs Support' : 'Mastered', questionsAssessed: 1, questionsCorrect: isNeedsSupport ? 0 : 1 },
        { concept: 'Rational Coefficients', score: isNeedsSupport ? 10 : (isMastered ? 100 : 60), status: isNeedsSupport ? 'Needs Support' : 'Developing', questionsAssessed: 1, questionsCorrect: isNeedsSupport ? 0 : (isMastered ? 1 : 0) },
        { concept: 'Word Problem Translation', score: isNeedsSupport ? 50 : 90, status: isNeedsSupport ? 'Developing' : 'Mastered', questionsAssessed: 1, questionsCorrect: 1 }
      ],
      responses: [
        { questionId: 'q1', selectedAnswer: isNeedsSupport ? 'B' : 'A', isCorrect: !isNeedsSupport, timeSpentSeconds: 30, confidence: 0.9, analysisNote: isNeedsSupport ? 'Inverse slip' : 'Correct' },
        { questionId: 'q2', selectedAnswer: 'A', isCorrect: true, timeSpentSeconds: 40, confidence: 0.9, analysisNote: 'Standard balance' },
        { questionId: 'q3', selectedAnswer: 'A', isCorrect: true, timeSpentSeconds: 35, confidence: 0.88, analysisNote: 'Bracket expansion' },
        { questionId: 'q4', selectedAnswer: isMastered ? 'A' : 'B', isCorrect: isMastered, timeSpentSeconds: 55, confidence: 0.85, analysisNote: 'Fraction logic' },
        { questionId: 'q5', selectedAnswer: 'A', isCorrect: true, timeSpentSeconds: 30, confidence: 0.92, analysisNote: 'Relational logic' },
        { questionId: 'q6', selectedAnswer: isNeedsSupport ? 'B' : 'A', isCorrect: !isNeedsSupport, timeSpentSeconds: 42, confidence: 0.89, analysisNote: 'Division sign handling' }
      ],
      assignedGroup: group,
      readinessGroup: isNeedsSupport ? 'Needs Targeted Support' : (isMastered ? 'Ready for Extension' : 'Developing Understanding'),
      isManuallyPlaced: false,
      lastActive: `${(studentNum * 3) % 45 + 5} mins ago`,
      aiDiagnosticReasoning: isNeedsSupport 
        ? `${name} requires targeted intervention in inverse balance operations before progressing to multi-step equations.`
        : (isMastered ? `${name} has achieved solid mastery across all diagnostic objectives.` : `${name} is developing sound proficiency with minor precision gaps.`),
      remediationPlan: {
        studentId: `s${studentNum}`,
        studentName: name,
        conceptToRevisit: isNeedsSupport ? 'Inverse Operations & Sign Balance' : (isMastered ? 'Non-Linear Systems Extension' : 'Fractional Denominators Clearing'),
        whyStudentNeedsSupport: isNeedsSupport ? 'Transposition sign reversal detected.' : 'Extension challenge.',
        recommendedActivity: isNeedsSupport ? 'Two-Pan Balance Simulator (12 mins)' : 'Higher-Order Application Problem Set',
        difficultyLevel: isNeedsSupport ? 'Targeted Guided' : (isMastered ? 'Advanced Extension' : 'Application Reinforcement'),
        estimatedTimeMinutes: isNeedsSupport ? 15 : 20,
        guidedSteps: ['Verify each side of equality balances out zero pairs before dividing.'],
        followUpQuestions: [
          {
            question: 'Solve for x: 5x - 7 = 18',
            expectedAnswer: 'x = 5',
            hint: 'Add 7 to 18 first to get 25.'
          }
        ]
      }
    });
  });

  return cohort;
}

export const TEACHER_ACTION_PLAN: TeacherActionPlan = {
  topic: 'Linear Equations in One Variable (Class 8)',
  headlineRecommendation: 'Begin today’s lesson with a 10-minute targeted review of Inverse Operations & Transposition rather than proceeding directly to Quadratic/Word Problem extensions.',
  startLessonWith: {
    title: 'Physical/Visual Balance Scale Routine',
    durationMinutes: 10,
    activitySummary: 'Draw a physical two-pan balance scale on the board with 2x + 4 on Left, and 10 on Right. Ask the class: "If we subtract 4 from the left to isolate x, what MUST we do to the right to keep balance?"',
    rationale: '7 out of 30 students (23.3%) made the exact same error of adding 4 to 10 on the RHS, resulting in 2x = 14 and x = 7.'
  },
  keyMisconceptionToAddress: {
    misconception: 'Inverse Operations Sign Reversal (Students repeating positive additions during transposition)',
    countAffected: 7,
    talkingPoint: 'Remind learners: Transposing a term across the equal sign is NOT just moving it; it is performing an inverse operation that cancels it to zero on that side.',
    counterExample: 'Display 2x + 4 = 10 -> Show that adding 4 makes 2x + 8 = 14, which does NOT isolate x.'
  },
  groupDirectives: [
    {
      group: 'Group A — Ready for Extension',
      studentCount: 11,
      strategy: 'Autonomous Extension & Peer Modeling',
      suggestedTask: 'Assign real-world geometry optimization word problems involving perimeter equations with fractional sides.'
    },
    {
      group: 'Group B — Developing',
      studentCount: 12,
      strategy: 'Guided Two-Step Practice & Denominator Clearing',
      suggestedTask: 'Pair students to solve 4 equations with fractional coefficients using the "Clear Denominators First" strategy.'
    },
    {
      group: 'Group C — Needs Targeted Support',
      studentCount: 7,
      strategy: 'Teacher-Led Small Group Intervention (15 min)',
      suggestedTask: 'Work with the 7 identified students using color-coded chips for + and - zero pairs to anchor transposition balance.'
    }
  ],
  exitTicketStrategy: {
    questionSummary: 'Deliver a 3-question exit ticket at minute 38: (1) 3x + 7 = 22, (2) 4(y - 3) = 16, (3) (2/5)k = 8.',
    targetSuccessThreshold: 'Aim for >85% class accuracy on Question 1 to confirm misconception resolution.'
  }
};
