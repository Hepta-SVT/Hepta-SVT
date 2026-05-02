// ========================================
// CONFIG.JS - جميع بيانات المنصة
// ========================================

// ---------- 1. الدروس ----------
const lessonsData = {
    nervous: {
        title: '🧠 Le système nerveux',
        paragraphs: [
            { title: "L'organisation", image: 'nervous_1.jpg' },
            { title: 'La sensibilité consciente', image: 'nervous_2.jpg' },
            { title: 'La motricité volontaire', image: 'nervous_3.jpg' },
            { title: 'Motricité involontaire', image: 'nervous_4.jpg' },
            { title: "Hygiène du système nerveux", image: 'nervous_5.jpg' }
        ]
    },
    muscular: {
        title: '💪 Le système musculaire',
        paragraphs: [
            { title: 'Rôle du muscle', image: 'muscular_1.jpg' },
            { title: 'Structure du muscle', image: 'muscular_2.jpg' },
            { title: 'Besoins du muscle', image: 'muscular_3.jpg' }
        ]
    }
};

// ---------- 2. أسئلة اللعبة (10 مستويات، 10 أسئلة لكل مستوى) ----------
const levelsData = [
    // المستوى 1
    [
        { answer: 'CERVEAU', clue: 'centre nerveux / مركز عصبي', extra: ['T','M','N','K','P','X','B','L','A','R','D','F','G'] },
        { answer: 'MOELLE EPINIERE', clue: 'centre nerveux central', extra: ['X','T','K','A','B'] },
        { answer: 'NERFS', clue: 'organe nerveux périphérique', extra: ['T','M','A','K','L','X','B','P','D','G','H','J','Q','W','Z'] },
        { answer: 'NEURONE', clue: 'cellule nerveuse', extra: ['B','M','T','X','K','A','L','P','D','F','G','H','J'] },
        { answer: 'SYNAPSE', clue: 'zone entre deux neurones', extra: ['K','L','M','T','X','B','D','F','G','H','J','Q','W'] },
        { answer: 'AXONE', clue: 'prolongement du neurone', extra: ['R','T','M','L','P','K','B','D','F','G','H','J','Q','W','Z'] },
        { answer: 'DENDRITE', clue: 'prolongement court du neurone', extra: ['R','T','M','L','P','K','B','F','G','H','J','Q','W','Z'] },
        { answer: 'GANGLION', clue: 'renflement du nerf', extra: ['X','K','M','B','T','P','A','D','F','G','H'] },
        { answer: 'NERF MIXTE', clue: 'sensitif et moteur', extra: ['B','K','A','L','P','D','G','H','J','Q'] },
        { answer: 'INFLUX NERVEUX', clue: 'message nerveux', extra: ['X','K','M','B','T','P','A','L','F','G','H','J'] }
    ],
    // المستوى 2
    [
        { answer: 'RECEPTEUR', clue: 'capte le stimulus', extra: ['K','M','T','X','B','L','A','D','F','G','H'] },
        { answer: 'STIMULUS', clue: 'excitant externe', extra: ['K','B','N','P','A','X','D','F','G','H','J','Q','W'] },
        { answer: 'AIRE VISUELLE', clue: 'zone du cerveau pour la vue', extra: ['X','T','K','M','B','P'] },
        { answer: 'NERF OPTIQUE', clue: 'conduit la vision', extra: ['X','M','B','A','K','L'] },
        { answer: 'RETINE', clue: 'récepteur de la lumière', extra: ['B','M','K','A','X','P','D','F','G','H','J','Q','W','Z'] },
        { answer: 'PEAU', clue: 'organe du toucher', extra: ['B','M','T','R','K','L','X','D','F','G','H','J','Q','W','Z'] },
        { answer: 'INFLUX SENSITIF', clue: 'vers le cerveau', extra: ['X','K','M','A','B','T'] },
        { answer: 'CORPUSCULE', clue: 'récepteur cutané', extra: ['M','K','T','X','B','A','F','G'] },
        { answer: 'AIRE TACTILE', clue: 'zone du cerveau pour le toucher', extra: ['X','M','K','B','P','N'] },
        { answer: 'CONDUCTEUR', clue: 'transmet l\'influx', extra: ['K','B','M','T','X','A','P','F','G','H'] }
    ],
    // المستوى 3
    [
        { answer: 'AIRE MOTRICE', clue: 'origine du mouvement volontaire', extra: ['X','K','B','N','P','L','F','G'] },
        { answer: 'MUSCLE', clue: 'organe effecteur', extra: ['T','B','N','D','P','X','A','K','F','G','H','J','Q','W'] },
        { answer: 'INFLUX MOTEUR', clue: 'vers le muscle', extra: ['K','B','A','X','T','P'] },
        { answer: 'NERF MOTEUR', clue: 'conduit la motricité', extra: ['X','K','B','A','T','P','D','F','G'] },
        { answer: 'VOLONTAIRE', clue: 'contrôlé par le cerveau', extra: ['X','K','M','B','A','P','F','G'] },
        { answer: 'CONTRACTION', clue: 'réponse du muscle', extra: ['X','K','M','B','A','P','D','F','G'] },
        { answer: 'HEMISPHERE', clue: 'moitié du cerveau', extra: ['K','X','B','T','A','P','D','F','G'] },
        { answer: 'EFFECTEUR', clue: 'organe qui exécute', extra: ['K','M','X','B','A','P','T'] },
        { answer: 'ROLANDO', clue: 'sillon du cerveau', extra: ['K','M','B','T','X','P','A','E','F','G','H','J','Q','W'] },
        { answer: 'CERVELET', clue: 'partie de l\'encéphale', extra: ['X','K','B','M','A','P','D','F','G'] }
    ],
    // المستوى 4-10 (مختصر للاختصار - يمكنك إكمالها لاحقاً)
    { length: 10, remaining: 'سيتم إكمالها لاحقاً' }
];

