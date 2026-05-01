// ========================================
// hepta-svt - CONFIG.JS
// جميع بيانات المنصة (دروس، أسئلة لعبة، اختبارات)
// ========================================

// ---------- 1. بيانات الدروس ----------
const lessonsData = {
    nervous: {
        title: '🧠 Le système nerveux',
        paragraphs: [
            { title: "L'organisation", image: 'nervous_1.jpg' },
            { title: 'La sensibilité consciente', image: 'nervous_2.jpg' },
            { title: 'La motricité volontaire', image: 'nervous_3.jpg' },
            { title: 'Motricité involontaire', image: 'nervous_4.jpg' },
            { title: 'Hygiène', image: 'nervous_5.jpg' }
        ]
    },
    muscular: {
        title: '💪 Le système musculaire',
        paragraphs: [
            { title: 'Rôle du muscle', image: 'muscular_1.jpg' },
            { title: 'Structure', image: 'muscular_2.jpg' },
            { title: 'Besoins', image: 'muscular_3.jpg' }
        ]
    }
};

// ---------- 2. أسئلة اللعبة (10 مستويات، كل مستوى 10 أسئلة) ----------
const levelsData = [
    // Level 1
    [
        { answer: 'CERVEAU', clue: 'centre nerveux / مركز عصبي', extra: ['T','M','N','K','P','X','B','L','A','R','D','F','G'] },
        { answer: 'MOELLE EPINIERE', clue: 'centre nerveux central / مركز عصبي مركزي', extra: ['X','T','K','A','B'] },
        { answer: 'NERFS', clue: 'organe nerveux périphérique / عضو عصبي محيطي', extra: ['T','M','A','K','L','X','B','P','D','G','H','J','Q','W','Z'] }
        // باقي الأسئلة ستضيفها لاحقاً (يمكنك نسخها من الكود القديم)
    ]
    // باقي المستويات ستضاف لاحقاً
];

// ---------- 3. أسئلة الاختبارات المعرفية ----------
const quizData = {
    easy: [
        { question: "Quel organe fait partie du système nerveux central ?", options: ["L'encéphale", "Le muscle", "L'os"], answer: "L'encéphale" },
        { question: "Quel est le rôle des récepteurs sensoriels dans la peau ?", options: ["Produire le mouvement", "Capter les stimulus extérieurs", "Analyser les messages"], answer: "Capter les stimulus extérieurs" }
        // باقي الأسئلة ستضيفها لاحقاً
    ],
    medium: [],
    hard: []
};

const immunologyQuizData = { easy: [], medium: [], hard: [] };