// ---------- 3. أسئلة الاختبارات المعرفية ----------
const quizData = {
    easy: [
        { question: "Quel organe fait partie du système nerveux central ?", options: ["L'encéphale", "Le muscle", "L'os"], answer: "L'encéphale" },
        { question: "Quel est le rôle des récepteurs sensoriels dans la peau ?", options: ["Produire le mouvement", "Capter les stimulus extérieurs", "Analyser les messages"], answer: "Capter les stimulus extérieurs" },
        { question: "Où naît l'influx nerveux moteur lors d'un mouvement volontaire ?", options: ["Dans l'aire motrice", "Dans la moelle épinière", "Dans l'œil"], answer: "Dans l'aire motrice" },
        { question: "Le nerf sciatique est un conducteur :", options: ["Uniquement sensitif", "Uniquement moteur", "Mixte"], answer: "Mixte" },
        { question: "Quel est le centre nerveux responsable des réflexes médullaires ?", options: ["Le cerveau", "La moelle épinière", "Le cervelet"], answer: "La moelle épinière" },
        { question: "Comment appelle-t-on l'unité structurelle du système nerveux ?", options: ["La fibre musculaire", "Le neurone", "Le tendon"], answer: "Le neurone" },
        { question: "Quelle est la propriété du muscle qui lui permet de se raccourcir ?", options: ["L'élasticité", "L'excitabilité", "La contractilité"], answer: "La contractilité" },
        { question: "Le muscle squelettique est relié à l'os par :", options: ["Les tendons", "Les nerfs", "Les vaisseaux"], answer: "Les tendons" },
        { question: "Quels sont les besoins de la contraction musculaire ?", options: ["Glucose et Oxygène", "CO2 et Eau", "Graisse et Azote"], answer: "Glucose et Oxygène" },
        { question: "La zone de contact entre neurone et muscle est :", options: ["L'aire de Broca", "La plaque motrice", "Le corps cellulaire"], answer: "La plaque motrice" },
        { question: "L'arc réflexe concerne quel type de mouvement ?", options: ["Volontaire", "Involontaire", "Le sommeil"], answer: "Involontaire" },
        { question: "Quelle substance nuit gravement aux réflexes ?", options: ["L'eau", "Les vitamines", "L'alcool"], answer: "L'alcool" },
        { question: "L'aire visuelle sert à :", options: ["Entendre", "Voir", "Goûter"], answer: "Voir" },
        { question: "Une fibre musculaire est une :", options: ["Cellule", "Bactérie", "Protéine"], answer: "Cellule" },
        { question: "L'influx nerveux sensitif se dirige vers :", options: ["Les muscles", "Les centres nerveux", "La peau"], answer: "Les centres nerveux" },
        { question: "L'organe qui exécute le mouvement est :", options: ["Le nerf", "Le muscle", "L'œil"], answer: "Le muscle" },
        { question: "La matière grise du cerveau est située en :", options: ["Périphérie", "Centre", "Bas"], answer: "Périphérie" },
        { question: "Le stimulus de l'oreille est :", options: ["La lumière", "Le son", "L'odeur"], answer: "Le son" },
        { question: "Le manque de sommeil fatigue quel système ?", options: ["Nerveux", "Digestif", "Urinaire"], answer: "Nerveux" },
        { question: "Le cerveau est protégé par :", options: ["Le crâne", "La peau uniquement", "Les muscles"], answer: "Le crâne" }
    ],
    medium: [],
    hard: []
};

const immunologyQuizData = { easy: [], medium: [], hard: [] };
